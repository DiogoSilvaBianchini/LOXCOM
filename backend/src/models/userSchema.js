import {Schema, model} from 'mongoose'

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "nome de usuario inválido"]
    },
    email: {
        type: String,
        required: [true, "E-mail inválido"],
        unique: [true, "E-mail já existente"]
    },
    password: {
        type: String,
        required: [true, "Senha inválida"]
    },
    CEP: {
        type: String,
        required: [true, "CEP não reconhecido"]
    },
    office: {
        type: String,
        required: [true, "O nivel de autorização deve ser setado."],
        enum: {
            values: ["DEV", "CLIENT", "MANAGER"],
            message: "Nivel de autorização {VALUE} não é invalido!"
        } 
    },
    products: {
        type: Array,
        default: []
    }
},{timestamps: true})

const userModel = model("Users", userSchema)

export default userModel