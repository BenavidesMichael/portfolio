# CSS Cascade Layers — Architecture Reference

## ITCSS-Inspired Layer Architecture (Large Projects)

ITCSS (Inverted Triangle CSS) maps perfectly onto cascade layers. The idea: go from
generic/global to specific/scoped, with explict priority at each level.

```
Specificity ▲
            │
  SETTINGS  │ ← Design tokens, CSS custom properties (no output)
    TOOLS   │ ← Mixins, functions (no output if using preprocessors)
    GENERIC │ ← Normalize, CSS Remedy, box-sizing reset
   ELEMENTS │ ← Bare HTML element styles (a, h1–h6, p…)
   OBJECTS  │ ← Layout patterns (grid, wrapper, media object)
COMPONENTS  │ ← UI components (.card, .button, .modal…)
  UTILITIES │ ← Trumps / atomic overrides (.u-hidden, .text-center…)
            │
Reach ──────┼─────────────────────────────────────────────────────►
  (wide)    │                                            (narrow)
```

### Layer declaration for ITCSS

```css
@layer settings,   /* custom properties / design tokens */
  generic,    /* normalize, reset */
  elements,   /* bare element defaults */
  objects,    /* layout patterns */
  components, /* UI components */
  utilities; /* atomic overrides */
```

Settings don't produce CSS output directly, so they're often un-layered or placed in `:root` blocks outside layers.

---

## Multi-File Project Structure

```
styles/
├── main.css               ← entry point, layer declarations + imports
├── generic/
│   ├── reset.css
│   └── typography.css
├── elements/
│   ├── links.css
│   └── forms.css
├── components/
│   ├── button.css
│   ├── card.css
│   └── modal.css
└── utilities/
    └── spacing.css
```

**main.css:**

```css
/* 1. Establish the full layer order */
@layer generic, elements, objects, components, utilities;

/* 2. Import files into their layers */
@import url('generic/reset.css') layer(generic);
@import url('generic/typography.css') layer(generic);
@import url('elements/links.css') layer(elements);
@import url('elements/forms.css') layer(elements);
@import url('components/button.css') layer(components);
@import url('components/card.css') layer(components);
@import url('utilities/spacing.css') layer(utilities);
```

---

## Design System with Sub-Layers

For design systems that need fine-grained internal layering:

```css
@layer design-system {
  @layer tokens, base, patterns, components;
}

@layer product {
  @layer base, overrides;
}

/* Full stack (low → high):
   design-system.tokens
   design-system.base
   design-system.patterns
   design-system.components
   design-system (un-nested)
   product.base
   product.overrides
   product (un-nested)
   [un-layered styles — highest]
*/
```

---

## Third-Party Integration Recipes

### Tailwind CSS

```css
/* tailwind.css (modified) */
@layer tw-base, tw-components, tw-utilities;

@import 'tailwindcss/base' layer(tw-base);
@import 'tailwindcss/components' layer(tw-components);
@import 'tailwindcss/utilities' layer(tw-utilities);
```

Or using Tailwind's native `@layer` (Tailwind v3+ respects existing `@layer` blocks).

### Material UI / CSS-in-JS

Many CSS-in-JS tools inject styles without layers. Wrap them in a layer by adding:

```css
/* Force injected styles into a layer using a wrapper */
@layer mui {
  /* MUI styles will be captured here if configured */
}
```

Check the tool's documentation for native layer support.

---

## Theming Pattern

```css
@layer defaults, themes.light, themes.dark, components;

@layer defaults {
  :root {
    --color-bg: white;
    --color-text: black;
  }
}

@layer themes.light {
  :root {
    --color-bg: #fafafa;
    --color-text: #111;
  }
}

@layer themes.dark {
  @media (prefers-color-scheme: dark) {
    :root {
      --color-bg: #111;
      --color-text: #fafafa;
    }
  }
  [data-theme='dark'] {
    --color-bg: #111;
    --color-text: #fafafa;
  }
}

@layer components {
  body {
    background: var(--color-bg);
    color: var(--color-text);
  }
}
```

---

## Debugging Tips

1. **Check DevTools** — Chrome/Firefox show layer membership in the Styles panel.
2. **Print the layer stack** — inspect order with `@layer` statement previews.
3. **Use named layers** — anonymous layers are invisible in DevTools.
4. **Unexpected `!important` behaviour?** — Remember important layers are reversed.
   A `!important` rule in a _low_ layer beats a `!important` rule in a _high_ layer.
5. **Third-party style winning unexpectedly?** — It's probably un-layered. Wrap with
   `@import url('lib.css') layer(lib);` to give it a controlled priority.
