import Tables from "../models/tableSchema.js";
import Order from "../models/orderSchema.js";

export const postOrderRouter = async(req,res,next)=>{
    try {
        const {tableId,orderItems,total,paymentType,people} = req.body;
        if(!tableId || !orderItems || !total || !paymentType || !people){
            const error = new Error('Plz filled out in the form field.')
            error.status = 400;
            return next(error)
        }
        const getTable  = await Tables.findById({_id:tableId})
        if(!getTable){
            const error = new Error('Table does not exist.')
            error.status = 404;
            return next(error)
        }
        const lastOrder = await Order.find()
        const orderId = Number(lastOrder[lastOrder.length - 1].orderNo.slice(5)) ? Number(lastOrder[lastOrder.length - 1].orderNo.slice(5)) + 1 : 1;
        const voucherId = (number) => {
            let string = '';
            let modifyNumber = 4 - number
            for(let i = 0; i< modifyNumber ; i++){
                string = string + '0'
            }
            return string;
        }
        const orderNo = `Order${voucherId(orderId.toString().length)+orderId.toString()}` ;
        const postOrder = await Order.create({
            orderNo:orderNo,
            orderItems:orderItems,
            tableId:getTable._id,
            total:total,
            paymentType:paymentType,
            people:people
        })
        const data = {
            isSuccess:true,
            data:postOrder
        }
        return res.status(201).json(data)
    } catch (error) {
        return next(error);
    }
}

export const getOrderController =  async(req,res,next)=>{
    try {
        const getOrder = await Order.find({})
        const tableMap = getOrder.map((order)=>order.tableId)
        const findTable = await Tables.find({_id:tableMap})

        const tableName = {}
        findTable.forEach((table)=>{
            tableName[table._id] = table.tableNo
        })
        const getOrderData = getOrder.map((order)=>{
            const tableFullName = tableName[order.tableId] || ''
            return {...order.toObject(),tableId:tableFullName}
        })
        const data = {
            isSuccess:true,
            length:getOrderData.length,
            data:getOrderData
        }
        return res.status(200).json(data)
    } catch (error) {
        return next(error)
    }
}