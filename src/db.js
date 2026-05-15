import { DATABASE_URL } from './util/config.js';
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(DATABASE_URL, {
    dialect: 'postgres',
});

export const connectToDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connected to PostgreSQL');
    } catch (e) {
        console.log(`Failed to connect to database: ${e}`);
        return process.exit(1);
    }

    return null;
};

export default sequelize;
