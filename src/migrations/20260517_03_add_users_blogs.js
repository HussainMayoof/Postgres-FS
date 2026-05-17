import { DataTypes } from 'sequelize';

export default {
    up: async ({ context: queryInterface }) => {
        await queryInterface.createTable('users_blogs', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: { model: 'users', key: 'id' },
            },
            blog_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: { model: 'blogs', key: 'id' },
            },
            read: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
        });
    },

    down: async ({ context: queryInterface }) => {
        await queryInterface.dropTable('users_blogs');
    },
};
