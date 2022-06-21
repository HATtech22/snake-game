
document.addEventListener("DOMContentLoaded", function () {
    pTag = document.querySelector("div");
    newVal = document.createElement("p");
    newVal.innerHTML = '';
    pTag.appendChild(newVal);
  });
// Global Veriables
const board_border = 'yellow';
const board_background = "white";
const SNAKE_COLOR = 'lightblue';
const SNAKE_BORDER = 'darkblue';
let HORIZONTAL_VELOCITY = 10;
let VERTICAL_VELOCITY = 0;
let CHANGING_DIRECTION = false;
let food_x;
let food_y;

// Getting the reference to the canvas
const snakeboard = document.getElementById("snakeboard");
// Return a two dimensional drawing context
const snakeboard_ctx = snakeboard.getContext("2d");
let score = 0;
// Drawing snake 
let snake = [  {x: 400, y: 300},  {x: 390, y: 300},  {x: 380, y: 300},  {x: 370, y: 300},  {x: 360, y:300},];

document.addEventListener("keydown", change_direction);
main()
gen_food();
function main () {
    if (has_game_ended()) {
        alert("Game over")
        return
    };
    CHANGING_DIRECTION = false
    setTimeout(function onTick() {
    clearCanvas();
    drawFood();
    move_snake();
    drawSnake();
    // Call main again
    main();
  }, 100)
}

// Drawing the food 

function drawFood() {
    snakeboard_ctx.fillStyle = 'lightgreen';
    snakeboard_ctx.strokestyle = 'darkgreen';
    snakeboard_ctx.fillRect(food_x, food_y, 10, 10);
    snakeboard_ctx.strokeRect(food_x, food_y, 10, 10);
  }

  function random_food(min, max) {
    return Math.round((Math.random() * (max-min) + min) / 10) * 10;
  }
//   Generating the food
function gen_food() {
    // Generate a random number the food x-coordinate
    food_x = random_food(0, snakeboard.width - 10);
    // Generate a random number for the food y-coordinate
    food_y = random_food(0, snakeboard.height - 10);
    // if the new food location is where the snake currently is, generate a new food location
    snake.forEach(function has_snake_eaten_food(part) {
      const has_eaten = part.x == food_x && part.y == food_y;
      if (has_eaten) gen_food();
    });
  }
// draw a border around the canvas
function clearCanvas() {
    //  Select the colour to fill the drawing
    snakeboard_ctx.fillStyle = board_background;
    //  Select the colour for the border of the canvas
    snakeboard_ctx.strokestyle = board_border;
    // Draw a "filled" rectangle to cover the entire canvas
    snakeboard_ctx.fillRect(0, 0, snakeboard.width, snakeboard.height);
    // Draw a "border" around the entire canvas
    snakeboard_ctx.strokeRect(0, 0, snakeboard.width, snakeboard.height);
}
// Drawing the snake
function drawSnake() {  
    snake.forEach(drawSnakePart);
}
// Drawing the parts of snake
function drawSnakePart  (snakePart) {
    snakeboard_ctx.fillStyle = SNAKE_COLOR;  
    snakeboard_ctx.strokestyle = SNAKE_BORDER;
    snakeboard_ctx.fillRect(snakePart.x, snakePart.y, 10, 10);  
    snakeboard_ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
}
function  move_snake  (){
    // Create the new Snake's head
    const head = {x: snake[0].x + HORIZONTAL_VELOCITY, y: snake[0].y + VERTICAL_VELOCITY};
    // Add the new head to the beginning of snake body
    snake.unshift(head);
    const has_eaten_food = snake[0].x === food_x && snake[0].y === food_y;
    if (has_eaten_food) {
        score += 10;
        // Adding score to the ui
        document.getElementById('score').innerHTML = score;
    // Generate new food location
    gen_food();
    } else {
    // Remove the last part of snake body
    snake.pop();
    }
  }

// Check if any condition of game ending is met 


function  has_game_ended (){
    for (let i = 4; i < snake.length; i++) {
      if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true
    }
    const hitLeftWall = snake[0].x < 0;
    const hitRightWall = snake[0].x > snakeboard.width - 10;
    const hitToptWall = snake[0].y < 0;
    const hitBottomWall = snake[0].y > snakeboard.height - 10;
    return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall
}

// Change the direction of the snake according to the key pressed 

function change_direction(event) {
    console.log('here')
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;
    
  // Prevent the snake from reversing
    if (CHANGING_DIRECTION) return;
    CHANGING_DIRECTION = true;
    const keyPressed = event.keyCode;
    const goingUp = VERTICAL_VELOCITY === -10;
    const goingDown = VERTICAL_VELOCITY === 10;
    const goingRight = HORIZONTAL_VELOCITY === 10;
    const goingLeft = HORIZONTAL_VELOCITY === -10;
    if (keyPressed === LEFT_KEY && !goingRight) {
        HORIZONTAL_VELOCITY = -10;
        VERTICAL_VELOCITY = 0;
    }
    if (keyPressed === UP_KEY && !goingDown) {
        HORIZONTAL_VELOCITY = 0;
        VERTICAL_VELOCITY = -10;
    }
    if (keyPressed === RIGHT_KEY && !goingLeft) {
        HORIZONTAL_VELOCITY = 10;
        VERTICAL_VELOCITY = 0;
    }
    if (keyPressed === DOWN_KEY && !goingUp) {
        HORIZONTAL_VELOCITY = 0;
        VERTICAL_VELOCITY = 10;
    }
  }




