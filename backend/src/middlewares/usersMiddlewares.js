import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import userModel from '../models/userSchema.js'

const createToken = async (id, req, res, next) => {
    try {
        // eslint-disable-next-line no-undef
        const token = await jwt.sign({id}, process.env.KEY_TOKEN, {expiresIn: "4h", subject: id.toString()})
        return res.status(200).json({message: token, status: 200})
    } catch (error) {
        next(error)
    }
}

const verifyToken = (req,res,next) => {
    try {
        const token = req.headers.token
        //eslint-disable-next-line no-undef
        const userId = jwt.verify(token, process.env.KEY_TOKEN).id
        next(userId)
    } catch (error) {
        return res.status(401).json({message: "Token invalido", status: 401})
    }
}

const checkId = async (id, req, res, next) => {
    try {
        // eslint-disable-next-line no-undef
        const findEmail = await userModel.findById(id) 
        if(!findEmail) return res.status(401).json({message: "Usuario não existe", status: 401})
        next(id)
    } catch (error) {
        next(error)
    }
}

const encriptedPassword = async (req,res,next) => {
    const {password} = req.body
    try {
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)
        next(hash)
    } catch (error) {
        next(error)
    }
}

export {
    createToken,
    encriptedPassword,
    verifyToken,
    checkId
}