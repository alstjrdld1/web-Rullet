function GetConnection(){

    var mysql = require('mysql');
    console.log('require success');

    var conn = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '1124ms',
      database: 'rullet'
    });
    console.log('conn success');

    conn.connect(function(err){
      if(err) throw err;
      console.log("Connected!");
    });
  return conn;
}

function login(){
  var user_id = document.getElementById('userId');
  

  if(user_id){
    alert(user_id.value);
  }
}
