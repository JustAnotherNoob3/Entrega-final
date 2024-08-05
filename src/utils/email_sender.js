import nodemailer from 'nodemailer'
import config from '../config/config.js';
const transport = nodemailer.createTransport({
    service: 'gmail',
    port:587,
    auth:{
        user:config.gmail,
        pass: config.gAccess
    }
});

export default (receiver, subject, content,attachments) => {
    if (attachments == undefined) attachments = []
    return transport.sendMail({
        from:`Coder`, //<${config.gmail}>
        to:receiver,
        subject:subject,
        html:content,
        attachments:attachments
    })
};
