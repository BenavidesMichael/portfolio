# Icon System Documentation

## 📖 Overview

Standardized icon component system with design tokens for consistent sizes and stroke weights across the application.

**Design System:** Tailwind 4 + Custom Icon Tokens
**Framework:** Angular 21 Standalone Components
**Total Icons:** 8 components

---

## 🎨 Design Tokens

### Size Variants

| Size |     Value      | Usage                    | Example                      |
| :--- | :------------: | :----------------------- | :--------------------------- |
| `xs` |  16px (1rem)   | Small inline icons       | Badge icons, table cells     |
| `sm` | 20px (1.25rem) | Body content icons       | List items, form labels      |
| `md` | 24px (1.5rem)  | **Default** - Navigation | Navbar, footer, bottom nav   |
| `lg` |  32px (2rem)   | Feature highlights       | Section headers, cards       |
| `xl` | 40px (2.5rem)  | Hero sections            | Landing page, splash screens |

### Stroke Weight Variants

| Weight    | Value | Usage                       | Example              |
| :-------- | :---: | :-------------------------- | :------------------- |
| `thin`    |   1   | Secondary icons, decorative | Background patterns  |
| `regular` |  1.5  | Body content icons          | Text inline icons    |
| `medium`  |   2   | **Default** - Navigation    | Primary actions      |
| `bold`    |  2.5  | Emphasis, CTAs              | Hero buttons, alerts |

---

## 🚀 Usage

### Basic Usage (Default)

```html
<!-- Default: size="md", weight="medium" -->
<app-icon-github />
<app-icon-mail />
<app-icon-home />
```

**Renders:** 24px icon with 2px stroke width

---

### Custom Size

```html
<!-- Small icon for inline text -->
<p>Email me <app-icon-mail size="xs" /> for inquiries</p>

<!-- Large icon for feature section -->
<app-icon-terminal size="lg" />

<!-- Extra large for hero -->
<app-icon-code size="xl" />
```

---

### Custom Weight

```html
<!-- Thin stroke for subtle background -->
<app-icon-github size="xl" weight="thin" />

<!-- Bold stroke for emphasis -->
<app-icon-mail size="lg" weight="bold" />
```

---

### Combined Size + Weight

```html
<!-- Large, bold icon for CTA button -->
<button class="btn btn-primary">
  <app-icon-terminal size="lg" weight="bold" />
  Get Started
</button>

<!-- Small, thin icon for secondary action -->
<button class="btn btn-ghost">
  <app-icon-user size="sm" weight="thin" />
  Profile
</button>
```

---

## 📋 Available Icons

| Component               | Selector            | Description     | Usage                 |
| :---------------------- | :------------------ | :-------------- | :-------------------- |
| `GithubIconComponent`   | `app-icon-github`   | GitHub logo     | Social links, profile |
| `MailIconComponent`     | `app-icon-mail`     | Email envelope  | Contact, forms        |
| `HomeIconComponent`     | `app-icon-home`     | House           | Navigation, home link |
| `UserIconComponent`     | `app-icon-user`     | User profile    | Account, profile      |
| `CodeIconComponent`     | `app-icon-code`     | Code brackets   | Tech stack, projects  |
| `TerminalIconComponent` | `app-icon-terminal` | Terminal prompt | CLI, development      |
| `SunIconComponent`      | `app-icon-sun`      | Sun             | Light theme toggle    |
| `MoonIconComponent`     | `app-icon-moon`     | Moon            | Dark theme toggle     |

---

## 🎯 Usage Guidelines

### Navigation (Navbar, Footer, Bottom Nav)

```html
<!-- Use md (24px) for consistent navigation -->
<app-icon-home size="md" />
<app-icon-user size="md" />
<app-icon-code size="md" />
<app-icon-mail size="md" />
```

**Reason:** Standard touch target size (24px) for mobile accessibility

---

### Feature Sections

```html
<!-- Use lg (32px) for section headers -->
<section>
  <app-icon-code size="lg" weight="bold" />
  <h2>Tech Stack</h2>
</section>
```

**Reason:** Visual hierarchy, draws attention

---

### Hero / Landing

```html
<!-- Use xl (40px) for hero sections -->
<div class="hero">
  <app-icon-terminal size="xl" weight="bold" />
  <h1>Full-Stack Developer</h1>
</div>
```

**Reason:** Large viewport, primary focus

---

### Inline Text

```html
<!-- Use xs (16px) for inline icons -->
<p>
  Contact me via
  <app-icon-mail size="xs" />
  email
</p>
```

**Reason:** Matches text line-height (1em = 16px)

---

## 🔧 Technical Details

### Component Structure

All icon components follow this standardized structure:

```typescript
import { Component, ChangeDetectionStrategy, input, computed } from '@angular/core';

type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type IconWeight = 'thin' | 'regular' | 'medium' | 'bold';

@Component({
  selector: 'app-icon-{name}',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'icon',
    'aria-hidden': 'true',
    '[attr.data-size]': 'size()',
  },
  template: `
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      [attr.data-weight]="weight()"
      [attr.stroke-width]="strokeWidth()"
    >
      <!-- SVG paths -->
    </svg>
  `,
})
export class {Name}IconComponent {
  /** Icon size variant (default: md) */
  readonly size = input<IconSize>('md');

  /** Stroke weight variant (default: medium) */
  readonly weight = input<IconWeight>('medium');

  /** Computed stroke width based on weight */
  protected readonly strokeWidth = computed(() => {
    const w = this.weight();
    return w === 'thin' ? '1' : w === 'regular' ? '1.5' : w === 'medium' ? '2' : '2.5';
  });
}
```

