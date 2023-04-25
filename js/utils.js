function confetti(event) {
  party.confetti(event, {
    count: party.variation.range(20, 100),
    speed: party.variation.range(20, 1000),
    size: party.variation.range(1.0, 1.9),
  });
}

async function* getQuestion() {
  let question;
  let i = 0;
  while ((question = QUESTIONS[i++])) {
    yield { no: i, ...question };
  }
}

function isCorrectAnswer(a, b, c, op) {
  return eval(`${a} ${op} ${b} === ${c}`);
}

function setGameOver() {
  gameTitle.update(`GAME-OVER (score: ${totalScore})`);
  input1.remove();
  input2.remove();
  input3.remove();
  sign.remove();
  [...document.querySelectorAll(".sign")].forEach((sign) => sign.remove());
  document.getElementById("submit").remove();
}

async function submitAnswer(event) {
  const { score } = question;
  const a = input1.getValue();
  const b = input2.getValue();
  const c = input3.getValue();
  const operator = sign.getValue();

  const isAnswerCorrectly = isCorrectAnswer(a, b, c, operator);

  if (isAnswerCorrectly) {
    totalScore = totalScore + score;
    console.log("Great!");
    jsConfetti.addConfetti();
    generateNextQuestion();
  } else {
    isGameOver = true;
    console.log("Game-over");
  }
}

function initQuestion(question) {
  const { i1, i2, i3, operator, no } = question;

  input1.update(i1);
  input1.disabled(i1 !== null);
  input1.element.focus();

  input2.update(i2);
  input2.disabled(i2 !== null);
  input2.element.focus();

  input3.update(i3);
  input3.disabled(i3 !== null);
  input3.element.focus();

  sign.update(operator);
  gameTitle.update(`Question #${no}`);
}

function generateNextQuestion() {
  questionGenerator
    .next()
    .then((_question) => {
      question = _question.value;
      return _question.done;
    })
    .then((isDone) => {
      if (isDone) isGameOver = true;
      else initQuestion(question);
    });
}
