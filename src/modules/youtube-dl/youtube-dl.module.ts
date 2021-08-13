import { Module } from '@nestjs/common';
import { YoutubeDlService } from './youtube-dl.service';
import { YoutubeDlController } from './youtube-dl.controller';

@Module({
  controllers: [YoutubeDlController],
  providers: [YoutubeDlService],
  exports: [YoutubeDlService],
})
export class YoutubeDlModule {}
