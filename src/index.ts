import './styles.scss';
import ApiManager from './shared/ApiManager';

class App {
  static _instance: any;

  constructor() {
    this.load();
  }

  load() {
    ApiManager.getInstance();
  }

  static getInstace() {
    if (!this._instance) {
      this._instance = new App();
    }

    return this._instance;
  }
}

window.addEventListener('load', () => {
  App.getInstace();
});
