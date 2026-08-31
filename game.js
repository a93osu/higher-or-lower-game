(() => {
const STARTING_LIVES = 3;

function generateNumber(random = Math.random) {
  return Math.floor(random() * 100) + 1;
}

function generateDifferentNumber(currentNumber, random = Math.random) {
  const MAX_ATTEMPTS = 100;

  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt += 1) {
    const candidate = generateNumber(random);
    if (candidate !== currentNumber) return candidate;
  }

  return currentNumber === 100 ? 99 : currentNumber + 1;
}

function createInitialState(random = Math.random) {
  return {
    currentNumber: generateNumber(random),
    score: 0,
    lives: STARTING_LIVES,
    status: "playing",
    feedback: "Will the next number be higher or lower?"
  };
}

function applyGuess(state, guess, random = Math.random) {
  if (state.status !== "playing") return state;
  if (guess !== "higher" && guess !== "lower") {
    throw new Error(`Unknown guess: ${guess}`);
  }

  const previousNumber = state.currentNumber;
  const nextNumber = generateDifferentNumber(previousNumber, random);
  const isCorrect = guess === "higher"
    ? nextNumber > previousNumber
    : nextNumber < previousNumber;
  const score = state.score + (isCorrect ? 1 : 0);
  const lives = state.lives - (isCorrect ? 0 : 1);
  const result = isCorrect ? "Correct!" : "Incorrect!";
  const comparison = nextNumber > previousNumber ? "higher" : "lower";

  if (lives === 0) {
    return {
      currentNumber: nextNumber,
      score,
      lives,
      status: "game-over",
      feedback: `${result} ${nextNumber} is ${comparison} than ${previousNumber}. Game over! Final score: ${score}.`
    };
  }

  return {
    currentNumber: nextNumber,
    score,
    lives,
    status: "playing",
    feedback: `${result} ${nextNumber} is ${comparison} than ${previousNumber}. Guess again!`
  };
}

globalThis.HigherLowerGame = Object.freeze({
  STARTING_LIVES,
  generateNumber,
  generateDifferentNumber,
  createInitialState,
  applyGuess
});
})();
