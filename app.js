import { applyAction, createInitialState } from "./game.js";

const elements = {
  turn: document.querySelector("#turn"),
  cash: document.querySelector("#cash"),
  traction: document.querySelector("#traction"),
  feedback: document.querySelector("#feedback"),
  history: document.querySelector("#history"),
  actions: document.querySelector("#actions"),
  restart: document.querySelector("#restart")
};

let state = createInitialState();

function render() {
  elements.turn.textContent = state.turn;
  elements.cash.textContent = state.cash;
  elements.traction.textContent = state.traction;
  elements.feedback.textContent = state.feedback;
  elements.history.replaceChildren(
    ...state.history.map((entry) => {
      const item = document.createElement("li");
      item.textContent = entry;
      return item;
    })
  );
  for (const button of elements.actions.querySelectorAll("button")) {
    button.disabled = state.status !== "playing";
  }
}

elements.actions.addEventListener("click", (event) => {
  const action = event.target.closest("[data-action]")?.dataset.action;
  if (!action) return;
  state = applyAction(state, action);
  render();
});

elements.restart.addEventListener("click", () => {
  state = createInitialState();
  render();
});

render();
