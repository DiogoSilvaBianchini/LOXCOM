import userModel from '../models/userSchema.js'
import bcrypt from 'bcryptjs'
import {deleteAllProductsForUser, removeAllProductsForUse} from '../middlewares/productsMiddlewares.js'

class UserControllers{
    static async loginForGoogle(req,res,next){
        const {email} = req.body
        try {
            const findUsers = await userModel.findOne({email}, ["email"])
            if(!findUsers) return res.status(400).json({message: "Email/Senha Não registrado", status: 401})
            
            const id = findUsers._id.toString()
            next(id)
        } catch (error) {
            next(error)
        }
    }
    static async login(req,res,next){
        const {email, password} = req.body
        try {
            const findUsers = await userModel.findOne({email}, ["email","password"])
            if(!findUsers) return res.status(400).json({message: "Email/Senha Incorretos", status: 401})
            const checkPassword = await bcrypt.compare(password, findUsers.password)
            if(!checkPassword) return res.status(400).json({message: "Email/Senha Incorretos", status: 401})
            const id = findUsers._id.toString()
            next(id)
        } catch (error) {
            next(error)
        }
    }

    static async registerNewUser(hash, req, res, next){
        const {name, email, CEP, office} = req.body

        try {
            await userModel.create({name, email, password: hash, CEP, office})
            return res.status(200).json({message: "Usuario criado com sucesso", status: 201})
        } catch (error) {
            next(error)
        }
    }

    static async getAllUsers(req,res,next){
        try {
            const getAllUser = await userModel.find({}, ["-password"])
            return res.status(200).json({message: getAllUser, status: 200})
        } catch (error) {
            next(error)  
        }
    }
   
    static async getUserById(userId, req, res, next){
        try {
            const findUser = await userModel.findById({_id: userId}, ["-password","-office"])
            return res.status(200).json({message: findUser, status: 200})
        } catch (error) {
            next(error)   
        }
    }

    static async getUserByName(req,res,next){
        const name = req.body.name
        try {
            const findUser = await userModel.findOne({name}, ["-password"])
            return res.status(200).json({message: findUser, status: 200})
        } catch (error) {
            next(error)   
        }
    }
    
    static async updateUser(userId, req,res,next){
        try {
            await userModel.findByIdAndUpdate({_id: userId}, req.body)
            return res.status(200).json({message: "Dados atualizados com sucesso", status: 200})
        } catch (error) {
            next(error)  
        }
    }

    static async addFavorityProduct(userId, req, res, next){
        const {idProduct} = req.body
        try {
            let updateList = []
            const listFavProducts = await userModel.findById({_id: userId}, ["favorityProducts"])
            const actualList = listFavProducts.favorityProducts
            if(!listFavProducts) return res.status(401).json({message: "Usuario não encontrado", status: 401})
            
            for(let i = 0; i <= actualList.length; i++){
                updateList.push(actualList[i])
            }
            
            updateList.push(idProduct)
            console.log(updateList)
            await userModel.findByIdAndUpdate({_id: userId}, {favorityProducts: updateList})
            return res.status(201).json({message: "Dados atualizados com sucesso", status: 201})
        } catch (error) {
            next(error)
        }
    }

    static async removeUser(userId, req,res,next){
        try {
            deleteAllProductsForUser(userId)
            removeAllProductsForUse(userId)
            await userModel.findByIdAndDelete({_id: userId})
            return res.status(200).json({message: "Usuario removido com sucesso", status: 200})
        } catch (error) {
            next(error)   
        }
    }
}

export default UserControllers