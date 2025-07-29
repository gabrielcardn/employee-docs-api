import 'dotenv/config';
import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306', 10),
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || 'inmeta_docs_db',
  entities: ['src/**/*.entity.ts'], 
  migrations: ['src/database/migrations/*.ts'], 
  migrationsTableName: 'migrations',
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;