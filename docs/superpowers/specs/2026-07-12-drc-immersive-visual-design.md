# DRC Advogados: Immersive Visual Design

## Purpose

Create a premium institutional website for DRC Advogados whose visual identity communicates authority, precision, and contemporary legal practice. The page's primary job is to establish trust and lead qualified visitors toward direct contact with the office.

This phase focuses on visual structure and interaction. Existing institutional content remains the working source and may be reorganized for hierarchy, but broad copy rewriting is outside the initial implementation scope.

## Inputs

- Existing Next.js 14 project with React, Tailwind CSS, Framer Motion, and Lucide icons.
- Existing sections for the hero, history, practice areas, differentiators, team, testimonials, articles, contact, and footer.
- Existing office logo and team portraits.
- A 240-frame JPG sequence showing the DRC symbol assembling above a marble base.

## Design Direction

The approved direction is **editorial cinematic**. The 3D symbol reveal is the page's signature moment; the rest of the interface stays restrained, architectural, and easy to scan.

The visual language draws from the supplied assets rather than generic legal imagery: carved stone, precise metallic geometry, controlled light, measured spacing, and typographic contrast. Gold is an institutional accent, not a decorative wash.

### Considered Approaches

1. **Pinned cinematic hero, then vertical page (selected).** The frame sequence plays while the opening scene remains fixed. Once the symbol is fully formed, visitors continue through a conventional vertical page. This gives the strongest brand moment while preserving navigation, accessibility, and content comprehension.
2. **Horizontal scroll journey.** Each institutional section would become a horizontal chapter. This is visually unusual, but it increases interaction cost, creates mobile and accessibility friction, and makes long-form legal content harder to scan.
3. **Continuous 3D effects throughout the page.** Multiple animated objects and parallax layers would appear across sections. This offers spectacle but competes with credibility, raises performance risk, and weakens the supplied logo reveal by repeating the same level of emphasis.

## Experience Architecture

### 1. Global Navigation

- A transparent navigation bar overlays the initial hero.
- The logo, section links, and contact action remain readable over every hero frame.
- As the visitor leaves the hero, the navigation transitions to a quiet solid surface with a subtle divider.
- Desktop uses a compact horizontal menu. Mobile uses an accessible menu button and full-height navigation panel.
- Section links use native anchors and preserve predictable vertical scrolling.

### 2. Cinematic Hero

- The hero occupies the first viewport and remains pinned for a 320vh section on desktop and a 240vh section on mobile.
- A full-bleed canvas renders the 240-frame sequence from marble base to completed DRC symbol.
- Scroll progress maps deterministically to frame index; the animation does not continue independently of the visitor.
- The opening copy appears on the left where the supplied composition has negative space. The 3D symbol remains the dominant object on the right.
- Copy enters in three controlled beats: office name, institutional proposition, then contact action.
- The final hero state holds briefly so the completed symbol can be understood before the next section arrives.
- A small progress affordance indicates that the scene responds to vertical scrolling without adding instructional prose.

### 3. Institutional Narrative

- The story and positioning follow immediately after the hero on a dark mineral band, creating a deliberate tonal transition from marble light to legal ink.
- Content uses a restrained editorial grid with a short statement, supporting paragraph, and selected proof points.
- Proof points must be factual content already present in the project; no invented awards, outcomes, or credentials.

### 4. Practice Areas

- Practice areas use a structured list or split grid rather than floating marketing cards.
- Each item has a clear title, concise supporting text, and an intentional hover/focus response.
- On desktop, selecting or focusing an item updates a sticky neighboring detail panel. On mobile, the same items use a single-open accordion without horizontal gestures.

### 5. Differentiators and Team

- Differentiators are presented as a measured sequence supported by real claims, not decorative numbering.
- Team portraits remain the primary media. Cropping, dimensions, and typography are standardized so portrait changes do not shift the layout.
- Profile interactions remain optional enhancements; essential identity and role information is always visible.

