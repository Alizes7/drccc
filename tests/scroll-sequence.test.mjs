import test from "node:test";
import assert from "node:assert/strict";
import {
  clamp01,
  progressToFrame,
  frameFileName,
  sequenceProgress,
} from "../lib/scroll-sequence.mjs";

test("clamp01 limits progress to the valid range", () => {
  assert.equal(clamp01(-0.2), 0);
  assert.equal(clamp01(0.35), 0.35);
  assert.equal(clamp01(1.4), 1);
});

test("progress maps the first and final frames exactly", () => {
  assert.equal(progressToFrame(0, 240), 0);
  assert.equal(progressToFrame(0.5, 240), 119);
  assert.equal(progressToFrame(1, 240), 239);
});

test("frame names are zero-padded and bounded by the caller", () => {
  assert.equal(frameFileName(0), "ezgif-frame-001.jpg");
  assert.equal(frameFileName(119), "ezgif-frame-120.jpg");
  assert.equal(frameFileName(239), "ezgif-frame-240.jpg");
});

test("sequence progress uses the pinned section range", () => {
  assert.equal(sequenceProgress(900, 1000, 800), 0);
  assert.equal(sequenceProgress(1400, 1000, 800), 0.5);
  assert.equal(sequenceProgress(2000, 1000, 800), 1);
});
