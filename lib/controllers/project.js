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

module.exports = {
    'POST /project/getProjectList': getProjectList,
	'POST /project/getProjectInfo': getProjectInfo,
	'POST /project/addProject': addProject
}