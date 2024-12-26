import express from 'express'
import { getCategoryController, postCategoryController } from '../controllers/categoryController.js';


const router = express.Router()

router.get('/',getCategoryController)
router.post('/',postCategoryController)

export default router;