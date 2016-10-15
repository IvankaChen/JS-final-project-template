
var canvas = document.getElementById("game-canvas");
var ctx = canvas.getContext("2d");

var bgImg = document.createElement("img");
bgImg.src = "images/map.png";

function draw(){
  ctx.drawImage(bgImg,0,0);
}
  setInterval(draw,16);

var enemyImg = document.createElement("img");
enemyImg.src = "images/jason.gif";

function person1(){
  ctx.drawImage(enemyImg,0,0);
}

  setInterval(person1,16);
