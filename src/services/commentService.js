import { createComment, getCommentById } from "../repositories/commentRepository.js"
import { getPostById } from "./postService.js";
export const createCommentService = async(commentObject) => {
    try{
        const id = commentObject.id;
        const text = commentObject.text;
        const type = commentObject.type;
        const content_id = commentObject.content_id;
        if(type == 'post'){
            const post = await getPostById(content_id);
            if(!post){
                throw {
                    status : 404,
                    error : "post not found"
                }
            }
        }
        else{
            const comment = await getCommentByIdService(content_id);
            if(!comment){
                throw{
                    status : 404,
                    error : "comment not found"
                }
            }
        }
        const response = await createComment(id, text, type, content_id);
        return response;
    }catch(error){
        console.log(error);
        throw error;
    }
}
export const getCommentByIdService = async(_id) => {
    try{
        const comment = getCommentById(_id);
        return comment;
    }catch(error){
        console.log(error);
    }
}