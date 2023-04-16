var questions = [
 {
    question: "1. ____ is the process of finding errors and fixing them within a program.",
    choices: ["Executing", "Debugging", "Scanning", "Compiling"],
    answer: "Debugging"
}, 
{
    question: "2. What will this output? var a = [1, 2, 3]; console.log(a[6]);",
    choices: ["Undefined", "0", "Prints nothing", "Syntax error"],
    answer: "Undefined"
}, 

{
	question: "3. Which software company developed JavaScript?",
    choices: ["Mozilla", "Netscape", "Sun Microsystems", "Oracle"],
    answer: "Netscape"
},
{
	question: "4. Kim has just constructed her first for loop within the Java language.  Which of the following is not a required part of a for loop?",
    choices: ["Initialization", "Variable", "Increment", "Condition"],
    answer: "Variable"
},
{
	question: "5. Which command will stop an infinite loop?",
    choices: ["Alt - C", "Shift - C", "Esc", "Ctrl - C"],
    answer: "Ctrl - C"
},
{
	question: "6. Sal needs to execute a section of code ten times within a program. Compare the selection structures below and select which one meets the needs identified.",
    choices: ["If-Else", "For", "While", "If"],
    answer: "For"
}];


var welcome = document.querySelector("#welcome");
var start = document.querySelector("#startQuiz");
var quiz = document.querySelector("#quiz");
var askQuestion = document.querySelector("#ask_question");
var answers = document.querySelector("#answers");
var checkLine = document.querySelector("#check_line");
var inputScore = document.querySelector("#inputScore");
var initials = document.querySelector("#initials");
var submit = document.querySelector("#submitInitials");
var userScore = document.querySelector("#score");
var hScore = document.querySelector("#highScores");
var allScores = document.querySelector("#scores");
var goBack = document.querySelector("#goBack");
var clear = document.querySelector("#clearScores");
var viewScores = document.querySelector("#viewHScores");
var timer = document.querySelector("#timer");
const lastQuestion = questions.length - 1;
var score = 0;
var currentQ = 0;
var highScores = [];
var interval = 0;
var timeGiven = 75;
var secondsElapsed = 0;


start.addEventListener("click", function () {
    hide(welcome);
    startTimer();
    renderQuestion();
    show(quiz);
});


answers.addEventListener("click", function (e) {
    if (e.target.matches("button")) {
        checkAnswer(e.target);
        nextQuestion();
    }
});

function startTimer() {
    timer.textContent = timeGiven;
    interval = setInterval(function () {
        secondsElapsed++;
        timer.textContent = timeGiven - secondsElapsed;
        if (secondsElapsed >= timeGiven) {
            currentQ = questions.length;
            nextQuestion();
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(interval);
}

function renderQuestion() {
    askQuestion.textContent = questions[currentQ].question;
    for (i = 0; i < answers.children.length; i++) {
        answers.children[i].children[0].textContent = `${(i + 1)}: ${questions[currentQ].choices[i]}`;
    }
}

function nextQuestion() {
    currentQ++;
    if (currentQ < questions.length) {
        renderQuestion();
    } else {
        stopTimer();
        if ((timeGiven - secondsElapsed) > 0)
            score += (timeGiven - secondsElapsed);
        userScore.textContent = score;
        hide(quiz);
        show(inputScore);
        timer.textContent = 0;
    }
}

function checkAnswer(answer) {
    if (questions[currentQ].answer == questions[currentQ].choices[answer]) {
        score += 5;
        displayMessage("Correct!");
    }
    else {
        secondsElapsed += 10;
        displayMessage("Wrong...");
    }
}

function displayMessage(m) {
    var messageHr = document.createElement("hr");
    var messageEl = document.createElement("div");
    messageEl.textContent = m;
    document.querySelector(".main-container").appendChild(messageHr);
    document.querySelector(".main-container").appendChild(messageEl);
    setTimeout(function () {
            messageHr.remove();
            messageEl.remove();
    }, 2000);

}

function hide(element) {
    element.style.display = "none";
}


function show(element) {
    element.style.display = "block";
}


function reset() {
    score = 0;
    currentQ = 0;
    secondsElapsed = 0;
    timer.textContent = 0;
}


function renderHighScores() {
    allScores.innerHTML = "";
    show(hScore);
    highScores = JSON.parse(localStorage.getItem("scores"));
    for (var i = 0; i < highScores.length; i++) {
        var scoreItem = document.createElement("div");
        scoreItem.className += "row mb-3 p-2";
        console.log(scoreItem)
        scoreItem.setAttribute("style", "background-color:PaleTurquoise;");
        scoreItem.textContent = `${(i + 1)}. ${highScores[i].username} - ${highScores[i].userScore}`;
        allScores.appendChild(scoreItem);
    }
}

viewScores.addEventListener("click", function () {
    hide(welcome);
    hide(quiz);
    hide(inputScore);
    renderHighScores();
    stopTimer();
    reset();
});


submit.addEventListener("click", function () {
    var initValue = initials.value.trim();
    if (initValue) {
        var userScore = { username: initValue, userScore: score };
        initials.value = '';
        highScores = JSON.parse(localStorage.getItem("scores")) || [];
        highScores.push(userScore)
        localStorage.setItem("scores", JSON.stringify(highScores));
        hide(inputScore);
        renderHighScores();
        reset();
    }
});

goBack.addEventListener("click", function () {
    hide(hScore);
    show(welcome);
});

clear.addEventListener("click", function () {
    highScores = [];
    localStorage.setItem("scores", JSON.stringify(highScores));
    renderHighScores();
}); 
