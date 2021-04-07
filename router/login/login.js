var express = require('express');
var app = express();
var router = express.Router();
var path = require('path');
var requestIp = require('request-ip');

var mysql = require('mysql');

router.post('/', function(req,res){
  console.log(req);
  console.log(req.body.userId);

  let userIp = requestIp.getClientIp(req).substr(7);
  console.log("client IP : " + userIp);

  let time = Date.now();

  var myidx = connection.query("SELECT count(*) as cnt FROM rulletUser", function(err, rows){
    if(err) console.log('err');
    else{
      let index = rows[0]['cnt'] + 1;
      console.log(index);

      let sql = format("INSERT INTO rulletUser (idx, uid, ip, lptime, ready) values({0}, '{1}', '{2}', '{3}', false)", index, req.body.userId, userIp, time);
      console.log(sql);
      let query = connection.query(sql, function(err, rows)
      {
        if(err)
        {
          res.status(401).send("<script type='text/javascript'> alert('아이디 중복입니다 다른 아이디로 시도해주세요! '); window.location.replace('/'); </script> ");
          return;
        }
        else
        {
          console.log('insert success');
          res.render('inGame.ejs', {'userId' : req.body.userId});
        }
      });
    }
  });
});

function format() {
  var args = Array.prototype.slice.call (arguments, 1);
  return arguments[0].replace(/\{(\d+)\}/g, function (match, index) { return args[index]; });
}

router.get('/ajax/get', function(req,res){
  console.log('ajax called');

  query = connection.query('SELECT * FROM rulletUser ORDER BY idx ASC Limit 6', function(err, rows)
  {
    if(err) console.log('id 호출 에러 ');
    else{
      for (var i = 0; i < rows.length; i++) {
        console.log(rows[i]);
      };
      res.end(JSON.stringify(rows));
    }
  });
});

let connection = mysql.createConnection(
  {
    host : 'localhost',
    port : '3306',
    user : 'root',
    password : '1124ms',
    database : 'rullet'
  }
);

connection.connect();

module.exports = router;
