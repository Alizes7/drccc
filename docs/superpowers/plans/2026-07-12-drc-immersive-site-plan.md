# DRC Immersive Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Import the supplied DRC Advogados Next.js project, build the approved cinematic scroll-sequence hero, restyle the institutional page around it, and ship a responsive static site with defense-in-depth security controls.

**Architecture:** Keep the existing single-page Next.js structure and section components. Add a focused `ScrollSequenceHero` client component backed by pure frame/progress utilities, then pass normalized hero progress to a separate narrative overlay. Keep the rest of the page on native vertical scrolling, use tokenized CSS for visual consistency, and preserve static export with host-level security headers.

**Tech Stack:** Next.js 14.2, React 18, TypeScript, Tailwind CSS, Framer Motion, Lucide React, HTML Canvas, static JPG assets, Node `--test` for pure utilities, Next production build.

## Global Constraints

- The hero uses the supplied 240-frame JPG sequence as its primary visual asset.
- Desktop hero pin duration is `320vh`; mobile hero pin duration is `240vh`.
- Mobile uses every second source frame for a 120-frame beginning-to-end reveal.
- `prefers-reduced-motion` disables frame scrubbing and shows a static completed-symbol state.
- Native vertical scrolling remains intact; wheel and touch gestures are never hijacked.
- Navigation and contact controls maintain at least 44px touch targets.
- Content uses a 4px base spacing system with semantic tokens and no raw component hex values.
- Display typography is Newsreader, body typography is Manrope, and utility typography is IBM Plex Mono.
- The first viewport must identify DRC Advogados and expose a clear contact path.
- The site must remain usable at 375px, 768px, 1024px, and 1440px widths.
- No API keys, private tokens, service credentials, or provider secrets may be placed in client code, `public/`, or `NEXT_PUBLIC_*` variables.
- The contact form must fail closed when its real endpoint is not configured; `YOUR_FORM_ID` must never ship.
- Security headers must be synchronized between `next.config.js` and `public/_headers`.
- Production delivery requires `npm run lint`, `npm run build`, `npm audit`, the frame validation script, and the browser verification matrix to pass.

---

## File Map

### Imported baseline

- Create: `app/`, `components/`, `lib/`, `public/`, `next.config.js`, `package.json`, `package-lock.json`, `tailwind.config.ts`, `tsconfig.json` from `C:\Users\allys\Downloads\drc-aa-main.zip`.
- Create: `public/frames/ezgif-frame-001.jpg` through `public/frames/ezgif-frame-240.jpg` from `C:\Users\allys\Downloads\ezgif-7d1bfa0954d76ddc-jpg.zip`.

### New implementation files

- Create: `lib/scroll-sequence.mjs` for framework-independent progress and frame-name utilities.
- Create: `lib/scroll-sequence.d.ts` for the TypeScript interface consumed by the client component.
- Create: `tests/scroll-sequence.test.mjs` for deterministic utility tests using Node's built-in test runner.
- Create: `components/ScrollSequenceHero.tsx` for canvas setup, frame cache, scroll mapping, and fallback states.
- Create: `components/HeroNarrative.tsx` for progress-driven copy and the hero CTA.
- Create: `components/SectionShell.tsx` for shared content width, gutters, tone, and vertical rhythm.
- Create: `scripts/validate-frame-sequence.mjs` for asset count, naming, nonzero file sizes, and placeholder checks.

### Existing files to modify

