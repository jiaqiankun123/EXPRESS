var express = require('express');
var router = express.Router();
let {db} = require('../mysql/db')


let islogin = false    //默认页面未登录
// 定义一个中间件,进行session认证
let mwl = (req,res,next)=>{
  // 判断是否处于登录状态
  if(req.session.islogin){
    islogin = req.session.islogin
  }else{                                                                                                                                                                                                                                                                                                                                                               
    islogin = false
  }
  next()   
}


// 配置首页路由
router.get('/',mwl,(req,res)=>{
  console.log(islogin);

  let catas = []   //存储图书分类
  let books = []  //存储图书的详细数据


// 获取图书分类
let sql = 'select * from cataory ; select * from book LIMIT 1,20 ;'
db.query(sql,(err,data)=>{
  if(err){
    return console.log(err.message);
  }
  // 将图书分类数据拿出来
  for(let cat of data[0]){
    catas.push(cat.cataory)
  }
  // console.log(cata);  //获取到的图书分类列表

  // 获取图片信息列表
  for(let book of data[1]){
    books.push({
      id:book.id,
      bookname:book.bookname,
      author:book.author,
      tag:book.tag,
      bookimg:book.bookimg,
      cataory:book.cataory,
    })
  }
console.log(books);

  res.render('index.ejs',{
    title:'首页',
    islogin:islogin,
    uname:req.session.uname,
    catas:catas,
    books:books,
  })
})
})









  

module.exports = router;
