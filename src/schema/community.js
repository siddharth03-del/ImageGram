import mongoose, { Mongoose } from "mongoose";
const communitySchema = new mongoose.Schema({
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'user',
        required : true
    },
    followers : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'followers'
        }
    ],
    following : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'following'
        }
    ]
})
const community = mongoose.model('community', communitySchema);
export default community;