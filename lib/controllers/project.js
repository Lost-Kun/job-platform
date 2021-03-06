//项目相关接口

const Result = require('../utils/result');

const {query} = require('../utils/mysql');

const moment = require('moment');

const cache = require('memory-cache');

const config = require('../config/config');

const getProjectList = async(ctx, next) => {
    let result = new Result();
    try{
        let {searchText = '', sortType = 0, pageIndex = 1, pageSize = 10} = ctx.request.body;
        let sortString = '';
        switch (parseInt(sortType)){
            case 0:      //最新发布
                sortString = 'order by Riqi DESC';
                break;
            case 1:      //日薪升序
                sortString = 'order by Wage ASC';
                break;
            case 2:      //日薪降序
                sortString = 'order by Wage DESC';
                break;
            case 3:      //总价升序
                sortString = 'order by totalWage ASC';
                break;
            case 4:      //总价降序 
                sortString = 'order by totalWage DESC';
                break;
        }
        let queryStr = `where (Desp != null or Desp != '') and Name like '%${searchText}%' or Desp like '%${searchText}%' or Position like '%${searchText}%'`;
        result.data = await query(`select *,Wage*Length totalWage from project ${queryStr} ${sortString} limit ${(parseInt(pageIndex)-1)*parseInt(pageSize)},${pageSize}`);

        let totalResult = await query(`select count(*) from project ${queryStr}`);

        result.total = totalResult[0]["count(*)"];

        result.success = true;
        result.msg = '查询成功';
    }catch(e){
        result.success = false;
        result.msg = e.message;
    }
    ctx.response.type = 'json';
    ctx.response.body = result;
}

const getProjectInfo = async(ctx, next) => {
    let result = new Result();
    try{
        let {projectId} = ctx.request.body;
        let queryResult = await query(`select a.*,b.Name Employer_Name from project a left join employer b on a.Employer_ID = b.Employer_ID where Project_ID = ${projectId}`);
        if(queryResult.length > 0){
            result.success = true;
            result.msg = '获取成功';
            result.data = queryResult[0]
        }else{
            result.success = false;
            result.msg = '该用户不存在';
        }
    }catch(e){
        result.success = false;
        result.msg = e.message;
    }
    ctx.response.type = 'json';
    ctx.response.body = result;
}

const addCheckPayTask = (Project_ID,type)=>{
    //项目订单未支付定时器
    // cache.put('CheckPay_'+Project_ID, '', 60*1000,async()=>{
    cache.put('CheckPay_'+Project_ID, '', config.orderPayTimeout*60*60*1000,async()=>{
        let searchResult = await query(`select a.Amount_paid,a.Employee_ID,a.State,b.Name from project a left join employee b on a.Employee_ID = b.Employee_ID where a.Project_ID = ${Project_ID}`);
        if(searchResult && searchResult.length > 0){
            let moneyPaid = searchResult[0].Amount_paid;
            if(moneyPaid === null || moneyPaid == 0){//未支付，删除订单
                let Employee_ID = searchResult[0].Employee_ID;
                let Name= searchResult[0].Name;
                await query(`update employee set State = 0 where Employee_ID = '${Employee_ID}'`);
                if(type === 0){//直接预约
                    await query(`delete from project where Project_ID = ${Project_ID}`);
                }
                if(type === 1){//项目投递选择预约
                    await query(`update project set Employee_ID = null,State = 1,Wage_real = null,Length_real = null where Project_ID = ${Project_ID}`);
                    await query(`insert into log (Project_ID,Progress,Riqi) values (${Project_ID},'逾期未付款，平台已自动取消对${Name}设计师的预约','${moment().format("YYYY-MM-DD HH:mm:ss")}')`);
                }
            }else if(searchResult[0].State == 9){//已支付，修改未支付状态
                await query(`update project set State = 2 where Project_ID = ${Project_ID}`);
            }
        }
    });
};

