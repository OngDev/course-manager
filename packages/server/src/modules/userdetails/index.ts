import { Module, Logger } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserDetailsController } from './controller';
import { UserDetail } from './model';
import { UserDetailsService } from './service';

@Module({
  imports: [TypeOrmModule.forFeature([UserDetail])],
  controllers: [UserDetailsController],
  providers: [UserDetailsService, Logger],
})
export class CourseModule {}
