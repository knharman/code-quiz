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
            "trim",
        ],
        correctAnswer: "const",
    },
    {
        question: "What operator is used to assign a value to a variable?",
        options: [
            "=",
            "!=",
            "*",
            "+",
        ],
        correctAnswer: "=",
    },
    {
        question: "What will the code return: Boolean(4<7)?",
        options: [
            "console error",
            "NaN",
            "false",
            "true",
        ],
        correctAnswer: "true",
    },
    {
        question: "How would you call a function called sayHello?",
        options: [
            "function sayHello",
            "function sayHello()",
            "sayHello[]",
            "sayHello()",
        ],
        correctAnswer: "sayHello()",
    },
    {
        question: "What is the string operator in JavaScript?",
        options: [
            "-",
            "=",
            "+",
            "+=",
        ],
        correctAnswer: "+",
    },
    {
        question: "Which of these represents the mathematical operator Modulus?",
        options: [
            "%",
            "$",
            "++",
            "#",
        ],
        correctAnswer: "%",
    },
    {
        question: "Objects group together a set of ________ and ________ to create a model of something you would recognize from the real world",
        options: [
            "variables and objects",
            "variables and functions",
            "functions and objects",
            "functions and arrays",
        ],
        correctAnswer: "variables and functions",
    },
    {
        question: "Values in an array are put in ________ and separated by commas",
        options: [
            "curly brackets",
            "quotes",
            "square brackets",
            "parentheses",
        ],
        correctAnswer: "square brackets",
    },
]
var currentQuestion = 0;
var timer = 75;
var hasClicked = false;
var timerShouldBeRunning = false;

// Start Game
function initializeGame() {
    // game setup
    timer = 75;
    document.getElementById("timer").innerHTML = "Time: " + timer
    currentQuestion = 0;

    var mainSection = document.getElementById("question-area");

    var highScoresButton = document.createElement("button");
    highScoresButton.id = "view-high-scores"
    highScoresButton.innerHTML = "View High Scores";
    highScoresButton.onclick = viewHighScores;
    highScoresButton.className = "scoresBtn"

    var title = document.createElement("h1");
    title.innerHTML = "Welcome to the Game!";

    var explanation = document.createElement("p");
    explanation.innerHTML = "Try to answer the following JavaScript questions before the timer runs out. Keep in mind that incorrect answers will penalize your score/time by 10 seconds. Good luck!"

    var startGameButton = document.createElement("button");
    startGameButton.innerHTML = "Start Quiz"
    startGameButton.onclick = playGame;
    startGameButton.className = "startBtn";

    document.querySelector("body").prepend(highScoresButton);
    mainSection.appendChild(title);
    mainSection.appendChild(explanation);
    mainSection.appendChild(startGameButton);
}

function playGame(event) {
    // clear the question area
    var questionArea = document.getElementById("question-area");
    questionArea.innerHTML = "" // cleared element

    var highScoreButton = document.getElementById("view-high-scores");
    highScoreButton.remove();

    // start first question
    askQuestion(currentQuestion)

    startTimer();
}

