const questionArray = [
    {
        question: "Which of the following options is not a valid data type in JavaScript?",
        options: [
            "Boolean",
            "Undefined",
            "Class",
            "String",
        ],
        correctAnswer: "Class",
    },
    {
        question: "Which is the correct syntax in a for loop?",
        options: [
            "for (i=0, i&ltarray.length, i++)",
            "for (i=0; i&ltarray.length; i++)",
            "for (i=0; i>array.length; i++)",
            "for (i=0; i&ltarray.length; i--)",
        ],
        correctAnswer: "for (i=0; i&ltarray.length; i++)",
    },
    {
        question: "What keyword declares a variable that cannot have its value changed?",
        options: [
            "let",
            "const",
            "var",
            "trim"
        ],
        correctAnswer: "const",
    },
]
var currentQuestion = 0;
var timer = 75;
var hasClicked = false;

function gameOver(allQuestionsAnswered) {
    if (allQuestionsAnswered) {
        console.log("great job")
    } else {
        console.log("you ran out of time")
    }
}

function goBackHandler(event) {
    var div = document.querySelector("div");
    div.remove();
    initializeGame();
}

function viewHighScores(event) {
    var body = document.querySelector("body");
    var highScoreContainer = document.createElement("div");

    var questionArea = document.getElementById("question-area");
    questionArea.innerHTML = ""

    var highScore = document.createElement("h2");
    highScore.innerHTML = "High Scores";

    var orderedList = document.createElement("ol");
    
    var highestScore = document.createElement("li");
    highestScore.innerHTML = "KH 35";

    var nextScore = document.createElement("li");
    nextScore.innerHTML = "CP 31";

    var goBack = document.createElement("button");
    goBack.innerHTML = "Go Back"
    goBack.onclick = goBackHandler;

    var clearHighScores = document.createElement ("button")
    clearHighScores.innerHTML = "Clear High Scores";
    clearHighScores.onclick = clearLocalStorage;

    highScoreContainer.appendChild(highScore);
    highScoreContainer.appendChild(orderedList);
    orderedList.appendChild(highestScore);
    orderedList.appendChild(nextScore);
    highScoreContainer.appendChild(goBack);
    highScoreContainer.appendChild(clearHighScores);
    body.appendChild(highScoreContainer);

}

function clearLocalStorage() {
    console.log("you made it this far")
}

function askQuestion(questionIndex) {
    if (questionArray[questionIndex] == undefined) {
        // oops, game over
        gameOver(true)
        return
    }

    hasClicked = false;

    var questionArea = document.getElementById("question-area");
    questionArea.innerHTML = "" // cleared element
    
    var question = document.createElement("h2");
    question.innerHTML = questionArray[questionIndex].question;
    questionArea.appendChild(question);

    var correctAnswerText = questionArray[questionIndex].correctAnswer;

    createOptions(questionArray[questionIndex].options, correctAnswerText, questionArea)
}

function chooseAnswer(event) {
    var questionArea = document.getElementById("question-area");

    if (hasClicked) {
        return;
    }

    if (event.target.getAttribute("correctAnswer")) {
        var correct = document.createElement("h3");
        correct.innerHTML = "Correct!";
        questionArea.appendChild(correct);
    } else {
        var incorrect = document.createElement("h3");
        incorrect.innerHTML = "Wrong"
        questionArea.appendChild(incorrect);
        timer -= 10;
    }
    hasClicked = true;

    currentQuestion++;
    setTimeout(askQuestion, 1000, currentQuestion)
}

function createOptions(options, correctAnswerText, parent) {
    for (var i = 0; i < options.length; i++) {
        var option = document.createElement("button");
        option.innerHTML = options[i];
        option.onclick = chooseAnswer;

        if (options[i] == correctAnswerText) {
            option.setAttribute("correctAnswer", true);
        }
        parent.appendChild(option)
    }
}

function timerDecrement() {
    if (timer <= 0) {
        gameOver(false)
        return;
    }
    timer--;
    document.getElementById("timer").innerHTML = "Time: " + timer
    startTimer();
}

function startTimer() {
    setTimeout(timerDecrement, 1000)
}

function playGame(event) {
    // clear the question area
    var questionArea = document.getElementById("question-area");
    questionArea.innerHTML = "" // cleared element

    var highScoreButton = document.getElementById("view-high-score");
    highScoreButton.remove();

    // start first question
    askQuestion(currentQuestion)

    startTimer()

}

function initializeGame() {
    var mainSection = document.getElementById("question-area");

    var title = document.createElement("h1");
    title.innerHTML = "Welcome to the Game!";

    var explanation = document.createElement("p");
    explanation.innerHTML = "Try to answer the following JavaScript questions before the timer runs out."

    var startGameButton = document.createElement("button");
    startGameButton.innerHTML = "Start Quiz"
    startGameButton.onclick = playGame;

    mainSection.appendChild(title);
    mainSection.appendChild(explanation);
    mainSection.appendChild(startGameButton);
}

initializeGame();
