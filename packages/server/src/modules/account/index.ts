import { Module } from '@nestjs/common';
import { AccountService } from './service';

@Module({
  providers: [AccountService],
  exports: [AccountService],
})
export class AccountModule {}
