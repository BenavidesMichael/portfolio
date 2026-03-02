# Bonnes Pratiques de Conception POO

## 1. Encapsuler ce qui varie

Identifier les parties changeantes d'une application et les séparer de ce qui est statique. Isoler les parties variables dans des modules indépendants pour protéger le reste du code et faciliter l'ajout de nouvelles fonctionnalités sans tout remettre en cause.

```typescript
// ❌ La logique de calcul de remise est mélangée au reste
class Commande {
  calculerTotal(prix: number, typeClient: string): number {
    if (typeClient === "VIP") return prix * 0.8;
    if (typeClient === "NORMAL") return prix * 0.95;
    return prix;
  }
}

// ✅ On encapsule ce qui varie (la remise) dans un module séparé
interface StrategieRemise {
  appliquer(prix: number): number;
}
class RemiseVIP implements StrategieRemise {
  appliquer(prix: number): number { return prix * 0.8; }
}
class RemiseNormale implements StrategieRemise {
  appliquer(prix: number): number { return prix * 0.95; }
}
class Commande {
  constructor(private remise: StrategieRemise) {}
  calculerTotal(prix: number): number { return this.remise.appliquer(prix); }
}
```

---

## 2. Programmer avec les interfaces, non les implémentations

Dépendre des abstractions plutôt que des classes concrètes. Une conception flexible peut être étendue sans modifier le code existant. Pour y parvenir :
- Déterminer les méthodes précises dont un objet a besoin chez un autre
- Décrire ces méthodes dans une interface ou classe abstraite
- Rendre les classes dépendantes de cette interface plutôt que d'une classe spécifique

```typescript
// ❌ Dépend d'une classe concrète — couplage fort
class Notification {
  private email: EmailService = new EmailService();
  envoyer(message: string): void { this.email.envoyer(message); }
}

// ✅ Dépend d'une interface — couplage faible et extensible
interface ServiceNotification {
  envoyer(message: string): void;
}
class EmailService implements ServiceNotification {
  envoyer(message: string): void { console.log(`Email: ${message}`); }
}
class SMSService implements ServiceNotification {
  envoyer(message: string): void { console.log(`SMS: ${message}`); }
}
class Notification {
  constructor(private service: ServiceNotification) {}
  envoyer(message: string): void { this.service.envoyer(message); }
}
```

---

## 3. Préférer la composition à l'héritage

L'héritage présente des inconvénients majeurs : couplage fort entre sous-classes et classes mères, destruction de l'encapsulation, explosion combinatoire des sous-classes. La composition (relation "a un") permet de déléguer des tâches à d'autres objets et de modifier le comportement lors de l'exécution.

```typescript
// ❌ Héritage — explosion de sous-classes si on ajoute des variantes
class VoitureElectrique extends Voiture { ... }
class VoitureEssence extends Voiture { ... }
class VoitureElectriqueAutonome extends VoitureElectrique { ... }

// ✅ Composition — on injecte le moteur, on peut le changer à l'exécution
interface Moteur {
  demarrer(): void;
}
class MoteurElectrique implements Moteur {
  demarrer(): void { console.log("Moteur électrique démarré"); }
}
class MoteurEssence implements Moteur {
  demarrer(): void { console.log("Moteur essence démarré"); }
}
class Voiture {
  constructor(private moteur: Moteur) {}
  demarrer(): void { this.moteur.demarrer(); }
  changerMoteur(moteur: Moteur): void { this.moteur = moteur; }
}
```

---

## 4. Affaiblir les relations de couplage

Utiliser des interfaces ou des classes abstraites pour affaiblir les dépendances créées par l'utilisation de classes concrètes. Se référer à l'échelle de couplage (`references/relations.md`) et viser les niveaux les plus bas possibles.

---

## 5. Principes SOLID

| Lettre | Principe | Règle |
|--------|----------|-------|
| **S** | Responsabilité unique | Une classe = une seule raison de changer, une seule fonctionnalité |
| **O** | Ouvert/Fermé | Ouvert à l'extension, fermé à la modification |
| **L** | Substitution de Liskov | Une sous-classe doit pouvoir remplacer sa classe mère sans planter le programme |
| **I** | Ségrégation des interfaces | Préférer plusieurs interfaces étroites plutôt qu'une seule grosse interface |
| **D** | Inversion des dépendances | Les classes de haut niveau et de bas niveau doivent toutes deux dépendre d'abstractions |

```typescript
// S — Responsabilité unique
class Rapport { generer(): string { return "rapport"; } }       // génère
class ImprimanteRapport { imprimer(r: Rapport): void { ... } }  // imprime

// O — Ouvert/Fermé : on étend sans modifier
interface Forme { aire(): number; }
class Cercle implements Forme { aire(): number { return Math.PI * this.r ** 2; } }
class Carre implements Forme { aire(): number { return this.c ** 2; } }

// L — Substitution de Liskov
class Oiseau { voler(): void {} }
class Canari extends Oiseau { voler(): void { console.log("je vole"); } }  // ✅ remplace Oiseau

// I — Ségrégation des interfaces
interface Imprimable { imprimer(): void; }
interface Scannable { scanner(): void; }
// plutôt qu'une seule interface MachineMultifonction trop large

// D — Inversion des dépendances
interface Repository { sauvegarder(data: any): void; }
class ServiceMetier { constructor(private repo: Repository) {} }  // dépend de l'abstraction
```
