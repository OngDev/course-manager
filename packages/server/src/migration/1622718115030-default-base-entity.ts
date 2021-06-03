import { MigrationInterface, QueryRunner } from 'typeorm';

export class defaultBaseEntity1622718115030 implements MigrationInterface {
  name = 'defaultBaseEntity1622718115030';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "comment" ALTER COLUMN "createdBy" SET DEFAULT 'system'`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment" ALTER COLUMN "updatedBy" SET DEFAULT 'system'`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment_reaction" ALTER COLUMN "createdBy" SET DEFAULT 'system'`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment_reaction" ALTER COLUMN "updatedBy" SET DEFAULT 'system'`,
    );
    await queryRunner.query(
      `ALTER TABLE "course" ALTER COLUMN "createdBy" SET DEFAULT 'system'`,
    );
    await queryRunner.query(
      `ALTER TABLE "course" ALTER COLUMN "updatedBy" SET DEFAULT 'system'`,
    );
    await queryRunner.query(
      `ALTER TABLE "video" ALTER COLUMN "createdBy" SET DEFAULT 'system'`,
    );
    await queryRunner.query(
      `ALTER TABLE "video" ALTER COLUMN "updatedBy" SET DEFAULT 'system'`,
    );
    await queryRunner.query(
      `ALTER TABLE "subtitle" ALTER COLUMN "createdBy" SET DEFAULT 'system'`,
    );
    await queryRunner.query(
      `ALTER TABLE "subtitle" ALTER COLUMN "updatedBy" SET DEFAULT 'system'`,
    );
    await queryRunner.query(
      `ALTER TABLE "sub_line" ALTER COLUMN "createdBy" SET DEFAULT 'system'`,
    );
    await queryRunner.query(
      `ALTER TABLE "sub_line" ALTER COLUMN "updatedBy" SET DEFAULT 'system'`,
    );
    await queryRunner.query(
      `ALTER TABLE "Roles" ALTER COLUMN "createdBy" SET DEFAULT 'system'`,
    );
    await queryRunner.query(
      `ALTER TABLE "Roles" ALTER COLUMN "updatedBy" SET DEFAULT 'system'`,
    );
    await queryRunner.query(
      `ALTER TABLE "Users" ALTER COLUMN "createdBy" SET DEFAULT 'system'`,
    );
    await queryRunner.query(
      `ALTER TABLE "Users" ALTER COLUMN "updatedBy" SET DEFAULT 'system'`,
    );
    await queryRunner.query(
      `ALTER TABLE "Accounts" ALTER COLUMN "createdBy" SET DEFAULT 'system'`,
    );
    await queryRunner.query(
      `ALTER TABLE "Accounts" ALTER COLUMN "updatedBy" SET DEFAULT 'system'`,
    );
    await queryRunner.query(
      `ALTER TABLE "example" ALTER COLUMN "createdBy" SET DEFAULT 'system'`,
    );
    await queryRunner.query(
      `ALTER TABLE "example" ALTER COLUMN "updatedBy" SET DEFAULT 'system'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "example" ALTER COLUMN "updatedBy" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "example" ALTER COLUMN "createdBy" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "Accounts" ALTER COLUMN "updatedBy" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "Accounts" ALTER COLUMN "createdBy" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "Users" ALTER COLUMN "updatedBy" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "Users" ALTER COLUMN "createdBy" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "Roles" ALTER COLUMN "updatedBy" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "Roles" ALTER COLUMN "createdBy" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "sub_line" ALTER COLUMN "updatedBy" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "sub_line" ALTER COLUMN "createdBy" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "subtitle" ALTER COLUMN "updatedBy" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "subtitle" ALTER COLUMN "createdBy" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "video" ALTER COLUMN "updatedBy" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "video" ALTER COLUMN "createdBy" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "course" ALTER COLUMN "updatedBy" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "course" ALTER COLUMN "createdBy" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment_reaction" ALTER COLUMN "updatedBy" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment_reaction" ALTER COLUMN "createdBy" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment" ALTER COLUMN "updatedBy" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment" ALTER COLUMN "createdBy" DROP DEFAULT`,
    );
  }
}
