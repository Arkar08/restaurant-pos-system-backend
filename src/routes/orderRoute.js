import express from 'express'
import { getOrderController, postOrderRouter } from '../controllers/orderController.js';

const router = express.Router()

router.post('/',postOrderRouter)
router.get('/',getOrderController)

export default router;