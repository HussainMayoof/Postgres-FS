import { DataTypes, Model } from 'sequelize';
import sequelize from '../util/db.js';

class Blog extends Model {}
Blog.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        author: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        url: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'URL is required',
                },
            },
        },
        title: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Title is required',
                },
            },
        },
        likes: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        year: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Year is required',
                },
                min: {
                    args: 1991,
                    msg: 'Blog must have been written in 1991 or later',
                },
                max: {
                    args: new Date().getFullYear(),
                    msg: "Blog can't be from the future!",
                },
            },
        },
    },
    {
        sequelize,
        underscored: true,
        timestamps: true,
        modelName: 'blog',
    },
);

export default Blog;
