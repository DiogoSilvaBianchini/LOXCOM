import productModel from "../models/productSchema.js"
import userModel from "../models/userSchema.js"


const removeADM = async (req,res,next) => {
    try {
        const getAllProducts = await productModel.find()
        
        for(let product of getAllProducts){
            await productModel.findByIdAndDelete(product)
        }

        const db = await productModel.find()
        return res.status(200).json({message: db, status: 200})
    } catch (error) {
        next(error)
    }
}

const updateUser = async (req, res, next) => {
    const {id} = req.params

    try {
        await userModel.findByIdAndUpdate(id, req.body)
        res.status(200).json({message: "Usuario atualizado com sucesso", status: 200})
    } catch (error) {
        next(error)
    }
}

export {
    removeADM,
    updateUser
}