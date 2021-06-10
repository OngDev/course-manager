import { Module } from '@nestjs/common';
import { FileUploadController } from './controller';

@Module({
  controllers: [FileUploadController],
})
export class FileUploadModule {}
