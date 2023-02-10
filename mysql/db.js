const mysql = require('mysql')
const db = mysql.createPool({
    host:'127.0.0.1',
    user:'root',
    password:'admin123',
    database:'sobook',
    multipleStatements:true,
})

module.exports = {
    db,
    sqlQuery:function(){
        db.query('select 1',(err,res)=>{
            if(err) return console.log(err.message);
            console.log('success');
        })
    }
}