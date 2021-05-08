import { MigrationInterface, QueryRunner } from 'typeorm';

export class initCommentReactionModel1620228218954
  implements MigrationInterface {
  name = 'initCommentReactionModel1620228218954';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "comment_reaction" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "createdBy" character varying(300) NOT NULL, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedBy" character varying(300) NOT NULL, "type" character varying NOT NULL, CONSTRAINT "PK_87f27d282c06eb61b1e0cde2d24" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "comment_reaction"`);
  }
}
