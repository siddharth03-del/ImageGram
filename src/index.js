import express from 'express';
import { connectDB } from './Config/dbconfig.js';
import { parser } from './Config/cloudinaryconfig.js';
import { createPost } from './Controllers/postcontroller.js';
import apiRouter from './Routers/apirouter.js' 
import { upload } from './Config/multerconfig.js';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { CLIENTID, CLIENTSECRET } from './Config/server_config.js';
import session from 'express-session';
import cors from 'cors';
const PORT = 3005;
const app = express();
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({extended: true}));
app.use(cors());
// app.use(session({ secret: CLIENTSECRET, // Replace with a secret key 
//   resave: false, 
//   saveUninitialized: true, 
//   cookie: { secure: false } // Set to true if using HTTPS
//  }));
// app.use(passport.initialize());
// app.use(passport.session());
// passport.serializeUser((user, done) => {
//     done(null, user);
// });

// passport.deserializeUser((obj, done) => {
//     done(null, obj);
// });

// passport.use(new GoogleStrategy({
//     clientID: CLIENTID,
//     clientSecret: CLIENTSECRET,
//     callbackURL: "/auth/google/callback"
//   },
//   async (accessToken, refreshToken, profile, cb) => {
//     const email = profile.emails[0].value;
//     const username = profile.displayName;
//     console.log(accessToken, profile, refreshToken);
//     // In a real application, you would find or create a user in your database here
//     cb(null, profile);
//   })
// );
// app.get('/auth/google',
//     passport.authenticate('google', { scope: ['profile', 'email'] })
// );
// app.get('/auth/google/callback', 
//     passport.authenticate('google', { failureRedirect: '/signin' }),
//     (req, res) => {
//       // Successful authentication, redirect home
//       res.json({
//         success : true,
//         message : "done",
//       })
// }
//   );
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