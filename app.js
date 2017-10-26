const koa = require('koa');

const app = new koa();

const http = require('http');

const path = require('path');

const config = require('./lib/config/config.js');

const bodyParser = require('koa-bodyparser');

const xmlParser = require('koa-xml-body');

const staticFiles = require('./lib/utils/static-file');

const router = require('./lib/utils/router');

const log4js = require('koa-log4');

const server = http.createServer(app.callback());

require('./lib/utils/log');

const logger = log4js.getLogger('app') ;//将当前文件日志命名为 app
logger.info('--------start project-------------');

app.use(async (ctx, next) => {
    logger.info(`Process ${ctx.request.method} ${ctx.request.url}...`);
    var
      start = new Date().getTime(),
      execTime;
    await next();
    execTime = new Date().getTime() - start;
    ctx.response.set('X-Response-Time', `${execTime}ms`);
  });
  
app.use(staticFiles('/static',  path.join(__dirname, '/dist/static')));

app.use(log4js.koaLogger(log4js.getLogger('http'), { level: 'auto' }));

app.use(xmlParser());

app.use(bodyParser());

app.use(router());

server.listen(config.localPort);

logger.info('app started at port '+config.localPort+'...');



