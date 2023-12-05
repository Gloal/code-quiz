//assign html attributes to variables
const highscores = document.querySelector(".scores");
const timer = document.querySelector("#time");
const start = document.querySelector("#start");
const startScreen = document.querySelector("#start-screen");
const questionScreen = document.querySelector("#questions");
const finishScreen = document.querySelector("#end-screen");
const correctSound = new Audio("./assets/sfx/correct.wav");
const incorrectSound = new Audio("./assets/sfx/incorrect.wav");

let questionTitle = document.querySelector("#question-title");
let questionChoices = document.querySelector("#choices");
let score = 0;
let userInitial = document.querySelector("#initials");
let allUserScores = JSON.parse(localStorage.getItem("scoreList")) || [];
let isQuizNotEnded = true;

start.addEventListener("click", () => {
  timer.innerHTML = 01 + ":" + 00;
  console.log("Quiz button clicked!! start!");
  startScreen.setAttribute("class", "hide");
  startTimer();
  let currentQuestionIndex = 0;
  loadQuestion(currentQuestionIndex);
});

function startTimer() {
  let presentTime = timer.innerHTML;
  let timeArray = presentTime.split(/[:]+/);
  let m = parseInt(timeArray[0]);
  let s = parseInt(timeArray[1]);

  //end Quiz if time runs out
  if (m === 0 && s === 0) {
    if (isQuizNotEnded) {
      endQuiz();
    }
    return;
  }

  //if second is 59, decrement minute
  if (s === 0) {
    m--;
    s = 59;
  } else {
    s--;
  }
  //if only 30s left, turn red and bold
  if (s < 30 && m == 0) {
    timer.setAttribute(
      "style",
      "color: red; font-size: 25px; font-weight: bold"
    );
  }
  timer.innerHTML = m + ":" + s;
  //repeat every second
  setTimeout(startTimer, 1000);
}

function loadQuestion(currentQuestionIndex) {
  questionScreen.setAttribute("class", "start");

  // displayQuestions();
  if (currentQuestionIndex < questions.length) {
    questionTitle.textContent = questions[currentQuestionIndex].question;
    questionChoices.innerHTML = "";
    console.log(questions[currentQuestionIndex].question);
    let questionChoicesList = document.createElement("ul");
    questionChoices.appendChild(questionChoicesList);

    for (
      let index = 0;
      index < questions[currentQuestionIndex].choices.length;
      index++
    ) {
      console.log(index);
      let choiceOption = document.createElement("button");
      questionChoicesList.appendChild(choiceOption);
      const element = questions[currentQuestionIndex].choices[index];
      choiceOption.textContent = element.value;

      choiceOption.addEventListener("click", function checkAnswer() {
        if (element.correct) {
          correctSound.play();
          score++;
          buttonClicked = false;
          currentQuestionIndex++;
          loadQuestion(currentQuestionIndex);
        } else {
          incorrectSound.play();
          add10Seconds();
          buttonClicked = false;
          currentQuestionIndex++;
          loadQuestion(currentQuestionIndex);
        }
      });
    }
  } else {
    if (isQuizNotEnded) {
      endQuiz();
    }
    return;
  }
}

function endQuiz() {
  isQuizNotEnded = false;
  questionScreen.setAttribute("class", "hide");
  finishScreen.setAttribute("class", "start");
  document.querySelector("#final-score").textContent = score;

  //save user score and load highscores
  const submit = document.querySelector("#submit");
  submit.addEventListener("click", function () {
    allUserScores.push({ user: userInitial.value, score: score });
    console.log(allUserScores);
    localStorage.setItem("scoreList", JSON.stringify(allUserScores));
    window.location.href = "highscores.html";
  });
}

function add10Seconds() {
  let presentTime = timer.innerHTML;
  let timeArray = presentTime.split(/[:]+/);
  let m = parseInt(timeArray[0]);
  let s = parseInt(timeArray[1]);

  //if less than 10 secs - end Quiz
  if (m === 0 && s <= 10) {
    if (isQuizNotEnded) {
      endQuiz();
    }
    return;
  }

  if (s < 10) {
    m--;
    s += 50;
  } else {
    s -= 10;
  }
  timer.innerHTML = m + ":" + s;
}

//Show final score at the end
//Ask user to enter initials then submit
//once submitted - save to local storage - score and data
//create the new local storage item - add this score
//organise the score from highest to lowest
