import { Module, Logger } from '@nestjs/common';
import { CommentsService } from './service';
import { CommentsController } from './controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './model';

@Module({
  imports: [TypeOrmModule.forFeature([Comment])],
  exports: [CommentsService],
  controllers: [CommentsController],
  providers: [CommentsService, Logger],
})
export class CommentsModule {}
