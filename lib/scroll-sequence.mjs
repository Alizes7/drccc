export function clamp01(value) {
  return Math.min(1, Math.max(0, Number.isFinite(value) ? value : 0));
}

export function progressToFrame(progress, frameCount) {
  if (!Number.isInteger(frameCount) || frameCount < 1) return 0;
  return Math.min(frameCount - 1, Math.floor(clamp01(progress) * (frameCount - 1)));
}

export function frameFileName(index) {
  const safeIndex = Math.max(0, Math.floor(index));
  return `ezgif-frame-${String(safeIndex + 1).padStart(3, "0")}.jpg`;
}

export function sequenceProgress(scrollY, startY, distance) {
  if (!Number.isFinite(distance) || distance <= 0) return 0;
  return clamp01((scrollY - startY) / distance);
}
