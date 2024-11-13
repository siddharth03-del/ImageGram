import mongoose from "mongoose";
const commentSchema = new mongoose.Schema({
    text : {
        type : String,
        required : true,
        minLength : 1
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    username : {
        type : String,
        required : true
    },
    content_id : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    type : {
        type : String,
        enum : ["comment", "post"]
    },
    likes : {
        type : Number,
        default : 0
    },
    replies : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "comment"
        }
    ]
},
{
    timestamps : true
})

const comments = mongoose.model("Commments", commentSchema);
export default comments;