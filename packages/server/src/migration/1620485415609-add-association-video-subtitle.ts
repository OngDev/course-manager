import {MigrationInterface, QueryRunner} from "typeorm";

export class addAssociationVideoSubtitle1620485415609 implements MigrationInterface {
    name = 'addAssociationVideoSubtitle1620485415609'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subtitle" ADD "videoId" uuid`);
        await queryRunner.query(`ALTER TABLE "subtitle" ADD CONSTRAINT "FK_ac53120c00173037dda71873978" FOREIGN KEY ("videoId") REFERENCES "video"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subtitle" DROP CONSTRAINT "FK_ac53120c00173037dda71873978"`);
        await queryRunner.query(`ALTER TABLE "subtitle" DROP COLUMN "videoId"`);
    }

}
