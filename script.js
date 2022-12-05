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


// Welcome Page Elements =====================================
var welcomeEl = document.querySelector("#welcome");
var startQuizBtnEl = document.querySelector("#startQuiz");

//Quiz Page Elements =========================================
var quizEl = document.querySelector("#quiz");
var questionEl = document.querySelector("#ask_question");
var answersEl = document.querySelector("#answers");
var checkLine = document.querySelector("#check_line");

//Input Score Page Elements ==================================
var inputScoreEl = document.querySelector("#inputScore");
var initialsEl = document.querySelector("#initials");
var submitInitialsBtnEl = document.querySelector("#submitInitials");
var userScoreEl = document.querySelector("#score");

//View High Scores Page Elements =============================
var highScoresEl = document.querySelector("#highScores");
var scoresEl = document.querySelector("#scores");
var goBackBtnEl = document.querySelector("#goBack");
var clearScoresBtnEl = document.querySelector("#clearScores");

//Universal vars =============================================
var viewHScoresBtnEl = document.querySelector("#viewHScores");
var timerEl = document.querySelector("#timer");
var score = 0;
var currentQ = 0;
var highScores = [];
var interval;
var timeGiven = 75;
var secondsElapsed = 0;

//starts and updates timer
function startTimer() {
    timerEl.textContent = timeGiven;
    interval = setInterval(function () {
        secondsElapsed++;
        timerEl.textContent = timeGiven - secondsElapsed;
        if (secondsElapsed >= timeGiven) {
            currentQ = questions.length;
            nextQuestion();
        }
    }, 1000);
}

//stops timer
function stopTimer() {
    clearInterval(interval);
}

//Clears current question and calls for display of next question
//Calls for input score display if last question
function nextQuestion() {
    currentQ++;
    if (currentQ < questions.length) {
        renderQuestion();
    } else {
        stopTimer();
        if ((timeGiven - secondsElapsed) > 0)
            score += (timeGiven - secondsElapsed);
        userScoreEl.textContent = score;
        hide(quizEl);
        show(inputScoreEl);
        timerEl.textContent = 0;
    }
}

//checks answer based on current question and updates the user score
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

//displays a message for 2 seconds
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

//hides element
function hide(element) {
    element.style.display = "none";
}

//displays element
function show(element) {
    element.style.display = "block";
}

//reset local variables
function reset() {
    score = 0;
    currentQ = 0;
    secondsElapsed = 0;
    timerEl.textContent = 0;
}

//=================== Rendering ================================

//Renders current question
function renderQuestion() {
    questionEl.textContent = questions[currentQ].question;
    for (i = 0; i < answersEl.children.length; i++) {
        answersEl.children[i].children[0].textContent = `${(i + 1)}: ${questions[currentQ].choices[i]}`;
    }
}

//Renders high scores stored in local storage
function renderHighScores() {
    // Clear content
    scoresEl.innerHTML = "";
    show(highScoresEl);
    highScores = JSON.parse(localStorage.getItem("scores"));
    for (var i = 0; i < highScores.length; i++) {
        var scoreItem = document.createElement("div");
        scoreItem.className += "row mb-3 p-2";
        console.log(scoreItem)
        scoreItem.setAttribute("style", "background-color:PaleTurquoise;");
        scoreItem.textContent = `${(i + 1)}. ${highScores[i].username} - ${highScores[i].userScore}`;
        scoresEl.appendChild(scoreItem);
    }
}


//=========================EVENTS================================

//displays high scores
viewHScoresBtnEl.addEventListener("click", function () {
    hide(welcomeEl);
    hide(quizEl);
    hide(inputScoreEl);
    renderHighScores();
    stopTimer();
    reset();
});

//starts quiz from  Welcome page
startQuizBtnEl.addEventListener("click", function () {
    hide(welcomeEl);
    startTimer();
    renderQuestion();
    show(quizEl);
});

//Calls to check answer selected and calls to next question if button is clicked
answersEl.addEventListener("click", function (e) {
    if (e.target.matches("button")) {
        checkAnswer(e.target);
        nextQuestion();
    }
});

//Creates a user score object to push to the local storage scores array calls to display high scores
//calls to render high scores
submitInitialsBtnEl.addEventListener("click", function () {
    var initValue = initialsEl.value.trim();
    if (initValue) {
        var userScore = { username: initValue, userScore: score };
        initialsEl.value = '';
        highScores = JSON.parse(localStorage.getItem("scores")) || [];
        highScores.push(userScore)
        localStorage.setItem("scores", JSON.stringify(highScores));
        hide(inputScoreEl);
        renderHighScores();
        reset();
    }
});

//Goes back to Welcome page from High scores 
goBackBtnEl.addEventListener("click", function () {
    hide(highScoresEl);
    show(welcomeEl);
});

//Clears saved scores from local storage
clearScoresBtnEl.addEventListener("click", function () {
    highScores = [];
    localStorage.setItem("scores", JSON.stringify(highScores));
    renderHighScores();
}); 




