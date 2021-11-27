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

function chooseAnswer(event) {
    var answer = event.target.outerText

    if (event.target.getAttribute("correctAnswer")) {
        var correct = document.createElement("h3");
        correct.innerHTML = "Correct!";
        document.querySelector("body").appendChild(correct);
    } else {
        var incorrect = document.createElement("h3");
        incorrect.innerHTML = "Wrong"
        document.querySelector("body").appendChild(incorrect);
    }
}

function playGame(event) {
    // clear the question area
    var questionArea = document.getElementById("question-area");
    questionArea.innerHTML = "" // cleared element

    // run through questions

    for (var i = 0; i < questionArray.length; i++) {
        var question = document.createElement("h2");
        question.innerHTML = questionArray[i].question;
        questionArea.appendChild(question);

        var correctAnswerText = questionArray[i].correctAnswer;

        for (var j = 0; j < questionArray[i].options.length; j++) {
            // i is the index of questions
            // j is the index of options of the question that i is on
            var currentQuestion = questionArray[i];
            var option = document.createElement("button");
            option.innerHTML = currentQuestion.options[j];
            option.onclick = chooseAnswer;
            if (currentQuestion.options[j] == correctAnswerText) {
                option.setAttribute("correctAnswer", true);
            }
            questionArea.appendChild(option)
        }
    }


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