import { Injectable } from '@nestjs/common';
import { youtube_v3 } from 'googleapis';
import { YoutubeService } from '../youtube/youtube.service';
import { ITEMS_PER_PAGE } from '~/shared/constants/data';
import { MUSIC_TOPIC_ID } from '../youtube/youtube.constant';

@Injectable()
export class ArtistService {
  constructor(private youtubeService: YoutubeService) {}

  get defaultSearchParameter(): youtube_v3.Params$Resource$Search$List {
    return {
      part: ['snippet'],
      type: ['channel'],
      order: 'relevance',
      topicId: MUSIC_TOPIC_ID,
      maxResults: ITEMS_PER_PAGE,
      regionCode: 'VN',
    };
  }

  async search(filter: youtube_v3.Params$Resource$Search$List) {
    const searchResult = await this.youtubeService.search({
      ...this.defaultSearchParameter,
      ...filter,
    });

    return searchResult;
  }
}
