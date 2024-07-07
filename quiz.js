const questions = [
  {
      question: "Nurses comprise the largest number of workers in the health sector.",
    answers: [
      { text: "True", correct: true },
      { text: "False", correct: false }
    ]
  },

  {
      question: "The COVAX initiative was aimed at the following- ",
    answers: [
      { text: "Work for global equitable access to COVID-19 vaccines", correct: false },
      { text: "Develop a set of tools to fight the virus", correct: false },
      { text: "Support developing countries with access to the vaccines", correct: false },
      { text: "All the above", correct: true }
    ]
  },

  {
      question: "What was the official annual campaign run by the World Health Organization (WHO) for the year 2021?",
    answers: [
      { text: "Year of the Cardiologist", correct: false },
      { text: "Year of the Nurse and Midwives", correct: false },
      { text: "Year of Health and Care Workers", correct: true }
    ]
  },

  {
      question: "In the year 2017, how many women approximately died from preventable causes pertaining to pregnancy and childbirth each day globally?",
    answers: [
      { text: "410", correct: false },
      { text: "610", correct: false },
      { text: "810", correct: true }
    ]
  },
  {
      question: "____% households globally lack access to basic hand-washing facilities.",
    answers: [
      { text: "20", correct: false },
      { text: "40", correct: true },
      { text: "60", correct: false }
    ]
  },
  ];


const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion(){
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + "." + currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButton.appendChild(button);
    if (answer.correct){
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click',selectAnswer);
  })
}

function resetState(){
  nextButton.style.display = "none";
  while(answerButton.firstChild){
    answerButton.removeChild(answerButton.firstChild);
  }
}

function selectAnswer(e){
  const selectBtn = e.target;
  const isCorrect = selectBtn.dataset.correct == 'true';
  if (isCorrect){
    selectBtn.classList.add("correct");
    score++;
  }
  else{
    selectBtn.classList.add("incorrect");
  }
  Array.from(answerButton.children).forEach(button => {
    if (button.dataset.correct == "true"){
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore(){
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

function handleNextButton(){
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length){
    showQuestion();
  }
  else{
    showScore();
  }
}

nextButton.addEventListener("click",() => {
  if (currentQuestionIndex < questions.length){
    handleNextButton();
  }
  else{
    startQuiz();
  }
})

startQuiz();