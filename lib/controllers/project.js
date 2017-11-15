//项目相关接口

const Result = require('../utils/result');

const {query} = require('../utils/mysql');

const getProjectList = async(ctx, next) => {
    let result = new Result();
    try{
        
    }catch(e){
        result.success = false;
        result.msg = e.message;
    }
    ctx.response.type = 'json';
    ctx.response.body = result;
}

module.exports = {
	'POST /project/getProjectList': getProjectList
}