import Post from '../schema/post.js';

export const createPost = async (caption, image, user)=>{
    try{
        const newPost = await Post.create({caption, image, user});
        return newPost;
    }catch(error){
        console.log(error);
    }
}