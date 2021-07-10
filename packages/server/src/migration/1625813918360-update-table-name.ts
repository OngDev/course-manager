import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateTableName1625813918360 implements MigrationInterface {
  name = 'updateTableName1625813918360';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "Users" DROP CONSTRAINT "FK_7d51157cee464e9c2d370e9ea06"`,
    );
    await queryRunner.query(
      `ALTER TABLE "Users" DROP CONSTRAINT "FK_7eed941c18a57eed2b6e87fefa8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "Users" DROP CONSTRAINT "FK_7fa861fde41ac6f7b344243b737"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sub_line" DROP CONSTRAINT "FK_f7c9e41aa094db7b8a22af20e37"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_roles__roles" DROP CONSTRAINT "FK_9eaeb51d3028aede295068121d5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_roles__roles" DROP CONSTRAINT "FK_c3d213748884bd725211057c7f1"`,
    );
    await queryRunner.query(
      `CREATE TABLE "Comments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "createdBy" character varying(300) NOT NULL DEFAULT 'system', "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedBy" character varying(300) NOT NULL DEFAULT 'system', "content" character varying NOT NULL, CONSTRAINT "PK_91e576c94d7d4f888c471fb43de" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "Comment_reactions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "createdBy" character varying(300) NOT NULL DEFAULT 'system', "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedBy" character varying(300) NOT NULL DEFAULT 'system', "type" character varying NOT NULL, "commentId" uuid, CONSTRAINT "PK_4545ab622fcf64745fb2f41852f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "Subtitles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "createdBy" character varying(300) NOT NULL DEFAULT 'system', "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedBy" character varying(300) NOT NULL DEFAULT 'system', "language" character varying NOT NULL, "videoId" uuid, CONSTRAINT "PK_6e491228a81a77a00f6518e980d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "Videos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "createdBy" character varying(300) NOT NULL DEFAULT 'system', "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedBy" character varying(300) NOT NULL DEFAULT 'system', "title" character varying(300) NOT NULL, "description" character varying(300) NOT NULL, "thumbnailUrl" character varying(300) NOT NULL, "videoUrl" character varying(300), "publishAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "courseId" uuid, CONSTRAINT "PK_3cafd1e310bdf514e0d6a94df1a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "Courses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "createdBy" character varying(300) NOT NULL DEFAULT 'system', "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedBy" character varying(300) NOT NULL DEFAULT 'system', "title" character varying(300) NOT NULL, "description" character varying(300) NOT NULL, "thumbnailUrl" character varying(300) NOT NULL, CONSTRAINT "PK_e01ce00d3984a78d0693ab3ecbe" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "Accounts" ADD "isActivated" boolean NOT NULL DEFAULT true`,
    );
    await queryRunner.query(
      `ALTER TABLE "Roles" ALTER COLUMN "createdAt" SET DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "Roles" ALTER COLUMN "updatedAt" SET DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "Users" ALTER COLUMN "createdAt" SET DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "Users" ALTER COLUMN "updatedAt" SET DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "Accounts" ALTER COLUMN "createdAt" SET DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "Accounts" ALTER COLUMN "updatedAt" SET DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "sub_line" ALTER COLUMN "createdAt" SET DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "sub_line" ALTER COLUMN "updatedAt" SET DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "example" ALTER COLUMN "createdAt" SET DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "example" ALTER COLUMN "updatedAt" SET DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "Users" ADD CONSTRAINT "FK_7d51157cee464e9c2d370e9ea06" FOREIGN KEY ("adminId") REFERENCES "Admins"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "Users" ADD CONSTRAINT "FK_7eed941c18a57eed2b6e87fefa8" FOREIGN KEY ("supporterId") REFERENCES "Supporters"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "Users" ADD CONSTRAINT "FK_7fa861fde41ac6f7b344243b737" FOREIGN KEY ("modId") REFERENCES "Mods"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "Comment_reactions" ADD CONSTRAINT "FK_500c7a29fca9cb53bd1375ec104" FOREIGN KEY ("commentId") REFERENCES "Comments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "sub_line" ADD CONSTRAINT "FK_f7c9e41aa094db7b8a22af20e37" FOREIGN KEY ("subtitleId") REFERENCES "Subtitles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "Subtitles" ADD CONSTRAINT "FK_4a29733b9379e5c2b10d5011e23" FOREIGN KEY ("videoId") REFERENCES "Videos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "Videos" ADD CONSTRAINT "FK_9b3473425abea2e829199b9f596" FOREIGN KEY ("courseId") REFERENCES "Courses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_roles__roles" ADD CONSTRAINT "FK_9eaeb51d3028aede295068121d5" FOREIGN KEY ("usersId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_roles__roles" ADD CONSTRAINT "FK_c3d213748884bd725211057c7f1" FOREIGN KEY ("rolesId") REFERENCES "Roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users_roles__roles" DROP CONSTRAINT "FK_c3d213748884bd725211057c7f1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_roles__roles" DROP CONSTRAINT "FK_9eaeb51d3028aede295068121d5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "Videos" DROP CONSTRAINT "FK_9b3473425abea2e829199b9f596"`,
    );
    await queryRunner.query(
      `ALTER TABLE "Subtitles" DROP CONSTRAINT "FK_4a29733b9379e5c2b10d5011e23"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sub_line" DROP CONSTRAINT "FK_f7c9e41aa094db7b8a22af20e37"`,
    );
    await queryRunner.query(
      `ALTER TABLE "Comment_reactions" DROP CONSTRAINT "FK_500c7a29fca9cb53bd1375ec104"`,
    );
    await queryRunner.query(
      `ALTER TABLE "Users" DROP CONSTRAINT "FK_7fa861fde41ac6f7b344243b737"`,
    );
    await queryRunner.query(
      `ALTER TABLE "Users" DROP CONSTRAINT "FK_7eed941c18a57eed2b6e87fefa8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "Users" DROP CONSTRAINT "FK_7d51157cee464e9c2d370e9ea06"`,
    );
    await queryRunner.query(
      `ALTER TABLE "example" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "example" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "sub_line" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "sub_line" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "Accounts" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "Accounts" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "Users" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "Users" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "Roles" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "Roles" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(`ALTER TABLE "Accounts" DROP COLUMN "isActivated"`);
    await queryRunner.query(`DROP TABLE "Courses"`);
    await queryRunner.query(`DROP TABLE "Videos"`);
    await queryRunner.query(`DROP TABLE "Subtitles"`);
    await queryRunner.query(`DROP TABLE "Comment_reactions"`);
    await queryRunner.query(`DROP TABLE "Comments"`);
    await queryRunner.query(
      `ALTER TABLE "users_roles__roles" ADD CONSTRAINT "FK_c3d213748884bd725211057c7f1" FOREIGN KEY ("rolesId") REFERENCES "Roles"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_roles__roles" ADD CONSTRAINT "FK_9eaeb51d3028aede295068121d5" FOREIGN KEY ("usersId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "sub_line" ADD CONSTRAINT "FK_f7c9e41aa094db7b8a22af20e37" FOREIGN KEY ("subtitleId") REFERENCES "subtitle"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "Users" ADD CONSTRAINT "FK_7fa861fde41ac6f7b344243b737" FOREIGN KEY ("modId") REFERENCES "Mods"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "Users" ADD CONSTRAINT "FK_7eed941c18a57eed2b6e87fefa8" FOREIGN KEY ("supporterId") REFERENCES "Supporters"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "Users" ADD CONSTRAINT "FK_7d51157cee464e9c2d370e9ea06" FOREIGN KEY ("adminId") REFERENCES "Admins"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