- Modify: `app/page.tsx` to compose the new hero and existing sections in the approved narrative order.
- Modify: `app/globals.css` to replace flat visual constants with primitive, semantic, and component token layers and the approved typography/palette.
- Modify: `app/layout.tsx` to keep metadata accurate, preserve zoom, and use only the approved font-loading path reflected in the CSP.
- Modify: `components/Navbar.tsx`, the navigation owner currently imported by `app/page.tsx`.
- Modify: `components/HeroSection.tsx` to remain the thin composition wrapper for the new `ScrollSequenceHero`.
- Modify: `components/AboutSection.tsx`, `components/AreasSection.tsx`, `components/DiferenciaisSection.tsx`, `components/HistoriaSection.tsx`, `components/EquipeSection.tsx`, `components/DepoimentosSection.tsx`, `components/ArtigosSection.tsx`, `components/CTASection.tsx`, and `components/Footer.tsx` so they consume the new tokens and section structure.
- Modify: `components/ContactSection.tsx` to use explicit endpoint configuration, bounded input handling, and fail-closed behavior.
- Modify: `next.config.js` to centralize the final security header values and keep static export behavior.
- Modify: `public/_headers` to mirror the final security headers and cache rules for the static host.
- Modify: `package.json` to add `test:sequence` and `security:check` scripts without adding a runtime dependency.
- Modify: `package-lock.json` only if dependency installation changes it; do not update unrelated packages.

---

### Task 1: Import the project and verify the baseline

**Files:**
- Create: all imported baseline files listed in the File Map.
- Create: `public/frames/ezgif-frame-001.jpg` through `public/frames/ezgif-frame-240.jpg`.
- Modify: `.gitignore` only if it is absent, adding `.preview/`, `.next/`, `out/`, and local environment files.

**Interfaces:**
- Produces a runnable Next.js workspace with the supplied content and frames available under `/frames/`.

- [ ] **Step 1: Extract the supplied project into a temporary directory**

Run in PowerShell from `C:\Users\allys\Documents\Drc`:

```powershell
New-Item -ItemType Directory -Force -Path 'C:\tmp\drc-aa-main-import' | Out-Null
Expand-Archive -LiteralPath 'C:\Users\allys\Downloads\drc-aa-main.zip' -DestinationPath 'C:\tmp\drc-aa-main-import' -Force
Copy-Item -LiteralPath 'C:\tmp\drc-aa-main-import\drc-aa-main\*' -Destination '.' -Recurse -Force
New-Item -ItemType Directory -Force -Path 'public\frames' | Out-Null
New-Item -ItemType Directory -Force -Path 'C:\tmp\drc-frames-import' | Out-Null
Expand-Archive -LiteralPath 'C:\Users\allys\Downloads\ezgif-7d1bfa0954d76ddc-jpg.zip' -DestinationPath 'C:\tmp\drc-frames-import' -Force
Copy-Item -Path 'C:\tmp\drc-frames-import\*.jpg' -Destination 'public\frames' -Force
```

- [ ] **Step 2: Add local-only generated directories to `.gitignore`**

Use these exact entries when `.gitignore` is created or extended:

```gitignore
node_modules/
.next/
out/
.env
.env.*
!.env.example
.preview/
```

- [ ] **Step 3: Install and run the unmodified baseline**

Run:

```powershell
npm ci
npm run lint
npm run build
```

Expected: dependencies install, lint reports no errors, and Next creates a successful static export in `out/`.

- [ ] **Step 4: Verify the frame inventory before writing the renderer**

Run:

```powershell
(Get-ChildItem -LiteralPath 'public\frames' -Filter '*.jpg').Count
```

Expected: `240`.

- [ ] **Step 5: Commit the imported baseline**

```powershell
git add app components lib public next.config.js package.json package-lock.json tailwind.config.ts tsconfig.json .gitignore
git commit -m "chore: import DRC site baseline and frame assets"
```

---

### Task 2: Add deterministic sequence utilities and tests

**Files:**
- Create: `lib/scroll-sequence.mjs`
- Create: `lib/scroll-sequence.d.ts`
- Create: `tests/scroll-sequence.test.mjs`
- Modify: `package.json`

**Interfaces:**
- `clamp01(value: number): number` returns a number in the inclusive range `0..1`.
- `progressToFrame(progress: number, frameCount: number): number` returns a zero-based frame index.
- `frameFileName(index: number): string` returns `ezgif-frame-NNN.jpg`.
- `sequenceProgress(scrollY: number, startY: number, distance: number): number` returns normalized scroll progress.

- [ ] **Step 1: Write the failing Node tests**

