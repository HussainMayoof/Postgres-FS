import 'dotenv/config'
import {DataTypes, Model, QueryTypes, Sequelize} from 'sequelize'
import express from 'express'
const app = express()
app.use(express.json())

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    dialectOptions: {
        // ssl: {
        //     require: false,
        //     rejectUnauthorized: false
        // }
    }
})

class Note extends Model {}
Note.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    important: {
        type: DataTypes.BOOLEAN
    },
    date: {
        type: DataTypes.DATE
    }
}, {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'note'
})

app.get('/api/notes', async (req, res) => {
    const notes = await Note.findAll()
    res.json(notes)
})

app.post('/api/notes', async (req, res) => {
    console.log(req.body)
    try {
        const note = await Note.create({...req.body, date: new Date()})
        res.json(note)
    } catch (error) {
        return res.status(400).json({error})
    }
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

// const main = async () => {
//     try {
//         await sequelize.authenticate()
//         const notes = await sequelize.query("SELECT * FROM notes", {type: QueryTypes.SELECT})
//         console.log(notes)
//         sequelize.close()
//     } catch (error) {
//         console.error('Unable to connect to the database:', error)
//     }
// }
//
// main()