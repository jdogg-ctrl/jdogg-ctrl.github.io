/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  const FRAME_RATE = 10;
  const FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  const BOARD_WIDTH = $('#board').width();
  const BOARD_HEIGHT = $('#board').height();
  // Game Item Objects
  var key_code = {
    "left": 37,
    "up": 38,
    "right": 39,
    "down": 40
  }

  function GameItem(id, speedX, speedY, positionX, positionY){
    var Item = {
      id: id,
      speedX: speedX,
      speedY: speedY,
      positionX: positionX,
      positionY: positionY,
      width: $(id).width(),
      height: $(id).height()
    }
      return Item;
  }

  //variables
  var snakeHead = GameItem("#snakeHead", 0, 0, 0, 0);
  var apple = GameItem("#apple", 0, 0, Math.floor(Math.random() * 20) * 20
  , Math.floor(Math.random() * 20) * 20);

  var snakeBody = [snakeHead];

  var score = 0;

  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);   
                   // change 'eventType' to the type of event you want to handle

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    moveBody();
    repositionGameItem(snakeHead);
    moveAndScoreApple();
    redrawGameItem(apple);
    repositionGameItem(apple);
    wallBorders(snakeHead);
    updateScore();
  }
  

  /* 
  Called in response to events.
  */
  function handleKeyDown(event){
    if(event.which === key_code.up){
      snakeHead.speedY  = -20;
      snakeHead.speedX = 0;
    }  
    if(event.which === key_code.down){
      snakeHead.speedY = 20;
      snakeHead.speedX = 0;
    }
    if(event.which === key_code.right){
      snakeHead.speedX  = 20;
      snakeHead.speedY = 0;
    } 
    if(event.which === key_code.left){
      snakeHead.speedX = -20;
      snakeHead.speedY = 0;
    }
  }

  function moveAndScoreApple(){
    if(snakeHead.positionX ===  apple.positionX && snakeHead.positionY === apple.positionY){
      apple.positionX = Math.floor(Math.random() * 20) * 20;
      score++;
      growBody();
    }
  }

  function updateScore(){
    $("#score").text(score);
  }
  

  



  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  function repositionGameItem(obj){
    obj.positionX += obj.speedX;
    obj.positionY += obj.speedY;
    redrawGameItem(snakeHead);
  }
  function redrawGameItem(obj){
    $(obj.id).css("top", obj.positionY);
    $(obj.id).css("left", obj.positionX);
  }

  function wallBorders(obj){
    if(obj.positionY >= BOARD_WIDTH - 10){
      $("#snakeHead").css("width", 0);
      $("#snakeHead").css("height", 0);
      endGame();
      clearInterval(interval);
      alert("You lost! score: " + score);
    }
    if(obj.positionX <= -10){
      $("#snakeHead").css("width", 0);
      $("#snakeHead").css("height", 0);
      endGame();
      clearInterval(interval);
      alert("You lost! score: " + score);
    }
    if(obj.positionY <= -10){
      $("#snakeHead").css("width", 0);
      $("#snakeHead").css("height", 0);
      endGame();
      clearInterval(interval);
      alert("You lost! score: " + score);
    }
    if(obj.positionX >= BOARD_HEIGHT - 10){
      $("#snakeHead").css("width", 0);
      $("#snakeHead").css("height", 0);
      endGame();
      clearInterval(interval);
      alert("You lost! score: " + score);
    }
  }

  function growBody(){
    var bodyid = "snake" + snakeBody.length;
    $("<div>").addClass("snake").attr("id", bodyid).appendTo("#board");
    var tail = snakeBody[snakeBody.length - 1];
    var newBody = GameItem("#"+bodyid, 0, 0, tail.positionX, tail.positionY);
    redrawGameItem(newBody);
    snakeBody.push(newBody);

  }

  function moveBody(){
    for(var i = snakeBody.length - 1; i >= 1; i--){
      snakeBody[i].positionX  = snakeBody[i - 1].positionX;
      snakeBody[i].positionY  = snakeBody[i -1].positionY;
      redrawGameItem(snakeBody[i]);
    }
  }
  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
