import { Test, TestingModule } from '@nestjs/testing';
import { SubtitlesService } from './subtitles.service';

describe('SubtitlesService', () => {
  let service: SubtitlesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubtitlesService],
    }).compile();

    service = module.get<SubtitlesService>(SubtitlesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
