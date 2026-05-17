import { DataTypes } from 'sequelize';

export default {
    up: async ({ context: queryInterface }) => {
        await queryInterface.createTable('_sessions_', {
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
        });
    },

    down: async ({ context: queryInterface }) => {
        await queryInterface.dropTable('_sessions_');
    },
};
