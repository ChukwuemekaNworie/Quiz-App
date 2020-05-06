
const question = document.getElementById("question");
const nextButton = document.getElementById("next-btn");
const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");
const options = Array.from(document.getElementsByClassName("options-text"));
let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let quizOption1 = document.getElementById("option-1");
let quizOption2 = document.getElementById("option-2");
let quizOption3 = document.getElementById("option-3");
let quizOption4 = document.getElementById("option-4");

let questions = [
  {
    question:
      "Using DOM syntax, ___________ allows us to create a new element",
    option1: "NewParagraph = document.createelement",
    option2: "newparagraph = document.createeLement",
    option3: "const bodyNode = document.queryselector",
    option4: "newParagraph = document.createElement",
    answer: 4,
  },
  {
    question: `DOM Element are referred as`,
    option1: "Node",
    option2: "variable",
    option3: "Node.js",
    option4: "All of the bove",
    answer: 1,
  },
  {
    question:
      "_______ allows you to select a particular node ?",
    option1: `Document.Querysellector()`,
    option2: `document.createElement()`,
    option3: `document.querySelector()`,
    option4: `Document.querySElector`,
    answer: 3,
  },
  {
    question:
      "A webpage has a tree-like structure which has all the html elements as nodes (branches)",
    option1: "True",
    option2: "false",
    option3: "None of the above",
    option4: "Only 1 and 2",
    answer: 1,
  },
  {
    question:
      "DOM stands for?",
    option1: "document object mathematics",
    option2: "document object model",
    option3: "development oriented model",
    option4: "document objects models'",
    answer: 2,
  },
];

// Constants
const Correct_Point = 10;
const Max_Questions = 5;

startQuiz = () => {
  questionCounter = 0;
  sscore = 0;
  availableQuestions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter >= Max_Questions) {
    localStorage.setItem("mostRecentScore", score);
    return window.location.assign("end.html");
  }

  questionCounter++;
  questionCounterText.innerText = `${questionCounter} of ${Max_Questions}`;

  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question;

  options.forEach((option) => {
    const number = option.dataset["number"];
    option.innerText = currentQuestion["option" + number];
  });

  availableQuestions.splice(questionIndex, 1);

  acceptingAnswers = true;
};

options.forEach((option) => {
  option.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedOption = e.target;
    const selectedAnswer = selectedOption.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      increaseScore(Correct_Point);
      selectedOption.parentElement.classList.add(classToApply);
    } else {
      selectedOption.parentElement.classList.add(classToApply);

      if (currentQuestion.answer === 1) {
        quizOption1.classList.add("correct");
      } else if (currentQuestion.answer === 2) {
        quizOption2.classList.add("correct");
      } else if (currentQuestion.answer === 3) {
        quizOption3.classList.add("correct");
      } else if (currentQuestion.answer === 4) {
        quizOption4.classList.add("correct");
      }
    }

    setTimeout(() => {
      quizOption1.classList.remove("correct");
      quizOption2.classList.remove("correct");
      quizOption3.classList.remove("correct");
      quizOption4.classList.remove("correct");
      selectedOption.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 650);
  });
});

nextButton.addEventListener("click", (event) => {
  getNewQuestion();
});

increaseScore = (num) => {
  score += num;
  scoreText.innerText = score;
};

startQuiz();