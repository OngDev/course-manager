import {MigrationInterface, QueryRunner} from "typeorm";

export class addAssociationCommentAndCommentReaction1622216160962 implements MigrationInterface {
    name = 'addAssociationCommentAndCommentReaction1622216160962'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment_reaction" ADD "commentId" uuid`);
        await queryRunner.query(`ALTER TABLE "comment_reaction" ADD CONSTRAINT "FK_88bb607240417f03c0592da6824" FOREIGN KEY ("commentId") REFERENCES "comment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment_reaction" DROP CONSTRAINT "FK_88bb607240417f03c0592da6824"`);
        await queryRunner.query(`ALTER TABLE "comment_reaction" DROP COLUMN "commentId"`);
    }

}
