/**
 * Created by xiaoxiao on 2017/4/4.
 */
const express = require('express');
const mutipart= require('connect-multiparty');
const url=require('url');
//前端用multipart/form-data的形式上传数据，后端通过中间件connect-multipary接收
const path = require('path');


var mutipartMiddeware = mutipart();
var app = express();

//让传上来的文件都保存在userInput文件夹中
app.use(mutipart({uploadDir:'./userInput'}));
app.set('port',process.env.PORT||80);


mypath=path.join(__dirname,'index');
app.use(express.static(mypath));
// express.static 是 Express 内置的唯一一个中间件。负责托管 Express 应用内的静态资源
// express.static的第一个参数是静态文件所在的根目录

app.listen(app.get('port'),function () {
    console.log("小测试的服务器已经启动http://localhost:"+app.get('port')+'');
});
app.get('/',function (req,res) {
    res.type('text/html');
    res.sendFile('index/index.html',{"root":__dirname});
    //sendFile是要发送文件，是响应的一个方法
});


//app.post中第一个参数'/upload'对应前端index.html中请求的url: '/upload'，参数要一致
app.post('/upload',mutipartMiddeware,function (req,res) {
    res.json({code:200,msg:{url:'http://'+req.header.host+'/'+req.files.myfile.path}});
});