### 6. Articles and Contact

- Articles use a quiet editorial list with strong titles and dates, avoiding a dense collection of decorative cards.
- Contact forms and direct contact options use explicit labels, visible validation, and clear success/error states.
- The final contact band repeats the dark mineral tone and provides one dominant action.

## Visual System

### Color Tokens

The implementation will use a three-layer token structure: primitive values, semantic roles, and component aliases.

| Token role | Working value | Purpose |
| --- | --- | --- |
| Mineral black | `#11100F` | Dark bands, navigation state, high-authority surfaces |
| Legal ink | `#292520` | Primary text and secondary dark surfaces |
| Marble white | `#F5F2EC` | Main light background |
| Stone | `#D8D0C5` | Dividers, quiet surfaces, secondary borders |
| Aged gold | `#A9782E` | Brand accent, focus, selected states |
| Deep wine | `#5A2028` | Limited secondary accent and high-value emphasis |

Gold gradients may be used only where they visually correspond to the supplied metallic symbol. Components use semantic tokens instead of raw color values.

### Typography

- **Display:** Newsreader, used for primary headings and selected statements.
- **Body:** Manrope, used for navigation, paragraphs, controls, and forms.
- **Utility:** IBM Plex Mono, used sparingly for dates, section labels, and small metadata.
- Body text remains at least 16px on mobile with comfortable line height and controlled measure.
- Type does not scale directly with viewport width; responsive steps use explicit breakpoints.

### Layout and Spacing

- The page uses a 4px base spacing system with semantic section and component spacing tokens.
- Content width is constrained, while the hero and tonal bands remain full bleed.
- Desktop layouts use asymmetry that follows the frame composition; mobile layouts return to a clear single-column order.
- Cards are reserved for repeated content units and are not nested inside other cards.
- Corners remain square or subtly rounded, matching the precise geometry of the DRC symbol.

### Motion

- The hero frame sequence is the single high-emphasis animation.
- Supporting motion uses opacity and transforms with restrained timing.
- Section reveals occur only when they clarify hierarchy; ambient particles and unrelated floating decoration are excluded.
- Hover, pressed, and focus states remain stable and do not change layout dimensions.

## Component Boundaries

- `ScrollSequenceHero`: owns canvas rendering, frame preloading, scroll-to-frame mapping, and fallback display.
- `HeroNarrative`: owns the timed copy beats and contact action; it receives normalized hero progress rather than reading scroll directly.
- `SiteHeader`: owns transparent/solid navigation states and responsive menu behavior.
- `SectionShell`: provides shared width, gutters, spacing, and optional tonal band behavior.
- Existing content sections remain independent and consume design tokens instead of embedding page-level visual constants.

The canvas renderer and narrative overlay communicate through normalized progress from `0` to `1`. This keeps frame loading separate from copy choreography and allows both to be tested independently.

## Frame Loading and Failure Behavior

- The initial frame and the next 11 frames load first so the first viewport appears quickly.
- Remaining frames preload in ordered batches of 24 after the initial visual is available.
- The canvas reserves its final dimensions before images load to prevent layout shift.
- If individual frames are unavailable, rendering retains the last successfully decoded frame instead of flashing blank.
- If canvas or the sequence cannot initialize, the completed symbol frame is shown as a static full-bleed fallback.
- Slow connections receive progressive loading without blocking navigation or textual content.

## Responsive Behavior

- Desktop and wide tablet use the full pinned sequence with object positioning derived from the source frame composition.
- Mobile preserves the same vertical narrative using every second source frame, for a 120-frame beginning-to-end reveal with lower decoding pressure.
- Text never covers the completed symbol; mobile copy occupies a controlled upper or lower safe region based on the frame crop.
- Navigation and contact controls maintain at least 44px touch targets.
- The implementation must be checked at 375px, 768px, 1024px, and 1440px widths.

## Accessibility

