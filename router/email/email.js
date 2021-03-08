var express = require('express');
var app = express();
var router = express.Router();
var path = require('path');
var mysql = require('mysql');

var connection = mysql.createConnection(
  {
    host : 'localhost',
    port : '3306',
    user : 'root',
    password : '1124ms',
    database : 'minstone_test'
  }
)

connection.connect();


router.post('/form', function(req, res){
  // get : req.param('email')
  // post는 특별하게 get처럼 안된다. body parser를 설치해야함
  console.log(req.body.email);
  // res.send("<h1> welcome! " + req.body.email + " </h1>" ); // ejs는 res.send가 아니고
  res.render('email.ejs', {'email' : req.body.email}) // email.ejs에다가 email키값에 client의 value넘겨줘
})

router.post('/ajax', function(req, res){
  var email = req.body.email;
  var responseData = {};

  var query = connection.query('select name from user where email="'+ email +'"', function(err, rows){
    if(err) throw err;
    if(rows[0]) {
      responseData.result = "ok";
      responseData.name = rows[0].name;
    }
    else{
      responseData.result = "none";
      responseData.name = "";
    }
    res.json(responseData)
  })
  // res.json(responseData);
  // console.log(req.body.email);


  //check validation about input value => select db

  // var responseData = {'result' : 'ok', 'email' : req.body.email};
  // res.json(responseData);
})

module.exports = router;
