import { MigrationInterface, QueryRunner } from "typeorm";
export declare class CreateEmployeeTable1753662559887 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
