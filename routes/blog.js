import express from "express"
import { allBlog, createBlog, deleteBlog, getBlog, updateBlog } from "../controllers/blog.js"

const router = express.Router()

router.get('/', allBlog)
router.get('/:id', getBlog)
router.post('/', createBlog)
router.put('/:id', updateBlog)
router.delete('/:id', deleteBlog)
    

export default router