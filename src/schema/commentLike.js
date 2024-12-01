import mongoose, { model } from "mongoose";
const likeSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "user"
    },
    comment_id : {
        type: mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "Comments"
    }
}, {timestamps: true});
const commentLike = mongoose.model("commentLikes", likeSchema);
export default commentLike;