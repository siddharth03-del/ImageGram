import mongoose from "mongoose";
const feedbackSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.ObjectId,
        required : true
    },
    text : {
        type : String,
        required : true
    }
}, {
    timestamps : true
})
const feedback = mongoose.model("Feedback", feedbackSchema);
export default feedback;