const addProject = async(ctx, next) => {
    let result = new Result();
    try{
        let data = ctx.request.body;
        /*
        验证码验证
         */
        
		let code = cache.get(data.Employer_mobile);
		if(code !== null && code == data.verificationCode){
            cache.del(data.Employer_mobile);
            let {Employee_name = null, Employer_nameShow = null} = data;
            if(Employee_name !== null && Employer_nameShow !== null){
                //检验重复
                let checkSql = `select Employer_ID from employer where Mobile = '${data.Employer_mobile}'`;
                let checkSqlOther = `select Employee_ID from employee where Mobile = '${data.Employer_mobile}'`;
                let checkResult = await query(checkSql);
                let checkOtherResult = await query(checkSqlOther);
                if((checkResult.length > 0 && checkResult[0].Employer_ID !== data.Employer_ID) || checkOtherResult.length > 0){
                    throw new Error('该手机号已注册');
                }else{ 
                    let updateSql = 'update employer';
                    updateSql += ` set Name = '${Employer_nameShow}',`;
                    updateSql += ` Name_real = '${Employee_name}',`;
                    updateSql += ` Mobile = '${data.Employer_mobile}'`;
                    updateSql += ` where Employer_ID = '${data.Employer_ID}'`;
                    await query(updateSql);
                }
            }
            if(data.type === 'publish'){
                let addSql = `insert into project (Name,Desp,Wage,Length,Employer_ID,Riqi) values ('${data.Name}','${data.Desp}',${data.Wage},${data.Length},'${data.Employer_ID}','${moment().format("YYYY-MM-DD HH:mm:ss")}')`;
                await query(addSql);
                result.success = true;
                result.msg = '发布成功';
            }else if(data.type === 'order'){
                let employeeInfo = await query(`select Name,State from employee where Employee_ID = '${data.Employee_ID}'`);
                if(employeeInfo && employeeInfo.length > 0){
                    if(employeeInfo[0].State === 0){
                        let addSql = `insert into project (Name,Wage,Wage_real,Length,Length_real,Employer_ID,Employee_ID,State,Riqi,Project_Type) values ('${data.Name}',${data.Wage},${data.Wage},${data.Length},${data.Length},'${data.Employer_ID}','${data.Employee_ID}',9,'${moment().format("YYYY-MM-DD HH:mm:ss")}',1)`;
                        let addResult = await query(addSql);
                        //添加log
                        await query(`insert into log (Project_ID,Progress,Riqi) values (${parseInt(addResult.insertId)},'预约${employeeInfo[0].Name}设计师成功，预约项目日薪：${data.Wage}元/天，项目工时：${data.Length}天','${moment().format("YYYY-MM-DD HH:mm:ss")}')`);
                        
                        //增加设计师预约次数
                        await query(`update employee set Ordered_number = Ordered_number+1,State = 1 where Employee_ID = '${data.Employee_ID}'`);
                        result.msg = '预约成功';
                        addCheckPayTask(parseInt(addResult.insertId), 0);
                    }else{
                        result.success = false;
                        result.msg = '该设计师已被预约';
                    }
                }else{
                    result.success = false;
                    result.msg = '设计师信息丢失';
                }
            }
        }else{
			result.success = false;
			result.msg = '验证码有误';
		}
    }catch(e){
        result.success = false;
        result.msg = e.message;
    }
    ctx.response.type = 'json';
    ctx.response.body = result;
}

const applyProject = async(ctx, next) => {
    let result = new Result();
    try{
        let {Project_ID, Employee_ID} = ctx.request.body;
        //检验是否投递
        let checkSql = await query(`select Apply_ID from apply where Project_ID = ${parseInt(Project_ID)} and Employee_ID = '${Employee_ID}'`);
        if(checkSql && checkSql.length > 0){
            result.success = false;
            result.msg = '已投递该项目';
        }else{
            await query(`insert into apply (Project_ID,Employee_ID,Riqi) values (${parseInt(Project_ID)},'${Employee_ID}','${moment().format("YYYY-MM-DD HH:mm:ss")}')`);
            await query(`update project set Delivery_number = Delivery_number+1 where Project_ID = ${Project_ID}`);
            result.msg = '投递成功';
        }
    }catch(e){
        result.success = false;
        result.msg = e.message;
    }
    ctx.response.type = 'json';
    ctx.response.body = result;
}

