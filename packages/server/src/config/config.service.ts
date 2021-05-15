import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';
import 'dotenv/config';
import { KeycloakConnectOptions } from 'nest-keycloak-connect/interface/keycloak-connect-options.interface';

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

  public getTypeOrmConfig(): TypeOrmModuleOptions {
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
    };
  }

  public getKeycloakConfig(): KeycloakConnectOptions {
    return {
      realm: this.getValue('KEYCLOAK_REALM'),
      secret: this.getValue('KEYCLOAK_SECRET'),
      cookieKey: 'KEYCLOAK_JWT',
      logLevels: ['warn'],
      clientId: this.getValue('KEYCLOAK_CLIENT_ID'),
      authServerUrl: this.getValue('KEYCLOAK_AUTH_SERVER'),
    };
  }
}

const configService = new ConfigService(process.env).ensureValues([
  'POSTGRES_HOST',
  'POSTGRES_PORT',
  'POSTGRES_USER',
  'POSTGRES_PASSWORD',
  'POSTGRES_DATABASE',
]);

export { configService };
