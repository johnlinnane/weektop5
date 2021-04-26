class ApiManager {
  static _instance: any;

  public accessToken = null;

  public isAuthorized() {
    const urlParts = window.location.href.split('=');
    if (urlParts[1]) {
      // WTF
      [, this.accessToken] = urlParts;
    }

    if (this.accessToken) return true;

    return false;
  }

  public authorizeSpotify() {
    const clientId = '73a6a36db24545068b1bb49b67985cb0';
    const redirectUri = 'http://localhost:8080/playlist.html';
    const scopes =
      'user-read-private%20user-read-email%20playlist-read-private%20playlist-read-collaborative';

    const url =
      // eslint-disable-next-line prefer-template
      'https://accounts.spotify.com/authorize' +
      '?response_type=token' +
      '&client_id=' +
      clientId +
      '&scope=' +
      scopes +
      '&redirect_uri=' +
      encodeURIComponent(redirectUri);

    window.location.href = url;
  }

  public async getPlaylists(): Promise<any> {
    const url = `https://api.spotify.com/v1/users/ovokuro/playlists`;

    return fetch(url, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    })
      .then(res => {
        if (res && res.ok) {
          return res.json();
        }
        return false;
      })
      .then(data => {
        return data.items.filter((i: any) => i.name.startsWith('weektop5'));
      })
      .catch(error => {
        console.error(error);
      });
  }

  public getPlaylistById(playlistId) {
    const url = `https://api.spotify.com/v1/playlists/${playlistId}`;

    return fetch(url, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    })
      .then(res => {
        if (res && res.ok) {
          return res.json();
        }
        return false;
      })
      .then(data => {
        return data;
      })
      .catch(error => {
        console.error(error);
      });
  }

  static getInstance() {
    if (!this._instance) {
      this._instance = new ApiManager();
    }

    return this._instance;
  }
}

export { ApiManager };