---

### CSS Design Tokens

Located in `src/styles.css`:

```css
@theme {
  /* Icon Stroke Weights */
  --icon-stroke-thin: 1;
  --icon-stroke-regular: 1.5;
  --icon-stroke-medium: 2;
  --icon-stroke-bold: 2.5;
  --icon-stroke-default: var(--icon-stroke-medium);

  /* Icon Sizes (Semantic) */
  --icon-size-xs: 1rem; /* 16px */
  --icon-size-sm: 1.25rem; /* 20px */
  --icon-size-md: 1.5rem; /* 24px */
  --icon-size-lg: 2rem; /* 32px */
  --icon-size-xl: 2.5rem; /* 40px */
}

/* Size Variants */
.icon[data-size='xs'] {
  width: var(--icon-size-xs);
  height: var(--icon-size-xs);
}
.icon[data-size='sm'] {
  width: var(--icon-size-sm);
  height: var(--icon-size-sm);
}
.icon[data-size='md'] {
  width: var(--icon-size-md);
  height: var(--icon-size-md);
}
.icon[data-size='lg'] {
  width: var(--icon-size-lg);
  height: var(--icon-size-lg);
}
.icon[data-size='xl'] {
  width: var(--icon-size-xl);
  height: var(--icon-size-xl);
}

/* Weight Variants */
.icon svg[data-weight='thin'] {
  stroke-width: var(--icon-stroke-thin);
}
.icon svg[data-weight='regular'] {
  stroke-width: var(--icon-stroke-regular);
}
.icon svg[data-weight='medium'] {
  stroke-width: var(--icon-stroke-medium);
}
.icon svg[data-weight='bold'] {
  stroke-width: var(--icon-stroke-bold);
}
```

---

## ♿ Accessibility

### ARIA Attributes

All icons have `aria-hidden="true"` by default since they are **decorative**.

**When to add aria-label:**

```html
<!-- ❌ DON'T: Icon is decorative, button has label -->
<button>
  <app-icon-github />
  GitHub Profile
</button>

<!-- ✅ DO: Icon-only button needs label -->
<button aria-label="GitHub Profile">
  <app-icon-github />
</button>

<!-- ✅ DO: Link with visible text -->
<a href="mailto:contact@example.com">
  <app-icon-mail />
  Email Me
</a>

<!-- ✅ DO: Icon-only link needs label -->
<a href="mailto:contact@example.com" aria-label="Send Email">
  <app-icon-mail />
</a>
```

---

## 🎨 Visual Examples

### Size Comparison

```
xs (16px):  ⬜ Small inline
sm (20px):  ⬛ Body content
md (24px):  ◼️ Navigation (default)
lg (32px):  ◾ Feature highlights
xl (40px):  ⬛ Hero sections
```

### Weight Comparison (md size)

```
thin (1):      ⬜⬜⬜⬜ Light, subtle
regular (1.5): ⬛⬛⬛⬛ Standard text
medium (2):    ◼️◼️◼️◼️ Navigation (default)
bold (2.5):    ⬛⬛⬛⬛ Emphasized, CTAs
```

---

## 📦 Barrel Export

Import icons from the barrel file:

```typescript
import {
  GithubIconComponent,
  MailIconComponent,
  HomeIconComponent,
  UserIconComponent,
  CodeIconComponent,
  TerminalIconComponent,
  SunIconComponent,
  MoonIconComponent,
} from '@shared/components/icons';

@Component({
  imports: [GithubIconComponent, MailIconComponent],
})
export class MyComponent {}
```

---

## 🚨 Migration Guide

### Before (Inconsistent)

```html
<!-- ❌ Hardcoded Tailwind classes -->
<app-icon-github class="size-6" />
<app-icon-mail class="w-5 h-5" />
<app-icon-home />
<!-- Inherits parent font-size -->
```

### After (Standardized)

```html
<!-- ✅ Semantic size props -->
<app-icon-github size="md" />
<app-icon-mail size="sm" />
<app-icon-home size="md" />
```

---

## 🔄 Future Enhancements

### Planned Features

1. **Dynamic Icon Loader**

   ```html
   <app-icon name="github" size="md" weight="medium" />
   ```

2. **Icon Composability**
   - Badge overlays
   - Color variants
   - Animation states

3. **Icon Library Expansion**
   - LinkedIn icon
   - Twitter/X icon
   - More social platforms

---

## 📚 Resources

- **Design Tokens:** `src/styles.css`
- **Components:** `src/app/shared/components/icons/`
- **Barrel Export:** `src/app/shared/components/icons/index.ts`
- **Usage Examples:** This README

---

**Last Updated:** 2026-02-03
**Design System Version:** 1.0.0
**Maintained by:** Portfolio Team
