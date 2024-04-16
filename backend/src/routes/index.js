import cors from 'cors'
import express from 'express'
import usersRoutes from './userRoutes.js'
import productsRoutes from './productsRoutes.js'
import adminRoutes from './adminRoutes.js'

const routes = express.Router()
const corsOptions = {
    origin: 'http://localhost:5173'
}

routes.use(cors(corsOptions))
routes.use(usersRoutes, productsRoutes, adminRoutes)

export default routes