import { createTransport } from "nodemailer";

declare global{
    var mailTransporter: ReturnType<typeof createTransport> | undefined;
}

if(!global.mailTransporter){
    const transporter = createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT ? parseInt(process.env.MAIL_PORT) : 587,
        secure: process.env.NODE_ENV === "production", // true for 465, false for other ports
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASSWORD
        }
    });
    global.mailTransporter = transporter;
}

export const mailTransporter = global.mailTransporter;