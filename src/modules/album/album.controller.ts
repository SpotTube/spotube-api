import { Query } from '@nestjs/common';
import { UsePipes } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { ValidationPipe } from '~/shared/pipe/validation.pipe';
import { YoutubeSearchParams } from '../youtube/dto/YoutubeSearchParam';
import { AlbumService } from './album.service';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get('search')
  search(@Query(new ValidationPipe()) filter: YoutubeSearchParams) {
    return this.albumService.search(filter);
  }
}
