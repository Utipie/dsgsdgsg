var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  spookySound.loop();                  
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  ghost = createSprite(200,200,10,10)
  ghost.addImage(ghostImg)
  ghost.scale = 0.3
}

function draw() {
  background("black");
  if(gameState === "play"){
    if(keyDown(RIGHT_ARROW)){
      ghost.x = ghost.x + 4
    }
    if(ghost.isTouching(invisibleBlockGroup)||ghost.y > 600){
      gameState = "end"
    }
    if(ghost.isTouching(climbersGroup)){
      ghost.velocityY = 0
    }
    if(keyDown(LEFT_ARROW)){
      ghost.x = ghost.x + -4
    }
    if(keyDown("space")){
      ghost.velocityY = -4
    }
    ghost.velocityY = ghost.velocityY + 0.5
    if(tower.y > 400){
      tower.y = 300
    }
    spawnDoors();
    drawSprites();
  }
  else if(gameState === "end"){
    textSize(24)
    fill("light_blue")
    text("Game Over", 230,300)
  }
}
function spawnDoors(){
  if(frameCount %250 === 0){
    door = createSprite(200,-50,10,10)
    door.addImage(doorImg)
    door.x = Math.round(random(120,400))
    door.velocityY = 1
    climber = createSprite(200,10,10,10)
    climber.addImage(climberImg)
    climber.x = door.x
    climber.velocityY = 1
    invisibleBlock = createSprite(200,15,10,10)
    invisibleBlock.x = door.x
    invisibleBlock.velocityY = 1
    invisibleBlock.width = climber.width
    invisibleBlock.height = 5
    ghost.depth = door.depth +1
doorsGroup.add(door)
climbersGroup.add(climber)
invisibleBlockGroup.add(invisibleBlock)
  }
}