function confetti(event) {
  party.confetti(event, {
    count: party.variation.range(20, 40),
    speed: party.variation.range(20, 300),
    size: party.variation.range(1.0, 1.9),
  });
}

async function* getQuestion() {
  let currentQuestion;
  let i = 0;
  do {
    currentQuestion = QUESTIONS[i++];
    yield { no: i, ...currentQuestion };
  } while (currentQuestion);
}
