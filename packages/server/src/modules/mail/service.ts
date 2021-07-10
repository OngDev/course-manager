import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(
    username: string,
    password: string,
    email: string,
    fullName: string,
    roles: string,
  ) {
    await this.mailerService.sendMail({
      to: email,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Welcome to Course Manager!',
      template: './credentialInfo', // `.hbs` extension is appended automatically
      context: {
        // ✏️ filling curly brackets with content
        fullName,
        username,
        password,
        roles,
      },
    });
  }
}
