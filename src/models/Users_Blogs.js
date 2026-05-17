import { DataTypes, Model } from 'sequelize';
import sequelize from '../util/db.js';

class Users_Blogs extends Model {}

Users_Blogs.init(
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
        blogId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'blogs', key: 'id' },
        },
        read: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
    },
    {
        sequelize,
        underscored: true,
        timestamps: true,
        modelName: 'users_blogs',
    },
);

export default Users_Blogs;
