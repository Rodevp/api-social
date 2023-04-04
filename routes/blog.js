import express from "express"
import { allBlog, createBlog } from "../controllers/blog"

const router = express.Router()

router.get('/', allBlog)
router.post('/', createBlog)

export default router