var express = require('express');
var app = express();
var bodyParser = require('body-parser'); // bodyparser 불러오는거 이제 express 서버한테 바디파서 쓴다고 말해야함
var mysql = require('mysql');
var cors = require('cors');
var cookieParser = require('cookie-parser');
var requestIp = require('request-ip');

/* 이런거 깃헙 사이트에서 예습이나 공부 많이 필요 */
var passport = require('passport'); // passport 쓰는거
var LocalStrategy = require('passport-local').Strategy; // 깃헙에서 찾아보기
var session = require('express-session');
var flash = require('connect-flash');

var router = require('./router/index');

app.listen(3000, function(){
  console.log('rulletGame start on 3000');
})

app.use(express.static('public'));
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended:true})); // client랑 서버랑 데이터 주고 받을 때 인코딩 하는데 아스키 형태의 데이터만 주고 받을 수 있는데

app.set('view engine', 'ejs'); //view engine ejs로 쓸거야 벅벅

// express session readme예제 있음
app.use(session({
    secret: 'secret code',
    resave: false, // 기본값으로 해야함 세션에 대한 세밀한 컨트롤이 필요할 때 쓰는거
    saveUninitialized: true, // 기본값으로 해야함 세션에 값이 없어도 그냥 공백으로 둘것인가
    session: true,
    coockie:{
      httpOnly: true,
      secure: true,
      maxAge: 30
    }
}));

app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

app.use(flash()); // 메시지를 쉽게 전달해주는거
app.use(cors());


// router 모듈화 써서 main 선언
app.use(router)