// Play Game
function askQuestion(questionIndex) {
    if (questionArray[questionIndex] == undefined) {
        // oops, game over
        endGame(true)
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

function startTimer() {
    timerShouldBeRunning = true;
    setTimeout(timerDecrement, 1000)
}

function timerDecrement() {
    if (!timerShouldBeRunning) {
        return;
    }
    if (timer <= 0) {
        endGame(false)
        return;
    }
    timer--;
    document.getElementById("timer").innerHTML = "Time: " + timer
    startTimer();
}

function createOptions(options, correctAnswerText, parent) {
    for (var i = 0; i < options.length; i++) {
        var option = document.createElement("button");
        option.innerHTML = options[i];
        option.onclick = chooseAnswer;
        option.className = "optionBtn";

        if (options[i] == correctAnswerText) {
            option.setAttribute("correctAnswer", true);
        }
        parent.appendChild(option)
    }
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

// End of Game
function endGame(allQuestionsAnswered) {
    timerShouldBeRunning = false;
    if (allQuestionsAnswered) {
        showAllDoneScreen();
    } else {
        showGameOverScreen();
    }
}

function showAllDoneScreen() {
    var questionArea = document.getElementById("question-area");
    questionArea.innerHTML = ""

    var congratsMessage = document.createElement("h2");
    congratsMessage.innerHTML = "All Done!";

    var description = document.createElement("h4");
    description.innerHTML = "Your final score is " + timer;

    var form = document.createElement("form");
    var initialsInput = document.createElement("input");
    initialsInput.setAttribute("type", "text");
    initialsInput.setAttribute("placeholder", "Enter Initials");
    initialsInput.setAttribute("maxlength","3");

    var submitButton = document.createElement("input");
    submitButton.setAttribute("type", "button");
    submitButton.setAttribute("value","Submit");
    submitButton.onclick = setNewHighScore;
    submitButton.className = "submitBtn"

    form.appendChild(initialsInput);
    form.appendChild(submitButton);
    questionArea.appendChild(congratsMessage);
    questionArea.appendChild(description);
    questionArea.appendChild(form);
}

function setNewHighScore(event) {
    var initials = event.target.form[0].value;
    var highScore = timer;

    if (initials == "") {
        return;
    }

    var currentHighScores = load("highScores");
    currentHighScores.push({
        initials: initials,
        score: highScore
    });
    currentHighScores.sort(function (a, b) {
        return b.score - a.score;
    });

    store("highScores", currentHighScores);
    viewHighScores();
}

function showGameOverScreen() {
    var questionArea = document.getElementById("question-area");
    questionArea.innerHTML = ""

    var gameOverMessage = document.createElement("h2");
    gameOverMessage.innerHTML = "Game Over!";

    var description = document.createElement("h4");
    description.innerHTML = "You ran out of time.";

    var startOverButton = document.createElement("button");
    startOverButton.innerHTML = "View High Scores";
    startOverButton.onclick = viewHighScores;

    questionArea.appendChild(gameOverMessage);
    questionArea.appendChild(description);
    questionArea.appendChild(startOverButton);
}


// High Scores
function viewHighScores(event) {

    var highScoreButton = document.getElementById("view-high-scores");

    if (highScoreButton != null) {
        highScoreButton.remove();
    }

    var body = document.querySelector("body");
    var highScoreContainer = document.createElement("div");

    var questionArea = document.getElementById("question-area");
    questionArea.innerHTML = ""

    var highScore = document.createElement("h2");
    highScore.innerHTML = "High Scores";

    var orderedList = document.createElement("ol");
    
    var currentHighScores = load("highScores");
    for (i=0; i<currentHighScores.length; i++) {
        var highestScore = document.createElement("li");
        highestScore.innerHTML = currentHighScores[i].initials + " " + currentHighScores[i].score;
        orderedList.appendChild(highestScore);
    }

    var goBack = document.createElement("button");
    goBack.innerHTML = "Go Back"
    goBack.onclick = goBackHandler;

    var clearHighScoresButton = document.createElement ("button")
    clearHighScoresButton.innerHTML = "Clear High Scores";
    clearHighScoresButton.onclick = clearHighScores;

    highScoreContainer.appendChild(highScore);
    highScoreContainer.appendChild(orderedList);
    highScoreContainer.appendChild(goBack);
    highScoreContainer.appendChild(clearHighScoresButton);
    body.appendChild(highScoreContainer);

}

function goBackHandler(event) {
    var div = document.querySelector("div");
    div.remove();
    timer = 75;
    initializeGame();
}

function clearHighScores() {
    clearLocalStorage();
    var orderedList = document.querySelector("ol");
    orderedList.innerHTML = "";
}

function clearLocalStorage() {
    store("highScores",[]);
}

// Local Storage Helpers
/**
 * Puts something into local storage.
 * @param {String} key The key in which to store the value
 * @param {Any} value The value to put in local storage
 */
 function store(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

/**
 * Gets something from local storage.
 * @param {String} key The key that contains the value
 * @returns The value
 */
function load(key) {
    var jsonValue = localStorage.getItem(key);

    if (!jsonValue) {
        return [];
    }

    return JSON.parse(jsonValue);
}

initializeGame();
