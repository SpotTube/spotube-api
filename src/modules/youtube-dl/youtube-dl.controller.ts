import { Controller } from '@nestjs/common';
import { YoutubeDlService } from './youtube-dl.service';

@Controller()
export class YoutubeDlController {
  constructor(private readonly youtubeDlService: YoutubeDlService) {}
}
