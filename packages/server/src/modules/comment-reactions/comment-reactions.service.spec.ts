import { Test, TestingModule } from '@nestjs/testing';
import { CommentReactionsService } from './comment-reactions.service';

describe('CommentReactionsService', () => {
  let service: CommentReactionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommentReactionsService],
    }).compile();

    service = module.get<CommentReactionsService>(CommentReactionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
