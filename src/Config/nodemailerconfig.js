import nodemailer from 'nodemailer';
import { ACCESSTOKEN, CLIENTID, CLIENTSECRET, REFERSHTOKEN, USER } from './server_config.js';
export const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure : true,
    auth : {
            type : 'OAuth2',
            user: USER, // Your gmail address.
                                                  // Not @developer.gserviceaccount.com
            clientId: CLIENTID, 
            clientSecret: CLIENTSECRET,  
            refreshToken: REFERSHTOKEN,
            accessToken : ACCESSTOKEN
          }
    }
)
