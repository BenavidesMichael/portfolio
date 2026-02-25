---
name: css-svg-properties
description: >
  Expert skill for styling, animating and controlling SVG elements using CSS.
  Use this skill whenever the user works with inline SVG, SVG icons, SVG illustrations,
  or asks about CSS properties like fill, stroke, cx, cy, r, d, clip-path, mask, opacity on SVG.
  Also trigger for SVG animation with CSS (@keyframes, transitions), SVG shape morphing,
  SVG geometry properties (SVG 2), or questions about which CSS properties apply to which
  SVG elements. Trigger even if the user just asks "how do I change the color of my SVG in CSS"
  or "why doesn't my CSS apply to SVG". Essential for SVG icon systems, animated illustrations,
  data visualizations styled with CSS, and any SVG/CSS integration question.
---

# SVG Properties in CSS Skill

## Core Concept

SVG has **presentation attributes** that double as CSS properties. Any presentation attribute can be set via CSS — either inline, in a `<style>` block, or in an external stylesheet. CSS always wins over presentation attributes in terms of specificity (except for `!important` on attributes).

```css
/* Targeting SVG elements directly in CSS */
circle {
  fill: red;
}
path {
  stroke: blue;
  stroke-width: 2px;
}
text {
  font-size: 14px;
  font-family: sans-serif;
}
```

---

## SVG Element Categories (for CSS targeting)

| Category              | Elements                                                                                              |
| --------------------- | ----------------------------------------------------------------------------------------------------- |
| **Container**         | `<a>` `<defs>` `<g>` `<marker>` `<mask>` `<pattern>` `<svg>` `<switch>` `<symbol>`                    |
| **Shape**             | `<circle>` `<ellipse>` `<line>` `<path>` `<polygon>` `<polyline>` `<rect>`                            |
| **Text**              | `<text>` `<textPath>` `<tspan>`                                                                       |
| **Graphics**          | `<circle>` `<ellipse>` `<image>` `<line>` `<path>` `<polygon>` `<polyline>` `<rect>` `<text>` `<use>` |
| **Filter primitives** | `<feBlend>` `<feGaussianBlur>` `<feFlood>` `<feColorMatrix>` …                                        |
| **Gradient**          | `<linearGradient>` `<radialGradient>` `<stop>`                                                        |

---

## Essential CSS Properties for SVG

### Painting (most used)

```css
.shape {
  fill: #6e40aa; /* interior color — replaces 'fill' attribute */
  fill-opacity: 0.8; /* 0–1 */
  fill-rule: evenodd; /* nonzero | evenodd */

  stroke: #333; /* outline color */
  stroke-width: 2px;
  stroke-opacity: 0.5;
  stroke-linecap: round; /* butt | round | square */
  stroke-linejoin: round; /* miter | round | bevel */
  stroke-dasharray: 10 5; /* dashes: dash gap dash gap… */
  stroke-dashoffset: 0; /* shift the dash pattern */
}
```

### Opacity & Visibility

```css
.icon {
  opacity: 0.5;
} /* applies to whole element */
.icon {
  visibility: hidden;
} /* hides but keeps space */
.icon {
  display: none;
} /* removes from layout */
```

### Clipping & Masking

```css
.element {
  clip-path: url(#myClip); /* reference a <clipPath> */
  mask: url(#myMask); /* reference a <mask> */
  overflow: hidden; /* on <svg>, <marker>, etc. */
}
```

### Filters

```css
.element {
  filter: url(#myFilter); /* SVG filter reference */
  filter: blur(4px) drop-shadow(2px 2px 4px black); /* CSS filters also work on SVG */
}
```

### Text (on `<text>`, `<tspan>`, `<textPath>`)

```css
text {
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  font-weight: bold;
  text-anchor: middle; /* start | middle | end — horizontal align */
  dominant-baseline: middle; /* text vertical alignment */
  letter-spacing: 0.05em;
}
```

### Gradient stops

```css
stop {
  stop-color: #6e40aa;
  stop-opacity: 1;
}
```

---

## SVG 2 Geometry Properties (CSS-controllable coords)

> ✅ Supported in Chrome, Safari. ⚠️ Partial in Firefox. Avoid in critical production without fallback.

```css
circle {
  cx: 50px;
  cy: 50px;
  r: 40px;
}
ellipse {
  cx: 100px;
  cy: 80px;
  rx: 60px;
  ry: 40px;
}
rect {
  x: 10px;
  y: 10px;
  width: 150px;
  height: 100px;
  rx: 8px;
}
path {
  d: path('M10 10 L90 90');
}
image,
foreignObject,
svg {
  x: 0;
  y: 0;
  width: 100%;
  height: 100%;
}
```

This allows minimal SVG markup — coordinates live in CSS, not attributes:

```html
<!-- Clean SVG markup with SVG 2 -->
<svg width="200" height="200">
  <rect />
  <!-- all geometry in CSS -->
</svg>
```

