import productModel from "../models/productSchema.js"

export const findProductsFromList = async (idList=[]) => {
    var productList = []
    
    if(idList.length > 0){
        for(let id of idList){
            const products = await productModel.findById({_id: id})
            productList.push(products)
        }
    }
    
    return productList
}