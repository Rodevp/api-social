import Blog from "../models/blog"

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


    try {
        blog.save()  
    } catch (error) {
        console.log('error for save blog')
    }


    return res.status(201).json({ status: "success", message: "Blog", data: blog })

}



export {
    allBlog,
    createBlog
}