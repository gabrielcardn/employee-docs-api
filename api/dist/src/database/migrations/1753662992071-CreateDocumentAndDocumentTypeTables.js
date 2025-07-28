"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateDocumentAndDocumentTypeTables1753662992071 = void 0;
class CreateDocumentAndDocumentTypeTables1753662992071 {
    name = 'CreateDocumentAndDocumentTypeTables1753662992071';
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`document_type\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(100) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_d63f0a80a96310fe1e9657795f\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`document\` (\`id\` varchar(36) NOT NULL, \`status\` enum ('PENDING', 'SUBMITTED', 'APPROVED', 'REJECTED') NOT NULL DEFAULT 'PENDING', \`filePath\` varchar(255) NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`employeeId\` varchar(36) NULL, \`documentTypeId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`employee\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`cpf\` varchar(11) NOT NULL, \`hiredAt\` date NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_cc5bc3cbcb7312fbc898749c5b\` (\`cpf\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`document\` ADD CONSTRAINT \`FK_79168b6c01d01766f5b99dcd741\` FOREIGN KEY (\`employeeId\`) REFERENCES \`employee\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`document\` ADD CONSTRAINT \`FK_9703ef59358ea636db5dea32ea8\` FOREIGN KEY (\`documentTypeId\`) REFERENCES \`document_type\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`document\` DROP FOREIGN KEY \`FK_9703ef59358ea636db5dea32ea8\``);
        await queryRunner.query(`ALTER TABLE \`document\` DROP FOREIGN KEY \`FK_79168b6c01d01766f5b99dcd741\``);
        await queryRunner.query(`DROP INDEX \`IDX_cc5bc3cbcb7312fbc898749c5b\` ON \`employee\``);
        await queryRunner.query(`DROP TABLE \`employee\``);
        await queryRunner.query(`DROP TABLE \`document\``);
        await queryRunner.query(`DROP INDEX \`IDX_d63f0a80a96310fe1e9657795f\` ON \`document_type\``);
        await queryRunner.query(`DROP TABLE \`document_type\``);
    }
}
exports.CreateDocumentAndDocumentTypeTables1753662992071 = CreateDocumentAndDocumentTypeTables1753662992071;
//# sourceMappingURL=1753662992071-CreateDocumentAndDocumentTypeTables.js.map