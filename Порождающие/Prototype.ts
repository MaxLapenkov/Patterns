// Прототип — это порождающий паттерн, который позволяет копировать объекты любой сложности без привязки к их конкретным классам.
// Все классы—Прототипы имеют общий интерфейс.
// Поэтому вы можете копировать объекты, не обращая внимания на их конкретные типы и всегда быть уверены, что получите точную копию.
// Клонирование совершается самим объектом-прототипом, что позволяет ему скопировать значения всех полей, даже приватных.

/**
 * Пример класса, имеющего возможность клонирования. Мы посмотрим как происходит
 * клонирование значений полей разных типов.
 */
class Prototype {
  public primitive: any;
  public component: object;
  public circularReference: ComponentWithBackReference;

  public clone(): this {
    const clone = Object.create(this);

    clone.component = Object.create(this.component);

    // Клонирование объекта, который имеет вложенный объект с обратной
    // ссылкой, требует специального подхода. После завершения клонирования
    // вложенный объект должен указывать на клонированный объект, а не на
    // исходный объект. Для данного случая хорошо подойдёт оператор
    // расширения (spread).
    clone.circularReference = {
      ...this.circularReference,
      prototype: { ...this },
    };

    return clone;
  }
}

class ComponentWithBackReference {
  public prototype;

  constructor(prototype: Prototype) {
    this.prototype = prototype;
  }
}

/**
 * Клиентский код.
 */
function clientCode() {
  const p1 = new Prototype();
  p1.primitive = 245;
  p1.component = new Date();
  p1.circularReference = new ComponentWithBackReference(p1);

  const p2 = p1.clone();
  if (p1.primitive === p2.primitive) {
    console.log(
      "Primitive field values have been carried over to a clone. Yay!"
    );
  } else {
    console.log("Primitive field values have not been copied. Booo!");
  }
  if (p1.component === p2.component) {
    console.log("Simple component has not been cloned. Booo!");
  } else {
    console.log("Simple component has been cloned. Yay!");
  }

  if (p1.circularReference === p2.circularReference) {
    console.log("Component with back reference has not been cloned. Booo!");
  } else {
    console.log("Component with back reference has been cloned. Yay!");
  }

  if (p1.circularReference.prototype === p2.circularReference.prototype) {
    console.log(
      "Component with back reference is linked to original object. Booo!"
    );
  } else {
    console.log("Component with back reference is linked to the clone. Yay!");
  }
}

clientCode();

//В чем заключается суть паттерна?
// Прототип — это порождающий паттерн проектирования, который позволяет копировать объекты, не вдаваясь в подробности их реализации.

//Какие проблемы можно решить с помощью данного паттерна?
// Когда ваш код не должен зависеть от классов копируемых объектов.
//  Такое часто бывает, если ваш код работает с объектами, поданными извне через какой-то общий интерфейс. Вы не можете привязаться к их классам, даже если бы хотели, поскольку их конкретные классы неизвестны.
// Паттерн прототип предоставляет клиенту общий интерфейс для работы со всеми прототипами. Клиенту не нужно зависеть от всех классов копируемых объектов, а только от интерфейса клонирования.
// Когда вы имеете уйму подклассов, которые отличаются начальными значениями полей. Кто-то мог создать все эти классы, чтобы иметь возможность легко порождать объекты с определённой конфигурацией.
// Паттерн прототип предлагает использовать набор прототипов, вместо создания подклассов для описания популярных конфигураций объектов.
// Таким образом, вместо порождения объектов из подклассов, вы будете копировать существующие объекты-прототипы, в которых уже настроено внутреннее состояние. Это позволит избежать взрывного роста количества классов в программе и уменьшить её сложность.

//Преимущества
// - Позволяет клонировать объекты, не привязываясь к их конкретным классам.
// - Меньше повторяющегося кода инициализации объектов.
// - Ускоряет создание объектов.
// - Альтернатива созданию подклассов для конструирования сложных объектов.

//недостатки
// - Сложно клонировать составные объекты, имеющие ссылки на другие объекты.
