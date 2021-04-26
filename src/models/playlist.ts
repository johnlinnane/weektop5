import { Track } from './track';

export interface Playlist {
  id: string;
  name: string;
  count: number;
  tracks: Track[];
  url: string;
}
