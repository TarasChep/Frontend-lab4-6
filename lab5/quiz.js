const quizContainer = document.getElementById('quiz-container');
const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answers');
const startButton = document.getElementById('start');
const resultContainer = document.getElementById('result');
const resultText = document.getElementById('result-text'); // Додано змінну resultText

let currentQuestionIndex = 0;
let score = 0;
let questions;

startButton.addEventListener('click', startQuiz);

// Load questions from JSON file
fetch('quiz.json')
    .then(response => response.json())
    .then(data => {
        questions = data;
        startButton.style.display = 'block'; // Показуємо кнопку "Start Quiz" після завантаження даних
    });

// Start quiz
function startQuiz() {
    startButton.style.display = 'none';
    showQuestion(questions[currentQuestionIndex]);
}

// Show question and answers
function showQuestion(question) {
    questionElement.textContent = question.question;
    answerButtons.innerHTML = '';

    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.textContent = answer;
        button.classList.add('answer');
        button.addEventListener('click', () => selectAnswer(question, answer));
        answerButtons.appendChild(button);
    });
}

// Handle answer selection
function selectAnswer(question, selectedAnswer) {
    const correctAnswer = question.correctAnswer;
    const answerButtons = document.querySelectorAll('.answer');
    answerButtons.forEach(button => button.disabled = true);

    if (selectedAnswer === correctAnswer) {
        score += 1;
        answerButtons.forEach(button => {
            if (button.textContent === correctAnswer) {
                button.style.backgroundColor = 'yellow';
            }
        });
    } else {
        answerButtons.forEach(button => {
            if (button.textContent === selectedAnswer) {
                button.style.backgroundColor = 'red';
            }
            if (button.textContent === correctAnswer) {
                button.style.backgroundColor = 'yellow';
            }
        });
    }

    if (currentQuestionIndex < 4) {
        currentQuestionIndex++;
        showQuestion(questions[currentQuestionIndex]);
    } else {
        showResult();
    }
}

const tryAgainButton = document.getElementById('try-again');

tryAgainButton.addEventListener('click', () => {
    quizContainer.style.display = 'block';
    resultContainer.style.display = 'none';
    score = 0;
    currentQuestionIndex = 0;
    startQuiz();
});

function showResult() {
    quizContainer.style.display = 'none';
    resultContainer.style.display = 'block';
    resultText.textContent = `Your score is ${score}/5`;
    tryAgainButton.style.display = 'block'; // Показуємо кнопку "One More Try"
}
