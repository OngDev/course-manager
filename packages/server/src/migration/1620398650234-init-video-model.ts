import {MigrationInterface, QueryRunner} from "typeorm";

export class initVideoModel1620398650234 implements MigrationInterface {
    name = 'initVideoModel1620398650234'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "video" ADD "courseId" uuid`);
        await queryRunner.query(`ALTER TABLE "video" ADD CONSTRAINT "FK_1c9d48d197150678894ceb8afa5" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "video" DROP CONSTRAINT "FK_1c9d48d197150678894ceb8afa5"`);
        await queryRunner.query(`ALTER TABLE "video" DROP COLUMN "courseId"`);
    }

}
