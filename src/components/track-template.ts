import { Track } from '../models/track';

class TrackTemplate {
  public template: string;

  track: Track;

  constructor(track: Track) {
    this.track = track;

    this.template = this.buildTemplate();
  }

  private buildTemplate() {
    const { name, artists, imageObj, url } = this.track;

    const artistsList = artists.join(', ');
    const imageUrl = imageObj.url;

    return `<li class="track"><a href="${url}" target="_blank"><figure><img src="${imageUrl}"></figure><div><p>${name}</p><small>${artistsList}</small></div></a></li>`;
  }
}

export { TrackTemplate };
