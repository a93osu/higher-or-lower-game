export const ACTIONS = Object.freeze({
  build: Object.freeze({ cash: -3, traction: 3, message: "You shipped a useful product improvement." }),
  sell: Object.freeze({ cash: 1, traction: 1, message: "A customer conversation produced a small sale." }),
  raise: Object.freeze({ cash: 5, traction: 0, message: "New financing bought time, but no customer proof." })
});

export function createInitialState() {
  return {
    turn: 0,
    cash: 12,
    traction: 0,
    status: "playing",
    feedback: "You have six turns. Reach eight traction before cash reaches zero.",
    history: []
  };
}

export function applyAction(state, actionName) {
  if (state.status !== "playing") return state;

  const action = ACTIONS[actionName];
  if (!action) throw new Error(`Unknown action: ${actionName}`);

  const next = {
    ...state,
    turn: state.turn + 1,
    cash: state.cash + action.cash,
    traction: state.traction + action.traction,
    feedback: action.message,
    history: [...state.history, action.message]
  };

  if (next.cash <= 0) {
    return { ...next, cash: 0, status: "failed", feedback: "Cash reached zero. The venture stopped." };
  }
  if (next.traction >= 8) {
    return { ...next, status: "won", feedback: "You reached product–market fit before running out of cash." };
  }
  if (next.turn >= 6) {
    return { ...next, status: "ended", feedback: "Time expired before the venture reached product–market fit." };
  }
  return next;
}
