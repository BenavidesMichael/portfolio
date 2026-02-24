---
paths:
  - "src/**/*.ts"
---

# TypeScript Rules — Angular Portfolio

## Mandatory Patterns

- **Standalone components only** — no NgModules
- **Signals for state** — `signal()`, `computed()`, `effect()`, `input.required()`
- **`inject()` API** — never use constructor injection
- **`as const` + Union Types** — no `enum`, no `const enum`, no mixed String/Numeric enums
- **Dependencies with `~`** — never `^` (e.g. `"~21.0.0"` not `"^21.0.0"`)

## Type Safety

- No `any` — use `unknown` with Type Guards if needed
- Use `readonly` for immutable properties
- Prefer `interface` for API contracts, `type` for unions/intersections
- Use Utility Types (`Pick`, `Omit`, `Partial`) to avoid model duplication
- Let TS infer types when possible — only annotate public function signatures

## Code Quality

- Comments always in English
- Comments explain **why**, not **what**
- No emojis in code comments
- No styling logic in TypeScript — CSS handles visual state, TS handles data/behavior
- No `computed()` on static data — use plain `readonly` property
- No test files (`.spec.ts`) — tests not required for this project
