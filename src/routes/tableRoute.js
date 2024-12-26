import express from 'express'
import { getTableController, postTableController } from '../controllers/tableController.js';


const router = express.Router()

router.get('/',getTableController)
router.post('/',postTableController)


export default router;