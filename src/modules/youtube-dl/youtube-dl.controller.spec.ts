import { Test, TestingModule } from '@nestjs/testing';
import { YoutubeDlController } from './youtube-dl.controller';
import { YoutubeDlService } from './youtube-dl.service';

describe('YoutubeDlController', () => {
  let controller: YoutubeDlController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [YoutubeDlController],
      providers: [YoutubeDlService],
    }).compile();

    controller = module.get<YoutubeDlController>(YoutubeDlController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
