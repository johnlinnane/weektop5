import './styles.scss';

class App {
  static instance: any;

  constructor() {
    this.sayHello();
  }

  sayHello() {
    document.write('hello');
  }

  static getInstace() {
    if (!this.instance) {
      this.instance = new App();
    }

    return this.instance;
  }
}

window.addEventListener('load', () => {
  App.getInstace();
});
