import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';
import 'dotenv/config';

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

  public getJwtConfig(): JWT_CONFIG {
    return {
      secret: this.getValue('JWT_SECRET'),
      signOptions: {
        expiresIn: `${this.getValue('JWT_EXPIRATION_TIME')}s` || '60s',
      },
    };
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
