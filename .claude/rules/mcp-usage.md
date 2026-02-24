# MCP Servers — When to Use Which

## MANDATORY — Angular code verification

**Before writing or suggesting any Angular code, always:**
1. Call `angular-cli` → `get_best_practices` for the relevant topic
2. If the pattern involves a specific API, call `search_documentation` to confirm current syntax
3. Never propose deprecated patterns — verify with `get_angular_deprecated_features` if in doubt

This applies to: components, services, signals, routing, guards, pipes, directives, DI, lifecycle hooks.

---

## Angular CLI MCP (`angular-cli`)
Official Angular CLI tools — best practices, documentation, migrations.

**Tools:** `get_best_practices`, `search_documentation`, `find_examples`, `ai_tutor`, `onpush_zoneless_migration`, `list_projects`

## Dolmen Angular MCP (`dolmen-angular`)
Angular ecosystem knowledge — version compatibility, package features, deprecations.

**Tools:** `ask_angular_question`, `search_angular_sources`, `get_angular_compatibility_feature`, `get_angular_package_features`, `get_angular_deprecated_features`, `get_angular_packages`, `get_angular_feature_status`

## Decision Guide

| Question | Use |
|----------|-----|
| "Is this the right Angular pattern?" | Angular CLI → `get_best_practices` |
| "How does Angular docs say to do X?" | Angular CLI → `search_documentation` |
| "When was this feature introduced?" | Dolmen → `get_angular_compatibility_feature` |
| "What's the modern replacement for X?" | Dolmen → `get_angular_deprecated_features` |
| "What features does @angular/core offer?" | Dolmen → `get_angular_package_features` |
