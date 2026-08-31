import test from "node:test";
import assert from "node:assert/strict";
import { applyAction, createInitialState } from "../game.js";

test("initial state is playable and independent", () => {
  const first = createInitialState();
  const second = createInitialState();
  first.history.push("changed");
  assert.equal(first.status, "playing");
  assert.deepEqual(second.history, []);
});

test("actions produce new state without mutating the old state", () => {
  const start = createInitialState();
  const next = applyAction(start, "build");
  assert.equal(start.turn, 0);
  assert.equal(next.turn, 1);
  assert.equal(next.cash, 9);
  assert.equal(next.traction, 3);
});

test("three build decisions reach the success ending", () => {
  let state = createInitialState();
  state = applyAction(state, "build");
  state = applyAction(state, "build");
  state = applyAction(state, "build");
  assert.equal(state.status, "won");
  assert.match(state.feedback, /product–market fit/);
});

test("the turn limit produces an ending", () => {
  let state = createInitialState();
  for (let turn = 0; turn < 6; turn += 1) state = applyAction(state, "raise");
  assert.equal(state.status, "ended");
});

test("unknown actions fail loudly", () => {
  assert.throws(() => applyAction(createInitialState(), "guess"), /Unknown action/);
});
