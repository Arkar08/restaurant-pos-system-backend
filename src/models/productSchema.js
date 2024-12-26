import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        productName:{
            type:String,
            required:true
        },
        price:{
            type:Number,
            required:true,
            default:0
        },
        imageId:{
            type:mongoose.Schema.Types.ObjectId,
            refs:'Image',
            required:true
        },
        categoryId:{
            type:mongoose.Schema.Types.ObjectId,
            refs:'Category',
            required:true
        }
    },{timestamps:true}
)

const Products = mongoose.model('Products',productSchema)

export default Products;


