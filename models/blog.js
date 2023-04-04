import mongoose from "mongoose"

const Schema = mongoose.Schema

const BlogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true
    }
})

export default mongoose.model("Blog", BlogSchema)