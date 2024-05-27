import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import userModel from '../models/userSchema.js'
import { removeFiles } from './productsMiddlewares.js'
import productModel from '../models/productSchema.js'
import crypto from 'crypto'

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
        if(req.file || req.files){
            const filesNames = []
            for(let file of req.files){
                filesNames.push(file.filename)
            }
            removeFiles(filesNames, "temp")
        }
        return res.status(401).json({message: "Token invalido", status: 401})
    }
}

const verifyIfLogin = (req,res,next) => {
    try {
        const token = req.headers.token
        //eslint-disable-next-line no-undef
        const userId = jwt.verify(token, process.env.KEY_TOKEN).id
        return res.status(200).json({message: "Usuario logado", status: 200})
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

const findCEP = async (adressCode) => {
    try {
        let cep = adressCode

        if(cep.includes("-")){
            cep = cep.replace("-", "")
        }

        const req = await fetch(`http://viacep.com.br/ws/${cep}/json/`)
        const results = await req.json()

        return results
    } catch (error) {
        return false
    }
}

const separateName = (userName) => {
    const name = userName.split(' ')
    let results;
    for(let lastName of name){
        if(lastName !== name[0] && results){
            results = results + " " + lastName
        }
        
        if(lastName !== name[0] && !results){
            results = lastName
        }
    }
    return {name: name[0], lastName: results}
}

const formatPhoneNumber = (phone) => {
    var phoneNumber = phone;

    if(phoneNumber.includes("(")){
        phoneNumber = phoneNumber.replace("(", "")
    }

    if(phoneNumber.includes(")")){
        phoneNumber = phoneNumber.replace(")", "")
    }

    if(phoneNumber.includes("-")){
        phoneNumber = phoneNumber.replace("-", "")
    }

    if(phoneNumber.includes(" ")){
        phoneNumber = phoneNumber.replace(/\s/g, "")
    }

    return phoneNumber
}

const separatePhoneNumber = (phone) => {
    const number = formatPhoneNumber(phone)
    const codeArea = number.slice(0 , 2)
    const numberPhone = number.slice(2) 
    return {codeArea, numberPhone}
}

const findInforamtionProduct = async (products) => {
    let items = []
    var amount = 0;
    if(!products) return false
    for(let product of products){
        
        const findProduct = await productModel.findById({_id: product.id})
        const price = Number(findProduct.price)
        const item = {
            id: findProduct._id,
            title: findProduct.title,
            description: findProduct.describe,
            category_id: findProduct.category,
            quantity: Number(product.quantity),
            unit_price: price
        }
        amount = amount + price
        items.push(item)
    }
    return {product: items, amount}
}


const findAddress = async (cep, streetNumber = null) => {
    const consultAddress = await findCEP(cep)

    const street = consultAddress.logradouro

    const shipments = {
        zip_code: consultAddress.cep,
        state_name: consultAddress.uf,
        city_name: consultAddress.localidade,
        street_name: consultAddress.logradouro,
        street_number: !streetNumber ? null : Number(streetNumber) 
    }

    const adress = {street, shipments}
    return adress
}

const findInforamtionUser = async (userName, phone, street) => {
    const names = separateName(userName)
    const number = separatePhoneNumber(phone)

    const payer = {
        first_name: names.name,
        last_name: names.lastName,
        phone: {
            area_code: number.codeArea,
            number: number.numberPhone
        },
        address: { street_number: street }
    }
    
    return payer
}

const generateHash = (data) => {
    const hash = crypto.createHash('sha256')
    hash.update(data)
    const hashHax = hash.digest('hex')
    return hashHax
}

const bodybuilding = async (userId, req, res, next) => {
    const {products, installments, docType, docNumber, tokenCard} = req.body
    const findUser = await userModel.findById({_id: userId}, ["-password"])

    const items = await findInforamtionProduct(products)
    if(!items) return res.status(400).json({message: "Produtos não encontrados", status: 400})
    
    const address = await findAddress(findUser.CEP, findUser.streetNumber)
    const payer = await findInforamtionUser(findUser.name, findUser.phone, address.street)
    
    const payLoad = findUser._id + products[0].id
    const idPayment = await generateHash(payLoad) 
    
    const body = {
        additional_info: {
            items: items.product,
            payer,
            shipments: { receiver_address: address.shipments}
        },
        application_fee: null,
        binary_mode: true,
        campaign_id: null,
        coupon_amount: null,
        description: 'Payment for product',
        differential_pricing_id: null,
        external_reference: idPayment,
        installments: Number(installments),
        metadata: null,
        payer: {
            entity_type: 'individual',
            email: findUser.email,
            type: "customer",
            identification:{
                type: docType,
                number: docNumber
            }
        },
        payment_method_id: "master",
        statement_descriptor: "LUXCOM COMERCIO DIGITAL",
        token: tokenCard,
        transaction_amount: items.amount
    }

    next(body)
}

const checkFavList = async (userId, req, res, next) => {
    try {
        const {id} = req.params
        const findUser = await userModel.findById({_id: userId})
       
        
        if(!findUser) return res.status(401).json({message: "Usuario não encontrado", status: 401})
        const favList = findUser.favorityProducts
        const isFavProduct = favList.filter(productsId => productsId === id)
        
        if(isFavProduct.length > 0){
            const newList = favList.filter(productsId => productsId !== id)
            await userModel.findByIdAndUpdate(userId, {favorityProducts: newList})
            return res.status(201).json({message: "Item removido", status: 201})
        }else{
            next(userId)
        }
        
    } catch (error) {
        return next(error)
    }
}

export {
    createToken,
    encriptedPassword,
    verifyToken,
    checkId,
    verifyIfLogin,
    findCEP,
    bodybuilding,
    checkFavList
}