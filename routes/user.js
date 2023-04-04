import express from "express"
import { allUsers, login, singup } from "../controllers/user.js"

const router = express.Router()

router.get('/', allUsers)
router.post('/singup', singup)
router.post('/login', login)


export default router