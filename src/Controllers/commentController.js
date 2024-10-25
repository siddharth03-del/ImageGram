import { createCommentService } from "../services/commentService.js";
export const createComment = async(req, res) => {
    try{
        const user = req.user;
        const details = req.body;
        const id = user._id;
        const text = details.text;
        const type = details.type;
        const content_id = details.content_id;
        const response = await createCommentService({id, text, type, content_id});
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