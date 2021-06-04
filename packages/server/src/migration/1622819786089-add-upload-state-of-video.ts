import {MigrationInterface, QueryRunner} from "typeorm";

export class addUploadStateOfVideo1622819786089 implements MigrationInterface {
    name = 'addUploadStateOfVideo1622819786089'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "video" ADD "uploadState" character varying NOT NULL DEFAULT 'uploading'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "video" DROP COLUMN "uploadState"`);
    }

}