Create `tests/scroll-sequence.test.mjs`:

```js
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
```

- [ ] **Step 2: Run the tests and verify the expected failure**

Run:

```powershell
node --test tests/scroll-sequence.test.mjs
```

Expected: FAIL because `lib/scroll-sequence.mjs` does not exist yet.

- [ ] **Step 3: Implement the pure utility module**

Create `lib/scroll-sequence.mjs`:

```js
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
```

Create `lib/scroll-sequence.d.ts`:

```ts
export function clamp01(value: number): number;
export function progressToFrame(progress: number, frameCount: number): number;
export function frameFileName(index: number): string;
export function sequenceProgress(scrollY: number, startY: number, distance: number): number;
```

- [ ] **Step 4: Run the tests and verify they pass**

Run:

```powershell
node --test tests/scroll-sequence.test.mjs
```

Expected: 4 passing tests and 0 failures.

- [ ] **Step 5: Add the test script and commit**

Add this exact script to `package.json`:

```json
"test:sequence": "node --test tests/scroll-sequence.test.mjs"
```

Run:

```powershell
npm run test:sequence
git add lib/scroll-sequence.mjs lib/scroll-sequence.d.ts tests/scroll-sequence.test.mjs package.json
git commit -m "test: add scroll sequence progress utilities"
```

---

### Task 3: Build the scroll-sequence hero renderer

**Files:**
- Create: `components/ScrollSequenceHero.tsx`
- Create: `components/HeroNarrative.tsx`
- Modify: `components/HeroSection.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- `ScrollSequenceHero` accepts `frameCount: number` and `mobileFrameStep: number`; it renders `HeroNarrative` inside the Client Component boundary so no function prop crosses from the Server Component tree.
- `HeroNarrative` accepts `progress: number` and renders the office name, proposition, and contact CTA.
- `ScrollSequenceHero` owns scroll reads and passes normalized progress to `HeroNarrative`; the narrative never reads scroll directly.

- [ ] **Step 1: Implement the hero with a pinned section and canvas**

Create `components/ScrollSequenceHero.tsx` with these required behaviors:

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { frameFileName, progressToFrame, sequenceProgress } from "../lib/scroll-sequence.mjs";

type ScrollSequenceHeroProps = {
  frameCount: number;
  mobileFrameStep: number;
  children: (progress: number) => React.ReactNode;
};

export default function ScrollSequenceHero({
  frameCount,
  mobileFrameStep,
  children,
}: ScrollSequenceHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cacheRef = useRef(new Map<number, HTMLImageElement>());
  const rafRef = useRef<number | null>(null);
  const lastFrameRef = useRef(-1);
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    let cancelled = false;
    const load = (index: number) => new Promise<void>((resolve) => {
      if (cacheRef.current.has(index)) return resolve();
      const image = new Image();
      image.decoding = "async";
      image.src = `/frames/${frameFileName(index)}`;
      image.onload = () => {
        if (!cancelled) cacheRef.current.set(index, image);
        resolve();
      };
      image.onerror = () => resolve();
    });
    const firstBatch = Array.from({ length: Math.min(12, frameCount) }, (_, index) => load(index));
    Promise.all(firstBatch).then(() => {
      if (!cancelled) setReady(true);
      for (let start = 12; start < frameCount; start += 24) {
        const end = Math.min(frameCount, start + 24);
        Promise.all(Array.from({ length: end - start }, (_, offset) => load(start + offset)));
      }
    });
    return () => { cancelled = true; };
  }, [frameCount]);

  useEffect(() => {
    const draw = (frameIndex: number) => {
      const canvas = canvasRef.current;
      const image = cacheRef.current.get(frameIndex);
      if (!canvas || !image || lastFrameRef.current === frameIndex) return;
      const context = canvas.getContext("2d");
      if (!context) return;
      const scale = Math.max(canvas.width / image.naturalWidth, canvas.height / image.naturalHeight);
      const width = image.naturalWidth * scale;
      const height = image.naturalHeight * scale;
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, (canvas.width - width) / 2, (canvas.height - height) / 2, width, height);
      lastFrameRef.current = frameIndex;
    };
    const update = () => {
      rafRef.current = null;
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const startY = window.scrollY + rect.top;
      const distance = section.offsetHeight - window.innerHeight;
      const nextProgress = reducedMotion ? 1 : sequenceProgress(window.scrollY, startY, distance);
      const step = window.innerWidth < 768 ? mobileFrameStep : 1;
      const sampledFrameCount = Math.ceil((frameCount - 1) / step) + 1;
      const sourceIndex = Math.min(frameCount - 1, progressToFrame(nextProgress, sampledFrameCount) * step);
      setProgress(nextProgress);
      draw(Math.min(frameCount - 1, sourceIndex));
    };
    const onScroll = () => {
      if (rafRef.current === null) rafRef.current = window.requestAnimationFrame(update);
    };
    const resize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = Math.max(1, Math.floor(window.innerWidth * window.devicePixelRatio));
      canvas.height = Math.max(1, Math.floor(window.innerHeight * window.devicePixelRatio));
      lastFrameRef.current = -1;
      update();
    };
    resize();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", resize);
      if (rafRef.current !== null) window.cancelAnimationFrame(rafRef.current);
    };
  }, [frameCount, mobileFrameStep, reducedMotion, ready]);

  return (
    <section ref={sectionRef} className="relative h-[240vh] md:h-[320vh]" aria-label="Apresentação DRC Advogados">
      <div className="sticky top-0 h-screen overflow-hidden bg-marble">
        <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full" />
        {!ready && <div className="absolute inset-0 bg-marble" aria-hidden="true" />}
        <div className="relative z-10 h-full">{children(progress)}</div>
      </div>
    </section>
  );
}
```

