var express = require('express');
var app = express();
var router = express.Router();
var path = require('path');

var email = require('./email/email')
var main = require('./main/main');
var join = require('./join/index')

router.get('/', function(req,res){
  console.log('indexjs/path loaded')
  res.sendFile(path.join(__dirname, "../public/main.html"));//__dirname은 최상위 디렉토리에서 현재 내 디렉토리까지 알려주는 키워드
  // 글면 메인으로 들어갔을때 저 경로의 main.html이 클라이어느에게 간다.
});

router.use('/main', main)
router.use('/email', email)
router.use('/join', join)

module.exports = router;
