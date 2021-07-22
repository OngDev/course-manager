import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountController } from './controller';
import Account from './model';
import { AccountsService } from './service';

@Module({
  imports: [TypeOrmModule.forFeature([Account])],
  controllers: [AccountController],
  providers: [AccountsService, Logger],
  exports: [AccountsService],
})
export class AccountModule {}
