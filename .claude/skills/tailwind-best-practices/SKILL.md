---
name: tailwind-best-practices
description: Expert Tailwind CSS skill for writing clean, performant, maintainable Tailwind code while avoiding the most common pitfalls. Use this skill whenever the user writes, reviews, or refactors Tailwind CSS — including questions about utility-first philosophy, utility vs component extraction, responsive design, @theme customization, @apply, base styles, class ordering, accessibility in Tailwind, or conditional/dynamic classes. Also trigger when the user asks why their Tailwind styles aren't applying, how to reduce bundle size, how to organize a Tailwind project, or how to integrate Tailwind with Angular/React/Vue/Next.js. Essential for code reviews, project setup, and any "how do I do X properly in Tailwind" question.
---

# Tailwind CSS Best Practices Skill

> Covers **Tailwind v4** (current). See [v3→v4 breaking changes](#v3v4-breaking-changes-summary) if upgrading.

---

## The Utility-First Philosophy

Tailwind is **utility-first**: every class does exactly one thing.

```html
<!-- Each class = one CSS property -->
<div class="flex gap-4 p-6 bg-white rounded-xl shadow-md">
```

This is the power of the model: styles live next to markup, no naming overhead,
no risk of changing a class name and breaking something else.

**When to write utilities directly:**
- One-off styles unique to a single element or page
- Rapid prototyping, layout adjustments, spacing tweaks
- Anything that doesn't repeat

**When to extract to a component:**
- The same class combination appears in 3+ places
- The pattern groups multiple related elements (card + header + body)
- You're building a design system with named, semantically meaningful tokens

---

## Utility vs Component: The Decision Framework

```
Is this combination of classes repeated in 3+ places?
        │
        ├── No → Keep utilities directly in HTML
        │
        └── Yes → Does it involve a single element (e.g. a button)?
                        │
                        ├── Yes → @layer components with @apply (or CSS vars)
                        │
                        └── No (card, nav item, form group...) → Framework component
                                                                   (Angular / React / Vue)
```

**Single-element abstractions → `@layer components`:**

```css
/* styles/components.css */
@layer components {
  .btn-primary {
    background-color: var(--color-blue-500);
    color: var(--color-white);
    padding: --spacing(2) --spacing(4);
    border-radius: var(--radius-md);
    font-weight: var(--font-weight-bold);
    transition-property: all;
    transition-duration: 300ms;

    &:hover {
      background-color: var(--color-blue-700);
    }
  }

  .card {
    background-color: var(--color-white);
    border-radius: var(--radius-xl);
    padding: --spacing(6);
    box-shadow: var(--shadow-md);
  }
}
```

Names must be semantic: `.btn-primary`, `.card`, `.badge-success` — not `.blue-box` or `.div-thing`.

**Multi-element patterns → Framework component:**

```tsx
// Always prefer this for anything with children/slots
function VacationCard({ img, title, price }) {
  return (
    <div className="rounded-xl overflow-hidden shadow-md">
      <img className="w-full object-cover" src={img} alt={title} />
      <div className="p-4">
        <h3 className="font-bold text-gray-900">{title}</h3>
        <p className="mt-1 text-sm text-gray-500">{price}</p>
      </div>
    </div>
  );
}
```

> **Rule of thumb:** if your "component" is a single `<button>` or `<a>`, a CSS class is fine.
> If it wraps children or has structure, make it a framework component.

---

## 9 Common Tailwind Mistakes

---

### 1. Overusing Utilities → Unreadable HTML

**Problem:** 20+ classes on one element.

```html
<!-- ❌ Unreadable -->
<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded
               focus:outline-none focus:shadow-outline transition duration-300 ease-in-out
               transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg">
  Click me
</button>
```

**Fix A — `@layer components` for single-element patterns:**

```css
@layer components {
  .btn-primary {
    @apply bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition;
  }
}
```

**Fix B — Framework component for anything with structure:**

```tsx
const Button = ({ children, variant = 'primary' }) => (
  <button className={variant === 'primary'
    ? 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition'
    : 'bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded transition'}>
    {children}
  </button>
);
```

---

### 2. Ignoring Responsiveness (Mobile-First)

**Tailwind is mobile-first.** No prefix = all sizes. Prefixes apply at that breakpoint and above.

```
sm: 40rem+ | md: 48rem+ | lg: 64rem+ | xl: 80rem+ | 2xl: 96rem+
```

```html
<!-- ✅ Start simple, add complexity at larger sizes -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
  <h1 class="text-2xl md:text-4xl lg:text-6xl font-bold">
  <nav class="hidden md:flex">
  <button class="md:hidden">☰</button>
  <section class="px-4 md:px-8 lg:px-16 py-8 md:py-16">
```

Always use responsive prefixes (`sm:`, `md:`, `lg:`) and state variants (`hover:`, `focus:`, `disabled:`) together — they compose cleanly.

---

### 3. Hard-coding Values → Use `@theme` (v4) or `tailwind.config.js` (v3)

**Problem:** Magic numbers (`style="margin: 13px"`) or raw CSS overrides instead of design tokens.

**Tailwind v4 — configure in CSS with `@theme`:**

```css
/* app.css */
@import "tailwindcss";

@theme {
  /* Brand colors → available as bg-brand-500, text-brand-500, etc. */
  --color-brand-50: oklch(0.97 0.02 270);
  --color-brand-500: oklch(0.55 0.22 270);
  --color-brand-900: oklch(0.25 0.12 270);

  /* Custom spacing */
  --spacing-18: 4.5rem;
  --spacing-88: 22rem;

  /* Fonts */
  --font-sans: Inter, system-ui, sans-serif;
  --font-display: "Playfair Display", serif;

  /* Custom breakpoints */
  --breakpoint-xs: 30rem;
  --breakpoint-3xl: 120rem;
}
```

**Tailwind v3 — extend in `tailwind.config.js`:**

```js
module.exports = {
  theme: {
    extend: { // ← always use `extend`, not top-level (which removes all defaults)
      colors: { brand: { 500: '#7c3aed' } },
    },
  },
};
```

> Always use `@theme` (v4) or `extend` (v3) — replacing the top-level `theme` removes all Tailwind defaults.

---

### 4. Dynamic Class Construction → Purge Pitfall

**Problem:** Building class names from strings at runtime causes missing styles in production.

```js
// ❌ Tailwind can't detect these — purged in prod!
const color = 'blue';
<div className={`text-${color}-500`}>

// ✅ Use complete class names (always detectable)
const classes = { blue: 'text-blue-500', red: 'text-red-500' };
<div className={classes[color]}>
```

**Safe conditional classes with `clsx` + `tailwind-merge`:**

```js
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const cn = (...inputs) => twMerge(clsx(inputs));

<div className={cn(
  'p-4 rounded',
  isActive && 'bg-blue-500',
  isDisabled && 'opacity-50 cursor-not-allowed'
)}>
```

**Angular equivalent:**

```html
<!-- ✅ Use [ngClass] with full class name strings -->
<div [ngClass]="isActive ? 'bg-blue-500' : 'bg-gray-200'">
```

---

### 5. Conflicting / Duplicate Classes

**Problem:** Two classes affecting the same property — the last one doesn't always win in CSS.

```js
import { twMerge } from 'tailwind-merge';

// ✅ Last class wins, duplicates removed
twMerge('px-4 py-2', 'px-6');         // → 'py-2 px-6'
twMerge('text-red-500', 'text-blue-500'); // → 'text-blue-500'
```

**Auto-sort with Prettier plugin:**

```bash
npm install -D prettier-plugin-tailwindcss
```
```json
{ "plugins": ["prettier-plugin-tailwindcss"] }
```

---

### 6. Custom CSS Outside `@layer` (v4: `@utility` for utilities)

**Problem:** Custom styles written outside layers can conflict with utilities or bloat output.

**In Tailwind v4**, custom utilities use `@utility` (not `@layer utilities`):

```css
/* ✅ v4 — custom utility */
@utility text-balance {
  text-wrap: balance;
}

@utility scrollbar-hide {
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }
}
```

**Component classes still use `@layer components`:**

```css
/* ✅ v4 & v3 — both valid */
@layer components {
  .card {
    @apply rounded-xl bg-white shadow p-6;
  }
}
```

> In v3: use `@layer utilities { }` for custom utilities. In v4: use `@utility { }`.

---

### 7. Wrong CSS Entry Point

**Problem:** Removing or misplacing Tailwind directives causes missing styles everywhere.

**Tailwind v4 — one import replaces three directives:**

```css
/* ✅ v4 — single import */
@import "tailwindcss";

@layer base {
  html { @apply scroll-smooth; }
  body { @apply bg-gray-50 text-gray-900 font-sans antialiased; }
  h1   { @apply text-4xl font-bold tracking-tight; }
  a    { @apply text-blue-600 hover:underline; }
}
```

**Tailwind v3 — three directives required:**

```css
/* ✅ v3 */
@tailwind base;       /* Preflight CSS reset — don't remove */
@tailwind components;
@tailwind utilities;
```

**`@apply` in scoped CSS (v4 with CSS Modules / Angular component styles):**

```css
/* Need @reference to access utilities in isolated stylesheets */
@reference "../../app.css";

.my-component {
  @apply text-2xl font-bold;
}

/* Or use CSS variables directly — no @reference needed */
.my-component {
  font-size: var(--text-2xl);
  font-weight: var(--font-weight-bold);
}
```

---

### 8. Inconsistent Naming Conventions

**Recommended: BEM-inspired with semantic names**

```css
@layer components {
  /* Block */
  .card { @apply rounded-xl bg-white shadow; }

  /* Element */
  .card__header { @apply px-6 pt-6 pb-4 border-b; }
  .card__body   { @apply p-6; }

  /* Modifier */
  .card--featured { @apply border-2 border-blue-500; }

  /* States follow Tailwind conventions */
  .btn-primary { @apply ... hover:bg-blue-700 focus-visible:ring-2; }
}
```

**Class ordering (Prettier plugin enforces automatically):**

1. Layout (`flex`, `grid`, `block`)
2. Positioning (`relative`, `absolute`, `z-10`)
3. Box model (`w-`, `h-`, `p-`, `m-`)
4. Typography (`text-`, `font-`, `leading-`)
5. Visual (`bg-`, `border-`, `rounded-`, `shadow-`)
6. States / transitions (`hover:`, `focus:`, `transition-`)

---

### 9. Neglecting Accessibility

**Focus styles — replace, never remove:**

```html
<!-- ❌ Hides focus from keyboard users -->
<button class="focus:outline-none">

<!-- ✅ Custom visible focus ring -->
<button class="focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
```

**Color contrast (min 4.5:1 for normal text):**

```html
<!-- ❌ text-gray-400 on white = ~2.9:1 (fails AA) -->
<!-- ✅ text-gray-700 on white = ~5.5:1 (passes AA) -->
<p class="text-gray-700 bg-white">
```

**Screen reader & motion utilities:**

```html
<span class="sr-only">Current page: </span>
<div aria-hidden="true" class="..."></div>
<div class="animate-spin motion-reduce:animate-none"></div>
<button class="min-w-[44px] min-h-[44px] flex items-center justify-center"></button>
```

---

## v3→v4 Breaking Changes Summary

| Feature | Tailwind v3 | Tailwind v4 |
|---------|-------------|-------------|
| CSS entry point | `@tailwind base/components/utilities` | `@import "tailwindcss"` |
| Theme config | `tailwind.config.js` + `theme.extend` | `@theme { --color-*: ... }` in CSS |
| Custom utilities | `@layer utilities { }` | `@utility name { }` |
| Content paths | `content: ['./src/**/*.html']` | Auto-detected; `@source` for extras |
| `!important` modifier | `!flex` | `flex!` |
| `outline-none` | `outline-none` | `outline-hidden` |
| Shadow default | `shadow` → 4px | `shadow-sm` → 4px (renamed) |
| CSS Modules + @apply | Works directly | Needs `@reference "app.css"` |

---

## Quick Checklist — Before Committing Tailwind Code

```
□ No class combination repeated 3+ times without a component or @layer component
□ Component names are semantic (.btn-primary, .card) not arbitrary (.blue-div)
□ Mobile-first breakpoints (base = mobile, md/lg/xl = larger screens)
□ State variants used where relevant (hover:, focus:, disabled:, motion-reduce:)
□ @theme used for brand tokens (v4) — no magic numbers in markup
□ No dynamically-constructed class names (text-${color}-500)
□ Custom utilities use @utility (v4) or @layer utilities (v3)
□ Custom components use @layer components (both versions)
□ @import "tailwindcss" at CSS entry point (v4) / @tailwind directives (v3)
□ @apply in scoped CSS uses @reference (v4 CSS Modules)
□ Focus styles visible (focus-visible:ring-*)
□ Color contrast meets AA (4.5:1 for text)
□ Touch targets min 44×44px
□ Prettier plugin installed for consistent class ordering
```

---

## Further Reference

- Tailwind v4 docs: https://tailwindcss.com/docs
- Tailwind v3→v4 upgrade guide: https://tailwindcss.com/docs/upgrade-guide
- tailwind-merge: https://github.com/dcastil/tailwind-merge
- clsx: https://github.com/lukeed/clsx
- Prettier plugin: https://github.com/tailwindlabs/prettier-plugin-tailwindcss
- Color contrast checker: https://webaim.org/resources/contrastchecker/
