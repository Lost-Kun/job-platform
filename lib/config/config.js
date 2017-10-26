const config = {
    localPort:8088,                                    //系统启动端口
    dataBaseConfig:{
        host:'172.17.34.19',                           //数据库主机地址
        database:'face_recognition',                   //数据库名
        user:'root',                                   //用户名
        password:'Bohui@123',                          //密码
        port:13006                                     //端口
    },
    logPath:''                                         //日志地址（为空默认为系统目录下），需填绝对地址(如：/home/logs)
}

module.exports = config;