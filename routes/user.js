import express from "express"
import { allUsers, singup } from "../controllers/user.js"

const router = express.Router()

router.get('/', allUsers)
router.post('/singup', singup)


export default router