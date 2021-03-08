var express = require('express')
var app = express()
var router = express.Router()
var path = require('path');

var bodyParser = require('body-parser'); // bodyparser 불러오는거 이제 express 서버한테 바디파서 쓴다고 말해야함
var mysql = require('mysql');

/* 이런거 깃헙 사이트에서 예습이나 공부 많이 필요 */
var passport = require('passport'); // passport 쓰는거
var LocalStrategy = require('passport-local').Strategy; // 깃헙에서 찾아보기
var session = require('express-session');
var flash = require('connect-flash');

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
//passport routing 처리
router.post('/', passport.authenticate('local-join', { // 원래는 요 부분도 콜백으로 해야하는데 이렇게 하면 콜백함수 동작하는거처럼 해준다.
  //authenticate가 내부에 이 세개를 알아서 비동기 해줄지도..?
  successRedirect: 'main',
  failureRedirect: 'join',
  failureFlash: true
}));

// passport에 대한 정의를 해줄 필요가 있다.
router.get('/', function(req, res){
  var msg;
  var errMsg = req.flash('error') // error메세지를 받으려면 이렇게 해야함
  if(errMsg) msg = errMsg;
  console.log('get join url');
  res.render('join.ejs', {'message' : msg});
})

passport.serializeUser(function(user, done){ //콜백에서 던으로 폴스 안주고 개체를 주면, 그 개체를 바당서 쓰는거
  console.log('passport session save : ', user.id);
  console.log(user);
  done(null, user);
})

passport.deserializeUser(function(id, done){// seesion 에서 id값을 뽑아서 처리 해주는 곳
  console.log('passport session get id data: ');
  //여기서 db의 값을 찾아서 사이트에 띄워주기 가능
  done(null, id); //세션의 값을 뽑아서 전달해주는 역할
})

// 아래 코드를 strategy를 불러서 사용하는 방식
passport.use('local-join', new LocalStrategy // 요청이 들어왔을 때 호출되는 콜백함수 done을 써서 비동기 동작이 멈춘다. 비동기 테스트
(
  {
    usernameField: 'email',
    passwordField: 'password',
    session: true,
    passReqToCallback : true
  },

  function(req, email, password, done)
  {
    var query = connection.query('SELECT * FROM user WHERE EMAIL = ?', [email], function(err, rows)
    {
      if(err) return done(err);
      if(rows.length)
      {
        console.log('existed user');
        return done(null, false, {message : 'your email is already used'}) // false남기면 아래 post에 failureRedirect로 가준다.
      }
      else
      {
        var sql = {email: email, name: 'hi', pw: password};
        var query = connection.query('INSERT INTO user SET ?', sql, function(err, rows)
        {
          if(err) throw err;
          var myId = rows.insertId;
          console.log(myId);

          return done(null, {'email' : email, 'id' : rows.insertId}); // serialize에러가 발생을 했다. 세션을 처리해주는 부분이 필요했다. done을 할 경우 serialize 메소드를 불러서 실행할 부분을 찾는거다.
          // done이 fail이 아닌경우 serialize에 등록된 방법, 콜백함수대로 처리하게 되어있음 그래서 선언 필요
        })
      }
    })
  }
));

// form 부분 주석으로 처리
// // join html보면 또 action이 join이야 그거는 get 과 postrk ekfmsep,
// // post 는 이렇게 한다.
// router.post('/', function(req,res){
//   var body = req.body;
//   var email = body.email;
//   var name = body.name;
//   var passwd = body.password;
//
//   var sql = {email : email, name : name, pw : passwd};
//
//   var query = connection.query("INSERT INTO user set ?", sql,
//       function(err,rows){
//           if(err) {throw err;}
//           console.log("ok db insert : ", rows.insertId, name);
//           res.render('welcome.ejs', {'name' : name, 'id' : rows.insertId});
//       })
// })

module.exports = router;
