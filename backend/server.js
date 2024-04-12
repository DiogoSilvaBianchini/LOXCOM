import 'dotenv/config'
import express from 'express'
import morgan from 'morgan'
import routes from './src/routes/index.js'
import dbConnect from './src/database/db.js'
import mongoose from 'mongoose'
import multer from 'multer'

// eslint-disable-next-line no-undef
const PORT = process.env.PORT
const app = express()
const conn = await dbConnect()

conn.on("error", (err) => console.log(err))
conn.once("open", () => console.log("Database conection"))

app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(routes)

// eslint-disable-next-line no-unused-vars
app.use((error,req,res,next) => {
    console.log(error)
    if(error instanceof mongoose.Error.ValidationError){
        const err = Object.values(error.errors).map(err => err.message)
        return res.status(401).json({message: err, status: 401})
    }

    if(error.message.includes("E11000")){
        return res.status(500).json({message: "E-mail já cadastrado"})
    }

    if(error instanceof multer.MulterError){
        return res.status(400).json({message: "Imagem inválida"})
    }
    return res.status(500).json({message: "Erro interno do servidor"})
})

// eslint-disable-next-line no-unused-vars
app.use((req,res,next) => {
    return res.status(404).json({message: "Rota inexistente", status: 404})
})

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})