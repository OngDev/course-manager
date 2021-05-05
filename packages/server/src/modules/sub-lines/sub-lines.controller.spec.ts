import { Test, TestingModule } from '@nestjs/testing';
import { SubLinesController } from './sub-lines.controller';
import { SubLinesService } from './sub-lines.service';

describe('SubLinesController', () => {
  let controller: SubLinesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubLinesController],
      providers: [SubLinesService],
    }).compile();

    controller = module.get<SubLinesController>(SubLinesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
