import Blog from "../models/blog.js"
import User from "../models/user.js"

const allBlog = async (req, res, next) => {

    let blogs = undefined

    try {
        blogs = await Blog.find()
    } catch (error) {
        console.log('error found post')
    }

    if ( blogs === undefined || blogs.length === 0 )
        return res.status(404).json({ status: "failed", message: "Blogs not found" })

    return res.status(200).json({ status: "success", message: "Blogs", data: blogs })

}   

const createBlog = async (req, res, next) => {
    
    const {title, description, image, userId} = req.body

    const blog = new Blog({
        title,
        description,
        image,
        userId
    })

    const currentUser = await User.findById(userId)
    console.log('user id', currentUser)

    try {

        await blog.save()

        currentUser.blogs.push(blog)
        await currentUser.save()

    } catch (error) {
        console.log('error for save blog')
    }


    return res.status(201).json({ status: "success", message: "Blog", data: blog })

}

const updateBlog = async (req, res, next) => {
    
    const { title, description } = req.body
    const id = req.params.id

    let blog = undefined

    try {
        blog = await Blog.findOneAndUpdate(id, {
            title, 
            description
        })
    } catch (error) {
        console.log('Blog update error')
    }

    if (!blog)
        return res.status(500).json({ status: "failed", message: "Blog no update"})

    return res.status(200).json({ status: "success", message: "Blog update", data: blog })

}


const getBlog = async (req, res, next) => {
    
    const id = req.params.id
    let blog = undefined

    try {
        blog = await Blog.findById(id)
    } catch (error) {
        console.log('Blog update error')
    }

    if (!blog)
        return res.status(404).json({ status: "failed", message: "Blog not found"})

    return res.status(200).json({ status: "success", message: "Blog", data: blog })

}

const deleteBlog = async (req, res, next) => {
    
    const id = req.params.id
    let blog = undefined

    try {
        
        blog = await Blog.findByIdAndRemove(id).populate("user")
        await blog.user.blogs.pull(blog)
        await blog.user.save()

    } catch (error) {
        console.log('Blog update error')
    }

    if (!blog)
        return res.status(404).json({ status: "failed", message: "Blog not found"})

    return res.status(200).json({ status: "success", message: "Blog delete" })

}

export {
    allBlog,
    createBlog,
    updateBlog,
    getBlog,
    deleteBlog
}