
import Category from '../models/categorySchema.js'

export const getCategoryController = async(req,res,next)=>{
    try {
        const getData = await Category.find()
        const data = {
            isSuccess:true,
            length:getData.length,
            data:getData
        }
        if(!data){
            const error = new Error('Not Found')
            error.status = 404;
            return next(error)
        }
        return res.status(200).json(data)
    } catch (error) {
        return next(error);
    }
}

export const postCategoryController = async(req,res,next)=>{
    try {
        const {name,imageId} = req.body;
        if(!name || !imageId){
            const error = new Error('Plz filled out in the form field.')
            error.status = 400;
            return next(error)
        }
        const getData = await Category.findOne({name:name})
        if(getData){
           const error = new Error('Name is already exist.')
           error.status = 400
           return next(error)
        }
        const getImage = await Category.findOne({imageId:imageId})
        if(getImage){
            const error = new Error('Image is already exits')
            error.status = 400;
            return next(error)
        }
        const postData = await Category.create({
            name:name,
            imageId:imageId
        })
        if(!postData){
            const error = new Error('Not Found')
            error.status = 404;
            return next(error)
        }
        const data = {
            isSuccess:true,
            data:postData
        }
        return res.status(201).json(data)
    } catch (error) {
      return next(error)
    }
}