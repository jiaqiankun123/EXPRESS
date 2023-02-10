let express = require('express')
let router = express.Router()





// 退出路由
router.get('/',(req,res)=>{

    // 清空session
    req.session.destroy()

    res.redirect('/')   //重定向到首页
})



module.exports = router