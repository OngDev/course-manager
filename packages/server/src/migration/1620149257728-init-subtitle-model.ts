import {MigrationInterface, QueryRunner} from "typeorm";

export class initSubtitleModel1620149257728 implements MigrationInterface {
    name = 'initSubtitleModel1620149257728'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "subtitle" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "language" character varying NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "createdBy" character varying(300) NOT NULL, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedBy" character varying(300) NOT NULL, CONSTRAINT "PK_994ad1599c74d6da447883869b5" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "subtitle"`);
    }

}
