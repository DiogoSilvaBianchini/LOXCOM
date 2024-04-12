import express from 'express'
import UserController from '../controllers/usersControllers.js'
import {encriptedPassword, createToken} from '../middlewares/usersMiddlewares.js'

const routes = express.Router()

routes.get("/user", UserController.getAllUsers)
routes.post("/user", encriptedPassword, UserController.registerNewUser)
routes.post("/user/login", UserController.login, createToken)
routes.put("/user/:id", UserController.updateUser)
routes.delete("/user/:id", UserController.removeUser)

export default routes