import Post from '../schema/post.js';
export const createPost = async (caption, image, public_id ,user)=>{
    try{
        const newPost = await Post.create({caption, image, public_id ,user});
        return newPost;
    }catch(error){
        console.log(error);
    }
}
export const findAllPosts = async (offset, limit, user) =>{
    try{
        const posts = await Post.find({user : user}).sort({createdAt: -1}).skip(offset).limit(limit);
        console.log(posts);
        return posts;
    }catch(error){
        console.log(error);
    }
}
export const countAllPosts = async ()=>{
    try{
        const count = Post.countDocuments();
        return count;
    }catch(error){
        console.log(error);
    }
}

export const findPostById = async (id) =>{
    try{
        const post = await Post.findById(id);
        return post;
    }catch(error){
        console.log(error);
    }
}

export const deletePostById = async(id) =>{
    try{
        const post = await Post.findByIdAndDelete(id);
        return post;
    }catch(error){
        console.log(error);
    }
}

export const updateById = async (id, updateObject) =>{
    try{
        const post = await Post.findByIdAndUpdate(id, updateObject, {new : true});
        return post;
    }catch(error){
        console.log(error);
    }
}

export const updatePostLike = async(post_id)=>{
    try{
        const post = await Post.findByIdAndUpdate({_id : post_id}, {$inc:{count_likes : 1}}, {new : true});
        return post;
    }catch(error){
        console.log(error);
    }
}

export const getPostFromFollowingArray = async(following)=>{
    try{
        const posts = await Post.find({user : {$in : following}});
        return posts;
    }catch(error){
        console.log(error);
    }
}

export const getPostsOtherThanUserId = async(user_id)=>{
    try{
        console.log(user_id);
        const posts = await Post.find({user : {$ne : user_id}});
        return posts;
    }catch(error){
        console.log(error);
    }
}