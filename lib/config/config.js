const config = {
    localPort:8086,                                    //系统启动端口
    dataBaseConfig:{
        host:'localhost',                           //数据库主机地址
        database:'job_platform',                   //数据库名
        user:'root',                                   //用户名
        password:'bhsa',                          //密码
        port:3306                                     //端口
    },
    smsConfig:{                                    //短信登录配置
        sdkappid: '1400050390', 
        appkey: '1d188ba8aab1e943fa36e02faa2955e9'
    },
    logPath:'',                                         //日志地址（为空默认为系统目录下），需填绝对地址(如：/home/logs),
    timeOut:7,                                       //登录保存时间，单位：天
    codeTimeout:10,                                  //验证码失效时间，单位：分钟
    projectTimeout:7,                                  //申请完工后系统自动确认完工时间，单位：天
    refundTimeout:3,                                  //申请退款后系统自动确认退款时间，单位：天
    orderPayTimeout:1                                //预约成功后，项目订单未支付保留时间，单位：小时
}

module.exports = config;