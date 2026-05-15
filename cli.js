import { DATABASE_URL } from './src/util/config.js';
import { QueryTypes, Sequelize } from 'sequelize';

const sequelize = new Sequelize(DATABASE_URL, {
    dialect: 'postgres',
});

const cli = async () => {
    try {
        await sequelize.authenticate();
        const blogs = await sequelize.query('SELECT * FROM blogs', {
            type: QueryTypes.SELECT,
        });
        blogs.forEach((blog) =>
            console.log(
                `${blog.author ? blog.author + ': ' : ''}'${blog.title}', ${blog.likes} likes`,
            ),
        );
        sequelize.close();
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

cli();