The implementation must keep the canvas decorative, use `requestAnimationFrame`, avoid React state for frame images, and draw the last decoded frame when a requested image is not ready.

- [ ] **Step 2: Implement the narrative overlay**

Create `components/HeroNarrative.tsx` with semantic content, one primary CTA, and opacity/transform transitions derived from `progress`. Keep the left copy in the negative space of the source composition and cap body text at a readable measure. The completed-symbol state must remain legible at `progress >= 0.85`.

- [ ] **Step 3: Replace the old hero composition**

Update `components/HeroSection.tsx` to render:

```tsx
<ScrollSequenceHero frameCount={240} mobileFrameStep={2} />
```

Update `app/page.tsx` so this hero is the first content block, followed by the existing institutional sections in this order: `AboutSection`, `AreasSection`, `DiferenciaisSection`, `HistoriaSection`, `EquipeSection`, `DepoimentosSection`, `ArtigosSection`, `CTASection`, `ContactSection`, and `Footer`.

- [ ] **Step 4: Verify hero behavior in the browser**

Run:

```powershell
npm run dev
```

Verify manually at desktop and mobile widths: first frame appears, scrolling reaches frame 240, the canvas does not go blank while batches load, the copy stays inside the frame's negative space, and the page continues into the next section without horizontal overflow.

- [ ] **Step 5: Commit the hero**

```powershell
git add components/ScrollSequenceHero.tsx components/HeroNarrative.tsx components/HeroSection.tsx app/page.tsx
git commit -m "feat: add scroll-driven DRC symbol hero"
```

---

### Task 4: Establish tokens, navigation, and section structure

**Files:**
- Modify: `app/globals.css`
- Modify: `app/layout.tsx`
- Create: `components/SectionShell.tsx`
- Modify: `components/Navbar.tsx`
- Modify: existing content section components as required by the baseline composition.

**Interfaces:**
- `SectionShell` accepts `id`, `tone` (`"light" | "dark"`), `className`, and `children`.
- Navigation exposes anchor links to `#historia`, `#areas`, `#diferenciais`, `#equipe`, `#artigos`, and `#contato`.

- [ ] **Step 1: Replace the current flat palette with three token layers**

