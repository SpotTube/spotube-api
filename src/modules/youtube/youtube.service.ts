import { InternalServerErrorException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { youtube_v3 } from 'googleapis';
import { youtube } from './youtube.config';

@Injectable()
export class YoutubeService {
  async search(filter: youtube_v3.Params$Resource$Search$List) {
    try {
      const { data } = await youtube.search.list(filter);
      return data;
    } catch (error) {
      console.log(
        '🚀 ~ file: youtube.service.ts ~ line 12 ~ YoutubeService ~ search ~ error',
        error,
      );
      throw InternalServerErrorException;
    }
  }

  async videos(filter: youtube_v3.Params$Resource$Videos$List) {
    try {
      return youtube.videos.list({
        part: ['snippet', 'contentDetails'],
        regionCode: 'VN',
        ...filter,
      });
    } catch (error) {
      console.log(
        '🚀 ~ file: youtube.service.ts ~ line 28 ~ YoutubeService ~ search ~ error',
        error,
      );
      throw InternalServerErrorException;
    }
  }
}
