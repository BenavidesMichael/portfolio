---
name: css-cascade-layers
description: Expert CSS architecture skill for writing, reviewing, refactoring, or explaining CSS using Cascade Layers (@layer). Use this skill whenever the user mentions CSS layers, @layer, cascade conflicts, specificity wars, CSS architecture, overriding third-party styles, CSS resets, ITCSS, or asks how to organize CSS without relying on !important hacks or inflated specificity. Also trigger for questions about CSS priority, layer ordering, layered imports, or revert-layer. This skill is essential when the user is building design systems, integrating frameworks like Tailwind, or managing large CSS codebases with multiple contributors. Make sure to use this skill whenever CSS cascade control or organization is involved, even if the user doesn't explicitly mention "cascade layers."
---

# CSS Cascade Layers Skill

## What are Cascade Layers?

CSS Cascade Layers (`@layer`) give authors **explicit, named layers of priority** in the cascade, independent of selector specificity. Higher layers win — no more specificity wars or `!important` abuse.

**Key principle**: Un-layered styles always beat layered styles (highest priority by default).

```css
/* Layer order: first appearance wins */
@layer reset, defaults, components, utilities;
```

---

## Core Syntax

### 1. Declare layer order (do this first!)
```css
@layer reset, defaults, themes, patterns, components, utilities;
```
Place at the very top. First appearance = lowest priority. Last = highest (before un-layered).

### 2. Block rule — add styles to a layer
```css
@layer utilities {
  [data-color='brand'] { color: var(--brand, rebeccapurple); }
}
@layer defaults {
  a:any-link { color: maroon; } /* loses to utilities despite higher specificity */
}
```

### 3. Layered @import
```css
@import url('reset.css') layer(reset);
@import url('framework.css') layer(components.framework);
```

### 4. Nested (grouped) layers
```css
@layer components {
  @layer defaults, structure, themes, utilities;
}
/* Or use dot notation: */
@layer components.defaults { /* ... */ }
```

### 5. Anonymous layers (use sparingly)
```css
@layer { /* unique, unreferenceable */ }
@import url('tool.css') layer; /* anonymous import */
```

---

## Priority Stack (low → high)

```
Normal browser styles
Normal user preferences
Normal layer-1  ← @layer reset
Normal layer-2  ← @layer defaults
...
Normal layer-N  ← @layer utilities
Normal un-layered styles  ← highest normal
--- !important reverses the order ---
!important un-layered
!important layer-N  ← @layer utilities
...
!important layer-1  ← @layer reset  ← MOST POWERFUL
```

> ⚠️ `!important` **reverses** layer order. Use with care.

---

## `revert-layer` keyword

Rolls back to the previous layer's value (like `revert` but scoped to layers):

```css
@layer theme {
  a { color: var(--brand, purple); }
  .no-theme { color: revert-layer; } /* uses 'default' layer value */
}
@layer default {
  a { color: maroon; }
}
```

---

## Recommended Architecture Patterns

### Standard layer stack
```css
@layer
  reset,        /* normalize / CSS Remedy */
  defaults,     /* element base styles */
  themes,       /* light/dark, brand tokens */
  patterns,     /* reusable UI patterns */
  layouts,      /* page-level structures */
  components,   /* scoped UI components */
  utilities;    /* atomic helpers — highest layered priority */
/* Un-layered overrides sit above all layers */
```

### ITCSS-inspired layers (for large projects)
See `references/architecture.md` for a detailed breakdown.

### Integrating third-party tools
```css
@layer reset, type, theme, components, utilities;

/* Pin 3rd-party tools to specific layers */
@import url('css-remedy.css') layer(reset);

/* Tailwind utilities in their proper layer */
@import url('tailwind.utilities.css') layer(utilities);
```

---

## Common Patterns & Recipes

### Low-priority reset that's easy to override
```css
/* Option A: wrap the entire reset */
@layer reset {
  /* all reset styles here */
}

/* Option B: import into a layer */
@import url('reset.css') layer(reset);
```
No need to `:where()` every selector anymore.

### Protect component internals
```css
@layer components {
  @layer base, variants, states;
  
  @layer base { .card { background: white; } }
  @layer variants { .card--dark { background: #111; } }
  @layer states { .card:hover { transform: scale(1.02); } }
}
```

### Theme overrides without !important
```css
@layer defaults, themes, components;

@layer defaults { button { color: black; background: gray; } }
@layer themes   { button { color: white; background: blue; } }
/* themes beats defaults — no !important needed */
```

### Conditional feature flag override
```css
@layer utilities {
  .feature-new-ui button { background: hotpink; }
}
/* utilities wins over components regardless of specificity */
```

---

## ⚠️ Gotchas & Best Practices

| ✅ Do | ❌ Don't |
|---|---|
| Declare all layers at the top in one statement | Let layer order be determined by import order alone |
| Use `revert-layer` instead of `!important` to "undo" a layer | Overuse `!important` inside layers (it flips priority) |
| Name layers semantically (reset, defaults, utilities…) | Create too many granular layers — keep it 5–10 at top level |
| Import 3rd-party CSS into a named layer | Let framework CSS be un-layered (it will override everything) |
| Nest sub-layers inside components for fine control | Use anonymous layers for anything you'll need to reference later |

---

## Browser Support

As of 2024: **all modern browsers** support `@layer` (Chrome 99+, Firefox 97+, Safari 15.4+). No polyfill needed for new projects. For legacy support, use `@supports` guards or a PostCSS plugin (`@csstools/postcss-cascade-layers`).

---

## Quick Reference Card

```css
/* 1. Declare order */
@layer A, B, C;          /* A=lowest, C=highest layered, un-layered=top */

/* 2. Add styles */
@layer A { .x { color: red; } }
@layer C { .x { color: blue; } }  /* blue wins (C > A) */

/* 3. Import */
@import url('file.css') layer(A);

/* 4. Nest */
@layer A { @layer sub1, sub2; }
@layer A.sub1 { /* ... */ }

/* 5. Revert */
.element { color: revert-layer; }
```

---

## Further Reference

- For large-scale architecture patterns: read `references/architecture.md`
- Official spec: https://www.w3.org/TR/css-cascade-5/
- CSS-Tricks guide: https://css-tricks.com/css-cascade-layers/
- Browser support: https://caniuse.com/css-cascade-layers
