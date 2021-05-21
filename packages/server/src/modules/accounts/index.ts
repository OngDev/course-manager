import { Module, Logger } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountController } from './controller';
import { Account } from './model';
import { AccountService } from './service';

@Module({
  imports: [TypeOrmModule.forFeature([Account])],
  controllers: [AccountController],
  providers: [AccountService, Logger],
})
export class CourseModule {}