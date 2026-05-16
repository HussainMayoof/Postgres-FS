import { DATABASE_URL } from './config.js';
import { Sequelize } from 'sequelize';
import { SequelizeStorage, Umzug } from 'umzug';
import { pathToFileURL, fileURLToPath } from 'url';
import * as path from 'node:path';

const sequelize = new Sequelize(DATABASE_URL, {
    dialect: 'postgres',
});

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const migrationConf = {
    migrations: {
        glob: path.join(__dirname, '../migrations/*.js').replace(/\\/g, '/'),
        resolve: ({ name, path: migPath, context }) => {
            const migration = import(pathToFileURL(migPath).href);
            return {
                name,
                up: async () => (await migration).default.up({ context }),
                down: async () => (await migration).default.down({ context }),
            };
        },
    },
    storage: new SequelizeStorage({ sequelize, tableName: 'migrations' }),
    context: sequelize.getQueryInterface(),
    logger: console,
};

const runMigrations = async () => {
    const migrator = new Umzug(migrationConf);

    const migrations = await migrator.up();
    console.log('Migrations up to date', {
        files: migrations.map((migration) => migration.name),
    });
};

export const rollbackMigration = async () => {
    await sequelize.authenticate();
    const migrator = new Umzug(migrationConf);
    await migrator.down();
};

export const connectToDatabase = async () => {
    try {
        await sequelize.authenticate();
        await runMigrations();
        console.log('Connected to PostgreSQL');
    } catch (e) {
        console.log(`Failed to connect to database: ${e}`);
        return process.exit(1);
    }

    return null;
};

export default sequelize;
