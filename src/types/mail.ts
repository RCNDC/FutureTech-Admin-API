import { Attachment } from "nodemailer/lib/mailer";

export interface MailOptions {
    to: string;
    subject: string;
    body: string;
    html?: any;
    attachments?:Attachment[];
}

