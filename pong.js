// Define constants
const SCREEN_WIDTH = 600;
const SCREEN_HEIGHT = 400;
const PADDLE_WIDTH = 10;
const PADDLE_HEIGHT = 80;
const PADDLE_SPEED = 6;
let BALL_SPEED = 7;
const BALL_RADIUS = 5;

// Define variables
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var player1_score = 0;
var player2_score = 0;

var player1_paddle = {
    x: 10,
    y: SCREEN_HEIGHT/2 - PADDLE_HEIGHT/2,
    width: PADDLE_WIDTH,
    height: PADDLE_HEIGHT,
    speed: 0
};

var player2_paddle = {
    x: SCREEN_WIDTH - 20,
    y: SCREEN_HEIGHT/2 - PADDLE_HEIGHT/2,
    width: PADDLE_WIDTH,
    height: PADDLE_HEIGHT,
    speed: PADDLE_SPEED
};

var ball = {
    x: SCREEN_WIDTH/2,
    y: SCREEN_HEIGHT/2,
    speed_x: BALL_SPEED * (Math.random() < 0.5 ? 1 : -1),
    speed_y: BALL_SPEED * (Math.random() < 0.5 ? 1 : -1),
    radius: BALL_RADIUS
};

var hit_audio = new Audio("pong_sound.mp3");
var loose_audio = new Audio("loose.mp3");
var win_audio = new Audio("win.mp3");
var score_audio = new Audio("score.mp3")


// Add event listener for arrow key presses
document.addEventListener("keydown", function(event) {
    if (event.keyCode == 38) {  // Up arrow key
        player1_paddle.speed = -PADDLE_SPEED;
    } else if (event.keyCode == 40) {  // Down arrow key
        player1_paddle.speed = PADDLE_SPEED;
    }
});

// Add event listener for arrow key releases
document.addEventListener("keyup", function(event) {
    if (event.keyCode == 38 || event.keyCode == 40) {
        player1_paddle.speed = 0;
    }
});

// Create a function to draw the elements on the canvas
function drawElements() {
    // Clear the canvas
    ctx.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

    // Draw the paddles
    ctx.strokeStyle = "white";
    ctx.roundRect(player1_paddle.x, player1_paddle.y, player1_paddle.width, player1_paddle.height, 10);
    ctx.roundRect(player2_paddle.x, player2_paddle.y, player2_paddle.width, player2_paddle.height, 10);
    ctx.stroke();
    ctx.fillStyle = "white";
    ctx.fill();


    // Draw the ball
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2);

    // Draw the scores
    ctx.font = "bold 15px IBM";
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText("You: " + player1_score, 10, 30);
    ctx.fillText("Computer: " + player2_score, SCREEN_WIDTH - 120, 30);
}

// Create a function to move the paddles
function movePaddles() {
    // Move player 1 paddle
    player1_paddle.y += player1_paddle.speed;
if (player1_paddle.y < 0) {
    player1_paddle.y = 0;
} else if (player1_paddle.y + player1_paddle.height > SCREEN_HEIGHT) {
    player1_paddle.y = SCREEN_HEIGHT - player1_paddle.height;
}

// Move player 2 paddle (AI)
if (ball.y < player2_paddle.y + player2_paddle.height/2) {
    player2_paddle.y -= player2_paddle.speed;
} else {
    player2_paddle.y += player2_paddle.speed;
}
if (player2_paddle.y < 0) {
    player2_paddle.y = 0;
} else if (player2_paddle.y + player2_paddle.height > SCREEN_HEIGHT) {
    player2_paddle.y = SCREEN_HEIGHT - player2_paddle.height;
}
}

// Create a function to move the ball
function moveBall() {
// Update ball position
ball.x += ball.speed_x;
ball.y += ball.speed_y;

// Check for collision with player 1 paddle
if (ball.x - ball.radius < player1_paddle.x + player1_paddle.width &&
    ball.y + ball.radius >= player1_paddle.y &&
    ball.y - ball.radius <= player1_paddle.y + player1_paddle.height) {
    ball.speed_x = BALL_SPEED;
    hit_audio.play();
}

// Check for collision with player 2 paddle
if (ball.x + ball.radius > player2_paddle.x &&
    ball.y + ball.radius >= player2_paddle.y &&
    ball.y - ball.radius <= player2_paddle.y + player2_paddle.height) {
    ball.speed_x = -BALL_SPEED;
    hit_audio.play();
}

// Check for collision with top/bottom walls
if (ball.y - ball.radius < 0 || ball.y + ball.radius > SCREEN_HEIGHT) {
    ball.speed_y = -ball.speed_y;
    hit_audio.play()
}

// Check for scoring
if (ball.x - ball.radius < 0) {
    player2_score++;
    if (player2_score == 3) {
        loose_audio.play();
        setTimeout(() => {
          alert("YOU LOOSE");
          document.location.reload();
        }, 500);
    } else {
        ball.x = SCREEN_WIDTH/2;
        ball.y = SCREEN_HEIGHT/2;
        ball.speed_x = BALL_SPEED;
        ball.speed_y = BALL_SPEED * (Math.random() < 0.5 ? 1 : -1);
        score_audio.play();

    }
} else if (ball.x + ball.radius > SCREEN_WIDTH) {
    player1_score++;
    if (player1_score == 3) {
        win_audio.play();
        setTimeout(() => {
          alert("YOU WIN");
          document.location.reload();
        }, 500);
    } else {
        ball.x = SCREEN_WIDTH/2;
        ball.y = SCREEN_HEIGHT/2;
        ball.speed_x = -BALL_SPEED;
        ball.speed_y = BALL_SPEED * (Math.random() < 0.5 ? 1 : -1);
        score_audio.play();
    }
}
}

// Create a function to run the game loop
function gameLoop() {
drawElements();
movePaddles();
moveBall();
setTimeout(gameLoop, 20);
}

// Start the game loop
let gameStarted = false;

if (gameStarted === false) {
ctx.font = "30px Courier";
ctx.fillStyle = "#ffffff";
ctx.fillText("Press space to start", SCREEN_WIDTH/2 - 200, SCREEN_HEIGHT/3);
ctx.font = "20px Courier";
ctx.fillStyle = "#ffffff";
ctx.fillText("Use the up/down arrow keys to navigate", SCREEN_WIDTH/2 - 250, SCREEN_HEIGHT/2);
} else {
gameLoop();
}

document.addEventListener("keydown", function(event) {
if (event.key === " ") {
gameStarted == !gameStarted
gameLoop();
}
});
