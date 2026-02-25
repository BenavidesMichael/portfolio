# Portfolio — Angular 21

Senior Front-End Architect mindset. Code quality expected at FAANG/Google level.

## Project

Portfolio-CV technique personnel. 3 adaptive layouts (not just responsive):

- **Mobile** (0-639px): App-like, bottom dock
- **Tablet** (640-1023px): Split view, sidebar fixe
- **Desktop** (>=1024px): Landing page, navbar sticky

## Tech Stack

- Angular 21 (Standalone, Signals, Zoneless) + TypeScript strict
- Tailwind CSS v4 + DaisyUI v5.5 (dracula dark / light theme)
- Layout detection: Angular CDK BreakpointObserver via DeviceService
- Icons: custom SVG components (`shared/components/icons/`)
- State: Signals + Services. Theme: ThemeService + ThemeToggleComponent

## Constraints

@rules/constraints.md

## Project Docs

@docs/planning/product.md — Product scope, quality targets, SEO
@docs/analysis/brainstorming.md — Design decisions & risks
@docs/design/ — Design mockups (mobile/tablet/desktop)
@docs/cv-europass.md — Source of truth for portfolio content (CV Europass complet)
