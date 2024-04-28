import {Schema, model} from 'mongoose'

const productSchema = new Schema({
    title: {
        type: String,
        required: [true, "Titulo obrigatorio"]
    },
    price: {
        type: String,
        required: [true, "Preço obrigatorio"]
    },
    describe: {
        type: String
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "Users"
    },
    category: {
        type: String,
        required: [true, "A Categoria é obrigatorio"]
    },
    imgs: {
        type: Array,
        required: [true, "O produto não possue imagens"]
    },
    stock: {
        type: Number,
        default: 0
    }
},{timestamps: true})

const productModel = model("products", productSchema)

export default productModel