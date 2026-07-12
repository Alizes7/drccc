import { readFile, readdir } from "node:fs/promises";
import { join } from "node:path";

const root = process.cwd();
const files = [
  "next.config.js",
  "public/_headers",
  "components/ContactSection.tsx",
  "app/layout.tsx",
];
const requiredHeaders = [
  "X-Content-Type-Options",
  "Referrer-Policy",
  "Permissions-Policy",
  "Strict-Transport-Security",
  "Content-Security-Policy",
];

const contents = new Map(await Promise.all(files.map(async (file) => [file, await readFile(join(root, file), "utf8")])));
const combined = [...contents.values()].join("\n");
const failures = [];

if (combined.includes("YOUR_FORM_ID")) failures.push("placeholder contact endpoint remains");
if (/sk-[A-Za-z0-9_-]{20,}|AIza[A-Za-z0-9_-]{20,}|ghp_[A-Za-z0-9_]{20,}/.test(combined)) {
  failures.push("secret-like token found in tracked source");
}
for (const header of requiredHeaders) {
  if (!combined.includes(header)) failures.push(`missing required header: ${header}`);
}
if (combined.includes('target="_blank"') && !combined.includes("noopener")) {
  failures.push("blank-target link without noopener");
}
if (/href=["']http:\/\//.test(combined)) failures.push("insecure HTTP link found in tracked source");

const publicFiles = await readdir(join(root, "public"));
if (publicFiles.some((file) => /\.map$/.test(file))) failures.push("source map found in public output");

if (failures.length) {
  console.error(failures.map((failure) => `- ${failure}`).join("\n"));
  process.exit(1);
}

console.log("Security source checks passed.");
