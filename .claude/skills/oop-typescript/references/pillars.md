# Les 4 Piliers de la POO — Exemples TypeScript

## 1. Abstraction

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

## 2. Encapsulation

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

## 3. Héritage

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

## 4. Polymorphisme

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
