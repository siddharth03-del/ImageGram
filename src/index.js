import express from 'express';
import { connectDB } from './Config/dbconfig.js';
import { parser } from './Config/cloudinaryconfig.js';
import { createPost } from './Controllers/postcontroller.js';
import apiRouter from './Routers/apirouter.js' 
import { upload } from './Config/multerconfig.js';
const PORT = 3005;
const app = express();
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({extended: true}));
app.get('/ping', (req, res) => {
    console.log(req.query);
    console.log(req.body);
    return res.json({ message: 'pong' });
});
// app.get('/', (req, res)=>{
//     return res.json({message : 'home'});
// })
app.use('/api' ,apiRouter);
// app.post('/posts', upload.single('image') ,(req, res)=>{
//     console.log(req.file);
//     return res.json({data : "Image uploaded successfully"});
// })
// app.post('/cloudupload', parser.single('image'), createPost);
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
    connectDB();
})