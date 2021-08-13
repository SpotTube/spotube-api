import { IsNotEmpty } from 'class-validator';
import { youtube_v3 } from 'googleapis';

export class YoutubeSearchParams
  implements youtube_v3.Params$Resource$Search$List
{
  @IsNotEmpty()
  q: string;
}
