import { MigrationInterface, QueryRunner } from 'typeorm';

export class addAccountUserCascade1625815135755 implements MigrationInterface {
  name = 'addAccountUserCascade1625815135755';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "Users" DROP CONSTRAINT "FK_13f7031faec63ad1ad7c9ad6a28"`,
    );
    await queryRunner.query(
      `CREATE TABLE "users_roles__roles" ("usersId" uuid NOT NULL, "rolesId" uuid NOT NULL, CONSTRAINT "PK_a10904f0f16594c4651b8d44424" PRIMARY KEY ("usersId", "rolesId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_9eaeb51d3028aede295068121d" ON "users_roles__roles" ("usersId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_c3d213748884bd725211057c7f" ON "users_roles__roles" ("rolesId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "Users" ADD CONSTRAINT "FK_13f7031faec63ad1ad7c9ad6a28" FOREIGN KEY ("accountId") REFERENCES "Accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_roles__roles" ADD CONSTRAINT "FK_9eaeb51d3028aede295068121d5" FOREIGN KEY ("usersId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_roles__roles" ADD CONSTRAINT "FK_c3d213748884bd725211057c7f1" FOREIGN KEY ("rolesId") REFERENCES "Roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users_roles__roles" DROP CONSTRAINT "FK_c3d213748884bd725211057c7f1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_roles__roles" DROP CONSTRAINT "FK_9eaeb51d3028aede295068121d5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "Users" DROP CONSTRAINT "FK_13f7031faec63ad1ad7c9ad6a28"`,
    );
    await queryRunner.query(`DROP INDEX "IDX_c3d213748884bd725211057c7f"`);
    await queryRunner.query(`DROP INDEX "IDX_9eaeb51d3028aede295068121d"`);
    await queryRunner.query(`DROP TABLE "users_roles__roles"`);
    await queryRunner.query(
      `ALTER TABLE "Users" ADD CONSTRAINT "FK_13f7031faec63ad1ad7c9ad6a28" FOREIGN KEY ("accountId") REFERENCES "Accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
