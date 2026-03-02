---
name: oop-typescript
description: Guide pour programmer en TypeScript en suivant les principes de la Programmation Orientée Objet (POO). Utilise ce skill dès que l'utilisateur mentionne des classes, interfaces, héritage, encapsulation, polymorphisme, abstraction, ou toute question sur la structure de code TypeScript orienté objet. Déclenche aussi pour des questions sur les relations entre objets (dépendance, association, agrégation, composition), les piliers de la POO, ou quand l'utilisateur veut structurer son code TypeScript proprement.
---

# POO en TypeScript — Guide de référence

Ce skill couvre les **4 piliers de la POO** et les **relations entre objets**, traduits en TypeScript concret.

---

## Les 4 Piliers de la POO

### 1. Abstraction
Modéliser un objet en ne retenant que les détails utiles au contexte. Ignorer le reste.

```typescript
// Contexte simulateur de vol : on abstrait les données de vol
class Avion {
  vitesse: number;
  altitude: number;
  angleInclinaison: number;

  constructor(vitesse: number, altitude: number, angle: number) {
    this.vitesse = vitesse;
    this.altitude = altitude;
    this.angleInclinaison = angle;
  }
}

// Contexte réservation : on abstrait la disposition et les sièges
class AvionReservation {
  nombreSieges: number;
  siegesDisponibles: number[];

  constructor(nombreSieges: number) {
    this.nombreSieges = nombreSieges;
    this.siegesDisponibles = Array.from({ length: nombreSieges }, (_, i) => i + 1);
  }
}
```

> **Règle** : une même entité du monde réel peut donner plusieurs abstractions différentes selon le contexte d'usage.

---

### 2. Encapsulation
Cacher l'état interne d'un objet et n'exposer qu'une interface limitée.

- `private` : accessible uniquement dans la classe elle-même
- `protected` : accessible dans la classe et ses sous-classes
- `public` : accessible partout (défaut)

```typescript
class Voiture {
  private vilebrequin: number = 0;   // détail interne caché
  private pistons: number[] = [];    // détail interne caché

  // Interface publique simple pour l'utilisateur
  public demarrer(): void {
    this._activerVilebrequin();
    console.log("Voiture démarrée");
  }

  public accelerer(vitesse: number): void {
    // l'utilisateur n'a pas besoin de savoir comment ça marche
    this.vilebrequin += vitesse;
  }

  private _activerVilebrequin(): void {
    // logique complexe cachée
    this.vilebrequin = 1;
  }
}

// Utilisation : interface simple, complexité cachée
const maVoiture = new Voiture();
maVoiture.demarrer();
maVoiture.accelerer(50);
// maVoiture.vilebrequin  // ❌ Erreur TypeScript : private
```

---

### 3. Héritage
Construire de nouvelles classes à partir de classes existantes. Réutiliser le code.

```typescript
// Classe mère (super-classe)
class Animal {
  protected nom: string;

  constructor(nom: string) {
    this.nom = nom;
  }

  emettreSon(): string {
    return "...";
  }

  seDeplacer(): void {
    console.log(`${this.nom} se déplace`);
  }
}

// Sous-classes qui héritent et redéfinissent (override)
class Chat extends Animal {
  constructor(nom: string) {
    super(nom); // appel au constructeur de la classe mère
  }

  emettreSon(): string {  // override
    return `${this.nom} : Miaou !`;
  }
}

class Chien extends Animal {
  constructor(nom: string) {
    super(nom);
  }

  emettreSon(): string {  // override
    return `${this.nom} : Waf !`;
  }
}
```

> **Limite** : en TypeScript (comme en Java/C#), une classe ne peut avoir **qu'un seul parent** (`extends`), mais peut implémenter **plusieurs interfaces** (`implements`).

---

### 4. Polymorphisme
La capacité d'un programme à détecter la vraie classe d'un objet et appeler son implémentation spécifique.

```typescript
// Même liste, types différents → comportements différents
const animaux: Animal[] = [
  new Chat("Félix"),
  new Chien("Rex"),
  new Chat("Luna"),
];

for (const animal of animaux) {
  // TypeScript appelle automatiquement la bonne implémentation
  console.log(animal.emettreSon());
}
// Félix : Miaou !
// Rex : Waf !
// Luna : Miaou !
```

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

---

## Exemples TypeScript des Relations

```typescript
// 1. DÉPENDANCE — B utilisé ponctuellement en paramètre
class Commande {
  calculerPrix(remise: Remise): number {  // Remise = dépendance
    return 100 - remise.valeur;
  }
}

// 2. ASSOCIATION — B stocké comme attribut
class Etudiant {
  professeur: Professeur;  // connaît le professeur
  constructor(prof: Professeur) {
    this.professeur = prof;
  }
}

// 3. AGRÉGATION — contient des B, B peut exister sans A
class Equipe {
  joueurs: Joueur[] = [];  // les joueurs existent indépendamment
  ajouterJoueur(j: Joueur): void {
    this.joueurs.push(j);
  }
}

// 4. COMPOSITION — crée et détruit les B
class Maison {
  private pieces: Piece[];  // les pièces n'existent pas sans la maison
  constructor(nbPieces: number) {
    this.pieces = Array.from({ length: nbPieces }, () => new Piece());
  }
}

// 5. IMPLÉMENTATION — interface
interface Volant {
  voler(): void;
}
class Oiseau implements Volant {
  voler(): void { console.log("Je vole avec mes ailes"); }
}
class Avion implements Volant {
  voler(): void { console.log("Je vole avec des moteurs"); }
}

// 6. HÉRITAGE — extends
class VehiculeMotorise {
  demarrerMoteur(): void { console.log("Vroom"); }
}
class Moto extends VehiculeMotorise {
  faireWheelie(): void { console.log("Wheelie!"); }
}
```

---

## Recommandations de bonne conception POO

### 1. Encapsuler ce qui varie
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

### 2. Programmer avec les interfaces, non les implémentations
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

### 3. Préférer la composition à l'héritage
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
  // On peut changer le moteur à l'exécution !
  changerMoteur(moteur: Moteur): void { this.moteur = moteur; }
}
```

---

### 4. Affaiblir les relations de couplage
Utiliser des interfaces ou des classes abstraites pour affaiblir les dépendances créées par l'utilisation de classes concrètes. Se référer à l'échelle de couplage ci-dessus et viser les niveaux les plus bas possibles.

---

### 5. Principes SOLID

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

---

## Checklist de bonne conception POO

- [ ] **Abstraction** : Ma classe ne contient que ce qui est utile au contexte ?
- [ ] **Encapsulation** : J'utilise `private`/`protected` pour cacher l'état interne ?
- [ ] **Ce qui varie** : Les parties changeantes sont-elles isolées dans des modules séparés ?
- [ ] **Interfaces** : Je dépends d'abstractions plutôt que de classes concrètes ?
- [ ] **Composition vs Héritage** : La composition est-elle préférable ici à l'héritage ?
- [ ] **Couplage** : Mes dépendances sont-elles les plus faibles possible sur l'échelle de couplage ?
- [ ] **SOLID** : Mon code respecte-t-il les principes S, O, L, I, D ?