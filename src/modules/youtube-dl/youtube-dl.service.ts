import { Injectable } from '@nestjs/common';
import { youtube_v3 } from 'googleapis';
import { IYoutubeDLResponse } from '~/types/YoutubeDL';

const youtubedl = require('youtube-dl-exec');
// const youtubedl = require('youtube-dl');

@Injectable()
export class YoutubeDlService {
  get(id: string): IYoutubeDLResponse {
    return youtubedl(`https://youtube.com/watch?v=${id}`, {
      dumpSingleJson: true,
      noWarnings: true,
      noCallHome: true,
      noCheckCertificate: true,
      preferFreeFormats: true,
      youtubeSkipDashManifest: true,
      f: 'bestaudio/best',
    });
  }
}
