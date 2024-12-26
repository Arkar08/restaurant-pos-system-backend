
import Tables from '../models/tableSchema.js'


export const getTableController = async(req,res,next)=>{
    try {
        const getData = await Tables.find({})
        const data = {
            isSuccess:true,
            length:getData.length,
            data:getData,
        }
        if(!data){
            const error = new Error('Not Found')
            error.status = 404;
            return next(error)
        }
        return res.status(200).json(data)
    } catch (error) {
        return next(error)
    }
}

export const postTableController = async(req,res,next)=>{
    try {
        const {tableNo,maxPeople} = req.body;
        if(!tableNo || !maxPeople){
            const error = new Error('Plz filled out in the form field.')
            error.status = 400;
            return next(error)
        }
        const getTable = await Tables.findOne({tableNo:tableNo})
        if(getTable){
            const error = new Error('Table No is already exist.')
            error.status = 400;
            return next(error)
        }
        const postData = await Tables.create({
            tableNo:tableNo,
            maxPeople:maxPeople
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