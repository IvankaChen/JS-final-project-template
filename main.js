
var canvas = document.getElementByld("game-canvas");
var ctx = canvas.getContext("2d");

var bgImg = document.createElement("img");
bgImg.src = "images/map.png";

function draw(){
  ctx.drawImage(bgImg,0,0);
}


  setInterval(draw,16);
