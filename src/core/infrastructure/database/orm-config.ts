import { DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import { join } from 'path';

config();

const ormConfig: DataSourceOptions = {
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'my_database',
    synchronize: false,
    migrations: [join(__dirname, 'migrations', '*.{ts,js}')],
    logging: true,
    migrationsTableName: 'public.migrations'
}

export default ormConfig;