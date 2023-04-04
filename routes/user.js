import express from "express"
import { allUsers, getUser, login, singup } from "../controllers/user.js"

const router = express.Router()

router.get('/', allUsers)
router.get('/:id', getUser)
router.post('/singup', singup)
router.post('/login', login)


export default router