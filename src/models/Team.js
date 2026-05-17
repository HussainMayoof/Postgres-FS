import { DataTypes, Model } from 'sequelize';
import sequelize from '../util/db.js';

class Team extends Model {}

Team.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: {
                msg: 'Team name must be unique',
            },
            validate: {
                notNull: {
                    msg: 'Team name is required',
                },
            },
        },
    },
    {
        sequelize,
        underscored: true,
        timestamps: false,
        modelName: 'team',
    },
);

export default Team;
