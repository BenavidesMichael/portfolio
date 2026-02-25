---
paths:
  - 'src/**/*.ts'
  - 'src/**/*.html'
---

# Architecture Rules — Angular Portfolio

## Reusability Checklist (check BEFORE writing any code)

1. `src/app/core/services/` — **DeviceService** (layout detection), **ThemeService** (theme toggle) — NEVER recreate
2. `src/app/shared/components/icons/` — SVG icons: code, github, home, mail, moon, sun, terminal, user
3. `src/app/shared/components/` — ThemeToggle, LoadingPlaceholder, NavIcon, etc.
4. `src/app/models/` — DeviceType, NavLink, Skill, SkillCategory, etc.
5. `src/app/data/` — nav.data.ts, skills.data.ts, etc.
6. Read `index.ts` barrel exports for available public APIs

**Rules:** Always use `inject()` for DI. Import from barrel exports (`@core/services`, `@shared/components/icons`). Zero duplication.

## Adaptive Design Pattern — 2 Levels

1. **Pages (Structural)** — BreakpointObserver via DeviceService
   - `@switch` on `device()` in `app.ts` — completely different DOM per device
   - Each page imports the same features with a different wrapper

2. **Features (Visual)** — Responsive CSS via DaisyUI + Tailwind
   - Device-agnostic components using `md:`, `lg:` breakpoint prefixes
   - No `views/` sub-folders unless content/interaction is fundamentally different per device

## Folder Structure

```
src/app/
├── core/services/          # Singletons: DeviceService, ThemeService
├── shared/components/      # Reusable: icons/, theme-toggle/, loading-placeholder/
├── pages/                  # 3 adaptive layouts (mobile/, tablet/, desktop/)
│   ├── mobile/             # 0-639px: App-like, bottom dock
│   ├── tablet/             # 640-1023px: Split view, sidebar
│   └── desktop/            # >=1024px: Landing page, navbar sticky
├── features/               # Sections: hero/, about/, stack/, contact/, experience/, education/
├── data/                   # Static data files
├── models/                 # Interfaces/Types
└── i18n/                   # Internationalization (planned)
```

## Breakpoints

| Device  | Range      | Layout       | Navigation          |
| ------- | ---------- | ------------ | ------------------- |
| Mobile  | 0-639px    | App-like     | Bottom dock         |
| Tablet  | 640-1023px | Split view   | Sidebar fixe gauche |
| Desktop | >= 1024px  | Landing page | Top navbar sticky   |
