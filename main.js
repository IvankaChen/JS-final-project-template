var canvas = document.getElementById("game-canvas");
var ctx = canvas.getContext("2d");

var bgImg = document.createElement("img");
bgImg.src = "images/map.png";
function draw(){
  ctx.drawImage(bgImg,0,0);
}
  setInterval(draw,16);

var enemyImg1 = {
  x:96,
  y:480-32
};

var enemyImg = document.createElement("img");
enemyImg.src = "images/jason.gif";
var enemy2Img = document.createElement("img");
enemy2Img.src = "images/rukia.gif";
var enemy3Img = document.createElement("img");
enemy3Img.src = "images/daigh.gif";

function draw1(){
ctx.drawImage(enemyImg,enemyImg1.x,enemyImg1.y);
ctx.drawImage(enemy2Img,95,100);
ctx.drawImage(enemy3Img,0,0);
}
setInterval(draw1,16);

var cursor = {};
$("#game-canvas").on("mousemove", function (event){
 var cursor={
x:event.offsetX,
y:event.offsetY
}});

var button = document.createElement("img");
button.src = "images/tower-btn.png";
function buttonf(){
  ctx.drawImage(button,580,420,60,60);
   ctx.drawImage(button,cursor.x,cursor.y);
}
  setInterval(buttonf,16);                                                         
