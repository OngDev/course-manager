import { Test, TestingModule } from '@nestjs/testing';
import { CommentReactionsController } from './comment-reactions.controller';
import { CommentReactionsService } from './comment-reactions.service';

describe('CommentReactionsController', () => {
  let controller: CommentReactionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommentReactionsController],
      providers: [CommentReactionsService],
    }).compile();

    controller = module.get<CommentReactionsController>(
      CommentReactionsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
