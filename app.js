// const { log } = require('console');
var express = require('express');
var path = require('path');



// 引入数据库
let {db,sqlQuery} = require('./mysql/db')
sqlQuery()   //调用此方法,判断数据库是否链接成功


// 引用路由
var indexRouter = require('./routes/index');   //首页路由
var loginRouter = require('./routes/login');  //登录路由
var regRouter = require('./routes/reg')    //注册路由
var logoutRouter = require('./routes/logout')
// 生城服务器
var app = express();



// session 登录认证
let session = require('express-session')
app.use(session({
    secret: 'aF,.j)wBhq+E9n#aHHZ91Ba!VaoMfC', // 建议使用 128 个字符的随机字符串
    resave: false, //添加 resave 选项
    saveUninitialized: true, //添加 saveUninitialized 选项
  }));                                                                            
 



// 配置模板引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 解析post请求数据
app.use(express.urlencoded({ extended: false }));
// 托管静态资源
app.use(express.static(path.join(__dirname, 'public')));
// 注册路由
app.use('/', indexRouter);
app.use('/login',loginRouter)  //登录页面的路由
app.use('/reg',regRouter)
app.use('/logout',logoutRouter)


















module.exports = app;
