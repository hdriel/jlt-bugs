function confetti(event) {
  party.confetti(event, {
    count: party.variation.range(20, 100),
    speed: party.variation.range(20, 1000),
    size: party.variation.range(1.0, 1.9),
  });
}

function shuffleList(list) {
  return list
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

async function* getQuestion() {
  const shuffledList = shuffleList(QUESTIONS);
  let question;
  let i = 0;
  while ((question = shuffledList[i++])) {
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

async function submitAnswer() {
  const { score } = question ?? {};
  const a = input1.getValue();
  const b = input2.getValue();
  const c = input3.getValue();
  const operator = sign.getValue();

  const isAnswerCorrectly = isCorrectAnswer(a, b, c, operator);

  if (isAnswerCorrectly) {
    totalScore = totalScore + score;
    console.log("Great!");
    jsConfetti.addConfetti({
      emojis: ["✅"],
      emojiSize: 50,
      confettiNumber: 60,
    });
    generateNextQuestion();
  } else {
    isGameOver = true;
    jsConfetti.addConfetti({
      emojis: ["❌"],
      emojiSize: 100,
      confettiNumber: 30,
    });
    console.log("Game-over");
  }
}

function initQuestion(question) {
  const { i1, i2, i3, operator, no } = question;

  input3.update(i3);
  input3.element.focus();

  input2.update(i2);
  input2.disabled(i2 !== null);
  input2.element.focus();

  input1.update(i1);
  input1.disabled(i1 !== null);
  input1.element.focus();

  sign.update(operator);
  gameTitle.update(`Question #${no}/${QUESTIONS.length}`);
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
