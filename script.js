const questions = [
    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Text Machine Language",
            "Hyperlinks Text Mark Language",
            "Home Tool Markup Language"
        ],
        answer: 0
    },
    {
        question: "Which language is used to style web pages?",
        options: ["HTML", "Python", "CSS", "Java"],
        answer: 2
    },
    {
        question: "Which language is used to add interactivity to a webpage?",
        options: ["HTML", "CSS", "JavaScript", "SQL"],
        answer: 2
    },
    {
        question: "Which keyword is used to declare a variable in JavaScript?",
        options: ["var", "int", "string", "define"],
        answer: 0
    },
    {
        question: "Which of the following is a database?",
        options: ["MySQL", "HTML", "CSS", "JavaScript"],
        answer: 0
    }
];

let currentQuestion = 0;
let score = 0;
let timeLeft = 30;
let timer;

const questionElement = document.getElementById("question");
const optionButtons = document.querySelectorAll(".option");
const nextButton = document.getElementById("next-btn");
const quizElement = document.getElementById("quiz");
const resultElement = document.getElementById("result");
const scoreElement = document.getElementById("score");
const timerElement = document.getElementById("timer");

function loadQuestion() {
    clearInterval(timer);

    const current = questions[currentQuestion];

    questionElement.textContent =
        (currentQuestion + 1) + ". " + current.question;

    optionButtons.forEach((button, index) => {
        button.textContent = current.options[index];
        button.classList.remove("correct", "wrong");
        button.disabled = false;

        button.onclick = function () {
            selectAnswer(index);
        };
    });

    startTimer();
}

function startTimer() {
    timeLeft = 30;
    timerElement.textContent = "Time: " + timeLeft;
    timerElement.style.color = "black";

    timer = setInterval(function () {
        timeLeft--;

        timerElement.textContent = "Time: " + timeLeft;

        if (timeLeft <= 10) {
            timerElement.style.color = "red";
        }

        if (timeLeft <= 0) {
            clearInterval(timer);
            nextQuestion();
        }
    }, 1000);
}

function selectAnswer(selectedIndex) {
    clearInterval(timer);

    const correctIndex = questions[currentQuestion].answer;

    optionButtons.forEach(function (button) {
        button.disabled = true;
    });

    if (selectedIndex === correctIndex) {
        optionButtons[selectedIndex].classList.add("correct");
        score++;
    } else {
        optionButtons[selectedIndex].classList.add("wrong");
        optionButtons[correctIndex].classList.add("correct");
    }
}

function nextQuestion() {
    clearInterval(timer);

    currentQuestion++;

    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    clearInterval(timer);

    quizElement.classList.add("hide");
    resultElement.classList.remove("hide");

    scoreElement.textContent =
        "Your Score: " + score + " / " + questions.length;
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;

    quizElement.classList.remove("hide");
    resultElement.classList.add("hide");

    loadQuestion();
}
nextButton.onclick = function () {
    clearInterval(timer);

    currentQuestion++;

    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
};

loadQuestion();
