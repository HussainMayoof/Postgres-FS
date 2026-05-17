import { DataTypes, Model } from 'sequelize';
import sequelize from '../util/db.js';

class Session extends Model {}

Session.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'users', key: 'id' },
        },
    },
    {
        sequelize,
        underscored: true,
        timestamps: false,
        modelName: 'session',
        tableName: '_sessions_',
    },
);

export default Session;
