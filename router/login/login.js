var express = require('express');
var app = express();
var router = express.Router();
var path = require('path');

router.post('/', function(req,res){
  console.log(req);
  console.log(req.body.userId);
  res.render('inGame.ejs', {'userId' : req.body.userId});
})

module.exports = router;
