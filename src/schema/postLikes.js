import mongoose from "mongoose";
const likeSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    post_id : {
        type: mongoose.Schema.Types.ObjectId,
        required : true
    }
}, {timestamps : true});
const postLike = mongoose.model("postLikes", likeSchema);
export default postLike;