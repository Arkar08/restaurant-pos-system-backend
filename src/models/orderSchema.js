import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    orderNo:{
        type:String,
        required:true
    },
    tableId:{
        type:mongoose.Schema.Types.ObjectId,
        refs:'Tables',
        required:true
    },
    orderItems:{
        type:[
            {
                productName:{
                    type:String,
                    required:true
                },
                qty:{
                    type:Number,
                    required:true
                }
            }
        ]
    },
    total:{
        type:Number,
        required:true
    },
    paymentType:{
        type:String,
        enum:['Cash','Card','Scan'],
        required:true
    },
    people:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        enum:['Payment','On Dine','Booking'],
        default:"Payment"
    }
},{timestamps:true})


const Order = mongoose.model('Order',orderSchema)

export default Order;