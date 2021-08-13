import { Controller, Get, Query } from '@nestjs/common';
import { ValidationPipe } from '~/shared/pipe/validation.pipe';
import { YoutubeSearchParams } from '../youtube/dto/YoutubeSearchParam';
import { SongService } from './song.service';

@Controller('song')
export class SongController {
  constructor(private readonly songService: SongService) {}

  @Get('search')
  search(@Query(new ValidationPipe()) filter: YoutubeSearchParams) {
    return this.songService.search(filter);
  }
}
