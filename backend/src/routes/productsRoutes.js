import express from 'express'
import ProductController from '../controllers/productController.js'
import {verifyToken, checkId} from '../middlewares/usersMiddlewares.js'
import multer from 'multer'
import {storage, fileFilter} from '../middlewares/productsMiddlewares.js'

const upload = multer({storage, fileFilter})
const routes = express.Router()

routes.get("/products", ProductController.getAllProducts)
routes.get("/products/myProducts", verifyToken, ProductController.getMyProducts)
routes.post("/products/test", upload.array("imgURL"), (req,res) => {
    const arr = []
    for(let i in req.files){
        arr.push(req.files[i].filename)
    }
    res.status(200).json({nome: arr})
})
routes.post("/products", upload.array("imgURL"), verifyToken, checkId, ProductController.createNewProduct)
routes.put("/products/:id", ProductController.updateProduct)
routes.delete("/products/:id", verifyToken, checkId, ProductController.deleteProduct)


export default routes