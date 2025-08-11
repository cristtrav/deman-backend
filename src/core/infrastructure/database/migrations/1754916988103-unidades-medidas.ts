import { readFile } from "fs/promises";
import { join } from "path";
import { MigrationInterface, QueryRunner } from "typeorm";

export class UnidadesMedidas1754916988103 implements MigrationInterface {

    readonly folder: string = join(__dirname, '..', 'sql', '1754916988103-unidades-medidas');
    readonly upSqlFile: string = join(this.folder, 'up.sql');
    readonly downSqlFile: string = join(this.folder, 'down.sql');

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            await readFile(this.upSqlFile, 'utf-8')
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            await readFile(this.downSqlFile, 'utf-8')
        );
    }

}
