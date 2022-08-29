import express from 'express'
const router = express.Router()
import {login,register,updateUser} from '../controller/authController.js'
import authmiddleware from '../middleware/auth.js'

router.route('/login').post(login)
router.route('/register').post(register)
router.route('/updateUser').patch(authmiddleware,updateUser)

export default router