import { Module } from '@nestjs/common';
import { SongService } from './song.service';
import { SongController } from './song.controller';
import { YoutubeModule } from '../youtube/youtube.module';
import { YoutubeDlModule } from '../youtube-dl/youtube-dl.module';

@Module({
  imports: [YoutubeModule, YoutubeDlModule],
  controllers: [SongController],
  providers: [SongService],
})
export class SongModule {}
