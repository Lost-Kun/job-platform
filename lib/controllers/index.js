const fs = require('fs');

const path = require('path');

const crypto = require('crypto');

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

module.exports = {
	'GET /': getIndexFn
}