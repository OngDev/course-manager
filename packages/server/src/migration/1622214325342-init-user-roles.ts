import {MigrationInterface, QueryRunner} from "typeorm";

export class initUserRoles1622214325342 implements MigrationInterface {
    name = 'initUserRoles1622214325342'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Roles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "createdBy" character varying(300) NOT NULL, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedBy" character varying(300) NOT NULL, "name" character varying(200) NOT NULL, CONSTRAINT "PK_efba48c6a0c7a9b6260f771b165" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Supporters" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), CONSTRAINT "PK_098869727b47c5fb6a44ec79fcd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Admins" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), CONSTRAINT "PK_519fa28e9620ff7e67759daa754" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Mods" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), CONSTRAINT "PK_4cdc23a9746b189fcc5f2f9b8e7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "createdBy" character varying(300) NOT NULL, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedBy" character varying(300) NOT NULL, "email" character varying NOT NULL, "fullName" character varying(200), "accountId" uuid, "adminId" uuid, "supporterId" uuid, "modId" uuid, CONSTRAINT "UQ_3c3ab3f49a87e6ddb607f3c4945" UNIQUE ("email"), CONSTRAINT "REL_13f7031faec63ad1ad7c9ad6a2" UNIQUE ("accountId"), CONSTRAINT "REL_7d51157cee464e9c2d370e9ea0" UNIQUE ("adminId"), CONSTRAINT "REL_7eed941c18a57eed2b6e87fefa" UNIQUE ("supporterId"), CONSTRAINT "REL_7fa861fde41ac6f7b344243b73" UNIQUE ("modId"), CONSTRAINT "PK_16d4f7d636df336db11d87413e3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Accounts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "createdBy" character varying(300) NOT NULL, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedBy" character varying(300) NOT NULL, "username" character varying(20) NOT NULL, "password" character varying(300) NOT NULL, CONSTRAINT "UQ_b8c739ebd3c66e80ba528d46a24" UNIQUE ("username"), CONSTRAINT "PK_215996d902f717c5a3a0b54194e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users_roles__roles" ("usersId" uuid NOT NULL, "rolesId" uuid NOT NULL, CONSTRAINT "PK_a10904f0f16594c4651b8d44424" PRIMARY KEY ("usersId", "rolesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_9eaeb51d3028aede295068121d" ON "users_roles__roles" ("usersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_c3d213748884bd725211057c7f" ON "users_roles__roles" ("rolesId") `);
        await queryRunner.query(`ALTER TABLE "Users" ADD CONSTRAINT "FK_13f7031faec63ad1ad7c9ad6a28" FOREIGN KEY ("accountId") REFERENCES "Accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Users" ADD CONSTRAINT "FK_7d51157cee464e9c2d370e9ea06" FOREIGN KEY ("adminId") REFERENCES "Admins"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Users" ADD CONSTRAINT "FK_7eed941c18a57eed2b6e87fefa8" FOREIGN KEY ("supporterId") REFERENCES "Supporters"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Users" ADD CONSTRAINT "FK_7fa861fde41ac6f7b344243b737" FOREIGN KEY ("modId") REFERENCES "Mods"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_roles__roles" ADD CONSTRAINT "FK_9eaeb51d3028aede295068121d5" FOREIGN KEY ("usersId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_roles__roles" ADD CONSTRAINT "FK_c3d213748884bd725211057c7f1" FOREIGN KEY ("rolesId") REFERENCES "Roles"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_roles__roles" DROP CONSTRAINT "FK_c3d213748884bd725211057c7f1"`);
        await queryRunner.query(`ALTER TABLE "users_roles__roles" DROP CONSTRAINT "FK_9eaeb51d3028aede295068121d5"`);
        await queryRunner.query(`ALTER TABLE "Users" DROP CONSTRAINT "FK_7fa861fde41ac6f7b344243b737"`);
        await queryRunner.query(`ALTER TABLE "Users" DROP CONSTRAINT "FK_7eed941c18a57eed2b6e87fefa8"`);
        await queryRunner.query(`ALTER TABLE "Users" DROP CONSTRAINT "FK_7d51157cee464e9c2d370e9ea06"`);
        await queryRunner.query(`ALTER TABLE "Users" DROP CONSTRAINT "FK_13f7031faec63ad1ad7c9ad6a28"`);
        await queryRunner.query(`DROP INDEX "IDX_c3d213748884bd725211057c7f"`);
        await queryRunner.query(`DROP INDEX "IDX_9eaeb51d3028aede295068121d"`);
        await queryRunner.query(`DROP TABLE "users_roles__roles"`);
        await queryRunner.query(`DROP TABLE "Accounts"`);
        await queryRunner.query(`DROP TABLE "Users"`);
        await queryRunner.query(`DROP TABLE "Mods"`);
        await queryRunner.query(`DROP TABLE "Admins"`);
        await queryRunner.query(`DROP TABLE "Supporters"`);
        await queryRunner.query(`DROP TABLE "Roles"`);
    }

}
