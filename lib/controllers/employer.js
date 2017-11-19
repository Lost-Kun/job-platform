//雇主相关接口

const Result = require('../utils/result');

const {query} = require('../utils/mysql');

const editEmployerInfo = async(ctx, next) => {
    let result = new Result();
    try{
        let data = ctx.request.body;

        //检验重复
        let checkSql = `select Employer_ID from employer where Mobile = '${data.Mobile}'`;
        let checkSqlOther = `select Employee_ID from employee where Mobile = '${data.Mobile}'`;
        let checkResult = await query(checkSql);
        let checkOtherResult = await query(checkSqlOther);
        if((checkResult.length > 0 && checkResult[0].Employer_ID !== data.Employer_ID) || checkOtherResult.length > 0){
            result.success = false;
            result.msg = '该手机号已注册';
        }else{     
            let updateSql = 'update employer';
            updateSql += ` set Name = '${data.Name}',`;
            updateSql += ` Name_real = '${data.Name_real}',`;
            updateSql += ` Mobile = '${data.Mobile}',`;
            updateSql += ` Company = '${data.Company}',`;
            updateSql += ` Location = '${data.Location}',`;
            updateSql += ` Company_introduction = '${data.Company_introduction}'`;
            updateSql += ` where Employer_ID = '${data.Employer_ID}'`;

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
        let {employerId} = ctx.request.body;
        let queryResult = await query(`select * from employer where Employer_ID = ${employerId}`);
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

module.exports = {
    'POST /employer/editEmployerInfo': editEmployerInfo,
    'POST /employer/getSelfInfo': getSelfInfo
}