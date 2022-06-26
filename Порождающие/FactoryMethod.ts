// Фабричный метод задаёт метод, который следует использовать вместо вызова оператора new для создания объектов-продуктов.
// Подклассы могут переопределить этот метод, чтобы изменять тип создаваемых продуктов.

// Применимость: Паттерн можно часто встретить в любом TypeScript-коде, где требуется гибкость при создании продуктов.
// Признаки применения паттерна: Фабричный метод можно определить по создающим методам,
// которые возвращают объекты продуктов через абстрактные типы или интерфейсы. Это позволяет переопределять типы создаваемых продуктов в подклассах.

/**
 * Класс Создатель объявляет фабричный метод, который должен возвращать объект
 * класса Продукт. Подклассы Создателя обычно предоставляют реализацию этого
 * метода.
 */
abstract class Creator {
  public abstract factoryMethod(): Product;

  public someOperation(): string {
    // Вызываем фабричный метод, чтобы получить объект-продукт.
    const product = this.factoryMethod();
    // Далее, работаем с этим продуктом.
    return `Creator: The same creator's code has just worked with ${product.operation()}`;
  }
}

/**
 * Конкретные Создатели переопределяют фабричный метод для того, чтобы изменить
 * тип результирующего продукта.
 */
class ConcreteCreator1 extends Creator {
  public factoryMethod(): Product {
    return new ConcreteProduct1();
  }
}

class ConcreteCreator2 extends Creator {
  public factoryMethod(): Product {
    return new ConcreteProduct2();
  }
}

/**
 * Интерфейс Продукта объявляет операции, которые должны выполнять все
 * конкретные продукты.
 */
interface Product {
  operation(): string;
}

/**
 * Конкретные Продукты предоставляют различные реализации интерфейса Продукта.
 */
class ConcreteProduct1 implements Product {
  public operation(): string {
    return "{Result of the ConcreteProduct1}";
  }
}

class ConcreteProduct2 implements Product {
  public operation(): string {
    return "{Result of the ConcreteProduct2}";
  }
}

/**
 * Клиентский код работает с экземпляром конкретного создателя, хотя и через его
 * базовый интерфейс. Пока клиент продолжает работать с создателем через базовый
 * интерфейс, вы можете передать ему любой подкласс создателя.
 */
function clientCode(creator: Creator) {
  // ...
  console.log(
    "Client: I'm not aware of the creator's class, but it still works."
  );
  console.log(creator.someOperation());
  // ...
}

/**
 * Приложение выбирает тип создателя в зависимости от конфигурации или среды.
 */
console.log("App: Launched with the ConcreteCreator1.");
clientCode(new ConcreteCreator1());
console.log("");

console.log("App: Launched with the ConcreteCreator2.");
clientCode(new ConcreteCreator2());

//Преимущества:
// - Избавляет класс от привязки к конкретным классам продуктов.
// - Выделяет код производства продуктов в одно место, упрощая поддержку кода.
// - Упрощает добавление новых продуктов в программу.
// - Реализует принцип открытости/закрытости.

//Недостатки:
// -  Может привести к созданию больших параллельных иерархий классов, так как для каждого класса продукта надо создать свой подкласс создателя.
