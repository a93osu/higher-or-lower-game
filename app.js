const { applyGuess, createInitialState } = globalThis.HigherLowerGame;

const elements = {
  score: document.querySelector("#score"),
  highScore: document.querySelector("#high-score"),
  lives: document.querySelector("#lives"),
  currentNumber: document.querySelector("#current-number"),
  feedback: document.querySelector("#feedback"),
  actions: document.querySelector("#actions"),
  gameCard: document.querySelector(".game-card"),
  gameOver: document.querySelector("#game-over"),
  finalScore: document.querySelector("#final-score"),
  finalHighScore: document.querySelector("#final-high-score"),
  restart: document.querySelector("#restart")
};

let state = createInitialState();

function render() {
  elements.score.textContent = state.score;
  elements.highScore.textContent = state.highScore;
  elements.lives.textContent = state.lives;
  elements.currentNumber.textContent = state.currentNumber;
  elements.feedback.textContent = state.feedback;
  elements.feedback.className = `feedback feedback--${state.feedbackType}`;

  const isGameOver = state.status === "game-over";
  elements.gameOver.hidden = !isGameOver;
  elements.gameCard.classList.toggle("game-card--over", isGameOver);
  elements.finalScore.textContent = state.score;
  elements.finalHighScore.textContent = state.highScore;

  for (const button of elements.actions.querySelectorAll("button")) {
    button.disabled = state.status !== "playing";
  }
}

elements.actions.addEventListener("click", (event) => {
  const guess = event.target.closest("[data-guess]")?.dataset.guess;
  if (!guess) return;
  state = applyGuess(state, guess);
  render();
});

elements.restart.addEventListener("click", () => {
  state = createInitialState(Math.random, state.highScore);
  render();
});

render();
