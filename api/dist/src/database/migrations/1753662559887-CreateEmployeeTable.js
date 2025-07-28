"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateEmployeeTable1753662559887 = void 0;
class CreateEmployeeTable1753662559887 {
    name = 'CreateEmployeeTable1753662559887';
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`employee\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`cpf\` varchar(11) NOT NULL, \`hiredAt\` date NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_cc5bc3cbcb7312fbc898749c5b\` (\`cpf\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP INDEX \`IDX_cc5bc3cbcb7312fbc898749c5b\` ON \`employee\``);
        await queryRunner.query(`DROP TABLE \`employee\``);
    }
}
exports.CreateEmployeeTable1753662559887 = CreateEmployeeTable1753662559887;
//# sourceMappingURL=1753662559887-CreateEmployeeTable.js.map