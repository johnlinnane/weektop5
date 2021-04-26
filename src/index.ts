import './styles.scss';
import { ApiManager } from './shared/api-manager';
import { PlaylistManager } from './components/playlist-manager';

class App {
  static _instance: any;

  apiManager: ApiManager;

  playlistManager: PlaylistManager;

  constructor() {
    this.apiManager = ApiManager.getInstance();
    this.playlistManager = PlaylistManager.getInstance();
    this.load();
  }

  async load() {
    if (!this.apiManager.isAuthorized()) {
      this.apiManager.authorizeSpotify();
    } else {
      const playlistData = await this.apiManager.getPlaylists();

      if (playlistData) {
        this.playlistManager.init(playlistData);
      }
    }
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
