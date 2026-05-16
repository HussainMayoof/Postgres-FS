import { DataTypes } from 'sequelize';

export default {
    up: async ({ context: queryInterface }) => {
        await queryInterface.addColumn('blogs', 'year', {
            type: DataTypes.INTEGER,
            allowNull: false,
        });
    },

    down: async ({ context: queryInterface }) => {
        await queryInterface.removeColumn('blogs', 'year');
    },
};
