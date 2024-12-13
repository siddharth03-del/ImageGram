import nodemailer from 'nodemailer';
export const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure : true,
    auth : {
            type : 'OAuth2',
            user: "siddharthsingh9361@gmail.com", // Your gmail address.
                                                  // Not @developer.gserviceaccount.com
            clientId: "364691824478-qfas18h28vb75vihuh3mv3u9i6d48qvv.apps.googleusercontent.com",
            clientSecret: "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",
            refreshToken: "1//042nV-I9MjyNZCgYIARAAGAQSNwF-L9Ir3ukqFvCORx6cDPXdveAP6ZeKk0VBU-PpQ6lJaKYaQtAvZ2D-DPDoYt7qa0Hfgj_ZP6Y",
            accessToken : "ya29.a0AeDClZD9P-iILlPuPMDKSfaIsrGSzhBNNR2xYo1vNdzZxEMV9RVUa78P8SZAf1ES1qoMd8vF59jklGtmpaNCs5qTzpBAXMZKyBKxadHVugaCSLsSE1pcVXcRmrWoQtSkqbLCizxNeGY0IUVIxZXnSh7QTRNC4pcCi9lks5xLaCgYKAaYSARESFQHGX2Mi5S0DkZZevQ_TBJlQ77_k_g0175"
          }
    }
)
