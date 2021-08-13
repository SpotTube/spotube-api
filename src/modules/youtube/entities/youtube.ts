import { Exclude, Transform, Type } from 'class-transformer';

export class Snippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: Thumbnails;
  channelTitle: string;

  @Exclude()
  liveBroadcastContent: string;

  publishTime: string;
}

export class Media {
  kind: string;

  etag: string;

  // @Transform(({ obj, key }) => obj[key].videoId)
  id: Id;

  @Type(() => Snippet)
  snippet: Snippet;

  constructor(partial) {
    Object.assign(this, partial);
  }
}

export interface Id {
  kind: string;
  videoId: string;
}

export interface Thumbnails {
  default: Default;
  medium: Medium;
  high: High;
}

export interface Default {
  url: string;
  width: number;
  height: number;
}

export interface Medium {
  url: string;
  width: number;
  height: number;
}

export interface High {
  url: string;
  width: number;
  height: number;
}
