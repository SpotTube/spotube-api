import { InternalServerErrorException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { youtube_v3 } from 'googleapis';
import { ITEMS_PER_PAGE } from '~/shared/constants/data';
import { Media } from './entities/youtube';
import { youtube } from './youtube.config';
import { MUSIC_CATEGORY_ID, MUSIC_TOPIC_ID } from './youtube.constant';

@Injectable()
export class YoutubeService {
  get defaultSearchParameter(): youtube_v3.Params$Resource$Search$List {
    return {
      part: ['id'],
      type: ['video'],
      order: 'relevance',
      topicId: MUSIC_TOPIC_ID,
      videoCategoryId: MUSIC_CATEGORY_ID,
      maxResults: ITEMS_PER_PAGE,
    };
  }

  async search(filter: youtube_v3.Params$Resource$Search$List) {
    try {
      const { data } = await youtube.search.list({
        ...this.defaultSearchParameter,
        ...filter,
      });

      const { items, ...pageInfo } = data;

      const videos = await youtube.videos.list({
        part: ['snippet', 'contentDetails'],
        id: items.map((item) => item.id.videoId),
      });

      const {
        data: { items: results },
      } = videos;
      return {
        ...pageInfo,
        items: results,
      };
    } catch (error) {
      throw InternalServerErrorException;
    }
  }
}
