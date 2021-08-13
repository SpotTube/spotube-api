import { Injectable } from '@nestjs/common';
import { youtube_v3 } from 'googleapis';
import { YoutubeService } from '../youtube/youtube.service';
import { ITEMS_PER_PAGE } from '~/shared/constants/data';
import { MUSIC_CATEGORY_ID, MUSIC_TOPIC_ID } from '../youtube/youtube.constant';
import { YoutubeDlService } from '../youtube-dl/youtube-dl.service';
import { Song } from '~/types/Song';
import { plainToClass } from 'class-transformer';

@Injectable()
export class SongService {
  constructor(
    private readonly youtubeService: YoutubeService,
    private readonly youtubeDlService: YoutubeDlService,
  ) {}

  get defaultSearchParameter(): youtube_v3.Params$Resource$Search$List {
    return {
      part: ['id'],
      type: ['video'],
      order: 'relevance',
      topicId: MUSIC_TOPIC_ID,
      videoCategoryId: MUSIC_CATEGORY_ID,
      maxResults: ITEMS_PER_PAGE,
      regionCode: 'VN',
    };
  }

  async search(filter: youtube_v3.Params$Resource$Search$List) {
    const searchResult = await this.youtubeService.search({
      ...this.defaultSearchParameter,
      ...filter,
    });
    const { items, ...paginate } = searchResult;
    const {
      data: { items: videos },
    } = await this.youtubeService.videos({
      id: items.map((item) => item.id.videoId),
    });
    return {
      ...paginate,
      items: videos,
    };
  }

  async get(id: string): Promise<Song> {
    const [{ data: videos }, stream] = await Promise.all([
      this.youtubeService.videos({
        part: ['snippet', 'contentDetails', 'statistics'],
        id: [id],
      }),
      this.youtubeDlService.get(id),
    ]);
    return plainToClass(
      Song,
      { ...videos.items[0], stream },
      { excludeExtraneousValues: true },
    );
  }
}
