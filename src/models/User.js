import { DataTypes, Model } from 'sequelize';
import sequelize from '../util/db.js';

class User extends Model {}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            unique: {
                msg: 'Username must be unique',
            },
            allowNull: false,
            validate: {
                isEmail: {
                    msg: 'Username must be a valid email address',
                },
                notNull: {
                    msg: 'Username is required',
                },
            },
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Name is required',
                },
            },
        },
    },
    {
        sequelize,
        underscored: true,
        timestamps: true,
        modelName: 'user',
    },
);

export default User;
