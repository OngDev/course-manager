import { MigrationInterface, QueryRunner } from 'typeorm';

export class initSubtitleModel1620197890942 implements MigrationInterface {
  name = 'initSubtitleModel1620197890942';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "subtitle" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "createdBy" character varying(300) NOT NULL, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedBy" character varying(300) NOT NULL, "language" character varying NOT NULL, CONSTRAINT "PK_994ad1599c74d6da447883869b5" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "subtitle"`);
  }
}