In `app/globals.css`, define primitive values for mineral black, legal ink, marble white, stone, aged gold, deep wine, spacing, type sizes, motion durations, and radius. Define semantic aliases such as `--color-background`, `--color-foreground`, `--color-surface-dark`, `--color-accent`, and `--color-border`. Define component aliases for navigation, buttons, section shells, and form controls. Components must consume semantic or component aliases rather than raw hex values.

- [ ] **Step 2: Update global typography and motion defaults**

Use Newsreader, Manrope, and IBM Plex Mono through the project's chosen font-loading path. Keep `scroll-behavior: smooth`, visible `:focus-visible` rings, `text-wrap: balance` for headings, and a `prefers-reduced-motion` block that disables nonessential transitions and animations.

- [ ] **Step 3: Add `SectionShell`**

Implement one full-width tonal wrapper with a constrained inner container. It must reserve responsive gutters, prevent nested page-level cards, and expose stable section spacing. Use it to remove repeated width/padding constants from the existing sections without changing their content contracts.

- [ ] **Step 4: Normalize navigation states**

Keep the header transparent over the hero and switch to a solid mineral or marble surface after the hero. Use a real button for the mobile menu, a visible close path, `aria-expanded`, `aria-controls`, and a 44px minimum hit area. All icon-only actions use Lucide icons and descriptive labels.

- [ ] **Step 5: Restyle existing sections around the approved hierarchy**

Apply the following structure without inventing claims:

- Narrative/history: dark mineral band with one statement and factual proof points.
- Practice areas: structured list with sticky detail panel on desktop and one-open accordion on mobile.
- Differentiators: evidence-led sequence with intentional labels only where order is meaningful.
- Team: standardized portrait dimensions and readable role labels.
- Testimonials: restrained quote layout with attribution.
- Articles: editorial list with title, date, and direct link.
- Contact: dark final action band with one dominant CTA.

- [ ] **Step 6: Run visual regression checks at target widths and commit**

Run `npm run lint` and inspect 375px, 768px, 1024px, and 1440px. Confirm no text overlap, no horizontal scroll, no layout shift from images, and no nested card styling. Commit:

```powershell
git add app/globals.css app/layout.tsx components/SectionShell.tsx components/Navbar.tsx components/AboutSection.tsx components/AreasSection.tsx components/DiferenciaisSection.tsx components/HistoriaSection.tsx components/EquipeSection.tsx components/DepoimentosSection.tsx components/ArtigosSection.tsx components/CTASection.tsx components/Footer.tsx app/page.tsx
git commit -m "feat: establish DRC editorial visual system"
```

Only stage files that actually changed; `components/FolioHeader.tsx` is not part of the current page composition and should remain untouched unless the baseline import reveals a direct dependency.

---

### Task 5: Harden contact behavior and deployment headers

**Files:**
- Modify: `components/ContactSection.tsx`
- Modify: `next.config.js`
- Modify: `public/_headers`
- Modify: `package.json`
- Create: `.env.example`
- Create: `scripts/security-check.mjs`

**Interfaces:**
- `NEXT_PUBLIC_CONTACT_FORM_ENDPOINT` is an optional public endpoint URL, never a secret.
- `security-check.mjs` exits with code `1` for placeholder endpoints, leaked secret patterns, missing required headers, or insecure external links.
- A missing contact endpoint renders safe direct-contact alternatives and does not issue a network request.

- [ ] **Step 1: Write the security check before changing configuration**

Create `scripts/security-check.mjs`:

```js
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
if (/sk-[A-Za-z0-9_-]{20,}|AIza[A-Za-z0-9_-]{20,}|ghp_[A-Za-z0-9_]{20,}/.test(combined)) failures.push("secret-like token found in tracked source");
for (const header of requiredHeaders) {
  if (!combined.includes(header)) failures.push(`missing required header: ${header}`);
}
if (combined.includes('target="_blank"') && !combined.includes("noopener")) failures.push("blank-target link without noopener");

const publicFiles = await readdir(join(root, "public"));
if (publicFiles.some((file) => /\.map$/.test(file))) failures.push("source map found in public output");

if (failures.length) {
  console.error(failures.map((failure) => `- ${failure}`).join("\n"));
  process.exit(1);
}
console.log("Security source checks passed.");
```