const getApplyList = async(ctx, next) => {
    let result = new Result();
    try{
        let {Project_ID} = ctx.request.body;
        let querySql = `select a.*,b.Name from apply a left join employee b on a.Employee_ID = b.Employee_ID where a.Project_ID = ${parseInt(Project_ID)} order by a.Riqi DESC`;
        result.data = await query(querySql);
        let applyIdArr = result.data.map((item) => {
            return item.Apply_ID;
        })
        await query(`update apply set IsRead = 1 where IsRead = 0 and Apply_ID in (${applyIdArr.join(',')})`);
        result.msg = '查询成功';
    }catch(e){
        result.success = false;
        result.msg = e.message;
    }
    ctx.response.type = 'json';
    ctx.response.body = result;
}

const getLogList = async(ctx, next) => {
    let result = new Result();
    try{
        let {Project_ID, userType} = ctx.request.body;
        let querySql = `select * from log where Project_ID = ${parseInt(Project_ID)} order by Riqi DESC`;
        result.data = await query(querySql);
        let logIdArr = result.data.map((item) => {
            return item.Log_ID;
        })
        if(parseInt(userType) === 0){//设计师
            await query(`update log set IsRead_Employee = 1 where IsRead_Employee = 0 and Log_ID in (${logIdArr.join(',')})`);
        }else if(parseInt(userType) === 1){//雇主
            await query(`update log set IsRead_Employer = 1 where IsRead_Employer = 0 and Log_ID in (${logIdArr.join(',')})`);
        }
        result.msg = '查询成功';
    }catch(e){
        result.success = false;
        result.msg = e.message;
    }
    ctx.response.type = 'json';
    ctx.response.body = result;
}

const orderEmployee = async(ctx, next) => {
    let result = new Result();
    try{
        let {Project_ID,Employee_ID,Wage,Length} = ctx.request.body;
        let employeeInfo = await query(`select Name,State from employee where Employee_ID = '${Employee_ID}'`);
        if(employeeInfo && employeeInfo.length > 0){
            if(employeeInfo[0].State === 0){
                await query(`update project set Employee_ID = '${Employee_ID}',State = 9,Wage_real = ${parseInt(Wage)},Length_real = ${parseInt(Length)} where Project_ID = ${parseInt(Project_ID)}`);
                //添加log
                await query(`insert into log (Project_ID,Progress,Riqi) values (${parseInt(Project_ID)},'预约${employeeInfo[0].Name}设计师成功，预约项目日薪：${Wage}元/天，项目工时：${Length}天','${moment().format("YYYY-MM-DD HH:mm:ss")}')`);
                //增加设计师预约次数
                await query(`update employee set Ordered_number = Ordered_number+1,State = 1 where Employee_ID = '${Employee_ID}'`);
                result.msg = '预约成功';
                addCheckPayTask(parseInt(Project_ID), 1);
            }else{
                result.success = false;
                result.msg = '该设计师已被预约';
            }
        }else{
            result.success = false;
            result.msg = '设计师信息丢失';
        }
    }catch(e){
        result.success = false;
        result.msg = e.message;
    }
    ctx.response.type = 'json';
    ctx.response.body = result;
}

const addProjectLog = async(ctx, next) => {
    let result = new Result();
    try{
        let {Project_ID,Progress} = ctx.request.body;
        let insertSql = `insert into log (Project_ID,Progress,Riqi) values (${parseInt(Project_ID)},'${Progress}','${moment().format("YYYY-MM-DD HH:mm:ss")}')`;
        await query(insertSql);
        result.msg = '新增记录成功';
    }catch(e){
        result.success = false;
        result.msg = e.message;
    }
    ctx.response.type = 'json';
    ctx.response.body = result;
}

const addTimedTask = (Project_ID)=>{
    //项目自动完成定时器
    // cache.put('Project_'+Project_ID, '', 60*1000,async()=>{
    cache.put('Project_'+Project_ID, '', config.projectTimeout*24*60*60*1000,async()=>{
        let updateSql = `update project set State = 5 where Project_ID = ${Project_ID}`;
        await query(updateSql);
        let projectInfos = await query(`select Employee_ID from project where Project_ID = ${Project_ID}`);
        if(projectInfos.length > 0){
            let Employee_ID = projectInfos[0].Employee_ID;
            await query(`update employee set State = 0 where Employee_ID = '${Employee_ID}'`);
        }
        await query(`insert into log (Project_ID,Progress,Riqi) values (${Project_ID},'平台已自动确认完工','${moment().format("YYYY-MM-DD HH:mm:ss")}')`);
    });
};

