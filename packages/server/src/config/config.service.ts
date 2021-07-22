import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';
import 'dotenv/config';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailerOptions } from '@nestjs-modules/mailer/dist/interfaces/mailer-options.interface';

type JWT_CONFIG = {
  secret: string;
  signOptions: {
    expiresIn: string;
  };
};

type SeedingOptions = {
  seeds: string[];
  factories: string[];
};

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}
  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach((k) => this.getValue(k, true));
    return this;
  }

  public getPort() {
    return this.getValue('PORT', true);
  }

  public isProduction() {
    const mode = this.getValue('MODE', false);
    return mode != 'DEV';
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions & SeedingOptions {
    return {
      type: 'postgres',

      host: this.getValue('POSTGRES_HOST'),
      port: parseInt(this.getValue('POSTGRES_PORT')),
      username: this.getValue('POSTGRES_USER'),
      password: this.getValue('POSTGRES_PASSWORD'),
      database: this.getValue('POSTGRES_DATABASE'),
      entities: [
        join(__dirname, '../', '**', '*.entity.{ts,js}'),
        join(__dirname, '../', '**', 'model.{ts,js}'),
      ],
      migrationsTableName: 'migration',

      migrations: [join(__dirname, '../migration', '*.{ts,js}')],

      cli: {
        migrationsDir: 'src/migration',
      },

      ssl: this.isProduction(),
      seeds: [join(__dirname, '../seeds', '*.{ts,js}')],
      factories: [join(__dirname, '../factories', '*.{ts,js}')],
    };
  }

  public getMailConfig(): MailerOptions {
    return {
      // transport: 'smtps://user@example.com:topsecret@smtp.example.com',
      // or
      transport: {
        host: this.getValue('MAIL_HOST'),
        secure: false,
        auth: {
          user: this.getValue('MAIL_USER'),
          pass: this.getValue('MAIL_PASSWORD'),
        },
      },
      defaults: {
        from: `"No Reply" <${this.getValue('MAIL_FROM')}>`,
      },
      template: {
        dir: join(__dirname, '../modules/mail/templates'),
        adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
        options: {
          strict: true,
        },
      },
    };
  }

  public getJwtConfig(): JWT_CONFIG {
    return {
      secret: this.getValue('JWT_SECRET'),
      signOptions: {
        expiresIn: `${this.getValue('JWT_EXPIRATION_TIME')}s` || '60s',
      },
    };
  }

  public getClientUrl(): string {
    return this.getValue('CLIENT_URL');
  }
  public getAdminPassword(): string {
    return this.getValue('ADMIN_PASSWORD');
  }
}

const configService = new ConfigService(process.env).ensureValues([
  'POSTGRES_HOST',
  'POSTGRES_PORT',
  'POSTGRES_USER',
  'POSTGRES_PASSWORD',
  'POSTGRES_DATABASE',
  'JWT_SECRET',
  'JWT_EXPIRATION_TIME',
]);

export { configService };
