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
        options: [
            "HTML",
            "Python",
            "CSS",
            "Java"
        ],
        answer: 2
    },

    {
        question: "Which language is used to add interactivity to a webpage?",
        options: [
            "HTML",
            "CSS",
            "JavaScript",
            "SQL"
        ],
        answer: 2
    },

    {
        question: "Which keyword is used to declare a variable in JavaScript?",
        options: [
            "var",
            "int",
            "string",
            "define"
        ],
        answer: 0
    },

    {
        question: "Which of the following is a database?",
        options: [
            "MySQL",
            "HTML",
            "CSS",
            "JavaScript"
        ],
        answer: 0
    },

    {
        question: "Which data structure follows FIFO?",
        options: [
            "Stack",
            "Queue",
            "Tree",
            "Graph"
        ],
        answer: 1
    },

    {
        question: "Which data structure follows LIFO?",
        options: [
            "Queue",
            "Array",
            "Stack",
            "Graph"
        ],
        answer: 2
    },

    {
        question: "What does CPU stand for?",
        options: [
            "Central Processing Unit",
            "Computer Processing User",
            "Central Program Unit",
            "Computer Personal Unit"
        ],
        answer: 0
    },

    {
        question: "Which algorithm is used to find the shortest path?",
        options: [
            "Dijkstra's Algorithm",
            "Binary Search",
            "Bubble Sort",
            "DFS"
        ],
        answer: 0
    },

    {
        question: "Which of these is a programming language?",
        options: [
            "Python",
            "HTML",
            "CSS",
            "HTTP"
        ],
        answer: 0
    }
];

let currentQuestion = 0;
let score = 0;

const questionElement = document.getElementById("question");
const optionButtons = document.querySelectorAll(".option");
const nextButton = document.getElementById("next-btn");
const quizElement = document.getElementById("quiz");
const resultElement = document.getElementById("result");
const scoreElement = document.getElementById("score");

function loadQuestion() {

    const current = questions[currentQuestion];

    questionElement.textContent =
        (currentQuestion + 1) + ". " + current.question;

    optionButtons.forEach((button, index) => {
        button.textContent = current.options[index];

        button.classList.remove("correct", "wrong");
        button.disabled = false;

        button.onclick = () => selectAnswer(index);
    });
}

function selectAnswer(selectedIndex) {

    const correctIndex = questions[currentQuestion].answer;

    optionButtons.forEach(button => {
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

nextButton.addEventListener("click", () => {

    currentQuestion++;

    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
});

function showResult() {

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

loadQuestion();

