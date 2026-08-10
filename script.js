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
const optionsElement = document.getElementById("options");
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

    optionsElement.innerHTML = "";

    current.options.forEach(function(option, index) {
        const button = document.createElement("button");

        button.textContent = option;
        button.className = "option";

        button.onclick = function() {
            selectAnswer(index);
        };

        optionsElement.appendChild(button);
    });

    nextButton.disabled = false;

    startTimer();
}

function startTimer() {
    timeLeft = 30;
    timerElement.textContent = "Time: " + timeLeft;
    timerElement.style.color = "black";

    timer = setInterval(function() {
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

    const current = questions[currentQuestion];
    const buttons = document.querySelectorAll(".option");

    buttons.forEach(function(button) {
        button.disabled = true;
    });

    if (selectedIndex === current.answer) {
        buttons[selectedIndex].classList.add("correct");
        score++;
    } else {
        buttons[selectedIndex].classList.add("wrong");
        buttons[current.answer].classList.add("correct");
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

nextButton.onclick = nextQuestion;

loadQuestion();
