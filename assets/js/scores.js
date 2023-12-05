const userList = document.querySelector("#highscores");
const clearAll = document.querySelector("#clear");
// Retrieve scores from local storage
let allUserScores = JSON.parse(localStorage.getItem("scoreList")) || [];

// Display scores on the highscores.html page
for (let index = 0; index < allUserScores.length; index++) {
  const eachUser = allUserScores[index];
  const listItem = document.createElement("li");
  listItem.textContent = `${eachUser.user}: ${eachUser.score}`;
  userList.appendChild(listItem);
}

clearAll.addEventListener("click", clearScores);

function clearScores(){
    allUserScores.splice(0, allUserScores.length);
    userList.innerHTML = '';
    console.log(allUserScores);
    localStorage.setItem("scoreList", JSON.stringify(allUserScores));
}