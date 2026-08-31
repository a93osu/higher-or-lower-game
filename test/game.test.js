import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import "../game.js";

const {
  STARTING_LIVES,
  applyGuess,
  createInitialState,
  generateDifferentNumber,
  generateNumber
} = globalThis.HigherLowerGame;

function sequenceRandom(...values) {
  let index = 0;
  return () => values[Math.min(index++, values.length - 1)];
}

test("initial state starts a playable game", () => {
  const state = createInitialState(() => 0.49);
  assert.deepEqual(state, {
    currentNumber: 50,
    score: 0,
    highScore: 0,
    lives: STARTING_LIVES,
    status: "playing",
    feedback: "Will the next number be higher or lower?",
    feedbackType: "neutral"
  });
});

test("generated numbers stay between 1 and 100", () => {
  assert.equal(generateNumber(() => 0), 1);
  assert.equal(generateNumber(() => 0.999999), 100);
});

test("the next number can never tie the current number", () => {
  const random = sequenceRandom(0.49, 0.49, 0.74);
  assert.equal(generateDifferentNumber(50, random), 75);
});

test("tie prevention has a bounded fallback", () => {
  assert.equal(generateDifferentNumber(50, () => 0.49), 51);
  assert.equal(generateDifferentNumber(100, () => 0.999999), 99);
});

test("a correct higher guess increases the score", () => {
  const start = { ...createInitialState(() => 0.49), currentNumber: 50 };
  const next = applyGuess(start, "higher", () => 0.75);
  assert.equal(next.currentNumber, 76);
  assert.equal(next.score, 1);
  assert.equal(next.lives, 3);
  assert.equal(next.feedback, "✓ Correct! 76 is higher than 50.");
  assert.equal(next.feedbackType, "correct");
  assert.equal(start.score, 0);
});

test("a correct lower guess increases the score", () => {
  const start = { ...createInitialState(() => 0.49), currentNumber: 50 };
  const next = applyGuess(start, "lower", () => 0.1);
  assert.equal(next.currentNumber, 11);
  assert.equal(next.score, 1);
  assert.equal(next.highScore, 1);
  assert.equal(next.lives, 3);
});

test("an incorrect guess removes one life", () => {
  const start = { ...createInitialState(() => 0.49), currentNumber: 50 };
  const next = applyGuess(start, "higher", () => 0.1);
  assert.equal(next.score, 0);
  assert.equal(next.lives, 2);
  assert.equal(next.feedback, "✕ Incorrect! 11 is lower than 50.");
  assert.equal(next.feedbackType, "incorrect");
});

test("a lower guess fails when the next number is higher", () => {
  const start = { ...createInitialState(() => 0.49), currentNumber: 50 };
  const next = applyGuess(start, "lower", () => 0.75);
  assert.equal(next.currentNumber, 76);
  assert.equal(next.score, 0);
  assert.equal(next.lives, 2);
  assert.equal(next.feedback, "✕ Incorrect! 76 is higher than 50.");
});

test("multiple rounds use each generated number as the next comparison point", () => {
  let state = { ...createInitialState(() => 0), currentNumber: 1 };
  state = applyGuess(state, "higher", () => 0.05);
  assert.equal(state.currentNumber, 6);
  assert.equal(state.score, 1);
  assert.equal(state.lives, 3);

  state = applyGuess(state, "higher", () => 0.03);
  assert.equal(state.currentNumber, 4);
  assert.equal(state.score, 1);
  assert.equal(state.lives, 2);
});

test("high score updates immediately and never decreases", () => {
  let state = { ...createInitialState(() => 0.49), currentNumber: 50 };
  state = applyGuess(state, "higher", () => 0.75);
  assert.equal(state.score, 1);
  assert.equal(state.highScore, 1);

  state = applyGuess(state, "higher", () => 0.1);
  assert.equal(state.score, 1);
  assert.equal(state.highScore, 1);
});

test("losing the last life ends the game and reports the final score", () => {
  const start = {
    ...createInitialState(() => 0.49),
    currentNumber: 50,
    score: 4,
    highScore: 7,
    lives: 1
  };
  const ended = applyGuess(start, "higher", () => 0.1);
  assert.equal(ended.status, "game-over");
  assert.equal(ended.lives, 0);
  assert.equal(ended.score, 4);
  assert.equal(ended.highScore, 7);
  assert.strictEqual(applyGuess(ended, "lower", () => 0.9), ended);
});

test("a new initial state resets the game while preserving high score", () => {
  const reset = createInitialState(() => 0.24, 6);
  assert.equal(reset.currentNumber, 25);
  assert.equal(reset.score, 0);
  assert.equal(reset.highScore, 6);
  assert.equal(reset.lives, 3);
  assert.equal(reset.status, "playing");
  assert.equal(reset.feedback, "Will the next number be higher or lower?");
  assert.equal(reset.feedbackType, "neutral");
});

test("unknown guesses fail loudly", () => {
  assert.throws(() => applyGuess(createInitialState(), "same"), /Unknown guess/);
});

test("the page loads game logic before the app without a dash placeholder", () => {
  const html = fs.readFileSync(new URL("../index.html", import.meta.url), "utf8");
  assert.match(html, /<script src="game\.js"><\/script>\s*<script src="app\.js"><\/script>/);
  assert.doesNotMatch(html, /id="current-number">—</);
  assert.doesNotMatch(html, /type="module"/);
});
