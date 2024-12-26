import express from 'express'
import dotenv from 'dotenv'
import connectDb from './db/ConnectDb.js';
import categoryRoute from './routes/categoryRoute.js'
import tableRoute from './routes/tableRoute.js'
import { handleError } from './middleware/middleware.js';
import imageRoute from './routes/imageRoute.js'
import path from 'path'
import { fileURLToPath } from 'url';
import fileUpload from 'express-fileupload';
import productRoute from './routes/productRoute.js'
import orderRoute from './routes/orderRoute.js'
dotenv.config();

const app = express()
const PORT = process.env.PORT  || 5000

const __filename = fileURLToPath(import.meta.url)
const __dirname  = path.dirname(__filename)

app.use(express.json())
app.use(fileUpload())


//routes
app.get('/',(req,res)=>{
    return res.status(200).json('Hello World')
})
const uploadsDir  = path.join(__dirname,"uploads")
app.use('/api/v1/category',categoryRoute)
app.use('/api/v1/table',tableRoute)
app.use('/uploads',express.static(uploadsDir))
app.use('/api/v1/upload',imageRoute)
app.use('/api/v1/products',productRoute)
app.use('/api/v1/orders',orderRoute)

//middleware
app.use(handleError)

app.listen(PORT,async()=>{
    console.log(`server is running on ${PORT}`);
    await connectDb();
})


export default app;