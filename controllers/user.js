import User from "../models/user.js"

const allUsers = async (req, res, next) => {

    let users = undefined;

    try {
        users = await User.find()
        console.log('response users', users)
    } catch (err) {
        console.log('error for search users')
    }

    if( users === undefined || users.length === 0 )
        return res.status(404).json({ status: "failed", message: "Not found" }) 

    return res.status(200).json({ status: "succes", message: "All users", data: users })

}



export {
    allUsers
}