- `prefers-reduced-motion` disables pinned frame scrubbing and presents a static completed-symbol hero with immediate copy.
- The canvas is decorative and hidden from assistive technology; equivalent brand and page meaning remain in semantic HTML.
- Keyboard focus remains visible and follows visual order.
- Text contrast targets WCAG AA, including text placed over the frame sequence.
- Navigation, menu, forms, and interactive practice-area items work without hover.
- Native scrolling remains intact; the experience does not hijack wheel or touch gestures.

## Security and Privacy

Security is treated as defense in depth. No public website can promise zero risk, so the implementation must reduce attack surface, avoid exposing secrets, and fail closed when a protected integration is not configured.

- No API keys, private tokens, service credentials, or provider secrets may be placed in client components, `public/`, frame assets, or `NEXT_PUBLIC_*` variables unless the value is explicitly intended to be public.
- Keep security headers aligned between `next.config.js` and the static host configuration in `public/_headers`: HTTPS enforcement, clickjacking protection, MIME sniffing protection, strict referrer policy, restrictive permissions policy, and a Content Security Policy limited to the origins actually used by the page.
- Remove the current CSP dependency on `unsafe-eval`; avoid `unsafe-inline` where the hosting mode allows nonces or hashed inline scripts, and document any unavoidable framework requirement rather than widening the policy casually.
- The contact form must not submit to the placeholder `YOUR_FORM_ID` or any unverified endpoint. Before production, it must use a real provider or same-origin server endpoint with server-side schema validation, rate limiting, origin/CSRF protection, spam controls, bounded payloads, safe error messages, and a documented data-retention policy.
- Client-side validation, honeypots, and throttling improve user experience but are not security boundaries; the receiving service must repeat validation and abuse controls.
- Third-party embeds and links must use the smallest required permissions, explicit `sandbox` and `referrerPolicy` values, `noopener noreferrer` for new tabs, and allowlisted origins.
- Dependencies must be audited before delivery with `npm audit`, lockfile changes reviewed, and unused packages removed when practical. The build must not contain placeholder endpoints, development secrets, source maps or debug output intended only for local work.
- Privacy copy and consent language must remain consistent with the actual contact provider and LGPD processing flow; no claim of compliance is made until the data path is configured and verified.

## Performance Budget and Verification

- Frame decoding and drawing must avoid unnecessary work when the selected frame has not changed.
- Scroll work is scheduled with `requestAnimationFrame`; React state is not updated for every raw scroll event.
- Below-the-fold media loads lazily with reserved dimensions.
- The hero is verified for smooth progression, correct first/final frames, no blank canvas, and no text overlap.
- Visual checks cover desktop, tablet, mobile, reduced motion, slow loading, and failed-frame fallback.
- Production build, linting, and focused component behavior tests must pass before delivery.

## Initial Implementation Scope

Included:

- Import the supplied Next.js project and assets into the workspace.
- Build the pinned scroll-sequence hero and responsive fallback behavior.
- Establish the approved tokens, typography, navigation states, section rhythm, and visual hierarchy.
- Restyle the existing institutional sections to fit the approved direction.
- Verify responsive behavior, accessibility, performance-sensitive paths, and production build.

Excluded from this phase:

- CMS or database integration.
- Broad institutional copywriting or legal claim creation.
- Additional generated 3D scenes unrelated to the supplied sequence.
- Authentication, client portal, scheduling backend, or article publishing workflow.
- Deployment and hosting configuration.

## Success Criteria

- The first viewport immediately identifies DRC Advogados and presents a clear contact path.
- Scroll smoothly reveals the supplied symbol from the first through final frame.
- The visual system feels specific to DRC's marble and gold identity rather than a generic law-firm template.
- Content after the hero remains quick to scan and easy to navigate.
- Mobile, keyboard, and reduced-motion users receive a complete and coherent experience.
- The site avoids blank frames, major layout shifts, horizontal overflow, and incoherent overlap across target viewports.
