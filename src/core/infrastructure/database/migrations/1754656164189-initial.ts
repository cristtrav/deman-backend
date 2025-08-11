import { MigrationInterface, QueryRunner } from "typeorm";
import { readFile } from "fs/promises";
import { join } from "path";

export class Initial1754656164189 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            await readFile(join(__dirname, '..', 'sql', 'initial.sql'), 'utf-8')
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
