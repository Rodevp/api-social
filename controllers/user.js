import User from "../models/user.js"
import bcrypjs from "bcryptjs"

const allUsers = async (req, res, next) => {

    let users = undefined;

    try {
        users = await User.find()
        console.log('response users', users)
    } catch (err) {
        console.log('error for search users')
    }

    if (users === undefined || users.length === 0)
        return res.status(404).json({ status: "failed", message: "Not found" })

    return res.status(200).json({ status: "succes", message: "All users", data: users })

}

const singup = async (req, res, next) => {
    const { name, email, password } = req.body

    let userExist = undefined

    try {
        userExist = await User.findOne({ email })
        console.log('user exist', userExist)
    } catch (error) {
        console.log('error in found exist user')
    }

    if ( userExist ) return res.status(401).json({ status: "failed", message: "User Al ready exist" })

    const hashedPassword = await bcrypjs.hash(password, 8)

    const user = new User({
        name,
        email, 
        password: hashedPassword
    }) 

    try {
        await user.save()
    } catch (error) {
        console.log('failed save to user')
    }

    return res.status(201).json({ status: "succes", message: "user created", data: user })

}


const login = async (req, res, next) => {

    const {email, password} = req.body

    let user = undefined

    try {
        user = await User.findOne({ email })
    } catch (error) {
        console.log('error in found exist user')
    }

    if (!user) 
        return res.status(404).json({ status: "failed", message: "user not found" })

    
    const comparePassword = await bcrypjs.compare(password, user.password)

    if(!comparePassword)
        return res.status(400).json({ status: "failed", message: "email or password is incorret" })

    
    return res.status(200).json({ status: "succes", message: "user", data: user })

}



export {
    allUsers,
    singup,
    login
}