function colorChange(){
  var buttonValue = document.getElementById("loginButton");

  if(buttonValue.value == "PRESS READY!"){
    document.getElementById("loginButton").value = "Ready!";
    document.getElementById("loginButton").style.background = '#4CAF50';
  }
  else if(buttonValue.value == "Ready!"){
    document.getElementById("loginButton").value = "PRESS READY!";
    document.getElementById("loginButton").style.background = '#76b852';

  }
}
