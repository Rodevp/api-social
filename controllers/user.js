import User from "../models/user.js"

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

    let user = new User({
        name,
        email, 
        password
    }) 

    try {
        await user.save()
    } catch (error) {
        console.log('failed save to user')
    }

    return res.status(201).json({ status: "succes", message: "user created", data: user })

}



export {
    allUsers,
    singup
}