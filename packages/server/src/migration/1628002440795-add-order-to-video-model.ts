import { MigrationInterface, QueryRunner } from 'typeorm';

export class addOrderToVideoModel1628002440795 implements MigrationInterface {
  name = 'addOrderToVideoModel1628002440795';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "Videos" ADD "order" smallint`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "Videos" DROP COLUMN "order"`);
  }
}
