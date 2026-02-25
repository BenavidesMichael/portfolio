---
name: tailwind-best-practices
description: Expert Tailwind CSS skill for writing clean, performant, maintainable Tailwind code while avoiding the most common pitfalls. Use this skill whenever the user writes, reviews, or refactors Tailwind CSS — including questions about utility class overuse, responsive design, tailwind.config.js customization, JIT mode, PurgeCSS, @apply, base styles, class ordering, accessibility in Tailwind, or conditional/dynamic classes. Also trigger when the user asks why their Tailwind styles aren't applying, how to reduce bundle size, how to organize a Tailwind project, or how to integrate Tailwind with React/Vue/Next.js. Essential for code reviews, project setup, and any "how do I do X properly in Tailwind" question.
---

# Tailwind CSS Best Practices Skill

## The 9 Most Common Tailwind Mistakes — and How to Fix Them

---

## 1. Overusing Utility Classes → Bloated HTML

**Problem:** Stacking 20+ classes on a single element makes HTML unreadable and hard to maintain.

```html
<!-- ❌ Bloated, unreadable -->
<button
  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
>
  Click me
</button>
```

**Fix A — `@apply` for repeated patterns:**

```css
/* styles/components.css */
.btn-primary {
  @apply bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300;
}
```

```html
<!-- ✅ Clean -->
<button class="btn-primary">Click me</button>
```

**Fix B — Extract a component (React/Vue):**

```jsx
// Button.jsx
const Button = ({ children, variant = 'primary' }) => (
  <button
    className={`font-bold py-2 px-4 rounded transition ${
      variant === 'primary'
        ? 'bg-blue-500 hover:bg-blue-700 text-white'
        : 'bg-gray-200 text-gray-800'
    }`}
  >
    {children}
  </button>
);
```

> **Rule of thumb:** If the same class combination appears 3+ times, extract it.

---

## 2. Ignoring Responsiveness (Mobile-First)

**Problem:** Designing desktop-first and trying to override with breakpoints leads to specificity conflicts and messy code.

**Tailwind's breakpoint system is mobile-first:**

```
sm:   640px+
md:   768px+
lg:   1024px+
xl:   1280px+
2xl:  1536px+
```

```html
<!-- ❌ Desktop-first thinking (fighting the system) -->
<div class="grid grid-cols-4 sm:grid-cols-1">
  <!-- ✅ Mobile-first (start simple, add complexity at larger sizes) -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4"></div>
</div>
```

**Common responsive patterns:**

```html
<!-- Text scaling -->
<h1 class="text-2xl md:text-4xl lg:text-6xl font-bold">
  <!-- Show/hide -->
  <nav class="hidden md:flex">
    <button class="md:hidden">☰</button>

    <!-- Spacing -->
    <section class="px-4 md:px-8 lg:px-16 py-8 md:py-16"></section>
  </nav>
</h1>
```

---

## 3. Ignoring `tailwind.config.js` Customization

**Problem:** Using magic numbers (`style="margin: 13px"`) or overriding with custom CSS instead of extending the config.

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      // ✅ Add brand colors — available as text-brand, bg-brand, etc.
      colors: {
        brand: {
          50: '#f5f3ff',
          500: '#7c3aed',
          900: '#2e1065',
        },
        accent: '#f59e0b',
      },
      // ✅ Custom spacing
      spacing: {
        18: '4.5rem',
        88: '22rem',
      },
      // ✅ Custom fonts
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
      },
      // ✅ Custom breakpoints
      screens: {
        xs: '475px',
        '3xl': '1920px',
      },
    },
  },
};
```

> **Key rule:** Always use `extend` to add custom values — replacing the `theme` object entirely removes all Tailwind defaults.

---

## 4. Not Using JIT Mode + Purge Properly

**Problem:** Bloated CSS bundle, slow build, missing dynamic classes.

**JIT mode** (default in Tailwind v3+) generates styles on demand — no purge needed during dev, and the production bundle only includes what you use.

```js
// tailwind.config.js — make sure content paths are correct!
module.exports = {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx,vue}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  // ...
};
```

**⚠️ Dynamic class pitfall — never build class names dynamically:**

```js
// ❌ Tailwind can't detect these at build time — they'll be purged!
const color = 'blue';
<div className={`text-${color}-500`}>  // broken in prod

// ✅ Use complete class names
const classes = { blue: 'text-blue-500', red: 'text-red-500' };
<div className={classes[color]}>
```

**Safe conditional classes with `clsx` or `tailwind-merge`:**

```js
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const cn = (...inputs) => twMerge(clsx(inputs));

// Usage
<div className={cn('p-4 rounded', isActive && 'bg-blue-500', isDisabled && 'opacity-50 cursor-not-allowed')}>
```

---

## 5. Not Grouping & Merging Classes

**Problem:** Duplicate or conflicting classes, hard to spot overrides.

**Use `tailwind-merge` to safely combine classes:**

```js
import { twMerge } from 'tailwind-merge';

// ✅ Last class wins, no duplicates
twMerge('px-4 py-2', 'px-6'); // → 'py-2 px-6'
twMerge('text-red-500', 'text-blue-500'); // → 'text-blue-500'
```

**Group related classes visually (comment pattern):**

```html
<div
  class="
  /* layout */    flex flex-col gap-4
  /* sizing */    w-full max-w-lg
  /* spacing */   p-6
  /* visual */    bg-white rounded-xl shadow-md
  /* states */    hover:shadow-lg transition-shadow
