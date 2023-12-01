//assign html attributes to variables
const highscores = document.querySelector(".scores")
const timer = document.querySelector("#time")
const start = document.querySelector("#start")

let timeLeft = 0.0;

//import questions from questions.js


//check if start quiz button is clicked, start timer, hide div:#start, then display questions
start.addEventListener("click", ()=>{
    timer.innerHTML = 01 + ":" + 00;
    console.log("Quiz button clicked!! start!")
    document.querySelector("#start-screen").setAttribute("class","hide")
    document.querySelector("#questions").setAttribute("class","start")


    startTimer();
    loadQuestions();
})

function startTimer() {
  let presentTime = timer.innerHTML;
  let timeArray = presentTime.split(/[:]+/);
  let m = timeArray[0];
  let s = checkSecond((timeArray[1] - 1));
  //if second is 50, decrement minute
  if(s==59){m--}
  //if only 30s left, turn red and bold
  if(s<30 && m==0){timer.setAttribute("style", "color: red; font-size: 25px; font-weight: bold");}
  if(m < 0){ return }
  
  timer.innerHTML = m + ":" + s;

  //countdown every second
  setTimeout(startTimer, 1000);
}

function checkSecond(sec) {
  if (sec < 10 && sec >= 0) {sec = "0" + sec}; // add zero in front of numbers < 10
  if (sec < 0) {sec = "59"};
  return sec;
}

function loadQuestions(){

}


//if clicked start timer, remove p tag content - or remove div innerHTML

//display question - unhide div #questions,
//load question in #question-title
//load choices in #choices as list

//check if answer is clicked
//add click event listener to each list

//if correct - display correct, add score then load next question

//if incorrect - display wrong, minus 10s then load next question

//Show final score at the end

//Ask user to enter initials then submit

//once submitted - save to local storage - score and data

//create the new local storage item - increment the score

//organise the score from highest to lowest

//