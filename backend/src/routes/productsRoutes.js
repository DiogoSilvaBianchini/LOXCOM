import express from 'express'
import multer from 'multer'
import ProductController from '../controllers/productController.js'
import {verifyToken, checkId} from '../middlewares/usersMiddlewares.js'
import {storage, tempStorage, fileFilter, removeImages, removeRegisterProductUser} from '../middlewares/productsMiddlewares.js'
 

const upload = multer({storage, fileFilter})
const tempUplaod = multer({storage: tempStorage})
const routes = express.Router()

routes.get("/products", ProductController.getAllProducts)
routes.get("/products/myProducts", verifyToken, checkId, ProductController.getMyProducts)
routes.get("/products/getAllProductUser", verifyToken, checkId, ProductController.getListProducts)
routes.get("/products/:id", ProductController.getProductById)
routes.post("/products", verifyToken, checkId, ProductController.createNewProduct)
routes.post("/products/saveImg", tempUplaod.array("imgs"), verifyToken, checkId, ProductController.uplaodTemp)
routes.put("/products/:id", verifyToken, ProductController.updateProduct)
routes.delete("/products/removeImg", verifyToken, checkId, ProductController.removeTempByName)
routes.delete("/products/:id", verifyToken, checkId, removeImages, ProductController.deleteProduct, removeRegisterProductUser)

export default routes