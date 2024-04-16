import express from 'express'
import {removeADM, updateUser} from "../middlewares/admMiddlewares.js"

const routes = express.Router()

routes.delete("/adm/products/destroy", removeADM)
routes.put("/adm/user/:id", updateUser)

export default routes