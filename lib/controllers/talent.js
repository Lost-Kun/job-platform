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
        result.data = await query(`select * from employee where Position like '%${searchText}%' or Skills like '%${searchText}%' or Projects like '%${searchText}%' 
         or Job_company like '%${searchText}%' or Name like '%${searchText}%' ${sortString} limit ${(parseInt(pageIndex)-1)*parseInt(pageSize)},${pageSize}`);

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