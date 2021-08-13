import { Controller, Get, Query } from '@nestjs/common';
import { ValidationPipe } from '~/shared/pipe/validation.pipe';
import { YoutubeSearchParams } from '../youtube/dto/YoutubeSearchParam';
import { ArtistService } from './artist.service';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get('search')
  search(@Query(new ValidationPipe()) filter: YoutubeSearchParams) {
    return this.artistService.search(filter);
  }
}
