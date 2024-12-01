import comments from "../schema/comment.js";
export const createComment = async(id, text, type, content_id, username) => {
    try{
        const user = id;
        const comment = await comments.create({text , user, content_id, type});
        return comment;
    }catch(error){
        console.log(error);
    }
}

export const getCommentById = async(_id) => {
    try{
        const comment = await comments.findById(_id)
        .populate('user', 'username').
        exec();
        return comment;
    }catch(error){
        console.log(error);
    }
}

export const updateCommentLike = async(comment_id)=>{
    try{
        const comment = await comments.findByIdAndUpdate({_id: comment_id}, {$inc: {likes : 1}}, {new : true});
        return comment;
    }catch(error){
        console.log(error);
    }
}

export const getCommentByContentId = async(content_id)=>{
    try{
        const response = await comments.find({content_id: content_id})
        .populate('user', 'username')
        .exec();
        console.log(response);
        return response;
    }catch(error){
        console.log(error);
    }
}