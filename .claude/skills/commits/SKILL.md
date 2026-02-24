# Skill: Git Commits

This project uses **Husky** + **commitlint** (`@commitlint/config-conventional`) to enforce commit message conventions.

## Hooks

| Hook | Action |
|------|--------|
| `pre-commit` | Runs `npm run lint` (ESLint via `ng lint`) |
| `commit-msg` | Runs `commitlint` to validate the message format |

Both hooks **must pass** before a commit is accepted.

## Commit Message Format

```
type(scope): Subject in sentence case
```

### Rules

| Rule | Constraint |
|------|-----------|
| `type` | Required — must be one of the allowed types below |
| `scope` | Optional — feature area in parentheses (e.g., `mobile`, `hero`, `desktop`) |
| `subject-case` | **sentence-case** — first letter uppercase, rest lowercase (e.g., `Add theme toggle`) |
| `subject-max-length` | Maximum **100** characters |

### Allowed Types

| Type | Usage |
|------|-------|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation only |
| `style` | Formatting, whitespace — no code logic change |
| `refactor` | Code restructuring without behavior change |
| `perf` | Performance improvement |
| `test` | Adding or updating tests |
| `build` | Build system or external dependency changes |
| `ci` | CI/CD pipeline changes |
| `chore` | Maintenance tasks, tooling |
| `revert` | Reverting a previous commit |

## Examples

```
feat(hero): Extract template into separate HTML file
fix(mobile): Correct bottom nav active state
refactor(core): Simplify device service breakpoint logic
style(about): Fix indentation in template
docs: Update README with deployment steps
chore: Bump Angular to v21.1
perf(skills): Lazy load skill icons on viewport
build: Add production budget limits
```

## Common Mistakes

| Wrong | Why | Correct |
|-------|-----|---------|
| `feat(mobile): refactor and add theme toggle` | Not sentence-case (lowercase `r`) | `feat(mobile): Refactor and add theme toggle` |
| `feat: added new component` | Past tense — use imperative | `feat: Add new component` |
| `Feat(hero): Add photo` | Type must be lowercase | `feat(hero): Add photo` |
| `feat(hero) Add photo` | Missing colon after scope | `feat(hero): Add photo` |

## Workflow

1. **Always run lint fix first:** `ng lint --fix`
2. Stage changes: `git add .`
3. Commit with a valid message: `git commit -m "type(scope): Subject"`
4. Hooks run automatically:
   - `pre-commit` → lint check
   - `commit-msg` → message format validation
5. If either fails, fix the issue and retry
