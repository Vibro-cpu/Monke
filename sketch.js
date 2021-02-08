var backImage,backgr;
var monke, player_running;
var ground,ground_img;
var score;

var END =0;
var PLAY =1;
var gameState = PLAY;

function preload(){
  rockImg = loadImage("stone.png")
  backImage=loadImage("jungle.jpg");
  bananaImage = loadImage("banana.png");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");

}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  monke = createSprite(100,340,20,50);
  monke.addAnimation("Running",player_running);
  monke.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;

  score = 0;

  foodGroup = createGroup();
  rockGroup = createGroup();
  
}

function draw() { 
  background(0);

  drawSprites();

  if(gameState===PLAY){
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }

  spawnFood();
  spawnRok();

  if(monke.isTouching(foodGroup)){
    monke.scale = monke.scale + 0.025;

    score = score + 1;

    foodGroup.destroyEach();
  }

  textSize(25);
  fill("white")
  text("score : " + score,700,30)

  if(monke.isTouching(rockGroup)){

    gameState = END;

  }
  
    if(keyDown("space") ) {
      monke.velocityY = -12;
    }
    monke.velocityY = monke.velocityY + 0.8;
  
    monke.collide(ground);

  }

  if(gameState === END){

    backgr.velocityX = 0;
    foodGroup.destroyEach();
    rockGroup.destroyEach();

    monke.visible = false;

    textSize(50);
    fill("white")
    text("GAME OVER",400,200);

  }
}

function spawnFood(){

  if(frameCount % 100 === 0){

    var banana = createSprite(600,random(120,200),40,10);

    banana.addImage(bananaImage);

    banana.scale = 0.05;

    banana.velocityX = -4;
    

    banana.lifetime = 300;

    monke.depth = banana.depth + 1;

    foodGroup.add(banana);

  }

}

function spawnRok(){

  if(frameCount % 180 === 0){

    var rock = createSprite(600,340,40,10);

    rock.addImage(rockImg);

    rock.scale = 0.15;

    rock.velocityX = -4;
    

    rock.lifetime = 300;

    monke.depth = rock.depth + 1;

    rockGroup.add(rock);

  }

}
