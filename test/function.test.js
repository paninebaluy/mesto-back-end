const sayHello = require('./function');

it ('Создаёт приветствие', () => {
    expect(sayHello("Стас", "Басов")).toBe("Здравствуйте, Стас Басов!");
});