import express from 'express'
import multer from 'multer'
import ProductController from '../controllers/productController.js'
import {verifyToken, checkId} from '../middlewares/usersMiddlewares.js'
import {storage, fileFilter, removeImages, removeRegisterProductUser} from '../middlewares/productsMiddlewares.js'


const upload = multer({storage, fileFilter})
const routes = express.Router()

routes.get("/products", ProductController.getAllProducts)
routes.get("/products/:id", ProductController.getProductById)
routes.get("/products/myProducts", verifyToken, checkId, ProductController.getMyProducts)
routes.post("/products", upload.array("imgURL"), verifyToken, checkId, ProductController.createNewProduct)
routes.put("/products/:id", verifyToken, ProductController.updateProduct)
routes.delete("/products/:id", verifyToken, checkId, removeImages, ProductController.deleteProduct, removeRegisterProductUser)

export default routes