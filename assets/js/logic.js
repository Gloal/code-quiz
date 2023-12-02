//assign html attributes to variables
const highscores = document.querySelector(".scores")
const timer = document.querySelector("#time")
const start = document.querySelector("#start")
const startScreen = document.querySelector("#start-screen")
const questionScreen = document.querySelector("#questions")


let questionTitle = document.querySelector("#question-title")
let questionChoices = document.querySelector("#choices")
let score = 0;

//import questions from questions.js


//check if start quiz button is clicked, start timer, hide div:#start, then display questions
start.addEventListener("click", ()=>{
    timer.innerHTML = 01 + ":" + 00;
    console.log("Quiz button clicked!! start!")
    startScreen.setAttribute("class","hide")
    startTimer();
    loadQuestions();
})

function startTimer() {
  let presentTime = timer.innerHTML;
  let timeArray = presentTime.split(/[:]+/);
  let m = timeArray[0];
  let s = checkSecond((timeArray[1] - 1));
  //if second is 59, decrement minute
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
    questionScreen.setAttribute("class","start")

    questionTitle.textContent = questions[1].question;
    let questionChoicesList = document.createElement("ul");
    questionChoices.appendChild(questionChoicesList);

    for (let index = 0; index < questions[1].choices.length; index++) {
        let choiceOption = document.createElement("li");
        questionChoicesList.appendChild(choiceOption);
        const element = questions[1].choices[index];
        choiceOption.innerHTML = element.value;
        choiceOption.addEventListener("click", function checkAnswer(event){
            if(element.correct){
                choiceOption.setAttribute("style","background-color: green");
                score++;
            }else{
                choiceOption.setAttribute("style","background-color: red");
                let presentTime = timer.innerHTML;
                let timeArray = presentTime.split(/[:]+/);
                let m = timeArray[0];
                let s = checkSecond((timeArray[1] - 10));
                if(s==59){m--}
                if(s<30 && m==0){timer.setAttribute("style", "color: red; font-size: 25px; font-weight: bold");}
                if(m < 0){ return }
                
                timer.innerHTML = m + ":" + s;
            }
            //display correct/incorrect
            //add score / reduce time
            //load next question
        })
    }
}



//if clicked start timer, remove p tag content - or remove div innerHTML

//display question - unhide div #questions,
//load question in #question-title
//load choices in #choices as list
//create a button for next question

//check if answer is clicked
//add click event listener to each list

//if correct - display correct, add score then load next question

//if incorrect - display wrong, minus 10s then load next question

//next button clicked - show next question. if last item, no next button

//Show final score at the end

//Ask user to enter initials then submit

//once submitted - save to local storage - score and data

//create the new local storage item - add this score

//organise the score from highest to lowest

//