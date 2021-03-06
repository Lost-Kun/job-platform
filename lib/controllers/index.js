
const fs = require('fs');

const path = require('path');

const crypto = require('crypto');

const Result = require('../utils/result');

const {query} = require('../utils/mysql');

const uuid = require('uuid/v1');

const moment = require('moment');

const cache = require('memory-cache');

const config = require('../config/config');

const sender = require('../utils/SmsSender.js');

const getIndexFn = async (ctx, next) => {
	ctx.response.type = 'text/html';
	ctx.response.body = fs.createReadStream(path.join(__dirname, "../../dist/index.html"));
};

const wexCheckFn = async(ctx, next) => {
	let token = 'WeChat';
	let {echostr, nonce, signature, timestamp} = ctx.request.query;
	let arr = [token, timestamp, nonce];
	arr.sort();
	const hashCode = crypto.createHash('sha1'); //创建加密类型 
	let resultCode = hashCode.update(arr.join('')).digest('hex'); //对传入的字符串进行加密
	ctx.response.type = 'text/html';
	if(resultCode === signature){
		ctx.response.body = echostr;
	}else{
		ctx.response.body = 'mismatch';
	}
};

const getVerificationCode = async(ctx, next) => {  //生成验证码，缓存验证，发送短信
	let result = new Result();
	let code = null;
    try{
		let {Mobile} = ctx.request.body;
		var arrCode = [];//容器  
        for(var i =0;i<6;i++){//循环六次  
            var num = Math.random()*9; 
            num = parseInt(num,10);  
            arrCode.push(num);  
		}
		code =	arrCode.join('');
		//验证码放入缓存
		cache.put(Mobile, code, config.codeTimeout*60*1000);
		await new Promise((resolve, reject) => {
			sender.singleSmsSend(0, '86', Mobile, `【${code}】您的验证码是12345。请在页面中提交验证码完成验证。`, '', '', function (data) {
				var ret = JSON.parse(data);
				if (0 != ret.result) {
					reject(new Error(ret.errmsg));
				}else{
					resolve();
				}
			});
		})
        result.msg = '发送成功';
    }catch(e){
        result.success = false;
        result.msg = '验证码['+code+']'+e.message;
    }
    ctx.response.type = 'json';
    ctx.response.body = result;
};

const login = async(ctx, next) => {
    let result = new Result();
    try{
		let {Mobile, Code} = ctx.request.body;
		/*
		检验验证码
		 */
		let code = cache.get(Mobile);
		if(code !== null && code == Code){
			cache.del(Mobile);
			let queryEmployeeSql = `select Employee_ID from employee where Mobile = '${Mobile}'`;
			let queryEmployeeResult = await query(queryEmployeeSql);
			if(queryEmployeeResult.length > 0){
				result.success = true;
				result.data = {
					userId:queryEmployeeResult[0].Employee_ID,
					type: 0 //用户为工程师
				};
				ctx.cookies.set('userId',queryEmployeeResult[0].Employee_ID,{
					maxAge:config.timeOut * 24 * 60 * 60 * 1000,
					overwrite:true,
					httpOnly:false
				});
				ctx.cookies.set('userType','0',{
					maxAge:config.timeOut * 24 * 60 * 60 * 1000,
					overwrite:true,
					httpOnly:false
				});
			}else{
				let queryEmployerSql = `select Employer_ID from employer where Mobile = '${Mobile}'`;
				let queryEmployerResult = await query(queryEmployerSql);
				if(queryEmployerResult.length > 0){
					result.success = true;
					result.data = {
						userId:queryEmployerResult[0].Employer_ID,
						type: 1 //雇主
					}
					ctx.cookies.set('userId',queryEmployerResult[0].Employer_ID,{
						maxAge:config.timeOut * 24 * 60 * 60 * 1000,
						overwrite:true,
						httpOnly:false
					});
					ctx.cookies.set('userType','1',{
						maxAge:config.timeOut * 24 * 60 * 60 * 1000,
						overwrite:true,
						httpOnly:false
					});
				}else{
					result.success = true;
					result.data = {
						type: 2 //新用户，未入库
					}
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
};

const addUser = async(ctx, next) => {
    let result = new Result();
    try{
		let data = ctx.request.body;
		if(data.type === 'mobile'){ //手机登录
			let userId = uuid();
			let Mobile = data.Mobile;
			let userType = data.userType;
			let insertSql = '';
			if(parseInt(userType) === 0){//设计师
				insertSql = `insert into employee (Employee_ID,Mobile,Riqi) values ('${userId}','${Mobile}','${moment().format("YYYY-MM-DD HH:mm:ss")}')`;
			}else if(parseInt(userType) === 1){//雇主
				insertSql = `insert into employer (Employer_ID,Mobile,Riqi) values ('${userId}','${Mobile}','${moment().format("YYYY-MM-DD HH:mm:ss")}')`;
			}
			await query(insertSql);
			ctx.cookies.set('userId',userId,{
				maxAge:config.timeOut * 24 * 60 * 60 * 1000,
				overwrite:true,
				httpOnly:false
			});
			ctx.cookies.set('userType',userType.toString(),{
				maxAge:config.timeOut * 24 * 60 * 60 * 1000,
				overwrite:true,
				httpOnly:false
			});
			result.success = true;
			result.msg = '添加用户成功';
		}else if(data.type === 'weixin'){//微信登录

		}else{
			result.success = false;
			result.msg = '无该登录类型';
		}
    }catch(e){
        result.success = false;
        result.msg = e.message;
    }
    ctx.response.type = 'json';
    ctx.response.body = result;
};

module.exports = {
	'GET /': getIndexFn,//获取主页面
	'POST /sys/getVerificationCode':getVerificationCode,//获取验证码
	'POST /sys/login':login,//用户登录
	'POST /sys/addUser':addUser,//添加用户
} 