var express = require('express');
var app = express();
var bodyParser = require('body-parser'); // bodyparser 불러오는거 이제 express 서버한테 바디파서 쓴다고 말해야함
var mysql = require('mysql');
var cors = require('cors');
var cookieParser = require('cookie-parser');

/* 이런거 깃헙 사이트에서 예습이나 공부 많이 필요 */
var passport = require('passport'); // passport 쓰는거
var LocalStrategy = require('passport-local').Strategy; // 깃헙에서 찾아보기
var session = require('express-session');
var flash = require('connect-flash');

// router
var router = require('./router/index')

app.listen(3000, function(){
  console.log("start!!!!!!! express server on port 3000");
})

// main에다가 app.use로 바디 파서같은거 선언하면 그 아래에 app.use('/main', main)여기에도 쓸 수 있다.

app.use(express.static('public'));
app.use(bodyParser.json()); // bodyparser 쓸거임 클라이언트에서 오는 정보가 json일수 있다.

// json으로 key value로 보낼 수 있음 선언
app.use(bodyParser.urlencoded({extended:true})); // client랑 서버랑 데이터 주고 받을 때 인코딩 하는데 아스키 형태의 데이터만 주고 받을 수 있는데
// 한글같은거는 다른 문자로 치환하는데 인코딩이다. 그런거도 받아주게 하겠다.

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
app.use(passport.initialize());
app.use(flash()); // 메시지를 쉽게 전달해주는거
app.use(cors());

app.use(cookieParser());

// router 모듈화 써서 main 선언
app.use(router)








// routers
/* index.js에 넣은 부분  */
// var email = require('./router/email')
// var main = require('./router/main'); // 이렇게 라우터 로드해서 사용가능









/* Database 연동하는거 */
// var connection = mysql.createConnection(
//   {
//     host : 'localhost',
//     port : '3306',
//     user : 'root',
//     password : '1124ms',
//     database : 'minstone_test'
//   }
// )
//
// connection.connect();

/* index.js로 넣어준 부분  */
// app.use('/main', main)
// app.use('/email', email)
// app.get('/', function(req,res){
//   console.log("test");
//   res.sendFile(__dirname + "/public/main.html");//__dirname은 최상위 디렉토리에서 현재 내 디렉토리까지 알려주는 키워드
//   // 글면 메인으로 들어갔을때 저 경로의 main.html이 클라이어느에게 간다.
// });

/* /main으로 들어갔을 때 나오는 곳  */
//  라우터로 사용하기 전 routing 기능
// app.get('/main', function(req,res){
//   res.sendFile(__dirname + "/public/main.html");//__dirname은 최상위 디렉토리에서 현재 내 디렉토리까지 알려주는 키워드
//   // 글면 메인으로 들어갔을때 저 경로의 main.html이 클라이어느에게 간다.
// });

/* email.js로 들어가 있는 곳  */
// post는 email_post에대한 라우팅 처리를 또 해줘야합니다.

// app.post('/email_post', function(req, res){
//   // get : req.param('email')
//   // post는 특별하게 get처럼 안된다. body parser를 설치해야함
//   console.log(req.body.email);
//   // res.send("<h1> welcome! " + req.body.email + " </h1>" ); // ejs는 res.send가 아니고
//   res.render('email.ejs', {'email' : req.body.email}) // email.ejs에다가 email키값에 client의 value넘겨줘
// })
//
// app.post('/ajax_send_email', function(req, res){
//   var email = req.body.email;
//   var responseData = {};
//
//   var query = connection.query('select name from user where email="'+ email +'"', function(err, rows){
//     if(err) throw err;
//     if(rows[0]) {
//       responseData.result = "ok";
//       responseData.name = rows[0].name;
//     }
//     else{
//       responseData.result = "none";
//       responseData.name = "";
//     }
//     res.json(responseData)
//   })
//   // res.json(responseData);
//   // console.log(req.body.email);
//
//
//   //check validation about input value => select db
//
//   // var responseData = {'result' : 'ok', 'email' : req.body.email};
//   // res.json(responseData);
// })
