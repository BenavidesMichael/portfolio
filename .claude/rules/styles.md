---
paths:
  - 'src/**/*.css'
  - 'src/**/*.html'
  - 'src/**/*.component.ts'
---

# Styling Rules — Tailwind v4 + DaisyUI v5 + Angular 21

## DaisyUI First (Mandatory)

**ALWAYS check DaisyUI v5 components before building custom UI with Tailwind.** If a DaisyUI component exists for the pattern (timeline, card, badge, dock, navbar, modal, tabs, etc.), use it. Only add Tailwind utilities on top for fine-tuning. Never recreate from scratch what DaisyUI already provides — it guarantees theme consistency, accessibility, and responsive behavior out of the box.

Reference: https://daisyui.com/components/

## CSS Architecture Per File Type

| File                  | What goes here                                                    | Example                                                   |
| --------------------- | ----------------------------------------------------------------- | --------------------------------------------------------- |
| **Template (.html)**  | Static Tailwind utilities, `dark:`, `data-[active]:`              | `class="bg-white dark:bg-surface-dark"`                   |
| **Component CSS**     | Dynamic state-based styles (raw CSS), `:host-context()` for theme | `nav.scrolled { background: var(--color-surface-dark); }` |
| **Global styles.css** | `@apply`, `@theme`, `@custom-variant`, shared classes             | `.glass-panel { @apply backdrop-blur-md; }`               |
| **TypeScript**        | ZERO styling logic, only boolean state signals                    | `isScrolled = signal(false)`                              |

## NEVER DO

1. **NO `@reference "tailwindcss"` + `@apply` in component CSS** — causes build performance degradation (TW4 + Angular known issue: GitHub #16429, #17416). `@apply` works only in global `styles.css`.
2. **NO `[class.X]="themeService.isDark()"` for theming** — use Tailwind `dark:` modifier instead.
3. **NO computed signals / NgClass returning CSS class maps** — single boolean signal + CSS handles visual state.
4. **NO `computed()` on static data** — use plain readonly property.
5. **NO emojis in code comments** — comments explain WHY, not WHAT.
6. **NO legacy Tailwind class names** — use v4 canonical forms: `bg-linear-to-*` (not `bg-gradient-to-*`), `rounded-sm` (not `rounded`), `shadow-xs` (not `shadow-sm`). Always prefer the canonical class suggested by the Tailwind v4 compiler.

## Theme Handling

- Dark theme (dracula) = default. Only write light theme overrides.
- Template: `class="bg-white dark:bg-surface-dark"` (Tailwind `dark:` modifier)
- Component CSS: `:host-context([data-theme="light"])` for light overrides (safe in Angular — compiler transforms it)

## Active State Pattern

```html
<!-- Use data attribute + Tailwind modifier (not boolean bindings) -->
[attr.data-active]="isActive(item.href) ? true : null" class="text-slate-600 dark:text-slate-400
data-[active]:text-primary"
```

## Component CSS (when needed)

- Use **raw CSS properties** + **CSS custom variables** from `@theme` (e.g. `var(--color-surface-dark)`)
- Prefer element selectors (`header`, `nav`) when unique within component
- `[class.scrolled]="signal()"` is the idiomatic Angular way to toggle state-based CSS
- Duplicate CSS from `styles.css` is acceptable when caused by encapsulation constraints (add explanatory comment)
