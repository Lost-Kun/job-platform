const config = {
    localPort:8086,                                    //系统启动端口
    dataBaseConfig:{
        host:'localhost',                           //数据库主机地址
        database:'job_platform',                   //数据库名
        user:'root',                                   //用户名
        password:'rootwll',                          //密码
        port:3306                                     //端口
    },
    logPath:'',                                         //日志地址（为空默认为系统目录下），需填绝对地址(如：/home/logs),
    timeOut:7                                       //登录保存时间，单位：天
}

module.exports = config;