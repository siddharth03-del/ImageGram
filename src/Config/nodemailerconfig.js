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
            clientId: CLIENTID, //"364691824478-qfas18h28vb75vihuh3mv3u9i6d48qvv.apps.googleusercontent.com",
            clientSecret: CLIENTSECRET,  //"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",
            refreshToken: REFERSHTOKEN,  //"1//04DNCASjW_WuECgYIARAAGAQSNwF-L9Irt_pw1LeJoTDtfzySH1OKBPrGSqQBbvEl13h3aR8LwyDNjjCS2xBhrsLnlZ_aP1tt7dY",
            accessToken : ACCESSTOKEN //"ya29.a0AeDClZD9P-iILlPuPMDKSfaIsrGSzhBNNR2xYo1vNdzZxEMV9RVUa78P8SZAf1ES1qoMd8vF59jklGtmpaNCs5qTzpBAXMZKyBKxadHVugaCSLsSE1pcVXcRmrWoQtSkqbLCizxNeGY0IUVIxZXnSh7QTRNC4pcCi9lks5xLaCgYKAaYSARESFQHGX2Mi5S0DkZZevQ_TBJlQ77_k_g0175"
          }
    }
)
