import Image from '../models/imageSchema.js'

export const imageUploadController = async(req,res)=>{
    if(!req.files.images){
        return res.status(400).json('Please upload a image')
    }
    const files = req.files.images;
    const fileName = new Date().valueOf() + "-" + files.name;
    const uploadPath = "./src/uploads/" + fileName;

    files.mv(uploadPath,async(err)=>{
        if(err){
            return res.status(500).json({message:'Error moving file',error:err})
        }

       req.body["image"] = fileName;
       const data = await Image.create({
        name:fileName
       })
       return res.status(201).json({
        message:"File Upload successfully.",
        files:data
       })
    })
}