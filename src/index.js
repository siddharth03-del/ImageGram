import express from 'express';
import { connectDB } from './Config/dbconfig.js';
const PORT = 3000;
const app = express();
app.get('/ping', (req, res) => {
    return res.json({ message: 'pong' });
});
app.get('/', (req, res)=>{
    return res.json({message : 'home'});
})
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
    connectDB();
})