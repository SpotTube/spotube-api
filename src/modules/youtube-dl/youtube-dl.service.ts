import { Injectable } from '@nestjs/common';
const youtubedl = require('youtube-dl-exec');

@Injectable()
export class YoutubeDlService {
  test() {
    return youtubedl('https://example.com', {
      dumpSingleJson: true,
      noWarnings: true,
      noCallHome: true,
      noCheckCertificate: true,
      preferFreeFormats: true,
      youtubeSkipDashManifest: true,
      referer: 'https://example.com',
    }).then((output) => console.log(output));
  }
}