"
></div>
```

**Or use Prettier plugin for automatic ordering:**

```bash
npm install -D prettier-plugin-tailwindcss
```

```json
// .prettierrc
{ "plugins": ["prettier-plugin-tailwindcss"] }
```

---

## 6. Ignoring Performance Best Practices

**Checklist:**

| Practice                            | How                                                   |
| ----------------------------------- | ----------------------------------------------------- |
| ✅ Correct content paths            | Set all template paths in `tailwind.config.js`        |
| ✅ Use JIT (v3 default)             | Don't downgrade to AOT mode                           |
| ✅ No dynamic class construction    | Use full class name strings only                      |
| ✅ `@layer` for custom CSS          | Prevents custom styles from bloating base             |
| ✅ Avoid `@apply` overuse           | It increases CSS size — prefer components             |
| ✅ Use `tw-merge` not runtime style | Avoid inline `style={{}}` for things Tailwind handles |

```css
/* ✅ Always wrap custom styles in @layer to allow purging */
@layer components {
  .card {
    @apply rounded-xl bg-white shadow p-6;
  }
}

@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
}
```

---

## 7. Forgetting `@tailwind base` / Base Styles

**Problem:** Removing or misplacing the base directives causes inconsistent browser defaults (different margins, font sizes, box-sizing).

**Correct CSS entry point:**

```css
/* globals.css or main.css */
@tailwind base; /* ← Preflight (CSS reset) — don't remove! */
@tailwind components;
@tailwind utilities;
```

**Extending base styles properly:**

```css
@layer base {
  /* Custom defaults that apply everywhere */
  html {
    @apply scroll-smooth;
  }
  body {
    @apply bg-gray-50 text-gray-900 font-sans antialiased;
  }
  h1 {
    @apply text-4xl font-bold tracking-tight;
  }
  a {
    @apply text-blue-600 hover:underline;
  }

  /* CSS variables for theme tokens */
  :root {
    --radius: 0.5rem;
    --color-brand: theme('colors.violet.600');
  }
}
```

> Tailwind's **Preflight** (in `@tailwind base`) normalizes browser styles. If you disable it, add your own reset.

---

## 8. Inconsistent Naming Conventions

**Problem:** Mixed conventions across a team (`btn-blue`, `BlueButton`, `button-primary`) make code unpredictable.

**Recommended conventions:**

```css
/* BEM-inspired with Tailwind */
@layer components {
  /* Block */
  .card {
    @apply rounded-xl bg-white shadow;
  }

  /* Element */
  .card__header {
    @apply px-6 pt-6 pb-4 border-b;
  }
  .card__body {
    @apply p-6;
  }

  /* Modifier */
  .card--featured {
    @apply border-2 border-blue-500;
  }
}
```

**Class ordering convention** (use Prettier plugin to enforce automatically):

1. Layout (`flex`, `grid`, `block`)
2. Positioning (`relative`, `absolute`, `z-10`)
3. Box model (`w-`, `h-`, `p-`, `m-`)
4. Typography (`text-`, `font-`, `leading-`)
5. Visual (`bg-`, `border-`, `rounded-`, `shadow-`)
6. States/transitions (`hover:`, `focus:`, `transition-`)

---

## 9. Neglecting Accessibility

**Problem:** Using Tailwind makes it easy to ignore ARIA attributes, focus states, and color contrast.

**Focus styles — never remove them:**

```html
<!-- ❌ Removes focus ring entirely -->
<button class="focus:outline-none">
  <!-- ✅ Replace with a custom visible focus ring -->
  <button
    class="focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
  ></button>
</button>
```

**Color contrast:**

```html
<!-- ❌ Poor contrast -->
<p class="text-gray-400 bg-white">
  <!-- ✅ AA compliant (4.5:1 ratio minimum) -->
</p>

<p class="text-gray-700 bg-white"></p>
```

**Screen reader utilities:**

```html
<!-- Visually hidden but readable by screen readers -->
<span class="sr-only">Current page: </span>

<!-- Hidden from everything -->
<div aria-hidden="true" class="..."></div>
```

**Interactive element size (min 44x44px for touch):**

```html
<button class="min-w-[44px] min-h-[44px] flex items-center justify-center"></button>
```

**Reduced motion:**

```html
<div class="animate-spin motion-reduce:animate-none"></div>
```

---

## Quick Checklist — Before Committing Tailwind Code

```
□ No class combination repeated 3+ times without @apply or component
□ Mobile-first breakpoints (base = mobile, md/lg = larger screens)
□ tailwind.config.js extended with project-specific tokens
□ Content paths cover all template files
□ No dynamically-constructed class names (text-${color}-500)
□ @tailwind base/components/utilities present in CSS entry point
□ Custom CSS wrapped in @layer base/components/utilities
□ Focus styles visible (focus-visible:ring-*)
□ Color contrast meets AA (4.5:1 for text)
□ Prettier plugin installed for consistent class ordering
```

---

## Further Reference

- Tailwind docs: https://tailwindcss.com/docs
- tailwind-merge: https://github.com/dcastil/tailwind-merge
- clsx: https://github.com/lukeed/clsx
- Prettier plugin: https://github.com/tailwindlabs/prettier-plugin-tailwindcss
- Color contrast checker: https://webaim.org/resources/contrastchecker/