const deleteTimedTask = (Project_ID)=>{
    cache.del('Project_'+Project_ID);
};

const setProjectState = async(ctx, next) => {
    let result = new Result();
    try{
        let {Project_ID,State,StateOrigin} = ctx.request.body;
        let updateSql = `update project set State = ${parseInt(State)} where Project_ID = ${Project_ID}`;
        await query(updateSql);
        let Progress = '';
        if(State == 2){
            deleteTimedTask(Project_ID);
            Progress = '雇主驳回完工申请';
        }
        if(State == 3){
            addTimedTask(Project_ID);
            Progress = '设计师已申请完工，请雇主尽快验收项目，否则系统会在申请完工后七天内自动确认完工';
        }
        if(State == 4){
            deleteTimedTask(Project_ID);
            Progress = '雇主申请退款';
        }
        if(State == 5){
            let projectInfos = await query(`select Employee_ID from project where Project_ID = ${Project_ID}`);
            if(projectInfos.length > 0){
                let Employee_ID = projectInfos[0].Employee_ID;
                await query(`update employee set State = 0 where Employee_ID = '${Employee_ID}'`);
            }
            if(StateOrigin == 3){
                deleteTimedTask(Project_ID);
                Progress = '雇主确认完工申请';
            }else if(StateOrigin == 4){
                Progress = '设计师确认退款申请';
            }else if(StateOrigin == 6){
                Progress = '平台完成争端处理';
            }
        }
        if(State == 6){
            deleteTimedRefundTask(Project_ID);
            Progress = '设计师驳回退款申请，等待平台介入处理';
        }
        await query(`insert into log (Project_ID,Progress,Riqi) values (${Project_ID},'${Progress}','${moment().format("YYYY-MM-DD HH:mm:ss")}')`);
        result.msg = '操作成功';
    }catch(e){
        result.success = false;
        result.msg = e.message;
    }
    ctx.response.type = 'json';
    ctx.response.body = result;
}

const extendOrder = async(ctx, next) => {
    let result = new Result();
    try{
        let {Project_ID,Length} = ctx.request.body;
        let updateSql = `update project set Length_real = Length_real+${parseInt(Length)} where Project_ID = ${Project_ID}`;
        await query(updateSql);
        let Progress = '雇主延长预约'+Length+'天';
        let insertLogSql = `insert into log (Project_ID,Progress,Riqi) values (${parseInt(Project_ID)},'${Progress}','${moment().format("YYYY-MM-DD HH:mm:ss")}')`;
        await query(insertLogSql);
        result.msg = '延长预约成功';
    }catch(e){
        result.success = false;
        result.msg = e.message;
    }
    ctx.response.type = 'json';
    ctx.response.body = result;
}

const addTimedRefundTask = (Project_ID,Refund)=>{
    //项目自动同意退款定时器
    // cache.put('Refund_'+Project_ID, '', 60*1000,async()=>{
    cache.put('Refund_'+Project_ID, '', config.refundTimeout*24*60*60*1000,async()=>{
        let updateSql = `update project set State = 5 where Project_ID = ${Project_ID}`;
        await query(updateSql);
        let projectInfos = await query(`select Employee_ID from project where Project_ID = ${Project_ID}`);
        if(projectInfos.length > 0){
            let Employee_ID = projectInfos[0].Employee_ID;
            await query(`update employee set State = 0 where Employee_ID = '${Employee_ID}'`);
        }
        await query(`insert into log (Project_ID,Progress,Riqi) values (${Project_ID},'平台已自动确认退款${Refund}元','${moment().format("YYYY-MM-DD HH:mm:ss")}')`);
    });
};

const deleteTimedRefundTask = (Project_ID)=>{
    cache.del('Refund_'+Project_ID);
};

