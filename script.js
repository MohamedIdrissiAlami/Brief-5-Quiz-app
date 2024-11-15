// DOM Elements
const startButtons = document.querySelectorAll(".start-btn");
const homepage = document.querySelector(".homepage");
const quizInterface = document.querySelector(".quiz-interface");
const resultsPage = document.querySelector(".results-page");

const questionText = document.querySelector(".question-text");
const optionsContainer = document.querySelector(".options");
const nextButton = document.querySelector(".next-btn");

const scoreDisplay = document.querySelector(".score span");
const timerDisplay = document.querySelector(".timer span");
const progressBar = document.querySelector(".progress");

const correctAnswersDisplay = document.getElementById("correct-answers");
const timeTakenDisplay = document.getElementById("time-taken");

const retryButton = document.querySelector(".retry-btn");
const homeButton = document.querySelector(".home-btn");

// Quiz Data
let quizData = [];
let currentQuizIndex = 0;
let currentQuestionIndex = 0;
let score = 0;
let timer;
let timePerQuestion = 15; // Seconds
let timeElapsed = 0;

// Quiz List Data
const quizzes = {
  general: [
    {
      question: "ما هي عاصمة فرنسا؟",
      options: ["باريس", "لندن", "برلين", "مدريد"],
      correct: 0,
    },
    {
      question: "هل الأرض كروية؟",
      options: ["نعم", "لا"],
      correct: 0,
    },
  ],
  math: [
    {
      question: "ما هو حاصل جمع 5 + 3؟",
      options: ["6", "7", "8", "9"],
      correct: 2,
    },
    {
      question: "ما هو ناتج 2 × 6؟",
      options: ["10", "12", "14", "16"],
      correct: 1,
    },
  ],
  programming: [
    {
      question: "ما هي لغة البرمجة الأكثر استخدامًا؟",
      options: ["C++", "Python", "Java", "JavaScript"],
      correct: 3,
    },
    {
      question: "ما هي وحدة قياس سرعة الحواسيب؟",
      options: ["كيلو بايت", "ميجا هرتز", "جيجا هرتز", "تيرا بايت"],
      correct: 2,
    },
  ],
};

// Start Quiz
startButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    homepage.style.display = "none";
    quizInterface.style.display = "block";
    // Load Quiz Data
    if (index === 0) quizData = quizzes.general;
    else if (index === 1) quizData = quizzes.math;
    else quizData = quizzes.programming;

    startQuiz();
  });
});

// Start Quiz Logic
function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  timeElapsed = 0;
  loadQuestion();
}

// Load Question
function loadQuestion() {
  clearInterval(timer);
  const question = quizData[currentQuestionIndex];

  questionText.textContent = question.question;
  optionsContainer.innerHTML = "";

  question.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.className = "option";
    button.textContent = option;
    button.addEventListener("click", () => checkAnswer(index));
    optionsContainer.appendChild(button);
  });

  updateProgressBar();
  startTimer();
}

// Check Answer
function checkAnswer(selectedIndex) {
  const question = quizData[currentQuestionIndex];
  if (selectedIndex === question.correct) {
    score += 10; // Increase score for correct answer
  }

  nextQuestion();
}

// Next Question
function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < quizData.length) {
    loadQuestion();
  } else {
    endQuiz();
  }
}

// Update Progress Bar
function updateProgressBar() {
  const progress = ((currentQuestionIndex + 1) / quizData.length) * 100;
  progressBar.style.width = `${progress}%`;
}

// Timer
function startTimer() {
  let timeLeft = timePerQuestion;
  timerDisplay.textContent = timeLeft;
  timer = setInterval(() => {
    timeLeft--;
    timeElapsed++;
    timerDisplay.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      nextQuestion();
    }
  }, 1000);
}

// End Quiz
function endQuiz() {
  quizInterface.style.display = "none";
  resultsPage.style.display = "block";
  correctAnswersDisplay.textContent = score / 10;
  timeTakenDisplay.textContent = timeElapsed;
}

// Retry Quiz
retryButton.addEventListener("click", () => {
  resultsPage.style.display = "none";
  homepage.style.display = "block";
});

// Return to Homepage
homeButton.addEventListener("click", () => {
  resultsPage.style.display = "none";
  homepage.style.display = "block";
});
