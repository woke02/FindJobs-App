import express from 'express'
import { register, login, updateUser } from '../controllers/authController.js'

const router = express.Router()


router.post('/register', register)
router.post('/login', login)
router.patch('/updateUser', updateUser)

export default router