---

## Pseudo-classes & Interactivity

SVG elements support CSS pseudo-classes:

```css
circle:hover {
  fill: hotpink;
  cursor: pointer;
}
path:active {
  stroke-width: 4px;
}
rect:focus {
  outline: 2px solid blue;
}

/* pointer-events controls click/hover hit area */
.decorative {
  pointer-events: none;
} /* ignore hover/click */
.clickable {
  pointer-events: all;
}
```

---

## CSS Animations on SVG

### Animating paint properties

```css
@keyframes pulse {
  0%,
  100% {
    fill: #6e40aa;
    opacity: 1;
  }
  50% {
    fill: #24aad8;
    opacity: 0.6;
  }
}
circle {
  animation: pulse 2s ease-in-out infinite;
}
```

### Animating stroke (draw-on effect)

```css
path {
  stroke-dasharray: 500; /* total path length */
  stroke-dashoffset: 500; /* start fully hidden */
  animation: draw 2s ease forwards;
}
@keyframes draw {
  to {
    stroke-dashoffset: 0;
  } /* reveal the path */
}
```

### Animating geometry (SVG 2)

```css
.shape {
  cy: 50px;
  animation: wave 1.25s ease-in-out infinite;
}
@keyframes wave {
  50% {
    cy: 150px;
    r: 13px;
  }
}

/* Stagger with animation-delay */
.shape:nth-child(2) {
  animation-delay: 100ms;
}
.shape:nth-child(3) {
  animation-delay: 200ms;
}
.shape:nth-child(4) {
  animation-delay: 300ms;
}
```

### CSS transitions on SVG

```css
circle {
  fill: #6e40aa;
  transition:
    fill 0.3s ease,
    r 0.3s ease;
}
circle:hover {
  fill: #ff6b6b;
  r: 30px;
}
```

---

## SVG Shape Morphing with CSS

The `d` property (SVG 2) can be animated with CSS — but **both paths must have identical command types and point count**.

```css
path {
  d: path('M150 10 L40 200 L260 200 Z');
  fill: #4c6edb;
  transition: d 0.35s ease;
}
path:hover {
  d: path('M10 10 L190 10 L190 190 L10 190 Z');
}
```

---

## CSS Variables in SVG

CSS custom properties work inside SVG, making theming easy:

```css
:root {
  --brand: #6e40aa;
  --accent: #24aad8;
}

.icon-primary {
  fill: var(--brand);
}
.icon-accent {
  stroke: var(--accent);
}

/* Dark mode theming */
@media (prefers-color-scheme: dark) {
  :root {
    --brand: #a78bfa;
  }
}
```

---

## Specificity: CSS vs Presentation Attributes

```html
<!-- Presentation attribute (lowest priority) -->
<circle fill="red" />
```

```css
/* CSS property beats the attribute */
circle {
  fill: blue;
} /* ✅ wins */

/* !important on attribute would win back — avoid this pattern */
```

**Priority order** (low → high):

1. Inherited styles
2. Presentation attributes (`fill="red"` in HTML)
3. CSS styles (class, ID, inline style)
4. `!important`

---

## Common Patterns

### Icon system with CSS control

```html
<svg class="icon icon--primary">
  <use href="#icon-star" />
</svg>
```

```css
.icon {
  width: 24px;
  height: 24px;
}
.icon--primary {
  fill: var(--brand);
}
.icon--muted {
  fill: currentColor;
  opacity: 0.4;
}
```

### currentColor trick — SVG inherits text color

```css
.btn {
  color: white;
}
.btn svg {
  fill: currentColor;
} /* SVG matches button text color */
```

### Force SVG to scale with text

```css
.icon-inline {
  width: 1em;
  height: 1em;
  vertical-align: -0.125em;
  fill: currentColor;
}
```

---

## ⚠️ Gotchas

| Issue                      | Cause                                     | Fix                                                       |
| -------------------------- | ----------------------------------------- | --------------------------------------------------------- |
| CSS not applying to SVG    | SVG loaded as `<img>` or `background-url` | Use inline SVG or `<object>`                              |
| `fill` not working         | Property overridden by attribute          | Remove `fill=""` attribute from SVG markup                |
| Animation not smooth       | Animating non-animatable property         | Use `opacity`, `transform`, or valid SVG 2 geometry props |
| Shape morphing broken      | Paths have different command counts       | Match path commands exactly                               |
| `currentColor` not working | SVG is external (not inline)              | Inline the SVG in HTML                                    |
| Hover area wrong           | Hit area based on path, not bounding box  | Use `pointer-events: bounding-box`                        |

---

## Further Reference

- Full property table by element: see `references/properties-table.md`
- Official SVG 2 spec: https://www.w3.org/TR/SVG2/styling.html
- CSS-Tricks guide: https://css-tricks.com/svg-properties-and-css/
- SVG presentation attributes: https://www.w3.org/TR/SVG11/attindex.html#PresentationAttributes
