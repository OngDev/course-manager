import {MigrationInterface, QueryRunner} from "typeorm";

export class changeUrlOfVideoNullable1622822936510 implements MigrationInterface {
    name = 'changeUrlOfVideoNullable1622822936510'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "video" ALTER COLUMN "videoUrl" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "video" ALTER COLUMN "videoUrl" SET NOT NULL`);
    }

}
