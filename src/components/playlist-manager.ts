import { ApiManager } from '../shared/api-manager';
import { TrackTemplate } from './track-template';
import { Track } from '../models/track';
import { Playlist } from '../models/playlist';

class PlaylistManager {
  static _instance: any;

  apiManager: ApiManager;

  playlists: any;

  currentWeekIndex: number;

  currentPlaylist: any;

  public init(data: any) {
    if (data.length === 0) return;

    this.playlists = this.sortPlaylistsByDate(data);
    this.currentWeekIndex = this.playlists.length - 1;

    this.getPlaylist();
  }

  private async getPlaylist() {
    this.apiManager = ApiManager.getInstance();

    const { id } = this.playlists[this.currentWeekIndex];

    if (id) {
      const playlist = await this.apiManager.getPlaylistById(id);

      if (playlist.tracks.items) {
        this.currentPlaylist = this.mapSpotifyPlaylistObjToPlaylist(playlist);
        this.buildTrackTemplates();
      }
    }
  }

  private buildTrackTemplates() {
    const trackTemplates = this.currentPlaylist.tracks.map(
      (t: Track) => new TrackTemplate(t).template,
    );

    const playlistEl = document.createElement('ul') as HTMLElement;
    playlistEl.classList.add('playlist');

    playlistEl.innerHTML = trackTemplates.join('');

    document.body.append(playlistEl);
  }

  // Extracts the playlist properties used by the site
  private mapSpotifyPlaylistObjToPlaylist(spotifyPlaylistObj): Playlist {
    return {
      id: spotifyPlaylistObj.id,
      name: spotifyPlaylistObj.name,
      url: spotifyPlaylistObj.external_urls.spotify,
      count: spotifyPlaylistObj.tracks.total,
      tracks: spotifyPlaylistObj.tracks.items.map(item =>
        this.mapSpotifyTrackObjToTrack(item.track),
      ),
    };
  }

  // Extracts the track properties used by the site
  private mapSpotifyTrackObjToTrack(spotifyTrackObj): Track {
    return {
      album: spotifyTrackObj.album.name,
      artists: spotifyTrackObj.artists.map(a => a.name),
      id: spotifyTrackObj.id,
      imageObj: spotifyTrackObj.album.images[0],
      name: spotifyTrackObj.name,
      previewUrl: spotifyTrackObj.preview_url,
      url: spotifyTrackObj.external_urls.spotify,
    };
  }

  private sortPlaylistsByDate(data) {
    return data.sort((a, b) => {
      const c = this.getDateFromPlaylistName(a.name).getTime();
      const d = this.getDateFromPlaylistName(b.name).getTime();

      return d - c;
    });
  }

  private getDateFromPlaylistName(playlistName: string): Date {
    const dateString = playlistName.split('-')[1].split('');
    const year = Number.parseInt(dateString[4] + dateString[5], 10);
    const month = Number.parseInt(dateString[2] + dateString[3], 10);
    const day = Number.parseInt(dateString[0] + dateString[1], 10);

    return new Date(year, month - 1, day);
  }

  get template() {
    return `<><>`;
  }

  static getInstance() {
    if (!this._instance) {
      this._instance = new PlaylistManager();
    }

    return this._instance;
  }
}

export { PlaylistManager };
