import mongoose from "mongoose";
const postSchema = new mongoose.Schema({
    caption : {
        type : String,
        required: true,
        minLength: 5
    },
    image: {
        type: String,
        required: true,
    },
    public_id :{
        type: String,
        required: true,
    },
    user: {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    count_likes : {
        type: Number,
        default : 0
    },
    comments : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Comment'
        }
    ]
}, {timestamps: true});
const post = mongoose.model("Post", postSchema); // post collection
export default post;