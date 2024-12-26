import express from 'express'
import { getProductController, postProductController } from '../controllers/productController.js';

const router = express.Router()

router.get('/',getProductController)
router.post('/',postProductController)


export default router;