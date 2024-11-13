import { createCommentService , showCommentsService, showRepliesService, showCommentService} from "../services/commentService.js";
export const createComment = async(req, res) => {
    try{
        const user = req.user;
        const details = req.body;
        const id = user._id;
        const text = details.text;
        const type = details.type;
        const content_id = details.content_id;
        const username = user.username;
        console.log(username);
        const response = await createCommentService({id, text, type, content_id, username});
        return res.status(201).json({
            success : true,
            message: 'Comment created successfully',
            data : response
        })
    }catch(error){
        console.log(error, "error from commentController");
        return res.status(500).json({
            success : false,
            message: error,
        })
    }
}

export const showComments = async(req, res)=>{
    try{
        const content_id = req.query.content_id;
        const type = req.query.type;
        const response = await showCommentsService({content_id, type});
        console.log(response);
        return res.status(200).json({
            success : true,
            message: 'Comments fetched successfully',
            data : response
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success : false,
            message : 'Internal Server Error'
        })
    }
}

export const showReplies = async(req, res)=>{
    try{
        const content_id = req.query.content_id;
        console.log(content_id);
        const replies = await showRepliesService(content_id)
        return res.status(200).json({
            success : true,
            message : 'comments replies fetched successfully',
            data : replies
        })
    }catch(error){
        return res.status(500).json({
            success : false,
            message : error.message
        })
    }
}

export const showComment = async(req, res)=>{
    try{
        const comment_id = req.query.comment_id;
        const response = await showCommentService(comment_id);
        return res.status(200).json({
            success : true,
            message : 'Comment fetched successfully',
            data : response
        })
    }catch(error){
        return res.status(500).json({
            success : false,
            message : error.message
        })
    }
}