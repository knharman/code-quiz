function initializeGame() {
    var mainSection = document.getElementById("question-area");

    var title = document.createElement("h1");
    title.innerHTML = "Welcome to the Game!";

    var explanation = document.createElement("p");
    explanation.innerHTML = "Try to answer the following JavaScript questions before the timer runs out."

    var startGameButton = document.createElement("button");
    startGameButton.innerHTML = "Start Quiz"

    mainSection.appendChild(title);
    mainSection.appendChild(explanation);
    mainSection.appendChild(startGameButton);
}

initializeGame();