import { decode } from "jsonwebtoken"
import productModel from "../models/productSchema.js"
import userModel from "../models/userSchema.js"

class ProductController{
    static async getAllProducts(req,res,next){
        try {
            const getAllProducts = await productModel.find({}).populate("owner", ["name", "email"])
            return res.status(200).json({message: getAllProducts, status: 200})
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

    static async createNewProduct(token, req, res, next){
        const {title, price, describe, stoque} = req.body
        const filesNames = []
        for(let i in req.files){
            filesNames.push(req.files[i].filename)
        }

        // eslint-disable-next-line no-undef
        const decodeToken = decode(token, process.env.KEY_TOKEN)
        const userId = decodeToken.id
        try {
            //eslint-disable-next-line no-undef
            const newProduct = await productModel.create({
                title, price, describe, owner: userId, stoque, imgs: filesNames
            })

            const idProduct = newProduct._id.toString()

            const user = await userModel.findById(userId, ["products"])
            const newProducts = [...user.products, idProduct]
    
            await userModel.findByIdAndUpdate(userId, {products: newProducts})

            return res.status(200).json({message: filesNames, status: 200})
        } catch (error) {
            next(error)
        }
    }
    static async updateProduct(req, res, next){
        const update = req.body
        const {id} = req.params
        try {
            await productModel.findOneAndUpdate({_id: id}, update)
            return res.status(200).json({message: "Produto atualizado com sucesso!", status: 200})
        } catch (error) {
            next(error)
        }
    }

    static async deleteProduct(token, req,res,next){
        const {id} = req.params
        // eslint-disable-next-line no-undef
        const decodeToken = decode(token, process.env.KEY_TOKEN)

        try {
            await productModel.findByIdAndDelete(id)
            const userProducts = await userModel.findById(decodeToken.id, ["products"])
            const listProductsUser = [...userProducts.products]
            
            const updateListProducts = []
            
            listProductsUser.map(i => {
                if(i !== id){
                    updateListProducts.push(i)
                }
            })

            await userModel.findByIdAndUpdate(decodeToken.id, {products: updateListProducts})

            return res.status(200).json({message: "Produto removido com sucesso", status: 200})
        } catch (error) {
            next(error)   
        }
    }
}

export default ProductController