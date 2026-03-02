---
name: clean-code
description: Apply SOLID, DRY, KISS and other clean code principles when writing or reviewing code. Use this skill to ensure code quality, maintainability and scalability.
---

# Clean Code Principles

This skill provides guidelines for writing clean, maintainable, and scalable code based on industry-standard principles.

## SOLID Principles

### S - Single Responsibility Principle (SRP)
> A class should have only one reason to change.

**Rules:**
- One class = One responsibility
- Separate concerns into distinct classes
- If you can't describe a class's purpose in one sentence without "and", split it

**Benefits:**
- Easier to understand and maintain
- Facilitates testing and debugging
- Promotes code reusability

**Bad Example:**
```typescript
// Violates SRP - handles both user data AND notifications
class UserService {
  saveUser(user: User) { /* ... */ }
  sendWelcomeEmail(user: User) { /* ... */ }
  sendPasswordResetSMS(user: User) { /* ... */ }
}
```

**Good Example:**
```typescript
class UserRepository {
  save(user: User) { /* ... */ }
}

class NotificationService {
  sendEmail(to: string, template: string) { /* ... */ }
  sendSMS(to: string, message: string) { /* ... */ }
}
```

---

### O - Open/Closed Principle (OCP)
> Software entities should be open for extension but closed for modification.

**Rules:**
- Extend behavior through inheritance or composition
- Use abstractions (interfaces/abstract classes)
- Avoid modifying existing tested code

**Benefits:**
- Prevents regressions
- Facilitates adding new features
- Makes unit testing easier

**Bad Example:**
```typescript
// Must modify class to add new payment method
class PaymentProcessor {
  process(type: string, amount: number) {
    if (type === 'card') { /* ... */ }
    else if (type === 'paypal') { /* ... */ }
    // Adding new method requires modification!
  }
}
```

**Good Example:**
```typescript
interface PaymentMethod {
  process(amount: number): Promise<PaymentResult>;
}

class CardPayment implements PaymentMethod {
  process(amount: number) { /* ... */ }
}

class PaypalPayment implements PaymentMethod {
  process(amount: number) { /* ... */ }
}

// New methods just implement the interface
class CryptoPayment implements PaymentMethod {
  process(amount: number) { /* ... */ }
}
```

---

### L - Liskov Substitution Principle (LSP)
> Subtypes must be substitutable for their base types.

**Rules:**
- Child classes must honor parent class contracts
- Don't strengthen preconditions in subclasses
- Don't weaken postconditions in subclasses
- Derived classes should not throw unexpected exceptions

**Benefits:**
- Ensures consistent behavior
- Promotes modularity and reusability
- Avoids unexpected behaviors in polymorphism

**Bad Example:**
```typescript
class Rectangle {
  setWidth(w: number) { this.width = w; }
  setHeight(h: number) { this.height = h; }
  getArea() { return this.width * this.height; }
}

class Square extends Rectangle {
  setWidth(w: number) {
    this.width = w;
    this.height = w; // Violates LSP - changes behavior
  }
}
```

**Good Example:**
```typescript
interface Shape {
  getArea(): number;
}

class Rectangle implements Shape {
  constructor(private width: number, private height: number) {}
  getArea() { return this.width * this.height; }
}

class Square implements Shape {
  constructor(private side: number) {}
  getArea() { return this.side * this.side; }
}
```

---

### I - Interface Segregation Principle (ISP)
> Clients should not be forced to depend on interfaces they don't use.

**Rules:**
- Create specific, focused interfaces
- Avoid "fat" interfaces with many methods
- Split large interfaces into smaller, cohesive ones

**Benefits:**
- Clearer and more coherent interfaces
- Easier maintenance
- Reduced coupling

**Bad Example:**
```typescript
interface Worker {
  work(): void;
  eat(): void;
  sleep(): void;
}

class Robot implements Worker {
  work() { /* ... */ }
  eat() { throw new Error('Robots do not eat'); } // Forced to implement
  sleep() { throw new Error('Robots do not sleep'); }
}
```

**Good Example:**
```typescript
interface Workable {
  work(): void;
}

interface Eatable {
  eat(): void;
}

interface Sleepable {
  sleep(): void;
}

class Human implements Workable, Eatable, Sleepable {
  work() { /* ... */ }
  eat() { /* ... */ }
  sleep() { /* ... */ }
}

class Robot implements Workable {
  work() { /* ... */ }
}
```

---

### D - Dependency Inversion Principle (DIP)
> High-level modules should not depend on low-level modules. Both should depend on abstractions.

**Rules:**
- Depend on abstractions, not concrete implementations
- Use dependency injection
- High-level policy should not change when low-level details change

**Benefits:**
- Facilitates unit testing with mocks
- Reduces coupling between modules
- Makes the code more flexible and reusable

