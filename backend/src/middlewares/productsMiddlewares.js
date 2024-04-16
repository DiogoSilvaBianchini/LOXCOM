import multer from 'multer'
import productModel from '../models/productSchema.js'
import {unlink} from 'fs'
import userModel from '../models/userSchema.js'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../frontend/public/productsImgs')
    },
    filename: (req, file, cb) => {
        const fileNameOrigim = file.originalname.split(".")
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + '.' + fileNameOrigim[1]
        cb(null, file.fieldname + uniqueSuffix)
    },
})
const fileFilter = (req, file, cb) => {
    const isAccepted = ['image/png', 'image/jpg', 'image/jpeg'].find( formatImage => formatImage == file.mimetype)
    if(isAccepted){
        return cb(null, true)
    }
    return cb(null, false)
}

const removeImages = async (userId, req, res, next) => {
    const {id} = req.params
    try {
        const findProduct = await productModel.findById(id, ["imgs"])       
       
        if(!findProduct){
            next(userId)
        }else{
            const imgList = findProduct.imgs
            removeFiles(imgList)
            return next(userId)
        }
        
    } catch (err) {
        next(token)
    }
}

const removeFiles = (files) => {
    try {
        for(let file of files){
            unlink(`../frontend/public/productsImgs/${file}`, (err) => {
                if(err) return err
            })
        }
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}

const removeRegisterProductUser = async (userId, req, res, next) => {
    const productId = req.params.id
    const updateListProducts = []

    try {
        const userProducts = await userModel.findById(userId, ["products"])
        const listProductsUser = [...userProducts.products]

        listProductsUser.map(i => {
            if(i !== productId){
                updateListProducts.push(i)
           }
        })

        await userModel.findByIdAndUpdate(userId, {products: updateListProducts})
        return res.status(200).json({message: "Produto removido com sucesso", status: 200})
    } catch (error) {
        next(error)
    }
}

const deleteAllProductsForUser = async (userId) => {
    try {
        const findUser = await userModel.findById(userId, ["products"])
        const productsList = findUser.products
        if(productsList.length > 0){
            for(let product of productsList){
                const findProduct = await productModel.findById(product, ["imgs"])
                if(findProduct.imgs.length > 0){
                    removeFiles(findProduct.imgs)
                }
            }
        }
        
        return true
    } catch (error) {
        return false   
    }
}

const removeAllProductsForUse = async (userId) => {
    try {
        const findUser = await userModel.findById(userId, ["products"])
        if(findUser.products.length > 0){
            for(let product of findUser.products){
                await productModel.findByIdAndDelete(product)
            }
        }
        return true
    } catch (error) {
        return false
    }
}

export {
    storage, 
    fileFilter, 
    removeImages, 
    removeRegisterProductUser, 
    deleteAllProductsForUser, 
    removeAllProductsForUse
}