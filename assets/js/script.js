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
            "for (i=0; i&ltarray.length, i++)",
            "for (i=0; i>array.length, i++)",
            "for (i=0; i&ltarray.length, i--)",
        ],
        correctAnswer: "for (i=0; i<array.length, i++)",
    }
]

var currentQuestion = 0;

function gameOver(allQuestionsAnswered) {
    console.log("great job")
}

function askQuestion(questionIndex) {
    if (questionArray[questionIndex] == undefined) {
        // oops, game over
        gameOver(true)
        return
    }

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

    if (event.target.getAttribute("correctAnswer")) {
        var correct = document.createElement("h3");
        correct.innerHTML = "Correct!";
        questionArea.appendChild(correct);
    } else {
        var incorrect = document.createElement("h3");
        incorrect.innerHTML = "Wrong"
        questionArea.appendChild(incorrect);
    }

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

function playGame(event) {
    // clear the question area
    var questionArea = document.getElementById("question-area");
    questionArea.innerHTML = "" // cleared element

    // start first question
    askQuestion(currentQuestion)


    // for (var i = 0; i < questionArray.length; i++) {
    //     var question = document.createElement("h2");
    //     question.innerHTML = questionArray[i].question;
    //     questionArea.appendChild(question);

    //     var correctAnswerText = questionArray[i].correctAnswer;

    //     createOptions(questionArray[i].options, correctAnswerText, questionArea)
    // }


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