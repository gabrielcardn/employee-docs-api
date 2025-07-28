// data-source.ts
import 'dotenv/config';
import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306', 10),
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || 'inmeta_docs_db',
  entities: ['src/**/*.entity.ts'], // <-- APONTAR PARA .ts
  migrations: ['src/database/migrations/*.ts'], // <-- APONTAR PARA .ts
  migrationsTableName: 'migrations', // Boa prática: nome explícito da tabela
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;