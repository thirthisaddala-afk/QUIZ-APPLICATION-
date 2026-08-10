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

// Timer variables
let timeLeft = 30;
let timer;

// HTML elements
const questionElement = document.getElementById("question");
const optionButtons = document.querySelectorAll(".option");
const nextButton = document.getElementById("next-btn");
const quizElement = document.getElementById("quiz");
const resultElement = document.getElementById("result");
const scoreElement = document.getElementById("score");
const timerElement = document.getElementById("timer");


// Load question
function loadQuestion() {

    // Stop previous timer
    clearInterval(timer);

    const current = questions[currentQuestion];

    questionElement.textContent =
        (currentQuestion + 1) + ". " + current.question;

    optionButtons.forEach((button, index) => {

        button.textContent = current.options[index];

        button.classList.remove("correct", "wrong");

        button.disabled = false;

        button.onclick = () => selectAnswer(index);
    });

    // Start 30 second timer
    startTimer();
}


// Start timer
function startTimer() {

    timeLeft = 30;

    timerElement.textContent = "Time: " + timeLeft;

    timerElement.style.color = "black";

    timer = setInterval(() => {

        timeLeft--;

        timerElement.textContent = "Time: " + timeLeft;

        // Make timer red when 10 seconds remain
        if (timeLeft <= 10) {
            timerElement.style.color = "red";
        }

        // Time is finished
        if (timeLeft <= 0) {

            clearInterval(timer);

            timeUp();
        }

    }, 1000);
}


// Select answer
function selectAnswer(selectedIndex) {

    // Stop timer
    clearInterval(timer);

    const correctIndex = questions[currentQuestion].answer;

    // Disable all options
    optionButtons.forEach(button => {
        button.disabled = true;
    });

    // Check answer
    if (selectedIndex === correctIndex) {

        optionButtons[selectedIndex].classList.add("correct");

        score++;

    } else {

        optionButtons[selectedIndex].classList.add("wrong");

        optionButtons[correctIndex].classList.add("correct");
    }
}


// When time runs out
function timeUp() {

    const correctIndex = questions[currentQuestion].answer;

    // Disable all options
    optionButtons.forEach(button => {
        button.disabled = true;
    });

    // Show correct answer
    optionButtons[correctIndex].classList.add("correct");

    // Wait 1 second, then go to next question
    setTimeout(() => {

        currentQuestion++;

        if (currentQuestion < questions.length) {

            loadQuestion();

        } else {

            showResult();
        }

    }, 1000);
}


// Next button
nextButton.addEventListener("click", () => {

    clearInterval(timer);

    currentQuestion++;

    if (currentQuestion < questions.length) {

        loadQuestion();

    } else {

        showResult();
    }
});


// Show result
function showResult() {

    clearInterval(timer);

    quizElement.classList.add("hide");

    resultElement.classList.remove("hide");

    scoreElement.textContent =
        "Your Score: " + score + " / " + questions.length;
}


// Restart quiz
function restartQuiz() {

    clearInterval(timer);

    currentQuestion = 0;

    score = 0;

    quizElement.classList.remove("hide");

    resultElement.classList.add("hide");

    loadQuestion();
}


// Start quiz
loadQuestion();
```

**Important:** Your HTML must also contain a timer element:

```html
<div id="timer">Time: 30</div>
```

For example:

```html
<div id="quiz">

    <div id="timer">Time: 30</div>

    <h2 id="question"></h2>

    <button class="option"></button>
    <button class="option"></button>
    <button class="option"></button>
    <button class="option"></button>

    <button id="next-btn">Next</button>

</div>

<div id="result" class="hide">
    <h2>Quiz Completed!</h2>
    <p id="score"></p>
    <button onclick="restartQuiz()">Restart</button>
</div>
```

The timer starts at **30 seconds for each question**, turns **red at 10 seconds**, and automatically moves to the next question when it reaches zero.
