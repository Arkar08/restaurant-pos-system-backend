import mongoose from "mongoose";

const tableSchema = new mongoose.Schema({
    tableNo:{
        type:String,
        required:true
    },
    maxPeople:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:['reserved','ondine','avaliable'],
        default:'avaliable'
    }
},{timestamps:true})


const Tables = mongoose.model('Tables',tableSchema)

export default Tables;
