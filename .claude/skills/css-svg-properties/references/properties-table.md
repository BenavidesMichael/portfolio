# SVG CSS Properties — Full Reference Table

## Shared CSS/SVG Properties

### Font Properties

_(applies to: text content elements)_

| Property           | Notes     |
| ------------------ | --------- |
| `font`             | Shorthand |
| `font-family`      |           |
| `font-size`        |           |
| `font-size-adjust` |           |
| `font-stretch`     |           |
| `font-style`       |           |
| `font-variant`     |           |
| `font-weight`      |           |

### Text Properties

| Property          | Applies to            |
| ----------------- | --------------------- |
| `direction`       | `<text>` `<tspan>`    |
| `letter-spacing`  | Text content elements |
| `text-decoration` | Text content elements |
| `unicode-bidi`    | Text content elements |
| `word-spacing`    | Text content elements |
| `writing-mode`    | `<text>`              |

### Color / Visibility / Display

| Property     | Applies to                                                                                   |
| ------------ | -------------------------------------------------------------------------------------------- |
| `color`      | Elements using `fill`, `stroke`, `stop-color`, `flood-color`, `lighting-color`               |
| `display`    | Graphics elements, text elements, `<a>` `<foreignObject>` `<g>` `<svg>` `<switch>`           |
| `visibility` | Graphics elements, text content elements                                                     |
| `opacity`    | Graphics elements, `<a>` `<defs>` `<g>` `<marker>` `<pattern>` `<svg>` `<switch>` `<symbol>` |
| `overflow`   | `<foreignObject>` `<image>` `<marker>` `<pattern>` `<svg>` `<symbol>`                        |
| `cursor`     | Container elements, graphics elements                                                        |

---

## SVG-Specific CSS Properties

### Painting Properties

| Property                      | Applies to                            |
| ----------------------------- | ------------------------------------- |
| `fill`                        | Shape elements, text content elements |
| `fill-rule`                   | Shape elements, text content elements |
| `fill-opacity`                | Shape elements, text content elements |
| `stroke`                      | Shape elements, text content elements |
| `stroke-width`                | Shape elements, text content elements |
| `stroke-opacity`              | Shape elements, text content elements |
| `stroke-linecap`              | Shape elements, text content elements |
| `stroke-linejoin`             | Shape elements, text content elements |
| `stroke-miterlimit`           | Shape elements, text content elements |
| `stroke-dasharray`            | Shape elements, text content elements |
| `stroke-dashoffset`           | Shape elements, text content elements |
| `color-interpolation`         | Container elements, graphics elements |
| `color-interpolation-filters` | Filter primitive elements             |
| `color-rendering`             | Container elements, graphics elements |
| `image-rendering`             | `<image>`                             |
| `shape-rendering`             | Shape elements                        |
| `text-rendering`              | `<text>`                              |

### Marker Properties

| Property       | Applies to                                 |
| -------------- | ------------------------------------------ |
| `marker`       | `<line>` `<path>` `<polygon>` `<polyline>` |
| `marker-start` | `<line>` `<path>` `<polygon>` `<polyline>` |
| `marker-mid`   | `<line>` `<path>` `<polygon>` `<polyline>` |
| `marker-end`   | `<line>` `<path>` `<polygon>` `<polyline>` |

### Text SVG Properties

| Property                       | Applies to                                    |
| ------------------------------ | --------------------------------------------- |
| `alignment-baseline`           | `<textPath>` `<tspan>`                        |
| `baseline-shift`               | `<textPath>` `<tspan>`                        |
| `dominant-baseline`            | Text content elements                         |
| `glyph-orientation-horizontal` | Text content elements _(deprecated in SVG 2)_ |
| `glyph-orientation-vertical`   | Text content elements                         |
| `kerning`                      | Text content elements _(deprecated in SVG 2)_ |
| `text-anchor`                  | Text content elements                         |

### Clipping & Masking

| Property    | Applies to                                                            |
| ----------- | --------------------------------------------------------------------- |
| `clip`      | `<foreignObject>` `<image>` `<marker>` `<pattern>` `<svg>` `<symbol>` |
| `clip-path` | Container elements, graphics elements                                 |
| `clip-rule` | `<clipPath>`                                                          |
| `mask`      | Container elements, graphics elements                                 |

### Filter Effects

| Property            | Applies to                                   |
| ------------------- | -------------------------------------------- |
| `filter`            | Container elements, graphics elements        |
| `flood-color`       | `<feFlood>`                                  |
| `flood-opacity`     | `<feFlood>`                                  |
| `lighting-color`    | `<feDiffuseLighting>` `<feSpecularLighting>` |
| `enable-background` | Container elements _(deprecated in SVG 2)_   |

### Gradient

| Property       | Applies to |
| -------------- | ---------- |
| `stop-color`   | `<stop>`   |
| `stop-opacity` | `<stop>`   |

### Interactivity

| Property         | Applies to        |
| ---------------- | ----------------- |
| `pointer-events` | Graphics elements |

---

## SVG 2 Geometry Properties

_(CSS-animatable coordinates and dimensions)_

| Element           | Geometry Properties                |
| ----------------- | ---------------------------------- |
| `<circle>`        | `cx` `cy` `r`                      |
| `<ellipse>`       | `cx` `cy` `rx` `ry`                |
| `<rect>`          | `x` `y` `width` `height` `rx` `ry` |
| `<path>`          | `d`                                |
| `<image>`         | `x` `y` `width` `height`           |
| `<foreignObject>` | `x` `y` `width` `height`           |
| `<svg>`           | `x` `y` `width` `height`           |

> ⚠️ SVG 2 geometry properties as CSS: Chrome ✅, Safari ✅, Firefox ⚠️ (partial). Check caniuse before using in production.

---

## Animatable SVG Properties (CSS Animations)

**Safely animatable** (broad support):

- `fill`, `fill-opacity`
- `stroke`, `stroke-width`, `stroke-opacity`, `stroke-dasharray`, `stroke-dashoffset`
- `opacity`
- `transform` (use `transform` CSS property, not SVG `transform` attribute)
- `filter` (blur, drop-shadow, etc.)

**SVG 2 animatable** (modern browsers only):

- `cx`, `cy`, `r`, `rx`, `ry`
- `x`, `y`, `width`, `height`
- `d` (path morphing — paths must have same command structure)

**Not animatable:**

- `clip-rule`, `fill-rule`
- `color-interpolation`
- Deprecated properties
