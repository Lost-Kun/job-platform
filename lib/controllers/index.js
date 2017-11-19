
const fs = require('fs');

const path = require('path');

const crypto = require('crypto');

const Result = require('../utils/result');

const {query} = require('../utils/mysql');

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
    try{
		let {Mobile} = ctx.request.body;
    }catch(e){
        result.success = false;
        result.msg = e.message;
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
		let queryEmployeeSql = `select `;
		let queryEmployerSql = ``;
    }catch(e){
        result.success = false;
        result.msg = e.message;
    }
    ctx.response.type = 'json';
    ctx.response.body = result;
};

module.exports = {
	'GET /': getIndexFn,
	'POST /sys/getVerificationCode':getVerificationCode,
	'POST /sys/login':login
} 