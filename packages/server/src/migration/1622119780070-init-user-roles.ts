import { MigrationInterface, QueryRunner } from 'typeorm';

export class initUserRoles1622119780070 implements MigrationInterface {
  name = 'initUserRoles1622119780070';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "comment_reaction" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "createdBy" character varying(300) NOT NULL, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedBy" character varying(300) NOT NULL, "type" character varying NOT NULL, CONSTRAINT "PK_87f27d282c06eb61b1e0cde2d24" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "comment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "createdBy" character varying(300) NOT NULL, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedBy" character varying(300) NOT NULL, "content" character varying NOT NULL, CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "sub_line" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "createdBy" character varying(300) NOT NULL, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedBy" character varying(300) NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "content" character varying NOT NULL, CONSTRAINT "PK_0c2f1e6ece53a3235c505a13331" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "course" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "createdBy" character varying(300) NOT NULL, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedBy" character varying(300) NOT NULL, "title" character varying(300) NOT NULL, "description" character varying(300) NOT NULL, "thumbnailUrl" character varying(300) NOT NULL, CONSTRAINT "PK_bf95180dd756fd204fb01ce4916" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "video" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "createdBy" character varying(300) NOT NULL, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedBy" character varying(300) NOT NULL, "title" character varying(300) NOT NULL, "description" character varying(300) NOT NULL, "thumbnailUrl" character varying(300) NOT NULL, "videoUrl" character varying(300) NOT NULL, "publishAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "courseId" uuid, CONSTRAINT "PK_1a2f3856250765d72e7e1636c8e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "subtitle" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "createdBy" character varying(300) NOT NULL, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedBy" character varying(300) NOT NULL, "language" character varying NOT NULL, "videoId" uuid, CONSTRAINT "PK_994ad1599c74d6da447883869b5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "Roles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "createdBy" character varying(300) NOT NULL, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedBy" character varying(300) NOT NULL, "name" character varying(200) NOT NULL, CONSTRAINT "PK_efba48c6a0c7a9b6260f771b165" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "Supporters" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), CONSTRAINT "PK_098869727b47c5fb6a44ec79fcd" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "Admins" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), CONSTRAINT "PK_519fa28e9620ff7e67759daa754" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "Mods" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), CONSTRAINT "PK_4cdc23a9746b189fcc5f2f9b8e7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "Users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "createdBy" character varying(300) NOT NULL, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedBy" character varying(300) NOT NULL, "email" character varying NOT NULL, "fullName" character varying(200), "accountId" uuid, "adminId" uuid, "supporterId" uuid, "modId" uuid, CONSTRAINT "UQ_3c3ab3f49a87e6ddb607f3c4945" UNIQUE ("email"), CONSTRAINT "REL_13f7031faec63ad1ad7c9ad6a2" UNIQUE ("accountId"), CONSTRAINT "REL_7d51157cee464e9c2d370e9ea0" UNIQUE ("adminId"), CONSTRAINT "REL_7eed941c18a57eed2b6e87fefa" UNIQUE ("supporterId"), CONSTRAINT "REL_7fa861fde41ac6f7b344243b73" UNIQUE ("modId"), CONSTRAINT "PK_16d4f7d636df336db11d87413e3" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "Accounts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "createdBy" character varying(300) NOT NULL, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedBy" character varying(300) NOT NULL, "username" character varying(20) NOT NULL, "password" character varying(300) NOT NULL, CONSTRAINT "UQ_b8c739ebd3c66e80ba528d46a24" UNIQUE ("username"), CONSTRAINT "PK_215996d902f717c5a3a0b54194e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users_roles__roles" ("usersId" uuid NOT NULL, "rolesId" uuid NOT NULL, CONSTRAINT "PK_a10904f0f16594c4651b8d44424" PRIMARY KEY ("usersId", "rolesId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_9eaeb51d3028aede295068121d" ON "users_roles__roles" ("usersId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_c3d213748884bd725211057c7f" ON "users_roles__roles" ("rolesId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "video" ADD CONSTRAINT "FK_1c9d48d197150678894ceb8afa5" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "subtitle" ADD CONSTRAINT "FK_ac53120c00173037dda71873978" FOREIGN KEY ("videoId") REFERENCES "video"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "Users" ADD CONSTRAINT "FK_13f7031faec63ad1ad7c9ad6a28" FOREIGN KEY ("accountId") REFERENCES "Accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "Users" ADD CONSTRAINT "FK_7d51157cee464e9c2d370e9ea06" FOREIGN KEY ("adminId") REFERENCES "Admins"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "Users" ADD CONSTRAINT "FK_7eed941c18a57eed2b6e87fefa8" FOREIGN KEY ("supporterId") REFERENCES "Supporters"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "Users" ADD CONSTRAINT "FK_7fa861fde41ac6f7b344243b737" FOREIGN KEY ("modId") REFERENCES "Mods"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_roles__roles" ADD CONSTRAINT "FK_9eaeb51d3028aede295068121d5" FOREIGN KEY ("usersId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_roles__roles" ADD CONSTRAINT "FK_c3d213748884bd725211057c7f1" FOREIGN KEY ("rolesId") REFERENCES "Roles"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
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
      `ALTER TABLE "Users" DROP CONSTRAINT "FK_7fa861fde41ac6f7b344243b737"`,
    );
    await queryRunner.query(
      `ALTER TABLE "Users" DROP CONSTRAINT "FK_7eed941c18a57eed2b6e87fefa8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "Users" DROP CONSTRAINT "FK_7d51157cee464e9c2d370e9ea06"`,
    );
    await queryRunner.query(
      `ALTER TABLE "Users" DROP CONSTRAINT "FK_13f7031faec63ad1ad7c9ad6a28"`,
    );
    await queryRunner.query(
      `ALTER TABLE "subtitle" DROP CONSTRAINT "FK_ac53120c00173037dda71873978"`,
    );
    await queryRunner.query(
      `ALTER TABLE "video" DROP CONSTRAINT "FK_1c9d48d197150678894ceb8afa5"`,
    );
    await queryRunner.query(`DROP INDEX "IDX_c3d213748884bd725211057c7f"`);
    await queryRunner.query(`DROP INDEX "IDX_9eaeb51d3028aede295068121d"`);
    await queryRunner.query(`DROP TABLE "users_roles__roles"`);
    await queryRunner.query(`DROP TABLE "Accounts"`);
    await queryRunner.query(`DROP TABLE "Users"`);
    await queryRunner.query(`DROP TABLE "Mods"`);
    await queryRunner.query(`DROP TABLE "Admins"`);
    await queryRunner.query(`DROP TABLE "Supporters"`);
    await queryRunner.query(`DROP TABLE "Roles"`);
    await queryRunner.query(`DROP TABLE "subtitle"`);
    await queryRunner.query(`DROP TABLE "video"`);
    await queryRunner.query(`DROP TABLE "course"`);
    await queryRunner.query(`DROP TABLE "sub_line"`);
    await queryRunner.query(`DROP TABLE "comment"`);
    await queryRunner.query(`DROP TABLE "comment_reaction"`);
  }
}