**Bad Example:**
```typescript
class MySQLDatabase {
  save(data: any) { /* MySQL specific */ }
}

class UserService {
  private db = new MySQLDatabase(); // Tight coupling!

  saveUser(user: User) {
    this.db.save(user);
  }
}
```

**Good Example:**
```typescript
interface Database {
  save(data: any): Promise<void>;
}

class MySQLDatabase implements Database {
  save(data: any) { /* MySQL specific */ }
}

class UserService {
  constructor(private db: Database) {} // Injected abstraction

  saveUser(user: User) {
    return this.db.save(user);
  }
}
```

---

## DRY - Don't Repeat Yourself

> Every piece of knowledge must have a single, unambiguous representation in the system.

**Rules:**
- Extract repeated code into functions/classes
- Use inheritance or composition for shared behavior
- Create reusable utilities and helpers

**Techniques:**
1. Extract common code into functions
2. Use base classes for shared functionality
3. Create utility modules for cross-cutting concerns
4. Use configuration over hard-coded values

**Bad Example:**
```typescript
function validateEmail(email: string) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// Duplicated elsewhere...
function isEmailValid(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
```

**Good Example:**
```typescript
// Single source of truth
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(email: string): boolean {
  return EMAIL_REGEX.test(email);
}
```

---

## KISS - Keep It Simple, Stupid

> Simplicity is the ultimate sophistication.

**Rules:**
- Prefer simple, straightforward solutions
- Avoid over-engineering and premature optimization
- Use clear, explicit naming
- Write code that reads like prose

**Guidelines:**
- If a solution seems too complex, step back and simplify
- Don't add abstraction until you need it
- Prefer readability over cleverness
- Limit function parameters (max 3-4)

**Bad Example:**
```typescript
// Over-engineered for a simple calculation
class CalculatorFactory {
  createCalculator(type: string): ICalculator {
    return CalculatorRegistry.getInstance().get(type);
  }
}
```

**Good Example:**
```typescript
function add(a: number, b: number): number {
  return a + b;
}
```

---

## YAGNI - You Ain't Gonna Need It

> Don't implement something until it is necessary.

**Rules:**
- Focus on current requirements only
- Avoid speculative generality
- Delete dead code
- Question every "just in case" addition

**Ask yourself:**
- "Do I need this RIGHT NOW?"
- "Is there a concrete use case?"
- "Am I building for today or a hypothetical future?"

---

## Convention over Configuration (CoC)

> Sensible defaults reduce boilerplate.

**Rules:**
- Follow framework/library conventions
- Use standard project structures
- Name things consistently
- Let conventions do the work

**NestJS Examples:**
- Controllers in `*.controller.ts`
- Services in `*.service.ts`
- Modules in `*.module.ts`
- Tests in `*.spec.ts`

---

## Composition over Inheritance

> Favor object composition over class inheritance.

**Rules:**
- Build complex objects from simpler ones
- Use interfaces to define behavior contracts
- Avoid deep inheritance hierarchies (max 2-3 levels)
- Prefer "has-a" over "is-a" relationships

**Bad Example:**
```typescript
class Animal { }
class Mammal extends Animal { }
class Dog extends Mammal { }
class SwimmingDog extends Dog { } // Deep hierarchy
```

**Good Example:**
```typescript
interface Swimmer {
  swim(): void;
}

interface Runner {
  run(): void;
}

class Dog implements Runner {
  run() { /* ... */ }
}

class SwimmingDog implements Runner, Swimmer {
  constructor(
    private runner: Runner,
    private swimmer: Swimmer
  ) {}

  run() { this.runner.run(); }
  swim() { this.swimmer.swim(); }
}
```

---

## Law of Demeter (LoD)

> Only talk to your immediate friends.

**Rules:**
- A method should only call methods on:
  - `this` (itself)
  - Its parameters
  - Objects it creates
  - Its direct components
- Avoid chaining calls through objects: `a.getB().getC().doSomething()`

**Bad Example:**
```typescript
// Too much knowledge about internal structure
const street = order.getCustomer().getAddress().getStreet();
```

**Good Example:**
```typescript
// Delegate to immediate collaborator
const street = order.getDeliveryStreet();

// Order class handles the delegation
class Order {
  getDeliveryStreet(): string {
    return this.customer.getDeliveryStreet();
  }
}
```

---

## Quick Reference Checklist

When writing or reviewing code, ask:

- [ ] **SRP**: Does this class/function have a single responsibility?
- [ ] **OCP**: Can I extend this without modifying it?
- [ ] **LSP**: Can derived classes substitute base classes?
- [ ] **ISP**: Are interfaces focused and minimal?
- [ ] **DIP**: Am I depending on abstractions?
- [ ] **DRY**: Is there any duplicated logic?
- [ ] **KISS**: Is this the simplest solution?
- [ ] **YAGNI**: Do I need this feature now?
- [ ] **LoD**: Am I reaching through objects?
- [ ] **Composition**: Should I compose instead of inherit?