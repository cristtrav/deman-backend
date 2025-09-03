import { readFile } from "fs/promises";
import { join } from "path";
import { MigrationInterface, QueryRunner } from "typeorm";

export class BaseMigration implements MigrationInterface {

    private folder: string;
    private upSqlFile: string;
    private downSqlFile: string;

    constructor(private folderName: string){
        this.folder = join(__dirname, 'sql', this.folderName);
        this.upSqlFile = join(this.folder, 'up.sql');
        this.downSqlFile = join(this.folder, 'down.sql');
     };

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