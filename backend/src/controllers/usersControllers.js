import userModel from '../models/userSchema.js'
import bcrypt from 'bcryptjs'
import {deleteAllProductsForUser, removeAllProductsForUse} from '../middlewares/productsMiddlewares.js'
import {MercadoPagoConfig, Payment} from 'mercadopago'


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
        try {
            const {id} = req.params
            const findUser = await userModel.findById({_id: userId})
            const listFav = [...findUser.favorityProducts, id]
            await userModel.findByIdAndUpdate({_id: userId}, {favorityProducts: listFav })
            return res.status(201).json({message: "Item adicionado", status: 201})
        } catch (error) {
            return next(error)
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

    static async searchPayment(req,res,next){  
        const client = new MercadoPagoConfig({accessToken: process.env.KEY_TOKEN,})
        const payment = new Payment(client)

        payment.search({options: {
            external_reference: "MP0001",
            sort: "date_created",
            criteria: "asc",
            range: "date_created",
            begin_date: "NOW-30DAYS",
            end_date: "NOW"
        }}).then(results => {
            return res.status(200).json({results})
        }).catch(err => {
            next(err)
        })

    }

    static async payment(body, req, res, next){   
        const client = new MercadoPagoConfig({accessToken: process.env.KEY_TOKEN})
        const payment = new Payment(client)
        
        payment.create({body}).then(results => {
            return res.status(200).json({results})
        }).catch(err => {
            res.status(500).json({message: err})
        })      
    }
}

export default UserControllers