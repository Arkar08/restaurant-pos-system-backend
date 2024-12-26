import express from 'express'
import { imageUploadController } from '../controllers/imageController.js';

const router = express.Router()

router.post('/',imageUploadController)


export default router;