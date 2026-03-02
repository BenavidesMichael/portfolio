# Relations entre Objets — Exemples TypeScript complets

Les 6 niveaux de l'échelle de couplage, du plus faible au plus fort.

---

## 1. Dépendance — B utilisé ponctuellement en paramètre

```typescript
class Commande {
  calculerPrix(remise: Remise): number {  // Remise = dépendance
    return 100 - remise.valeur;
  }
}
```

> A peut être impacté par B, mais ne le stocke pas. Couplage minimal.

---

## 2. Association — B stocké comme attribut permanent

```typescript
class Etudiant {
  professeur: Professeur;  // connaît le professeur

  constructor(prof: Professeur) {
    this.professeur = prof;
  }
}
```

> A connaît B durablement, mais B peut exister indépendamment de A.

---

## 3. Agrégation — A contient des B, B peut exister sans A

```typescript
class Equipe {
  joueurs: Joueur[] = [];  // les joueurs existent indépendamment

  ajouterJoueur(j: Joueur): void {
    this.joueurs.push(j);
  }
}
```

> Si l'équipe disparaît, les joueurs continuent d'exister.

---

## 4. Composition — A crée et détruit les B

```typescript
class Maison {
  private pieces: Piece[];  // les pièces n'existent pas sans la maison

  constructor(nbPieces: number) {
    this.pieces = Array.from({ length: nbPieces }, () => new Piece());
  }
}
```

> Si la maison disparaît, les pièces disparaissent avec elle.

---

## 5. Implémentation — A respecte le contrat de B (interface)

```typescript
interface Volant {
  voler(): void;
}

class Oiseau implements Volant {
  voler(): void { console.log("Je vole avec mes ailes"); }
}

class Avion implements Volant {
  voler(): void { console.log("Je vole avec des moteurs"); }
}
```

> A respecte le contrat de B sans hériter de son implémentation. Couplage faible et extensible.

---

## 6. Héritage — A hérite de l'interface ET de l'implémentation de B

```typescript
class VehiculeMotorise {
  demarrerMoteur(): void { console.log("Vroom"); }
}

class Moto extends VehiculeMotorise {
  faireWheelie(): void { console.log("Wheelie!"); }
}
```

> Couplage le plus fort — la Moto est liée à l'implémentation de VehiculeMotorise. Préférer la composition quand c'est possible.
