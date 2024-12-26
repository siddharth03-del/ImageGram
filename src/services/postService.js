import { countAllPosts, createPost, deletePostById, updateById , findAllPosts, findPostById, getPublicIdsByUserId} from "../repositories/postRepository.js";
import { v2 as cloudinary } from 'cloudinary';
import { CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } from "../Config/server_config.js";
import { updateProfilePostsAdd, updateProfilePostsDelete } from "../repositories/profileRepository.js";
cloudinary.config({
    cloud_name : CLOUD_NAME,
    api_key : CLOUDINARY_API_KEY,
    api_secret : CLOUDINARY_API_SECRET,
    secure : true
});

export const createPostService = async (createPostObject) =>{
    try{
        const caption = createPostObject.caption?.trim();
        const image = createPostObject.image;
        const public_id = createPostObject.public_id;
        const user = createPostObject.user;
        const post = await createPost(caption, image, public_id, user);
        await updateProfilePostsAdd(user);
        return post;
    }catch(error){
        console.log(error);
        throw error;
    }
}

export const getAllPostService = async (offset, limit, user) =>{
    const posts = await findAllPosts(offset, limit, user);
    const totalDocuments = await countAllPosts();
    const totalpages = Math.ceil(totalDocuments/limit);
    return {
        posts, totalDocuments, totalpages
    }
}

export const deletePostService = async (id) =>{
    const post = await deletePostById(id);
    await updateProfilePostsDelete(post.user);
    return post;
}

export const updatePostService = async (id, updateObject) =>{
    const post = await updateById(id, updateObject);
    return post;
}

export const deletePostCloudService = async(public_id) =>{
    try{
        await cloudinary.uploader.destroy(public_id, (result)=>{console.log(result)});
        return {response : "ok"};
    }catch(error){
        return {response : "error"};
    }
}

export const getPostById = async (id)=>{
    try{
        const post = await findPostById(id);
        return post;
    }catch(error){
        console.log(error);
    }
}

export const deletePostOfUserFromCloud = async(userId)=>{
    try{
        const response = await getPublicIdsByUserId(userId);
        const publicIds = new Array();
        response.forEach((item) => {
            publicIds.push(item.public_id);
        })
        if(publicIds.length > 0){
            await cloudinary.api.delete_resources(publicIds).then((result)=>{console.log(result)});
        }
        return;
    }catch(error){
        console.log(error);
        throw error;
    }
}
