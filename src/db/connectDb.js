import mongoose from "mongoose";

const connectDb = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
            console.log('connected to db')
    } catch (error) {
        console.log('disconnected to db',error)
    }
}

export default connectDb;