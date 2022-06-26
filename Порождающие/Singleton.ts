// Одиночка — это порождающий паттерн, который гарантирует существование только одного объекта определённого класса, а также позволяет достучаться до этого объекта из любого места программы.

// Одиночка имеет такие же преимущества и недостатки, что и глобальные переменные.
// Его невероятно удобно использовать, но он нарушает модульность вашего кода.

//Вы не сможете просто взять и использовать класс, зависящий от одиночки в другой программе.
// Для этого придётся эмулировать присутствие одиночки и там. Чаще всего эта проблема проявляется при написании юнит-тестов.

/**
 * Класс Одиночка предоставляет метод getInstance, который позволяет клиентам
 * получить доступ к уникальному экземпляру одиночки.
 */
class Singleton {
  private static instance: Singleton;

  /**
   * Конструктор Одиночки всегда должен быть скрытым, чтобы предотвратить
   * создание объекта через оператор new.
   */
  private constructor() {}

  /**
   * Статический метод, управляющий доступом к экземпляру одиночки.
   *
   * Эта реализация позволяет вам расширять класс Одиночки, сохраняя повсюду
   * только один экземпляр каждого подкласса.
   */
  public static getInstance(): Singleton {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }

    return Singleton.instance;
  }

  /**
   * Наконец, любой одиночка должен содержать некоторую бизнес-логику, которая
   * может быть выполнена на его экземпляре.
   */
  public someBusinessLogic() {
    // ...
  }
}

/**
 * Клиентский код.
 */
function clientCode() {
  const s1 = Singleton.getInstance();
  const s2 = Singleton.getInstance();

  if (s1 === s2) {
    console.log("Singleton works, both variables contain the same instance.");
  } else {
    console.log("Singleton failed, variables contain different instances.");
  }
}

clientCode();

//Преимущества
// - Гарантирует наличие единственного экземпляра класса.
// - Предоставляет к нему глобальную точку доступа.
// - Реализует отложенную инициализацию объекта-одиночки.

//недостатки
// - Нарушает принцип единственной ответственности класса.
// - Маскирует плохой дизайн.
// - Проблемы мультипоточности.
// - Требует постоянного создания Mock-объектов при юнит-тестировании.
