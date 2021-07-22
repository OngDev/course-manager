import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { MailService } from './service';
import { configService } from '../../config/config.service';

@Module({
  imports: [MailerModule.forRoot(configService.getMailConfig())],
  providers: [MailService],
  exports: [MailService], // 👈 export for DI
})
export class MailModule {}
