# Constraints & Hard Rules

## DO — Always apply

### Angular
- Standalone components only
- Signals for state (`signal()`, `computed()`, `effect()`)
- `inject()` for dependency injection (no constructor injection)
- `as const` and Union Types (never enums)
- Lazy loading for routes

### TypeScript
- Strict mode — no `any`, no `unknown` without narrowing
- Explicit return types on public methods
- `as const` for literal objects/arrays

### Styling
- DaisyUI components first, Tailwind utilities second, raw CSS last resort
- Tailwind v4 syntax: `size-6`, `bg-gray-950/95`, `gap-4`, etc.
- No styling logic in TypeScript (no dynamic class strings built in TS)

### Dependencies
- Deps with `~` (patch range only)
- No unvalidated external libs — check bundle size + maintenance status first

### Code quality
- Comments in English only
- Semantic HTML + ARIA landmarks (`banner`, `navigation`, `main`, `contentinfo`)
- No test files

---

## DON'T — Never do

- No NgModules
- No enums → use `as const` + Union Types
- No `any`
- No constructor injection → use `inject()`
- No styling logic in TypeScript
- No unvalidated external libs
- No test files

---

## Lessons Learned — Errors to never repeat

<!-- Add entries here when a mistake is identified during development -->
<!-- Format: ### [date] Short description + what to do instead -->

### Node.js version for commits
`ng lint` (pre-commit hook) requires Node.js >= v20.19. Run `nvm use 22` before committing.

### Commit subject-case
commitlint enforces sentence-case: first letter uppercase.
Wrong: `chore: add something` → Correct: `chore: Add something`

### Commit body max 100 chars
commitlint enforces `body-max-line-length: 100`. Keep each bullet under 100 characters.

### aria-live misuse
`aria-live` must be on a container receiving dynamic text, not on interactive elements.
A button with a dynamic `[attr.aria-label]` does not need `aria-live`.

### Angular class binding with leading-hyphen Tailwind classes
`[class.-rotate-90]="cond"` is unreliable. Use `[ngClass]="cond ? '-rotate-90' : 'rotate-90'"` instead.

### No SSR in this project — GitHub Pages only
This project is deployed on GitHub Pages (static, browser-only). Do NOT flag browser APIs
(`document`, `window`, `localStorage`) as SSR risks. There is no server-side rendering.

### @angular/forms/signals is a real Angular 21 API
`@angular/forms/signals` is an official subpath export of `@angular/forms@21`.
Do not flag it as a missing or hallucinated package.
