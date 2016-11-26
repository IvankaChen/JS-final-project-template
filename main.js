var canvas = document.getElementById("game-canvas");
var ctx = canvas.getContext("2d");
var FPS = 50;
var clock = 0;
var treehp=100;
var enemies = [];
ctx.front = "24px Arial";
ctx.fillStyle = "white";

function Enemy(){
  this.x = 96;
  this.y = 480-32;
  this.speedX = 0;
  this.speedY = -64;
  this.pathDes = 0;
  this.speed = 64;
  this.hp=10;
  this.move = function(){
        if( isCollided(enemyPath[this.pathDes].x, 
                       enemyPath[this.pathDes].y, 
                       this.x, this.y, 
                       this.speed/FPS, this.speed/FPS) ){
          if(this.pathDes ===enemyPath.length-1){
             this.hp=0;
             treehp -=10
          }
            else{
            this.x = enemyPath[this.pathDes].x;
            this.y = enemyPath[this.pathDes].y;            
            this.pathDes++;           
            if (enemyPath[this.pathDes].x > this.x) {
              this.speedX = 64;
              this.speedY = 0;
            } else if (enemyPath[this.pathDes].x < this.x) {
              this.speedX = -64;
              this.speedY = 0;
            } else if (enemyPath[this.pathDes].y > this.y) {
              this.speedX = 0;
              this.speedY = 64;
            } else if (enemyPath[this.pathDes].y < this.y) {
              this.speedX = 0;
              this.speedY = -64;
            }          
         else {
            this.x = this.x + this.speedX/FPS;
            this.y = this.y + this.speedY/FPS;
        }
    };
}}
var enemy = new Enemy();

//找圖片
var bgImg = document.createElement("img");
bgImg.src = "images/map.png";
var enemyImg = document.createElement("img");
enemyImg.src = "images/jason.gif";
var enemy2Img = document.createElement("img");
enemy2Img.src = "images/rukia.gif";
var enemy3Img = document.createElement("img");
enemy3Img.src = "images/daigh.gif";
var towerImg = document.createElement("img");
towerImg.src = "images/tower-btn.png";
var towerbuiltImg = document.createElement("img");
towerbuiltImg.src = "images/tower.png";
var slimeImg = document.createElement("img");
slimeImg.src = "images/slime.gif";
var crosshairImg = document.createElement("img");
crosshairImg.src = "images/crosshair.png";

//敵人路徑
var enemyPath = [
  {x:96,y:60},
  {x:382,y:60},
  {x:382,y:190},
  {x:224,y:190},
  {x:224,y:314},
  {x:542,y:314},
  {x:542,y:92}
  ];

//畫畫
function draw1(){
enemy.move();  
ctx.fillText("Hello World",100,100);
ctx.drawImage(bgImg,0,0);
ctx.drawImage(enemyImg,enemy.x,enemy.y);
ctx.drawImage(enemy2Img,95,100);
ctx.drawImage(enemy3Img,0,0);
ctx.drawImage(towerImg,580,420,60,60);  
  if((clock % 80==0)){
  var newEnemy = new Enemy();
  enemies.push(newEnemy);
}
  if(isBuilding){
  ctx.drawImage(towerbuiltImg,cursor.x,cursor.y);
  } 
ctx.drawImage(towerbuiltImg,tower.x,tower.y);  
  for(var i=0 ; i < enemies.length ; i++){
    if (enemies[i].hp<=0) {
           enemies.splice(i,1);
      }      
    enemies[i].move();
    ctx.drawImage(slimeImg,enemies[i].x,enemies[i].y);
  }
  clock++;
}
tower.searchEnemy();
if (tower.aimingEnemyId!=null){
  var Id =  tower.aimingEnemyId;
  ctx.drawImage(crosshairImg,enemies[id].x,enemies[id].y);
}

//找游標
var cursor = {};
$("#game-canvas").on("mousemove", function (event){
 cursor = {
x:event.offsetX,
y:event.offsetY
}});

//製造城堡
var isBuilding = false;
var tower = {
  fireRate:1,
  readyToShootTime:1,
  damage:5,
  range:96,
  aimingEnemyId:null,
  searchEnemy:function(){
    this.readyToShootTime-=1/FPS
    for (var i=0 ; i<enemies.length ; i++){
        var distance = Math.sqrt(
            Math.pow(this.x-enemies[i].x,2)+Math.pow(this.y-enemies[i].y,2)          
        );
      if (distance<=this.range){
        this.aimingEnemyId=i;
        if(this.readyToShootTime<=0){
          this.shoot();
          this.readyToShootTime = this.fireRate;
        }
        return;
      }
    }
    this.aimingEnemyId=null;
    this.shoot=function(id){
         ctx.beginPath(); 
         ctx.moveTo(this.x, this.y); 
         ctx.lineTo(enemies[id].x, enemies[id].y);
         ctx.strokeStyle = 'red';
         ctx.lineWidth = 3;
         ctx.stroke();
         enemies[id].hp = enemies[id].hp - this.damage;
           };
}
var cursor = {};
$( "#game-canvas" ).on( "click", function(){
  if(isCollided(cursor.x, cursor.y, 580, 420, 60, 60)){
    if(isBuilding){
    isBuilding= false;
  }
    else{
    isBuilding = true;
  }
  }
  else if(isBuilding){
  tower.x = cursor.x - cursor.x%32;
  tower.y = cursor.y - cursor.y%32;
  isBuilding = false;
  }
});

//判斷之間
function isCollided(pointX, pointY, targetX, targetY, targetWidth, targetHeight) {
    if(     pointX >= targetX
        &&  pointX <= targetX + targetWidth
        &&  pointY >= targetY
        &&  pointY <= targetY + targetHeight
    ){
        return true;
    } else {
        return false;
    }
}

setInterval(draw1,1000/FPS);
