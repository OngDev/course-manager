import { Test, TestingModule } from '@nestjs/testing';
import { SubtitlesController } from './subtitles.controller';
import { SubtitlesService } from './subtitles.service';

describe('SubtitlesController', () => {
  let controller: SubtitlesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubtitlesController],
      providers: [SubtitlesService],
    }).compile();

    controller = module.get<SubtitlesController>(SubtitlesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
