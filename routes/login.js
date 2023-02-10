var express = require('express');
const session = require('express-session');
var router = express.Router();
let {db} = require('../mysql/db')

// 登录路由
router.get('/', function(req, res) {
  // res.send('登录页面');
  res.render('login.ejs')
});

// 登录提交
router.post('/', function(req, res) {
  
  // 1.获取用户提交的用户名和密码
  let {uname ,pwd}= req.body
  // 2.判断用户名和密码是否正确,查询    是否正确
  let  sql = 'select * from user where uname=? and pwd=?'
  db.query(sql,[uname,pwd],(err,data)=>{
    if(err) return console.log(err.message);
    console.log(data);
    // console.log('erq;',uname);

    if(data.length != 0){    //登录成功
 
      // session登录认证
      req.session.islogin = true   //登录状态
      req.session.uname = uname   //用户名



      res.render('exe.ejs',{
        title:'登录成功',
        content:'账号密码正确,即将进入首页',
        href:'/',
        hrefText:'首页',

      })

    }else{//登录失败
      res.render('exe.ejs',{
        title:'登录失败',
        content:'登录失败',
        href:'/',
      })
    }
  })
  
  console.log(uname ,pwd);
  // res.send('登录提交');
});



module.exports = router
