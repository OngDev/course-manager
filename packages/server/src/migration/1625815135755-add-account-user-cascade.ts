import { MigrationInterface, QueryRunner } from 'typeorm';

export class addAccountUserCascade1625815135755 implements MigrationInterface {
  name = 'addAccountUserCascade1625815135755';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "Users" DROP CONSTRAINT "FK_13f7031faec63ad1ad7c9ad6a28"`,
    );
    await queryRunner.query(
      `ALTER TABLE "Users" ADD CONSTRAINT "FK_13f7031faec63ad1ad7c9ad6a28" FOREIGN KEY ("accountId") REFERENCES "Accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "Users" DROP CONSTRAINT "FK_13f7031faec63ad1ad7c9ad6a28"`,
    );
    await queryRunner.query(
      `ALTER TABLE "Users" ADD CONSTRAINT "FK_13f7031faec63ad1ad7c9ad6a28" FOREIGN KEY ("accountId") REFERENCES "Accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
