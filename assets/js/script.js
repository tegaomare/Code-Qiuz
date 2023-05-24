//DEPENDENCES
var startBtn = document.getElementById("start-btn");
var questionEl = document.getElementById("question");
var choicesEl = document.getElementById("choices");
var feedbackEl = document.getElementById("feedback");
var timeLeftEl = document.getElementById("time-left");
var gameOverEl = document.getElementById("game-over");
var initialsInput = document.getElementById("initials");
var saveBtn = document.getElementById("save-btn");
var highScoresEl = document.getElementById("high-scores");
var playAgainBtn = document.getElementById("play-again-btn");
var quitBtn = document.getElementById("quit-btn");

//DATA
var questionIndex = 0;
var timerInterval;
var timeLeft = 60; // Total time in seconds
var highScores = [];

//USERS INTERACTION
startBtn.addEventListener("click", startQuiz);
choicesEl.addEventListener("click", answerQuestion);
saveBtn.addEventListener("click", saveScore);
playAgainBtn.addEventListener("click", playAgain);
quitBtn.addEventListener("click", quitGame);

