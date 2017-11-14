//人才相关接口

const Result = require('../utils/result');

const {query} = require('../utils/mysql');

const getTalentList = async(ctx, next) => {
    let result = new Result();
    try{
        let {searchText = '', sortType = 0} = ctx.request.body;
        let sortString = '';
        switch (parseInt(sortType)){
            case 0:      //默认排序
                sortString = '';
                break;
            case 1:      //日薪升序
                sortString = '';
                break;
            case 2:      //日薪降序
                sortString = '';
                break;
            case 3:      //经验升序
                sortString = '';
                break;
            case 4:      //经验降序
                sortString = '';
                break;
        }
        result.data = await query(`select * from employee where Position like '%${searchText}%' or Skills like '%${searchText}%' or Projects like '%${searchText}%' 
         or Job_company like '%${searchText}%' or Name like '%${searchText}%' ${sortString}`);

         result.success = true;
         result.msg = '查询成功';
        
    }catch(e){
        result.success = false;
        result.msg = e.message;
    }
    ctx.response.type = 'json';
    ctx.response.body = result;
}

module.exports = {
	'POST /talent/getTalentList': getTalentList
}