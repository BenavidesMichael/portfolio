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
