/* eslint-disable no-shadow */
/* eslint-disable prefer-template */
/* eslint-disable no-unused-expressions */

const scoreDisplay = document.querySelector(".score");
const resultWrapper = document.querySelector(".result");
const form = document.querySelector(".quiz-form");
const inputs = document.querySelectorAll("input[type=radio]");

const checkAnswers = userAnswers => {
  const correctAnswers = ["B", "B", "B", "B"];
  const checkedAnswers = [];
  userAnswers.forEach((answer, index) => {
    answer === correctAnswers[index]
      ? checkedAnswers.push("true")
      : checkedAnswers.push("false");
  });
  return checkedAnswers;
};

const calculateScore = answers => {
  const correctAnswers = answers.filter(answer => answer === "true");
  return (correctAnswers.length / answers.length) * 100;
};

const displayScore = score => {
  scoreDisplay.textContent = score + "%";
  scoreDisplay.classList.add("text-primary");
  if (score === 100) {
    scoreDisplay.classList.remove("text-primary");
    scoreDisplay.classList.add("text-success");
  }
  resultWrapper.classList.remove("d-none");
};

const displayAnimatedScore = score => {
  let output = 0;
  if (score === 0) {
    displayScore(output);
  } else {
    const timer = setInterval(() => {
      displayScore(output);

      if (output === score) {
        clearInterval(timer);
      } else {
        output++;
      }
    }, 20);
    displayScore(output);
  }
};

const quizCheck = e => {
  e.preventDefault();

  const {
    q1Val = form.q1.value,
    q2Val = form.q2.value,
    q3Val = form.q3.value,
    q4Val = form.q4.value
  } = form;

  const userAnswers = [q1Val, q2Val, q3Val, q4Val];

  // eslint-disable-next-line no-restricted-globals
  scrollTo(0, 0);

  const answers = checkAnswers(userAnswers);
  const calculatedScore = calculateScore(answers);
  displayAnimatedScore(calculatedScore);
};
form.addEventListener("submit", e => quizCheck(e));

inputs.forEach(input =>
  input.addEventListener("change", () => {
    resultWrapper.classList.add("d-none");
  })
);
