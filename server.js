/**
 * Created by xiaoxiao on 2017/4/4.
 */

//中间件（middleware）就是处理HTTP请求的函数。它最大的特点就是，一个中间件处理完，再传递给下一个中间件。App实例在运行过程中，会调用一系列的中间件。
const express = require('express');
const mutipart= require('connect-multiparty');
const url=require('url');
//前端用multipart/form-data的形式上传数据，后端通过中间件connect-multipary接收
const path = require('path');


var mutipartMiddeware = mutipart();
var app = express();

//让传上来的文件都保存在userInput文件夹中
app.use(mutipart({uploadDir:'./userInput'}));    //app.use来引入中间件

//举例：app.use(function(request, response, next) { 。处理。。   next();});
//收到HTTP请求后，先调用第一个中间件，处理，然后通过next方法，将执行权传给第二个中间件，输出HTTP回应。
//use方法也允许将请求网址写在第一个参数。这代表，只有请求路径匹配这个参数，后面的中间件才会生效。无疑，这样写更加清晰和方便。



app.set('port',process.env.PORT||80);//app.set指定变量的值


mypath=path.join(__dirname,'index');
app.use(express.static(mypath));
// express.static 负责托管 Express 应用内的静态资源，例如图片、CSS、JavaScript 文件等
//将静态资源文件所在的目录作为参数传递给 express.static 中间件就可以提供静态资源文件的访问了。
// express.static的第一个参数是静态文件所在的根目录

app.listen(app.get('port'),function () {
    console.log("小测试的服务器已经启动http://localhost:"+app.get('port')+'');
});
app.get('/',function (req,res) {    //app.get：use方法的别名
    //第一个参数：只有请求路径匹配这个参数，后面的中间件才会生效，app.get的回调函数没有调用next方法，
    //，所以只要有一个中间件被调用了，后面的中间件（app.get下的）就不会再被调用了。
    res.type('text/html');
    res.sendFile('index/index.html',{"root":__dirname});
    //sendFile是要发送文件，是响应的一个方法
});


//app.post中第一个参数'/upload'对应前端index.html中请求的url: '/upload'，参数要一致
app.post('/upload',mutipartMiddeware,function (req,res) {
    res.json({code:200,msg:{url:'http://'+req.header.host+'/'+req.files.myfile.path}});
});
