const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const paddleWidth = 100;
const paddleHeight = 10;
const paddleSpeed = 10;
let paddleX = (canvas.width - paddleWidth) / 2;

const ballSize = 10;
let ballX = canvas.width / 2;
let ballY = canvas.height - 30;
let ballSpeedX = 5;
let ballSpeedY = -5;

let score = 0; // Початкове значення балів (Score)
let topScores = [];
let worstScores = [];

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#000";
    ctx.fill();
    ctx.closePath();
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballSize, 0, Math.PI * 2);
    ctx.fillStyle = "#000";
    ctx.fill();
    ctx.closePath();
}

function drawScore() {
    ctx.font = "24px Arial";
    ctx.fillStyle = "#000";
    ctx.fillText(`Score: ${score}`, 20, 30); // Вивід балів (Score) на полотні
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawPaddle();
    drawBall();
    drawScore();

    if (ballY + ballSize > canvas.height) {
        updateScores(score); // Оновити рекорди
        displayScores(); // Відобразити рекорди
        resetGame(); // Скинути гру
        return; // Зупинити виконання
    }

    if (ballY + ballSize > canvas.height) {
        resetGame();
    }

    if (ballY - ballSize < 0) {
        ballSpeedY = -ballSpeedY;
    }

    if (ballX + ballSize > canvas.width || ballX - ballSize < 0) {
        ballSpeedX = -ballSpeedX;
    }

    if (ballX > paddleX && ballX < paddleX + paddleWidth && ballY + ballSize > canvas.height - paddleHeight) {
        ballSpeedY = -ballSpeedY;
        score++; // Збільшення балів (Score) при зіткненні м'ячика з ракеткою
    }

    ballX += ballSpeedX;
    ballY += ballSpeedY;

    requestAnimationFrame(draw);
}

function resetGame() {
    ballX = canvas.width / 2;
    ballY = canvas.height - 30;
    ballSpeedX = 5;
    ballSpeedY = -5;
    score = 0; // Скидання балів (Score) до початкового значення
}

document.getElementById('playAgainButton').addEventListener('click', () => {
    resetGame();
    draw();
});


document.addEventListener("keydown", event => {
    if (event.key === "ArrowLeft" && paddleX > 0) {
        paddleX -= paddleSpeed;
    } else if (event.key === "ArrowRight" && paddleX < canvas.width - paddleWidth) {
        paddleX += paddleSpeed;
    }
});

function updateScores(score) {
    topScores.push(score);
    worstScores.push(score);

    // Сортування масивів за спаданням
    topScores = topScores.sort((a, b) => b - a);
    worstScores = worstScores.sort((a, b) => a - b);

    // Зберігання тільки топ-3 та найгірших 3 результатів
    localStorage.setItem('topScores', JSON.stringify(topScores.slice(0, 3)));
    localStorage.setItem('worstScores', JSON.stringify(worstScores.slice(0, 3)));
}
window.addEventListener('load', () => {
    topScores = JSON.parse(localStorage.getItem('topScores')) || [];
    worstScores = JSON.parse(localStorage.getItem('worstScores')) || [];
    displayScores();
});

// Функція для виведення списків на сторінку
function displayScores() {
    const topScoresList = document.getElementById('top-scores');
    const worstScoresList = document.getElementById('worst-scores');

    // Очищення списків перед оновленням
    topScoresList.innerHTML = '';
    worstScoresList.innerHTML = '';

    // Виведення найкращих результатів (тільки перші 3)
    topScores.slice(0, 3).forEach((score, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `#${index + 1}: ${score}`;
        topScoresList.appendChild(listItem);
    });

    // Виведення найгірших результатів (тільки перші 3)
    worstScores.slice(0, 3).forEach((score, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `#${index + 1}: ${score}`;
        worstScoresList.appendChild(listItem);
    });
}




// Приклад використання:
updateScores(score);
displayScores();

draw();

