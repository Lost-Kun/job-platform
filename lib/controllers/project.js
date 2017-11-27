//项目相关接口

const Result = require('../utils/result');

const {query} = require('../utils/mysql');

const moment = require('moment');

const cache = require('memory-cache');

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
        let queryStr = `where Name like '%${searchText}%' or Desp like '%${searchText}%' or Position like '%${searchText}%'`;
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
            if(data.type === 'publish'){
                let addSql = `insert into project (Name,Desp,Wage,Length,Employer_ID,Riqi) values ('${data.Name}','${data.Desp}',${data.Wage},${data.Length},'${data.Employer_ID}','${moment().format("YYYY-MM-DD HH:mm:ss")}')`;
                await query(addSql);
                result.success = true;
                result.msg = '发布成功';
            }else if(data.type === 'order'){
                let employeeInfo = await query(`select Name,State from employee where Employee_ID = '${data.Employee_ID}'`);
                if(employeeInfo && employeeInfo.length > 0){
                    if(employeeInfo[0].State === 0){
                        let addSql = `insert into project (Name,Desp,Wage,Wage_real,Length,Length_real,Employer_ID,Employee_ID,State,Riqi) values ('${data.Name}','${data.Desp}',${data.Wage},${data.Wage},${data.Length},${data.Length},'${data.Employer_ID}','${data.Employee_ID}',2,'${moment().format("YYYY-MM-DD HH:mm:ss")}')`;
                        let addResult = await query(addSql);
                        //添加log
                        await query(`insert into log (Project_ID,Progress,Riqi) values (${parseInt(addResult.insertId)},'预约${employeeInfo[0].Name}设计师成功','${moment().format("YYYY-MM-DD HH:mm:ss")}')`);
                        
                        //增加设计师预约次数
                        await query(`update employee set Ordered_number = Ordered_number+1,State = 1 where Employee_ID = '${data.Employee_ID}'`);
                        result.msg = '预约成功';
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
        let {Project_ID} = ctx.request.body;
        let querySql = `select * from log where Project_ID = ${parseInt(Project_ID)} order by Riqi DESC`;
        result.data = await query(querySql);
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
                await query(`update project set Employee_ID = '${Employee_ID}',State = 2,Wage_real = ${parseInt(Wage)},Length_real = ${parseInt(Length)} where Project_ID = ${parseInt(Project_ID)}`);
                //添加log
                await query(`insert into log (Project_ID,Progress,Riqi) values (${parseInt(Project_ID)},'预约${employeeInfo[0].Name}设计师成功','${moment().format("YYYY-MM-DD HH:mm:ss")}')`);
                //增加设计师预约次数
                await query(`update employee set Ordered_number = Ordered_number+1,State = 1 where Employee_ID = '${Employee_ID}'`);
                result.msg = '预约成功';
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

const setProjectState = async(ctx, next) => {
    let result = new Result();
    try{
        let {Project_ID,State,StateOrigin} = ctx.request.body;
        let updateSql = `update project set State = ${parseInt(State)} where Project_ID = ${Project_ID}`;
        await query(updateSql);
        let Progress = '';
        if(State == 2){
            Progress = '雇主驳回完工申请';
        }
        if(State == 3){
            Progress = '设计师申请完工';
        }
        if(State == 4){
            Progress = '雇主申请退款';
        }
        if(State == 5){
            let projectInfos = await query(`select Employee_ID from project where Project_ID = ${Project_ID}`);
            let Employee_ID = projectInfos[0].Employee_ID;
            await query(`update employee set State = 0 where Employee_ID = '${Employee_ID}'`);
            if(StateOrigin == 3){
                Progress = '雇主确认完工申请';
            }else if(StateOrigin == 4){
                Progress = '设计师确认退款申请';
            }else if(StateOrigin == 5){
                Progress = '平台完成争端处理';
            }
        }
        if(State == 6){
            Progress = '设计师驳回退款申请';
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
            let newRating = ((parseInt(totalRatingResult[0].ratingNumber === 0?0:totalRatingResult[0].totalRating) + parseInt(Rating))/(totalRatingResult[0].ratingNumber+1)).toFixed(1);
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

module.exports = {
    'POST /project/getProjectList': getProjectList,
	'POST /project/getProjectInfo': getProjectInfo,
	'POST /project/addProject': addProject,
	'POST /project/applyProject': applyProject,
	'POST /project/getApplyList': getApplyList,
	'POST /project/getLogList': getLogList,
	'POST /project/orderEmployee': orderEmployee,
	'POST /project/addProjectLog': addProjectLog,
	'POST /project/setProjectState': setProjectState,
	'POST /project/extendOrder': extendOrder,
	'POST /project/evaluate': evaluate
}