- [ ] **Step 2: Run the check and capture current failures**

Run:

```powershell
node scripts/security-check.mjs
```

Expected before the fix: FAIL with the `YOUR_FORM_ID` placeholder or any existing header mismatch. The failure list is the acceptance checklist for the next steps.

- [ ] **Step 3: Make the contact form fail closed**

In `components/ContactSection.tsx`, read `process.env.NEXT_PUBLIC_CONTACT_FORM_ENDPOINT`, validate that it is an HTTPS URL on the approved provider host, and keep the form in a disabled-safe state when absent. On configured submission, send only bounded validated fields, use `Accept: application/json`, never echo raw server errors, preserve the existing honeypot and client throttling, and show WhatsApp/email alternatives when the provider is unavailable. Treat client controls as UX only; the provider must enforce server-side validation, rate limiting, spam filtering, origin policy, and retention controls.

Create `.env.example` with:

```dotenv
# Public provider endpoint only; never place an API key here.
NEXT_PUBLIC_CONTACT_FORM_ENDPOINT=
```

- [ ] **Step 4: Tighten headers and third-party permissions**

Update `next.config.js` and `public/_headers` together:

- Keep `X-Frame-Options: SAMEORIGIN` and add `frame-ancestors 'self'` to CSP.
- Keep `X-Content-Type-Options: nosniff`.
- Keep `Referrer-Policy: strict-origin-when-cross-origin`.
- Keep `Permissions-Policy: camera=(), microphone=(), geolocation=()`.
- Keep HSTS only for HTTPS production hosting with the correct domain configuration.
- Remove deprecated `X-XSS-Protection`.
- Remove `unsafe-eval` if present.
- Keep `script-src` and `style-src` limited to the actual static-export requirements; document any unavoidable `unsafe-inline` use.
- Keep `img-src`, `font-src`, `frame-src`, `connect-src`, and `form-action` restricted to origins actually used by the final page.
- Keep Google Maps sandboxed with only required permissions and all new-tab links using `noopener noreferrer`.
- Use immutable caching only for hashed Next assets; do not cache HTML indefinitely.

- [ ] **Step 5: Add security and audit scripts**

Add to `package.json`:

```json
"test:sequence": "node --test tests/scroll-sequence.test.mjs",
"security:check": "node scripts/security-check.mjs"
```

Run:

```powershell
npm run security:check
npm audit --audit-level=high
```

Expected: the source check passes; `npm audit` has no high or critical vulnerabilities, or any remaining advisory is explicitly documented and blocked from production until resolved.

- [ ] **Step 6: Commit security hardening**

```powershell
git add components/ContactSection.tsx next.config.js public/_headers package.json .env.example scripts/security-check.mjs
git commit -m "security: harden contact form and static headers"
```

---

### Task 6: Add asset and production verification

**Files:**
- Create: `scripts/validate-frame-sequence.mjs`
- Modify: `package.json`
- Modify: `README.md`

**Interfaces:**
- `validate-frame-sequence.mjs` checks exactly 240 source files, names `001..240`, nonzero sizes, and no missing indices.
- The production checklist documents the static host assumptions, contact endpoint configuration, security header verification, and reduced-motion behavior.

- [ ] **Step 1: Write the frame validation script**

Create `scripts/validate-frame-sequence.mjs`:

```js
import { readdir, stat } from "node:fs/promises";
import { join } from "node:path";

const directory = join(process.cwd(), "public", "frames");
const files = (await readdir(directory)).filter((file) => /^ezgif-frame-\d{3}\.jpg$/.test(file)).sort();
const expected = Array.from({ length: 240 }, (_, index) => `ezgif-frame-${String(index + 1).padStart(3, "0")}.jpg`);
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
```

- [ ] **Step 2: Run frame and production checks**

Run:

