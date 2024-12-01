import { createComment, getCommentById , getCommentByContentId} from "../repositories/commentRepository.js"
import { getPostById } from "./postService.js";
export const createCommentService = async(commentObject) => {
    try{
        const id = commentObject.id;
        const text = commentObject.text;
        const type = commentObject.type;
        const content_id = commentObject.content_id;
        const parent = await fetchParentElement(type, content_id);
        if(!parent){
            throw{
                status : 404,
                message : `${type} not found`
            }
        }
        console.log(parent, "parent");
        const child = await createComment(id, text, type, content_id);
        const response = addChildCommentToParent(parent, child, type);
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

const fetchParentElement = async(type, content_id) => {
    try{
        let parent;
        if(type == 'post'){
            parent = await getPostById(content_id);
        }else{
            parent = await getCommentById(content_id);
        }
        return parent;
    }catch(error){
        console.log(error);
    }
}

const addChildCommentToParent = async(parent, child, type)=>{
    try{
        console.log(parent, "addchildcommenttoparent");
        console.log(child, "addchildcommenttoparent");
        if(type == 'post'){
            parent.comments.push(child._id);
        }
        else if(type == 'comment'){
            parent.replies.push(child._id);
        }
        await parent.save();
        return parent;
    }catch(error){
        console.log(error);
    }
}

export const showCommentsService = async(details)=>{
    try{
        const content_id = details.content_id;
        const type = details.type;
        const parent = fetchParentElement(type, content_id);
        if(!parent){
            throw{
                status: 404,
                message: `${type} not found`,
            }
        }
        const response = await getCommentByContentId(content_id);
        return response;
    }catch(error){
        console.log(error);
    }
}

export const showRepliesService = async(content_id)=>{
    try{
        const comment = await getCommentByIdService(content_id);
        if(!comment){
            throw{
                status: 404,
                message : "Comment Not found"
            }
        }
        const replyarray = comment.replies;
        console.log(replyarray);
        const response = [];
        for(let i = 0; i < replyarray.length; i++){
            const temp = await getCommentByIdService(replyarray[i]);
            response.push(temp);
        }
        return response;
    }catch(error){
        console.log(error);
        throw{
            status : 500,
            message : "database error"
        }
    }
}

export const showCommentService = async(content_id)=>{
    try{
        const response = await getCommentByIdService(content_id);
        if(!response){
            throw{
                status : 404,
                message : "Comment Not found"
            }
        }
        return response;
    }catch(error){
        console.log(error);
        throw{
            status : 500,
            message : "internal server error"
        }
    }
}
