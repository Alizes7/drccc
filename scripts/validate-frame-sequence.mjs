import { readdir, stat } from "node:fs/promises";
import { join } from "node:path";

const directory = join(process.cwd(), "public", "frames");
const files = (await readdir(directory))
  .filter((file) => /^ezgif-frame-\d{3}\.jpg$/.test(file))
  .sort();
const expected = Array.from(
  { length: 240 },
  (_, index) => `ezgif-frame-${String(index + 1).padStart(3, "0")}.jpg`,
);
const missing = expected.filter((file) => !files.includes(file));
const empty = [];

for (const file of files) {
  if ((await stat(join(directory, file))).size === 0) empty.push(file);
}

if (files.length !== 240 || missing.length || empty.length) {
  console.error(JSON.stringify({ count: files.length, missing, empty }, null, 2));
  process.exit(1);
}

console.log(`Frame sequence valid: ${files.length} files.`);
