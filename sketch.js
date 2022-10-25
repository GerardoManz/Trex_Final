var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex, trex_running, choque;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score=0;

var gameOver, restart;



function preload(){
//CARGAR LAS IMAGENES AL JUEGO
trex_running=loadAnimation("trex1.png","trex3.png","trex4.png");
choque=loadAnimation("trex_collided.png");
groundImage=loadImage("ground2.png");
cloudImage=loadImage("cloud.png");

obstacle1=loadImage("obstacle1.png");
obstacle2=loadImage("obstacle2.png");
obstacle3=loadImage("obstacle3.png");
obstacle4=loadImage("obstacle4.png");
obstacle5=loadImage("obstacle5.png");
obstacle6=loadImage("obstacle6.png");

gameOverImage=loadImage("gameOver.png");
restartImage=loadImage("restart.png");


}

function setup() {
createCanvas(600,200); //Pixeles

//CREAR TREX
trex=createSprite(50,180,20,50); //Valor de x, valor de y, ancho y el alto
trex.addAnimation("running",trex_running);
trex.scale=0.5;

//CREAR SUELO
ground=createSprite(200,180,400,20); //Valor de x, valor de y, ancho y el alto
ground.addImage("ground",groundImage);
ground.x=ground.width/2;
ground.velocityX=-10;

//SUELO INVISIBLE
invisibleGround=createSprite(200,190,400,20); //Valor de x, valor de y, ancho y el alto
invisibleGround.visible=false;

//MENSAJE DE FIN DE JUEGO
gameOver=createSprite(width/2,150);
gameOver.addImage(gameOverImage);
gameOver.sacale=0.7;
restart=createSprite(width/2, height/2);
restart.addImage(restartImage);
restart.sacale=0.7;

gameOver.visible=false;
restart.visible=false;

cloudsGroup = new Group();
obstaclesGroup = new Group();

}

function draw() {
background(160);
text("Score: "+ score,500,30);

if(gameState===PLAY){
    score= score+Math.round(getFrameRate()/60); //MOVIMIENTO DEL SCORE
    ground.velocityX=-10;
    if(ground.x<0)
    ground.x=ground.width/2;
    
    if(keyDown("space")&& trex.y<=160) //SALTO TREX
    trex.velocityY=-10; 

    if(keyDown("up")&& trex.y<=160) //SALTO TREX
    trex.velocityY=-10;

    /*if(keyDown("down")&& trex.X<=160) //AGACHAR TREX
    trex.velocityY=-1; */

    

    trex.velocityY=trex.velocityY+0.8; //GRAVEDAD

    trex.collide(invisibleGround);
    
    spawnClouds();
    spawnObstacles();

    if (obstaclesGroup.isTouching(trex))
      gameState=END;
    }
    else if(gameState===END){
      gameOver.visible=true;
      restart.visible=true;

      ground.velocityX=0;
      trex.velocityY=0;
      
      obstaclesGroup.setVelocityXEach(0);
      cloudsGroup.setVelocityXEach(0);

      trex.changeAnimation("collided",choque);

      obstaclesGroup.setLifetimeEach(-1);// YA NO GENERE OBSTACULOS
      cloudsGroup.setLifetimeEach(-1); // YA NO GENERE NÚMEROS

      if(mousePressedOver(restart)){
        reset();
      }

    }
  drawSprites();
}

//CREACIÓN DE NUBES
function spawnClouds(){
if(frameCount % 60 === 0){
var cloud = createSprite(600,120,40,10); //Valor de x, valor de y, ancho y el alto
cloud.y= Math.round(random(80,110));
cloud.addImage("clouds", cloudImage);
cloud.scale=0.5;
cloud.velocityX=-3;

cloud.lifetime=205;

cloud.depth=trex.depth;
trex.depth=trex.depth +1;

}

}

//Creacion de obstaculos
function spawnObstacles(){
if(frameCount % 100 === 0){
  var obstacle= createSprite(600,159,10,40); //Valor de x, valor de y, ancho y el alto
  obstacle.velocityX=-6;
  obstacle.scale=0.5;

  var ran=Math.round(random(1,6));
  switch(ran){
    case 1: obstacle.addImage(obstacle1);
    break;
    case 2: obstacle.addImage(obstacle2);
    break;
    case 3: obstacle.addImage(obstacle3);
    break;
    case 4: obstacle.addImage(obstacle4);
    break;
    case 5: obstacle.addImage(obstacle5);
    break;
    case 6: obstacle.addImage(obstacle6);
    break;
    default: break;
}
obstacle.lifetime=205;

obstaclesGroup.add(obstacle);
}
}

function reset(){
  gameState= PLAY;
  
  gameOver.visible=false;
  restart.visible=false;

  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  trex.changeAnimation("running", trex_running);
  score=0;

}