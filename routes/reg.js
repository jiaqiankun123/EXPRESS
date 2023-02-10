const e = require('express')
const express = require('express')
const router = express.Router()
let {db} = require('../mysql/db')

// 注册页面
router.get('/',(req,res)=>{
    // res.send('注册页面')
    res.render('reg.ejs',{

    })
})

// 注册提交
router.post('/',(req,res)=>{
   
    // 1.获取注册信息
  let {uname,pwd,email} = req.body
//   console.log(uname,email,pwd);
//   if(uname.trim()===''|| pwd.trim()===''||email.trim()===''){
//     console.log('无内容');
//   }else{  }

//   2.插入到user数据库
let sql = 'insert into user  (uname,pwd,email) values (?,?,?) '
db.query(sql,[uname,pwd,email],(err,data)=>{
  // 注册失败
  if(err){ 
      // 注册失败
      console.log(err.message);
      res.render('exe.ejs',{
          title:'注册失败',
          content:'即将重新注册',
          href:'/reg',
          hrefText:'注册'
  
      })
      
  }
  // 注册成功
  res.render('exe.ejs',{
      title:'注册成功',
      content:'即将进入登录页面',
      href:'/login',
      hrefText:'登录'

  })
})




})

module.exports = router