```powershell
node scripts/validate-frame-sequence.mjs
npm run test:sequence
npm run security:check
npm run lint
npm run build
```

Expected: frame validation, four utility tests, security source checks, lint, and static production build all pass.

- [ ] **Step 3: Verify production output does not expose development artifacts**

Run:

```powershell
$mapFiles = Get-ChildItem -Recurse -File out | Where-Object { $_.Name -match '\.map$' }
$placeholder = Get-ChildItem -Recurse -File out -Include '*.html','*.js','*.json' | Select-String -Pattern 'YOUR_FORM_ID|NEXT_PUBLIC_CONTACT_FORM_ENDPOINT='
$mapFiles
$placeholder
```

Expected: no output. Confirm `out/frames/ezgif-frame-001.jpg` and `out/frames/ezgif-frame-240.jpg` exist.

- [ ] **Step 4: Update `README.md` with safe deployment requirements**

Document that deployment requires HTTPS, the exact host header configuration, a configured public form endpoint on the approved provider, no secrets in the repository, and a post-deploy check of CSP/HSTS/Permissions-Policy plus the contact flow. Document that static export cannot provide server-side rate limiting by itself.

- [ ] **Step 5: Commit verification tooling and documentation**

```powershell
git add scripts/validate-frame-sequence.mjs package.json README.md
git commit -m "test: add production asset and security checks"
```

---

### Task 7: Browser acceptance pass and final review

**Files:**
- Modify: any implementation files needed to fix verified defects only.

**Interfaces:**
- The acceptance pass validates the complete page contract, not a new feature.

- [ ] **Step 1: Start the production server**

Run:

```powershell
npm run build
npm run start
```

- [ ] **Step 2: Check the desktop acceptance matrix**

At 1440px and 1024px, verify:

- the first frame loads without a blank canvas;
- the header remains readable over the sequence and transitions after the hero;
- scroll maps monotonically from frame 001 to frame 240;
- hero copy does not overlap the symbol or CTA;
- the next section arrives naturally after the pinned hero;
- practice areas use the sticky detail panel without horizontal movement;
- contact links open with safe rel attributes;
- no console errors, mixed-content requests, or failed asset requests occur.

- [ ] **Step 3: Check the mobile acceptance matrix**

At 375px and 768px, verify:

- the hero uses the sampled 120-frame sequence and still reaches the completed symbol;
- menu controls have visible focus and 44px hit areas;
- the practice-area accordion has one open item and no horizontal gesture requirement;
- headings, buttons, forms, and portrait media do not overflow;
- the contact form shows a safe fallback when the endpoint is absent;
- no content is hidden behind fixed navigation or safe areas.

- [ ] **Step 4: Check reduced motion and failure states**

With `prefers-reduced-motion: reduce`, verify that the static completed-symbol hero appears immediately, the page remains readable, and no continuous animation runs. Temporarily block one frame request and confirm the last decoded frame remains visible without a blank flash.

- [ ] **Step 5: Inspect headers on the production response**

Use the deployed host's response inspector or an equivalent request and verify exact presence of `Strict-Transport-Security`, `Content-Security-Policy`, `X-Content-Type-Options`, `Referrer-Policy`, and `Permissions-Policy`. Verify that CSP contains no unapproved origins and that HTML is not served over HTTP.

- [ ] **Step 6: Run final verification before claiming completion**

Run:

```powershell
npm run test:sequence
node scripts/validate-frame-sequence.mjs
npm run security:check
npm audit --audit-level=high
npm run lint
npm run build
git status --short
```

Expected: all checks pass, no high/critical audit findings remain unaddressed, and only intentional tracked changes remain.

---

## Security Boundary

This plan hardens the static website, client-side form behavior, third-party embeds, headers, dependencies, and deployment checks. It does not create server-side business logic. A production contact flow still depends on the selected provider enforcing server-side validation, rate limiting, spam controls, origin policy, secure storage, retention, and LGPD obligations. The site must not claim those controls exist until the provider configuration and post-deploy request path have been verified.
