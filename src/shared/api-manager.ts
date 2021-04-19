export default class ApiManager {
  static _instance: any;

  constructor() {
    console.log('hi')
  }

  static getInstance() {
    if (!this._instance) {
      this._instance = new ApiManager();
    }

    return this._instance;
  }
}