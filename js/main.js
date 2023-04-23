const questionGenerator = getQuestion();

const input1 = NumberInputElement("inp-1");
input1.init();
const input2 = NumberInputElement("inp-2");
input2.init();
const input3 = NumberInputElement("inp-3");
input3.init();

const sign = TextElement("operator");

let isGameOver = false;
let totalScore = 0;
let question;

async function submitAnswer(event) {
  const { i1, i2, i3, operator, score } = question;
  const a = input1.getValue();
  const b = input2.getValue();
  const c = input3.getValue();

  let answer;
  const computedAnswer = calcEquation(i1, i2, i3, operator);
  switch (null) {
    case i1:
      answer = a;
      break;
    case i2:
      answer = b;
      break;
    case i3:
      answer = c;
      break;
    default:
      answer = undefined;
  }

  if (computedAnswer === answer) {
    totalScore = totalScore + score;
    console.log("Great!");
    confetti(event);
    generateNextQuestion();
  } else {
    isGameOver = true;
    console.log("Game-over");
  }
}

function initQuestion(question) {
  const { i1, i2, i3, operator } = question;
  input1.update(i1);
  input2.update(i2);
  input3.update(i3);
  sign.update(operator);
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
generateNextQuestion();
