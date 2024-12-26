import Products from '../models/productSchema.js'
import Image from '../models/imageSchema.js';
import Category from '../models/categorySchema.js';

export const postProductController = async(req,res,next)=>{
    try {
        const {productName,price,imageId,categoryId} = req.body;
        if(!productName || !price || !imageId || !categoryId){
            const error = new Error('Plz filled out in the form field.')
            error.status = 400;
            return next(error)
        }
        const findImage = await Image.find({_id:imageId})
        if(!findImage){
            const error = new Error('image does not exist');
            error.status = 404;
            return next(error)
        }
        const findCategory = await Category.find({_id:categoryId})
        if(!findCategory){
            const error = new Error('Category does not extis')
            error.status = 404;
            return next(error)
        }
        const postData = await Products.create({
            productName:productName,
            price:price,
            imageId:findImage._id,
            categoryId:findCategory._id
        })
        const data = {
            isSuccess:true,
            data:postData
        }
        if(!data){
            const error = new Error('Not Found.')
            error.status  = 404;
            return next(error)
        }
        return res.status(201).json(data)
    } catch (error) {
        return next(error)
    }
}


export const getProductController = async(req,res,next)=>{
    try {
        const getProduct = await Products.find({})
        const productMap = getProduct.map((product)=>product.imageId)
        const getImage = await Image.find({_id:productMap})
        const categoryMap = getProduct.map((product)=>product.categoryId)
        const getCategory = await Category.find({_id:categoryMap})

        const getCategoryName = {}
        getCategory.forEach((category)=>{
            getCategoryName[category._id] = category.name;
        })

        const getImageName ={}
        getImage.forEach((image)=>{
            getImageName[image._id] = image.name;
        })

        const data = getProduct.map((product)=>{
            const getImageFullName = getImageName[product.imageId] || '';
            const getCategoryFullName = getCategoryName[product.categoryId] || ""
            return {...product.toObject(),imageId:getImageFullName,categoryId:getCategoryFullName}
        })

        const getData = {
            isSuccess:true,
            length:data.length,
            data:data
        }
        return res.status(200).json(getData)
    } catch (error) {
        console.log(error)
        return next(error)
    }
}