import userModel from '../models/userSchema.js'
import bcrypt from 'bcryptjs'
class UserControllers{
    static async login(req,res,next){
        const {email, password} = req.body
        try {
            const findUsers = await userModel.findOne({email}, ["email", "password"])
            
            if(!findUsers) return res.status(400).json({message: "Email/Senha inválidos", status: 401})
            const comparePassword = await bcrypt.compare(password, findUsers.password)
            if(!comparePassword) return res.status(400).json({message: "Email/Senha inválidos", status: 401})
            
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

    static async getUserById(req,res,next){
        const id = req.params.id
        try {
            const findUser = await userModel.findById({_id: id})
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
    
    static async updateUser(req,res,next){
        const id = req.params.id
        try {
            await userModel.findByIdAndUpdate({_id: id}, req.body)
            return res.status(200).json({message: "Dados atualizados com sucesso", status: 200})
        } catch (error) {
            next(error)  
        }
    }

    static async removeUser(req,res,next){
        const id = req.params.id
        try {
            await userModel.findByIdAndDelete({_id: id})
            return res.status(200).json({message: "Usuario removido com sucesso", status: 200})
        } catch (error) {
            next(error)   
        }
    }
}

export default UserControllers