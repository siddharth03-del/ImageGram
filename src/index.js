import express from 'express';
import { connectDB } from './Config/dbconfig.js';
import { upload } from './Config/multerconfig.js';
import { parser } from './Config/cloudinaryconfig.js';
import { createPost } from './Controllers/postcontroller.js';
const PORT = 3005;
const app = express();
app.get('/ping', (req, res) => {
    return res.json({ message: 'pong' });
});
app.get('/', (req, res)=>{
    return res.json({message : 'home'});
})
app.post('/posts', upload.single('image') ,(req, res)=>{
    console.log(req.file);
    return res.json({data : "Image uploaded successfully"});
})
app.post('/cloudupload', parser.single('image'), createPost);
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
    connectDB();
})