const applyForRefund = async(ctx, next) => {//申请退款
    let result = new Result();
    try{
        let {Project_ID,Refund} = ctx.request.body;
        let updateSql = `update project set Refund = ${parseInt(Refund)},State = 4 where Project_ID = ${Project_ID}`;
        await query(updateSql);
        let Progress = '雇主已申请退款'+Refund+'元，设计师将在3天内答复，逾期默认自动退款';
        let insertLogSql = `insert into log (Project_ID,Progress,Riqi) values (${parseInt(Project_ID)},'${Progress}','${moment().format("YYYY-MM-DD HH:mm:ss")}')`;
        await query(insertLogSql);
        addTimedRefundTask(Project_ID,Refund);
        result.msg = '申请退款成功';
    }catch(e){
        result.success = false;
        result.msg = e.message;
    }
    ctx.response.type = 'json';
    ctx.response.body = result;
}

const agreeRefund = async(ctx, next) => {//同意退款
    let result = new Result();
    try{
        let {Project_ID,Refund} = ctx.request.body;
        deleteTimedRefundTask(Project_ID);
        // let updateSql = `update project set Refund_real = ${parseInt(Refund_real)},State = 5,Amount_paid = Amount_paid-${parseInt(Refund_real)} where Project_ID = ${Project_ID}`;
        let updateSql = `update project set Refund = ${parseInt(Refund)},State = 5 where Project_ID = ${Project_ID}`;
        await query(updateSql);
        let Progress = '设计师已同意退款'+Refund+'元';
        let insertLogSql = `insert into log (Project_ID,Progress,Riqi) values (${parseInt(Project_ID)},'${Progress}','${moment().format("YYYY-MM-DD HH:mm:ss")}')`;
        await query(insertLogSql);
        let projectInfos = await query(`select Employee_ID from project where Project_ID = ${Project_ID}`);
        if(projectInfos.length > 0){
            let Employee_ID = projectInfos[0].Employee_ID;
            await query(`update employee set State = 0 where Employee_ID = '${Employee_ID}'`);
        }
        result.msg = '确认退款成功';
    }catch(e){
        result.success = false;
        result.msg = e.message;
    }
    ctx.response.type = 'json';
    ctx.response.body = result;
}

const evaluate = async(ctx, next) => {
    let result = new Result();
    try{
        let {Project_ID,Type,Comment,Rating,UserId} = ctx.request.body;
        
        let rateResult = await query(`select Type from rating where Project_ID = ${parseInt(Project_ID)}`);
        if(rateResult.length === 2 || (rateResult.length === 1 && rateResult[0].Type == Type)){
            result.success = false;
            result.msg = `您已经评价`;
        }else{
            await query(`insert into rating (Project_ID,Comment,Rating,Type,UserId,Riqi) values (${parseInt(Project_ID)},'${Comment}',${parseInt(Rating)},${parseInt(Type)},'${UserId}','${moment().format("YYYY-MM-DD HH:mm:ss")}')`);
            if(rateResult.length === 1){
                await query(`update project set State = 7 where Project_ID = ${Project_ID}`);
            }
            let totalRatingResult = await query(`select sum(Rating) totalRating,count(Rating) ratingNumber from rating where UserId = '${UserId}'`);
            // let newRating = ((parseInt(totalRatingResult[0].ratingNumber === 0?0:totalRatingResult[0].totalRating) + parseInt(Rating))/(totalRatingResult[0].ratingNumber+1)).toFixed(1);
            let newRating = (parseInt(totalRatingResult[0].ratingNumber === 0?0:totalRatingResult[0].totalRating)/totalRatingResult[0].ratingNumber).toFixed(1);
            if(1 === parseInt(Type)){//评价设计师
                await query(`insert into log (Project_ID,Progress,Riqi) values (${parseInt(Project_ID)},'雇主已评价设计师','${moment().format("YYYY-MM-DD HH:mm:ss")}')`);
                await query(`update employee set Rating = ${newRating} where Employee_ID = '${UserId}'`);
            }else{//评价雇主
                await query(`insert into log (Project_ID,Progress,Riqi) values (${parseInt(Project_ID)},'设计师已评价雇主','${moment().format("YYYY-MM-DD HH:mm:ss")}')`);
                await query(`update employer set Rating = ${newRating} where Employer_ID = '${UserId}'`);
            }
            result.msg = `评价成功`;
        }

    }catch(e){
        result.success = false;
        result.msg = e.message;
    }
    ctx.response.type = 'json';
    ctx.response.body = result;
}

