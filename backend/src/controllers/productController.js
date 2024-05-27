import { decode } from "jsonwebtoken"
import productModel from "../models/productSchema.js"
import userModel from "../models/userSchema.js"
import {removeFiles} from "../middlewares/productsMiddlewares.js" 
import { findProductsFromList } from "../utils/findProductsFromList.js"

class ProductController{
    static async getListProductsById(userId, req, res, next){
        try {
            const findProductsUser = await userModel.findById({_id: userId}, ["favorityProducts", "products"])
            
            const productsId = findProductsUser.products
            const favProductsId = findProductsUser.favorityProducts

            const product = await findProductsFromList(productsId)
            const favProduct = await findProductsFromList(favProductsId)

            return res.status(200).json({message: {products: product, favProducts: favProduct}, status: 200})
        } catch (error) {
            next(error)
        }
    }

    static async getAllProducts(req,res,next){
        try {
            const getAllProducts = await productModel.find({}).populate("owner", ["name", "email"])
            return res.status(200).json({message: getAllProducts, status: 200})
        } catch (error) {
            next(error)
        }
    }

    static async getProductById(req,res,next){
        const {id} = req.params

        try {
            const product = await productModel.findById(id)
            if(!product){
                return res.status(400).json({message: "Produto não existe", status: 400}) 
            }
            return res.status(200).json({message: product, status: 200})
        } catch (error) {
            next(error)
        }
    }

    static async getListProducts(id, req, res, next){
        try {
            const user = await userModel.findById(id, ["products", "favorityProducts"])
            const productsList = []
            const userFavorityProducts = []
            
            if(user.products.length > 0){
                for(let i of user.products){
                    const findProducts = await productModel.findById(i)
                    productsList.push(findProducts)
                }
            }

            if(user.favorityProducts.length > 0){
                for(let i of user.favorityProducts){
                    if(i){
                        const findProducts = await productModel.findById(i)
                        userFavorityProducts.push(findProducts)
                    }
                }
            }

            return res.status(200).json({message: {registerProducts: productsList, favorityProducts: userFavorityProducts}, status: 200})
        } catch (error) {
            next(error)
        }
    }

    static async getMyProducts(token, req, res, next){
        // eslint-disable-next-line no-undef
        const decodeToken = decode(token, process.env.KEY_TOKEN)
        const id = decodeToken.id
        
        try {
            const products = []
            const findProductsByUser = await userModel.findById(id, ["products"])
            
            for(let i in findProductsByUser.products){
                const findProducts = await productModel.findById(findProductsByUser.products[i]).populate("owner", ["name"])
                products.push(findProducts)
            }

            return res.status(200).json({message: products, status: 200})
        } catch (error) {
            next(error)
        }
    }

    static async uplaodTemp(userId, req, res, next){
        let filesNames = []
       try {
            for(let i in req.files){
                filesNames.push(req.files[i].filename)
            }

            res.status(200).json({message: filesNames, status: 200})
       } catch (error) {
            next(error)
       }
    }

    static async removeTempByName(userId, req, res, next){
        const {imgs} = req.body
        try {
            removeFiles([imgs])
            return res.status(201).json({message: "Imagem removida com sucesso", status: 201})
        } catch (error) {
            next(error)
        }
    }

    static async createNewProduct(userId, req, res, next){
        const {title, price, describe, imgs, category, stock} = req.body
  
        try {
            //eslint-disable-next-line no-undef
            const newProduct = await productModel.create({
                title, price, describe, owner: userId, category, stock, imgs
            })

            const idProduct = newProduct._id.toString()

            const user = await userModel.findById(userId, ["products"])
            const newProducts = [...user.products, idProduct]
    
            await userModel.findByIdAndUpdate(userId, {products: newProducts})

            return res.status(200).json({message: "Produto registrado com sucesso", status: 200})
        } catch (error) {
            next(error)
        }
    }
    static async updateProduct(userId, req, res, next){
        const {id} = req.params
        const update = req.body

        try {
            await productModel.findByIdAndUpdate({_id: id}, update)
            return res.status(200).json({message: "Produto atualizado com sucesso!", status: 200})
        } catch (error) {
            next(error)
        }
    }

    static async deleteProduct(userId, req,res,next){
        const {id} = req.params
        // eslint-disable-next-line no-undef
        try {
            await productModel.findByIdAndDelete(id)
            next(userId)
        } catch (error) {
            next(error)   
        }
    }
}

export default ProductController