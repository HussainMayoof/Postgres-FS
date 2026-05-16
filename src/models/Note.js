import { DataTypes, Model } from 'sequelize';
import sequelize from '../util/db.js';

class Note extends Model {}
Note.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Note content is required',
                },
            },
        },
        important: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        date: {
            type: DataTypes.DATE,
        },
    },
    {
        sequelize,
        underscored: true,
        timestamps: false,
        modelName: 'note',
    },
);

export default Note;
