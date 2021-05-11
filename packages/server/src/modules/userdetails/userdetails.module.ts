import { Module } from '@nestjs/common';
import { UserdetailsController } from './userdetails.controller';
import { UserdetailsService } from './userdetails.service';

@Module({
  controllers: [UserdetailsController],
  providers: [UserdetailsService]
})
export class UserdetailsModule {
    
}
