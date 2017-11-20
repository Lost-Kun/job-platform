//项目相关接口

const Result = require('../utils/result');

const {query} = require('../utils/mysql');

const moment = require('moment');

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
        let addSql = `insert into project (Name,Desp,Wage,Length,Employer_ID,Riqi) values ('${data.Name}','${data.Desp}',${data.Wage},${data.Length},'${data.Employer_ID}','${moment().format("YYYY-MM-DD HH:mm:ss")}')`;
        await query(addSql);
        result.success = true;
        result.msg = '发布成功';
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
        await query(`insert into apply (Project_ID,Employee_ID,Riqi) values (${parseInt(Project_ID)},'${Employee_ID}','${moment().format("YYYY-MM-DD HH:mm:ss")}')`);
        // let projectInfo = await query(`select Delivery_number from project where Project_ID = ${Project_ID}`);
        // if(projectInfo && projectInfo.length > 0){
        //     await query(`update project set Delivery_number = ${parseInt(projectInfo[0].Delivery_number)+1} where Project_ID = ${Project_ID}`);
        // }
        await query(`update project set Delivery_number = Delivery_number+1 where Project_ID = ${Project_ID}`);
        result.msg = '投递成功';
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

module.exports = {
    'POST /project/getProjectList': getProjectList,
	'POST /project/getProjectInfo': getProjectInfo,
	'POST /project/addProject': addProject,
	'POST /project/applyProject': applyProject,
	'POST /project/getApplyList': getApplyList,
	'POST /project/getLogList': getLogList,
	'POST /project/orderEmployee': orderEmployee,
	'POST /project/addProjectLog': addProjectLog
}