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

//FUNCTIONS
function startQuiz() {
    startBtn.style.display = "none";
    timerInterval = setInterval(updateTimer, 1000);
    displayQuestion();
  }

  function displayQuestion() {
    var currentQuestion = questions[questionIndex];
    questionEl.textContent = currentQuestion.question;
    choicesEl.innerHTML = "";
    feedbackEl.textContent = "";

    for (var i = 0; i < currentQuestion.choices.length; i++) {
      var choice = currentQuestion.choices[i];
      var li = document.createElement("li");
      li.textContent = choice;
      choicesEl.appendChild(li);
    }
  }

  function answerQuestion(event) {
    if (event.target.matches("li")) {
      var selectedAnswer = event.target.textContent;
      var currentQuestion = questions[questionIndex];

      if (selectedAnswer === currentQuestion.answer) {
        // Correct answer
        // Proceed to the next question
        questionIndex++;
        if (questionIndex < questions.length) {
          displayQuestion();
        }else {
          // Quiz finished
          gameOver();
        }
      } else {
        // Incorrect answer
        timeLeft -= 10; // Deduct 10 seconds from the timer
        feedbackEl.textContent = "Incorrect!";
      }
    }
  }

  function updateTimer() {
    timeLeft--;
    timeLeftEl.textContent = timeLeft;

    if (timeLeft <= 0) {
      // Timer reached 0
      gameOver();
    }
  }

  function gameOver() {
    clearInterval(timerInterval);
    questionEl.textContent = "";
    choicesEl.innerHTML = "";
    feedbackEl.textContent = "";
    gameOverEl.style.display = "block";
    displayHighScores();
  }

  function saveScore() {
    var initials = initialsInput.value;
    var score = timeLeft;

    // Save the initials and score
    var player = { initials: initials, score: score };
    highScores.push(player);
    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(5); // Keep only the top 5 scores

    // Clear input field
    initialsInput.value = "";

    // Update the high score board
    displayHighScores();
  }

  function displayHighScores() {
    highScoresEl.innerHTML = "";

    for (var i = 0; i < highScores.length; i++) {
      var player = highScores[i];
      var li = document.createElement("li");
      li.textContent = player.initials + " - " + player.score;
      highScoresEl.appendChild(li);
    }
  }

  function playAgain() {
    questionIndex = 0;
    timeLeft = 60;
    gameOverEl.style.display = "none";
    startQuiz();
  }

  function quitGame() {
    questionIndex = 0;
    timeLeft = 60;
    gameOverEl.style.display = "none";
    startBtn.style.display = "block";
  }