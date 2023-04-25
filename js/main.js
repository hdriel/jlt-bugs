const jsConfetti = new JSConfetti({});
let questionGenerator = getQuestion();
let isGameOver = false;
let totalScore = 0;
let question;

const [input1, input2, input3, sign, gameTitle, gameOver] = [
  NumberInputElement("inp-1"),
  NumberInputElement("inp-2"),
  NumberInputElement("inp-3"),
  TextElement("operator"),
  TextElement("game-title"),
  TextElement("game-over"),
];
input1.init();
input2.init();
input3.init();
sign.init();
gameTitle.init();
gameOver.init();

generateNextQuestion();

subscribeEvent(
  GLOBAL_EVENTS.PRESS_KEY_ENTER,
  async ({ detail: event }) => !isGameOver && (await submitAnswer(event))
);

document.body.addEventListener(
  "click",
  (event) => isGameOver && confetti(event)
);
