var p5Inst = new p5(null, 'sketch');

window.preload = function () {
  initMobileControls(p5Inst);

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = {"orderedKeys":[],"propsByKey":{}};
  var orderedKeys = animationListJSON.orderedKeys;
  var allAnimationsSingleFrame = false;
  orderedKeys.forEach(function (key) {
    var props = animationListJSON.propsByKey[key];
    var frameCount = allAnimationsSingleFrame ? 1 : props.frameCount;
    var image = loadImage(props.rootRelativePath, function () {
      var spriteSheet = loadSpriteSheet(
          image,
          props.frameSize.x,
          props.frameSize.y,
          frameCount
      );
      p5Inst._predefinedSpriteAnimations[props.name] = loadAnimation(spriteSheet);
      p5Inst._predefinedSpriteAnimations[props.name].looping = props.looping;
      p5Inst._predefinedSpriteAnimations[props.name].frameDelay = props.frameDelay;
    });
  });

  function wrappedExportedCode(stage) {
    if (stage === 'preload') {
      if (setup !== window.setup) {
        window.setup = setup;
      } else {
        return;
      }
    }
// -----

var playerMallet;

var goal1=createSprite(200,18,100,20);
goal1.shapeColor=("yellow");

var goal2=createSprite(200,382,100,20);
goal2.shapeColor=("yellow");

var computerScore = 0;
var playerScore = 0;
var gameState = "serve";




// making court
var boundary1 = createSprite(200,0,400,10);
boundary1.shapeColor = "white";
var boundary2 = createSprite(200,400,400,10);
boundary2.shapeColor = "white";
var boundary3 = createSprite(0,200,10,400);
boundary3.shapeColor = "white";
var boundary4 = createSprite(400,200,10,400);
boundary4.shapeColor = "white";



// creating objects and giving them colours
var striker = createSprite(200,200,10,10);
striker.shapeColor = "white";

var playerMallet = createSprite(200,50,50,10);
playerMallet.shapeColor = "black";

var computerMallet = createSprite(200,350,50,10);
computerMallet.shapeColor = "black";



function draw() {
  //clear the screen
  background("green");
  textSize(18);
  
  fill("maroon");
  text(computerScore, 25, 225);
  text(playerScore, 25, 185);
 
  if (striker.isTouching(goal1)) {
    computerScore=computerScore+1;
  }
  
  if (striker.isTouching(goal2)) {
   playerScore=playerScore+1; 
  }
 
  
  

  
  //draw line at the centre
   for (var i = 0; i < 400; i=i+20) {
    line(i,200,i+10,200);
  }
  
  //create edge boundaries
  //make the striker bounce with the top and the bottom edges
  createEdgeSprites();
  
  striker.bounceOff(edges);
  striker.bounceOff(playerMallet);
  striker.bounceOff(computerMallet);
  
  playerMallet.bounceOff(edges);
  computerMallet.bounceOff(edges);
  
  if (gameState=="serve") {
    text("press space to start", 140, 200);
    if (keyDown("space")) {
      serve();
     gameState="play";
 }
  }

  if (gameState=="play") {
  computerMallet.x = striker.x;
 playerMallet.x = World.mouseX;
  if (striker.isTouching(goal1) || striker.isTouching(goal2)
  || "computerScore"==20 || "playerScore"==20) {
   gameState=="end" ;
  }
    }
    
  if (gameState=="end") {
    striker.velocityX=0;
    striker.velocityY=0;
    text("game over", 150, 200);
    if (computerScore==20 || playerScore==20) {
      text("you won", 150, 150);
    } else {
      text("you lost", 150, 150);
    }
    
  }
  drawSprites();
  }



function serve() {
  
  striker.velocityX = 7;
  striker.velocityY = 6;
  
 
}

// -----
    try { window.draw = draw; } catch (e) {}
    switch (stage) {
      case 'preload':
        if (preload !== window.preload) { preload(); }
        break;
      case 'setup':
        if (setup !== window.setup) { setup(); }
        break;
    }
  }
  window.wrappedExportedCode = wrappedExportedCode;
  wrappedExportedCode('preload');
};

window.setup = function () {
  window.wrappedExportedCode('setup');
};
