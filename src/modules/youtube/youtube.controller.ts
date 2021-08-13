import { Get, Query } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { YoutubeService } from './youtube.service';

@Controller('search')
export class YoutubeController {
  constructor(private readonly YoutubeService: YoutubeService) {}
}
