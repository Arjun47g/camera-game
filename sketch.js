var trex;
var ground;
var cactus,cactusGroup;
var bird,birdGroup;
var restart,resartimg;
var PlAY = 1 , END = 0;
var gameState = 1;
var score = 0;
var r = 100;

function preload () {
  
  trex_running = loadAnimation("trex1.jpg.png","trex2.jpg.png","trex3.jpg.png","trex4.jpg.png","trex5.jpg.png","trex6.jpg.png","trex7.jpg.png","trex8.jpg.png","trex9.jpg.png","trex10.jpg.png","trex11.jpg.png","trex12.jpg.png");
  
  trex_jump = loadImage("trex1.jpg.png");
  
  
  cactus1 = loadImage("cactus1.png");
  cactus2 = loadImage("cactus2.jpg.png");
  cactus3 = loadImage("cactus3.jpg.png");
  
  birdimg = loadImage("bird.png");
  
  cloudimg = loadImage("cloud.png");
  
  
  checkpoint = loadSound("checkpoint.mp3");
  
  
        //"checkpoint2.mp3"
}




function setup() {
  createCanvas(400, 400);
  
  ground = createSprite(200,360,400,5);
  ground.shapeColor = "green";
  
  ground2 = createSprite(200,385,400,45);
  ground2.shapeColor = "brown";
  
  trex = createSprite(75,320,40,40);
  trex.addAnimation("running",trex_running);
  trex.scale = 0.4;
  trex.velocityY = 0;
  
  cactusGroup = new Group ();
  birdGroup = new Group();
}

function draw() {
  background(85,203,253);
  
  
   drawSprites();
  
  trex.collide(ground);
  
  if(gameState === 1) {
    
  
  trex.velocityY += 1;
    
  cactusspawn ();
  
  if (cactusGroup.isTouching(trex) || birdGroup.isTouching(trex)) {
    cactusGroup.setVelocityXEach(0);
    gameState = 0;
    
   }
    
    score = Math.round(frameCount/3);
    
    
    
    fill("black");
    textSize(15);
    text("Score : " + score, 300,50);
    
    if(score % 100 === 0 && score > 0){
       checkpoint.play();
    }
    
    if(score > 500) {
       birds();     
    }
    
    clouds();
    
     
    if(keyWentDown("up")  && trex.y > 320){
     trex.velocityY =  -17;
      
    } 
    
    if (keyDown("down")) {
       trex.y = 340; 
    }
            
  }   
    
  
  
 
  else if (gameState === 0) {
           
     cover = createSprite(200,200,400,400);
     cover.shapeColor = "black";
    
    
     fill("white");
     textSize(30);
     text("Your Score is : " + score,70,200);
             
  }   
  camera.position.y  = trex.y                   
}

function cactusspawn () {
  
  
    
  if (frameCount % 100 === 0) {
      
    cactus = createSprite(400,340,20,30);   
    cactus.velocityX = -(4 + 4*score/100);
    cactus.lifetime = 100;
    cactusGroup.add(cactus);
    cactus.scale = 0.2;
    
    
    
    var r = Math.round(random(1,3));
    
    if(r === 1){
      cactus.addImage(cactus1);
    }       
    else if(r === 2){
      cactus.addImage(cactus2);
    }
    else if(r === 3){
      cactus.addImage(cactus3);
    } 
   }
  }

function birds () {
  
  if(frameCount % 180 === 0) {
     
    bird = createSprite(400,270,20,20);
    bird.addImage(birdimg);
    bird.velocityX = -4;
    bird.lifetime = 100; 
    birdGroup.add(bird);
    bird.scale = 0.25;
    
  }  
  
  
}

function clouds () {
  
  if (frameCount % 50 === 0) {
    
    f = Math.round(random(50,150));
    
     cloud = createSprite(400,f,40,40);
     cloud.velocityX = -2;
     cloud.scale = 0.4;
     cloud.addImage(cloudimg);
     cloud.lifeTime = 220;
     
  }
  
  
  
}

  
  

   
  
  


