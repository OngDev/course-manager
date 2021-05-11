import { Module } from '@nestjs/common';
import { UserdetailsController } from './userdetails.controller';

@Module({
  controllers: [UserdetailsController]
})
export class UserdetailsModule {
    
}
