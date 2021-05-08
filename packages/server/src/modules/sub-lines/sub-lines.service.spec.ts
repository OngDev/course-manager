import { Test, TestingModule } from '@nestjs/testing';
import { SubLinesService } from './sub-lines.service';

describe('SubLinesService', () => {
  let service: SubLinesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubLinesService],
    }).compile();

    service = module.get<SubLinesService>(SubLinesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
