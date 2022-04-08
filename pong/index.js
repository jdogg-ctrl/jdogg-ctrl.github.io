/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  // Constant Variables
  const FRAME_RATE = 60;
  const FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  const BOARD_WIDTH = $('#board').width();
  const BOARD_HEIGHT = $('#board').height();
  //variables
  var score1 = 0;
  var score2 = 0;
  // Game Item Objects
    var KEYS = {
      'up': 38,
      'down': 40,
      'w': 87,
      's': 83
    }; 
    
    function GameItem(id, positionX, positionY, speedX, speedY){
      var Item={
        id: id,
        positionX: positionX,
        positionY: positionY,
        speedX: speedX,
        speedY: speedY,
        width: $(id).width(),
        height: $(id).height()
      }
      
      return Item;
    }   
    var paddle1 = GameItem("#paddle1", 20, 200, 0, 0);
    var paddle2 = GameItem("#paddle2", BOARD_WIDTH - 40 , 250, 0, 0);
    var ball = GameItem("#ball", BOARD_WIDTH / 2, BOARD_HEIGHT / 2, (Math.random() > 0.5 ? -3: 3), (Math.random() > 0.5 ? -3: 3));
    

  // one-time setup
  let interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on("keydown", handleKeyDown);
  $(document).on("keyup", handleKeyUp);
  $("#restart").on("click", restartButton);
 
                          // change 'eventType' to the type of event you want to handle


  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */

 
  /* 
  Called in response to events.
  */

  function newFrame(){
    redrawGameItem(paddle1);
    redrawGameItem(paddle2);
    redrawGameItem(ball);
    movement(paddle1);
    movement(paddle2);
    movement(ball);
    ballBoarders();
    paddle1Borders();
    paddle2Borders();
    wallDetection();
    newScore();
    paddleHit();
    checkScore();
  };

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  function handleKeyDown(event) {
    if(event.which === KEYS.up){
      paddle2.speedY = -5;
    } 
    if(event.which === KEYS.down){
      paddle2.speedY = 5;
    }
    if(event.which === KEYS.s){
      paddle1.speedY = 5;
    }
    if(event.which === KEYS.w){
      paddle1.speedY = -5;
    }
  } 
  function handleKeyUp(event){
    if(event.which === KEYS.up){
      paddle2.speedY = 0;
    }
    if(event.which === KEYS.down){
      paddle2.speedY = 0;
    }
    if(event.which === KEYS.s){
      paddle1.speedY = 0;
    }
    if(event.which === KEYS.w){
      paddle1.speedY = 0;
    }
  }

  function restartButton(event){
    runProgram();
  } //restarts the game, after the game ends.


  /*
  Checks for wall collison and stops paddle1, paddle2, and the ball from going passed the borders.
  */ 
  
  function ballBoarders(){
    if(ball.positionY > BOARD_HEIGHT - ball.height){
      ball.speedY = -ball.speedY; // borders for the Y-AXIS
    }
    if(ball.positionY < 0){
      ball.speedY = -ball.speedY;
    }
  }
  function paddle1Borders(){
    if(paddle1.positionY > BOARD_HEIGHT - paddle1.height){
      paddle1.positionY = BOARD_HEIGHT - paddle1.height;  //borders for paddle1
    }
    if(paddle1.positionY < 0){
      paddle1.positionY = 0
    }
  } 
  function paddle2Borders(){
    if(paddle2.positionY < 0){
      paddle2.positionY = 0; 
    }
    if(paddle2.positionY > BOARD_HEIGHT - paddle2.height){
      paddle2.positionY = BOARD_HEIGHT - paddle2.height;
      paddle2.speedY = 0;
    }
  }
  
  /*Checks the wall dection of the ball, and updates the score based on what wall it hits on */
  function wallDetection(){
    if(ball.positionX > BOARD_WIDTH ){
          ball = GameItem("#ball", BOARD_WIDTH / 2, BOARD_HEIGHT / 2, (Math.random() > 0.5 ? -3: 3), (Math.random() > 0.5 ? -3: 3));
      score2++;
    }
    if(ball.positionX < 0){
           ball = GameItem("#ball", BOARD_WIDTH / 2, BOARD_HEIGHT / 2, (Math.random() > 0.5 ? -3: 3), (Math.random() > 0.5 ? -3: 3));
      score1++;
    }
  }
  function redrawGameItem(obj){
    $(obj.id).css("top", obj.positionY);
    $(obj.id).css("left", obj.positionX);
  }
  function movement(obj){
    obj.positionX += obj.speedX;
    obj.positionY += obj.speedY; 
  }

  //Updates the score
  function newScore(){
  $("#score2").text(score2);
  $("#score1").text(score1);
  }

  //Collide function
 
  function doCollide(obj1, obj2) {
  
    obj1.leftX = obj1.positionX;
    obj1.topY = obj1.positionY;
    obj1.rightX = obj1.positionX + $(obj1.id).width();
    obj1.bottomY = obj1.positionY + $(obj1.id).height();
    
    obj2.leftX = obj2.positionX;
    obj2.topY = obj2.positionY;
    obj2.rightX = obj2.positionX + $(obj2.id).width();
    obj2.bottomY = obj2.positionY + $(obj2.id).height();

	if((obj1.rightX > obj2.leftX) &&
      (obj1.leftX < obj2.rightX) && 
      (obj1.bottomY > obj2.topY)&&
      obj1.topY < obj2.bottomY){
      return true;
    } else {
      return false;
    }
		
}
  function paddleHit(){
    if(doCollide (paddle1, ball)){
      ball.speedX = -ball.speedX;
      ball.speedX += 0.29; 
    } 
    if(doCollide (paddle2, ball)){
      ball.speedX = -ball.speedX;
      ball.speedX += 0.29;
    }
    }

    function checkScore(){
      if(score1 === 10){
        endGame();
        $("#score1").text("Player 1 wins!");
        clearInterval(interval);
      } else if(score2 === 10){
        endGame();
        $("#score2").text("Player 2 wins!");
        clearInterval(interval);
      }
    } //Checks the score then ends the game
  
  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);
    // turn off event handlers
    $(document).off();
  }
  
}