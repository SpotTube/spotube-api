import { google } from 'googleapis';

export const youtube = google.youtube({
  version: 'v3',
  auth: 'AIzaSyChcIAMb6vx4qKty_d1WKwetuKZA8gq0mY',
});
