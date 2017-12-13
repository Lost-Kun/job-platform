//人才相关接口

const Result = require('../utils/result');

const {query} = require('../utils/mysql');

const getTalentList = async(ctx, next) => {
    let result = new Result();
    try{
        let {searchText = '', sortType = 0, pageIndex = 1, pageSize = 10} = ctx.request.body;
        let sortString = '';
        switch (parseInt(sortType)){
            case 0:      //默认排序
                sortString = 'order by Riqi DESC';
                break;
            case 1:      //日薪升序
                sortString = 'order by Wage ASC';
                break;
            case 2:      //日薪降序
                sortString = 'order by Wage DESC';
                break;
            case 3:      //经验升序
                sortString = 'order by Job_experience ASC';
                break;
            case 4:      //经验降序
                sortString = 'order by Job_experience DESC';
                break;
        }
        let queryStr = `where Position like '%${searchText}%' or Skills like '%${searchText}%' or Projects like '%${searchText}%' 
        or Job_company like '%${searchText}%' or Name like '%${searchText}%'`;
        let requiredFields = 'Employee_ID,Job_company,Job_position,Job_experience,Rating,Skills,Projects,Wage,State';
        result.data = await query(`select ${requiredFields} from employee ${queryStr} ${sortString} limit ${(parseInt(pageIndex)-1)*parseInt(pageSize)},${pageSize}`);

        let totalResult = await query(`select count(*) from employee ${queryStr}`);

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

const editTalentInfo = async(ctx, next) => {
    let result = new Result();
    try{
        let data = ctx.request.body;
        //检验重复
        let checkSql = `select Employee_ID from employee where Mobile = '${data.Mobile}'`;
        let checkSqlOther = `select Employer_ID from employer where Mobile = '${data.Mobile}'`;
        let checkResult = await query(checkSql);
        let checkOtherResult = await query(checkSqlOther);
        if((checkResult.length > 0 && checkResult[0].Employee_ID !== data.Employee_ID) || checkOtherResult.length > 0){
            result.success = false;
            result.msg = '该手机号已注册';
        }else{
            let updateSql = 'update employee';
            updateSql += ` set Name = '${data.Name}',`;
            updateSql += ` Mobile = '${data.Mobile}',`;
            updateSql += ` Position = '${data.Position}',`;
            updateSql += ` Wage = ${data.Wage},`;
            updateSql += ` Job_company = '${data.Job_company}',`;
            updateSql += ` Job_position = '${data.Job_position}',`;
            updateSql += ` Job_experience = ${data.Job_experience},`;
            updateSql += ` Job_city = '${data.Job_city}',`;
            updateSql += ` Job_district = '${data.Job_district}'`;
    
            if(data.showSuppleInfoFlag == true){
                updateSql += `, Edu_school = '${data.Edu_school}',`;
                updateSql += ` Edu_department = '${data.Edu_department}',`;
                updateSql += ` Edu_degree = '${data.Edu_degree}',`;
                updateSql += ` Skills = '${data.Skills}',`;
                updateSql += ` Projects = '${data.Projects}'`;
            }
    
            updateSql += ` where Employee_ID = '${data.Employee_ID}'`;
    
            await query(updateSql);
    
            result.success = true;
            result.msg = '修改成功';
        }
    }catch(e){
        result.success = false;
        result.msg = e.message;
    }
    ctx.response.type = 'json';
    ctx.response.body = result;
}

const getSelfInfo = async(ctx, next) => {
    let result = new Result();
    try{
        let {employeeId} = ctx.request.body;
        let queryResult = await query(`select * from employee where Employee_ID = '${employeeId}'`);
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

const getEmployeeInfo = async(ctx, next) => {
    let result = new Result();
    try{
        let {employeeId} = ctx.request.body;
        let requiredFields = 'Employee_ID,Name,Job_company,Position,Job_position,Job_experience,Rating,Skills,Projects,Wage,State,Ordered_number';
        let queryResult = await query(`select ${requiredFields} from employee where Employee_ID = '${employeeId}'`);
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

const getOrderList = async(ctx, next) => {
    let result = new Result();
    try{
        let {employeeId} = ctx.request.body;
        result.data = await query(`select *,(select count(*) from log where log.Project_ID = project.Project_ID and log.IsRead_Employee = 0) as newsNumber,(select count(*) from rating where rating.Project_ID = project.Project_ID and rating.Type = 2) as ratingNumber from project where Employee_ID = '${employeeId}' order by Riqi DESC`);
        result.success = true;
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
        let {employeeId} = ctx.request.body;
        result.data = await query(`select * from apply where Employee_ID = '${employeeId}' order by Riqi DESC`);
        result.success = true;
    }catch(e){
        result.success = false;
        result.msg = e.message;
    }
    ctx.response.type = 'json';
    ctx.response.body = result;
}

const getRatingList = async(ctx, next) => {
    let result = new Result();
    try{
        let {employeeId} = ctx.request.body;
        result.data = await query(`select a.*,c.Name,c.HeadImgUrl from rating a left join project b on a.Project_ID = b.Project_ID left join employer c on b.Employer_ID = c.Employer_ID where a.UserId = '${employeeId}' order by a.Riqi DESC`);
        result.success = true;
    }catch(e){
        result.success = false;
        result.msg = e.message;
    }
    ctx.response.type = 'json';
    ctx.response.body = result;
}

module.exports = {
	'POST /talent/getTalentList': getTalentList,
    'POST /talent/editTalentInfo': editTalentInfo,
    'POST /talent/getSelfInfo': getSelfInfo,
    'POST /talent/getEmployeeInfo': getEmployeeInfo,
    'POST /talent/getOrderList': getOrderList,
    'POST /talent/getApplyList': getApplyList,
    'POST /talent/getRatingList': getRatingList
}