const getNewsNumber = async(ctx, next) => {
    let result = new Result();
    try{
        let {userId, userType} = ctx.request.body;
        if(parseInt(userType) === 0){//设计师
            let querySql = `select count(a.Log_ID) as number from log a left join project b on a.Project_ID = b.Project_ID where b.Employee_ID = '${userId}' and a.IsRead_Employee = 0`;
            let queryResult = await query(querySql);
            result.data = queryResult[0].number;
        }else if(parseInt(userType) === 1){//雇主
            let querySql = `select count(a.Log_ID) as number from log a left join project b on a.Project_ID = b.Project_ID where b.Employer_ID = '${userId}' and a.IsRead_Employer = 0`;
            let queryResult = await query(querySql);
            //获取新投递人数
            let queryApplySql = `select count(a.Apply_ID) as number from apply a left join project b on a.Project_ID = b.Project_ID where b.Employer_ID = '${userId}' and b.State = 1 and a.IsRead = 0`;
            let queryApplyResult = await query(queryApplySql);
            result.data = parseInt(queryResult[0].number) + parseInt(queryApplyResult[0].number);
        }
        result.msg = '获取成功';
    }catch(e){
        result.success = false;
        result.msg = e.message;
    }
    ctx.response.type = 'json';
    ctx.response.body = result;
}

const cancelOrder = async(ctx, next) => {
    let result = new Result();
    try{
        let {Project_ID} = ctx.request.body;
        cache.del('CheckPay_'+Project_ID);//取消验证支付
        let searchResult = await query(`select a.Employee_ID,a.Project_Type,b.Name from project a left join employee b on a.Employee_ID = b.Employee_ID where a.Project_ID = ${Project_ID}`);
        if(searchResult && searchResult.length > 0){
            let Project_Type = searchResult[0].Project_Type;
            let Employee_ID = searchResult[0].Employee_ID;
            let Name= searchResult[0].Name;
            await query(`update employee set State = 0 where Employee_ID = '${Employee_ID}'`);
            if(Project_Type === 1){//直接预约
                await query(`delete from project where Project_ID = ${Project_ID}`);
            }
            if(Project_Type === 0){//项目投递选择预约
                await query(`update project set Employee_ID = null,State = 1,Wage_real = null,Length_real = null where Project_ID = ${Project_ID}`);
                await query(`insert into log (Project_ID,Progress,Riqi) values (${Project_ID},'雇主已取消对${Name}设计师的预约','${moment().format("YYYY-MM-DD HH:mm:ss")}')`);
            }
            result.msg = '预订取消成功';
        }else{
            result.msg = '项目已不存在';
        }
    }catch(e){
        result.success = false;
        result.msg = e.message;
    }
    ctx.response.type = 'json';
    ctx.response.body = result;
}

module.exports = {
    'POST /project/getProjectList': getProjectList,//查询项目列表
	'POST /project/getProjectInfo': getProjectInfo,//获取项目详细信息
	'POST /project/addProject': addProject,//新增项目
	'POST /project/applyProject': applyProject,//投递项目
	'POST /project/getApplyList': getApplyList,//获取已投递项目的设计师列表
	'POST /project/getLogList': getLogList,//获取项目日志列表
	'POST /project/orderEmployee': orderEmployee,//预约设计师
	'POST /project/addProjectLog': addProjectLog,//添加项目日志
	'POST /project/setProjectState': setProjectState,//更改项目状态
	'POST /project/extendOrder': extendOrder,//延长预约
	'POST /project/applyForRefund': applyForRefund,//申请退款
	'POST /project/agreeRefund': agreeRefund,//同意退款
    'POST /project/evaluate': evaluate,//进行评价
    'POST /project/getNewsNumber': getNewsNumber,//获取新消息数量
    'POST /project/cancelOrder': cancelOrder//取消预订
}