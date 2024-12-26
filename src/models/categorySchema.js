import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        imageId:{
            type:mongoose.Schema.Types.ObjectId,
            refs:'Image',
            required:true
        }
    },{timestamps:true}
)

const Category = mongoose.model('Category',categorySchema)

export default Category;