import {MigrationInterface, QueryRunner} from "typeorm";

export class addAssociationSubLineAndSubtile1621609251172 implements MigrationInterface {
    name = 'addAssociationSubLineAndSubtile1621609251172'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sub_line" ADD "subtitleId" uuid`);
        await queryRunner.query(`ALTER TABLE "sub_line" ADD CONSTRAINT "FK_f7c9e41aa094db7b8a22af20e37" FOREIGN KEY ("subtitleId") REFERENCES "subtitle"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sub_line" DROP CONSTRAINT "FK_f7c9e41aa094db7b8a22af20e37"`);
        await queryRunner.query(`ALTER TABLE "sub_line" DROP COLUMN "subtitleId"`);
    }

}
