import { Exclude, Expose, Type } from 'class-transformer';

export interface IYoutubeDLResponse {
  upload_date: string;
  creator: string;
  vbr: number;
  height: number;
  like_count: number;
  duration: number;
  id: string;
  album: string;
  view_count: number;
  playlist: any;
  title: string;
  format: string;
  ext: string;
  playlist_index: any;
  dislike_count: number;
  average_rating: number;
  abr: number;
  uploader_url: string;
  fps: number;
  stretched_ratio: any;
  channel_url: string;
  thumbnail: string;
  webpage_url_basename: string;
  acodec: string;
  display_id: string;
  requested_formats: RequestedFormat[];
  description: string;
  tags: string[];
  track: string;
  requested_subtitles: any;
  uploader: string;
  format_id: string;
  uploader_id: string;
  categories: string[];
  thumbnails: Thumbnail[];
  alt_title: string;
  extractor_key: string;
  vcodec: string;
  artist: string;
  channel_id: string;
  is_live: any;
  extractor: string;
  channel: string;
  webpage_url: string;
  formats: Format[];
  resolution: any;
  width: number;
  age_limit: number;
}

export interface RequestedFormat {
  asr?: number;
  tbr: number;
  protocol: string;
  format: string;
  url: string;
  quality: number;
  vcodec: string;
  format_note: string;
  height?: number;
  downloader_options: DownloaderOptions;
  vbr?: number;
  ext: string;
  filesize: number;
  fps?: number;
  container: string;
  format_id: string;
  http_headers: HttpHeaders;
  width?: number;
  acodec: string;
  abr?: number;
}

export interface DownloaderOptions {
  http_chunk_size: number;
}

export interface HttpHeaders {
  'Accept-Charset': string;
  'Accept-Language': string;
  'Accept-Encoding': string;
  Accept: string;
  'User-Agent': string;
}

export interface Thumbnail {
  url: string;
  width: number;
  resolution: string;
  id: string;
  height: number;
}

export interface IFormat {
  asr?: number;
  format_note: string;
  protocol: string;
  format: string;
  tbr: number;
  height?: number;
  downloader_options?: DownloaderOptions2;
  format_id: string;
  quality: number;
  container?: string;
  http_headers: HttpHeaders2;
  url: string;
  vcodec: string;
  abr?: number;
  width?: number;
  ext: string;
  filesize: number;
  fps?: number;
  acodec: string;
  vbr?: number;
}

export interface DownloaderOptions2 {
  http_chunk_size: number;
}

export interface HttpHeaders2 {
  'Accept-Charset': string;
  'Accept-Language': string;
  'Accept-Encoding': string;
  Accept: string;
  'User-Agent': string;
}

export class Format implements IFormat {
  constructor(part: Partial<IFormat>) {
    Object.assign(this, part);
  }
  @Expose()
  url: string;
  @Expose()
  format: string;
  asr?: number;
  format_note: string;
  protocol: string;
  tbr: number;
  height?: number;
  downloader_options?: DownloaderOptions2;
  @Expose()
  format_id: string;
  quality: number;
  @Expose()
  container?: string;
  http_headers: HttpHeaders2;
  vcodec: string;
  abr?: number;
  width?: number;
  @Expose()
  ext: string;
  filesize: number;
  fps?: number;
  acodec: string;
  vbr?: number;
}

export class YoutubeDLResponse {
  constructor(part: Partial<IYoutubeDLResponse>) {
    Object.assign(this, part);
  }

  @Expose()
  @Type(() => Format)
  formats: Format[];
}
