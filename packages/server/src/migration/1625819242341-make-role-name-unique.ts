import {MigrationInterface, QueryRunner} from "typeorm";

export class makeRoleNameUnique1625819242341 implements MigrationInterface {
    name = 'makeRoleNameUnique1625819242341'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Roles" ADD CONSTRAINT "UQ_8eadedb8470c92966389ecc2165" UNIQUE ("name")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Roles" DROP CONSTRAINT "UQ_8eadedb8470c92966389ecc2165"`);
    }

}
