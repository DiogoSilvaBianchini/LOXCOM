import express from 'express'
import UserController from '../controllers/usersControllers.js'
import {encriptedPassword, createToken, verifyToken, checkId} from '../middlewares/usersMiddlewares.js'

const routes = express.Router()

routes.get("/user", UserController.getAllUsers)
routes.get("/user/userById", verifyToken, checkId, UserController.getUserById)
routes.post("/user", encriptedPassword, UserController.registerNewUser)
routes.post("/user/login", UserController.login, createToken)
routes.post("/user/loginForGoogle", UserController.loginForGoogle, createToken)
routes.put("/user/addFavority", verifyToken, UserController.addFavorityProduct)
routes.put("/user/:id", verifyToken, UserController.updateUser)
routes.delete("/user", verifyToken, checkId, UserController.removeUser)


export default routes