var express = require('express')
var app = express()
var router = express.Router(); // router라는 함수가 있음
var path = require('path'); // path라는 모듈 써서 상대경로를 알아낼 수 있음

/* 이런거 깃헙 사이트에서 예습이나 공부 많이 필요 */
var passport = require('passport'); // passport 쓰는거
var LocalStrategy = require('passport-local').Strategy; // 깃헙에서 찾아보기
var session = require('express-session');
var flash = require('connect-flash');

router.get('/', function(req,res){
  console.log('main js loaded', req.user)
  console.log(req.session);
  //res.sendFile(path.join(__dirname, "../../public/main.html")); // 현재경로에서 하나 위로 올라가서 public main.html열어주셈!
  // 글면 메인으로 들어갔을때 저 경로의 main.html이  클라이어느에게 간다.

  res.render('main.ejs', {'id' : req.session.user})
});
// node에서는 외부 라이브러리를 가져다 export할 수 있고 require로 가져오기 가능
module.exports = router; // 이렇게 export되어서 다른 곳에서 쓸 수 있음
