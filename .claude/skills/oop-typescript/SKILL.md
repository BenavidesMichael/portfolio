---
name: oop-typescript
description: Guide POO TypeScript : 4 piliers, relations entre objets, SOLID. Utiliser pour classes, interfaces, héritage, encapsulation, polymorphisme, composition, agrégation, ou structuration de code TypeScript.
---

# POO en TypeScript — Guide de référence

Ce skill couvre les **4 piliers de la POO** et les **relations entre objets**, traduits en TypeScript concret.

---

## Les 4 Piliers — Résumé

| Pilier | Définition | Règle clé |
|--------|-----------|-----------|
| **Abstraction** | Ne retenir que les détails utiles au contexte | Une même entité → plusieurs abstractions selon l'usage |
| **Encapsulation** | Cacher l'état interne, n'exposer qu'une interface limitée | `private` → classe seulement, `protected` → classe + sous-classes |
| **Héritage** | Construire de nouvelles classes à partir d'existantes | Une seule classe mère (`extends`), plusieurs interfaces (`implements`) |
| **Polymorphisme** | Détecter la vraie classe d'un objet et appeler son implémentation | Même appel → comportements différents selon le type réel |

→ Code complet par pilier : [references/pillars.md](references/pillars.md)

---

## L'Échelle de Couplage (du plus faible au plus fort)

| Niveau | Relation | Description | Exemple TypeScript |
|--------|----------|-------------|-------------------|
| 1 | **Dépendance** | A peut être impacté par B (usage ponctuel) | B passé en paramètre d'une méthode |
| 2 | **Association** | A connaît B (lien permanent) | B stocké comme attribut de A |
| 3 | **Agrégation** | A contient des B, mais B peut exister seul | `equipe` contient des `joueurs` indépendants |
| 4 | **Composition** | A contient des B et gère leur cycle de vie | `maison` contient des `pieces` qui n'existent pas sans elle |
| 5 | **Implémentation** | A implémente l'interface de B | `class A implements B` |
| 6 | **Héritage** | A hérite de l'interface ET l'implémentation de B | `class A extends B` |

> **Bonne pratique** : préférer des couplages faibles (interfaces plutôt que classes concrètes) pour plus de flexibilité et réutilisabilité.

→ Exemples TypeScript complets : [references/relations.md](references/relations.md)

---

## Recommandations de bonne conception — Résumé

1. **Encapsuler ce qui varie** — isoler les parties changeantes dans des modules séparés
2. **Programmer avec les interfaces** — dépendre d'abstractions, pas de classes concrètes
3. **Préférer la composition à l'héritage** — relation "a un" plutôt que "est un"
4. **Affaiblir les relations de couplage** — viser le niveau le plus bas possible sur l'échelle
5. **Principes SOLID** — S, O, L, I, D

→ Code complet + SOLID : [references/best-practices.md](references/best-practices.md)

---

## Checklist de bonne conception POO

- [ ] **Abstraction** : Ma classe ne contient que ce qui est utile au contexte ?
- [ ] **Encapsulation** : J'utilise `private`/`protected` pour cacher l'état interne ?
- [ ] **Ce qui varie** : Les parties changeantes sont-elles isolées dans des modules séparés ?
- [ ] **Interfaces** : Je dépends d'abstractions plutôt que de classes concrètes ?
- [ ] **Composition vs Héritage** : La composition est-elle préférable ici à l'héritage ?
- [ ] **Couplage** : Mes dépendances sont-elles les plus faibles possible sur l'échelle de couplage ?
- [ ] **SOLID** : Mon code respecte-t-il les principes S, O, L, I, D ?
