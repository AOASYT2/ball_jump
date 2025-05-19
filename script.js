let player = document.getElementById('player');
let obstacle = document.getElementById('obstacle');
let ground = document.getElementById('ground');
let scoreDisplay = document.getElementById('score');
let gameOverDisplay = document.getElementById('game-over');
let finalScoreDisplay = document.getElementById('final-score');
let restartButton = document.getElementById('restart-button');

let isJumping = false;
let score = 0;
let gameSpeed = 5;
let obstaclePosition = 800;
let gameInterval;

function jump() {
    if (!isJumping) {
        isJumping = true;
        let jumpHeight = 0;
        let jumpInterval = setInterval(() => {
            if (jumpHeight >= 100) {
                clearInterval(jumpInterval);
                let fallInterval = setInterval(() => {
                    if (jumpHeight <= 0) {
                        clearInterval(fallInterval);
                        isJumping = false;
                    } else {
                        jumpHeight -= 5;
                        player.style.bottom = (50 + jumpHeight) + 'px';
                    }
                }, 20);
            } else {
                jumpHeight += 5;
                player.style.bottom = (50 + jumpHeight) + 'px';
            }
        }, 20);
    }
}

function moveObstacle() {
    obstaclePosition -= gameSpeed;
    obstacle.style.right = (800 - obstaclePosition) + 'px';

    if (obstaclePosition < 0) {
        obstaclePosition = 800;
        score++;
        scoreDisplay.textContent = 'Pontuação: ' + score;
        if (score % 5 === 0) {
            gameSpeed += 1;
        }
    }

    let playerRect = player.getBoundingClientRect();
    let obstacleRect = obstacle.getBoundingClientRect();

    if (
        playerRect.right > obstacleRect.left &&
        playerRect.left < obstacleRect.right &&
        playerRect.bottom > obstacleRect.top
    ) {
        clearInterval(gameInterval);
        gameOverDisplay.classList.remove('hidden');
        finalScoreDisplay.textContent = 'Sua pontuação: ' + score;
    }
}

function startGame() {
    score = 0;
    gameSpeed = 5;
    obstaclePosition = 800;
    scoreDisplay.textContent = 'Pontuação: 0';
    gameOverDisplay.classList.add('hidden');
    obstacle.style.right = '0px';
    gameInterval = setInterval(moveObstacle, 20);
}

document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        jump();
    }
});

restartButton.addEventListener('click', startGame);

startGame();