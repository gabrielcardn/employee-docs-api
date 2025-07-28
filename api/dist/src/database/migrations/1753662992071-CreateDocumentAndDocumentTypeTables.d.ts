import { MigrationInterface, QueryRunner } from "typeorm";
export declare class CreateDocumentAndDocumentTypeTables1753662992071 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
