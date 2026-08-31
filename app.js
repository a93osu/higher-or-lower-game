const { applyGuess, createInitialState } = globalThis.HigherLowerGame;

const elements = {
  score: document.querySelector("#score"),
  lives: document.querySelector("#lives"),
  currentNumber: document.querySelector("#current-number"),
  feedback: document.querySelector("#feedback"),
  actions: document.querySelector("#actions"),
  restart: document.querySelector("#restart")
};

let state = createInitialState();

function render() {
  elements.score.textContent = state.score;
  elements.lives.textContent = state.lives;
  elements.currentNumber.textContent = state.currentNumber;
  elements.feedback.textContent = state.feedback;

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
  state = createInitialState();
  render();
});

render();
