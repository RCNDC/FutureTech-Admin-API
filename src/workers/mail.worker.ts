import { MailService } from "../services/mail.service";
import { MailOptions } from "../types/mail";
import logger from "../util/logger";

const mailService = new MailService();

/**
 * Sends mail directly without using a queue (Redis removed).
 */
export const addToMailQueue = async (data: MailOptions) => {
    logger.info(`Sending mail to ${data.to} (Synchronous)`);
    try {
        const sent = await mailService.sendMail(
            data.to,
            data.subject,
            data.body,
            data?.html,
            data?.attachments
        );
        logger.info(`Message sent to ${data.to}`);
        return sent;
    } catch (err) {
        logger.error(`Failed to send mail to ${data.to}: ${(err as Error).message}`);
        throw err;
    }
};