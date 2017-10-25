const fs = require('mz/fs');

const path = require('path');

const getIndexFn = async (ctx, next) => {
	ctx.response.type = 'text/html';
	ctx.response.body = fs.createReadStream(path.join(__dirname, "../../dist/index.html"));
};

module.exports = {
	'GET /': getIndexFn
}