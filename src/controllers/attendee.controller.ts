import { Request, Response } from "express";
import { AttendeeDTO } from "../types/attendee";
import logger from "../util/logger";
import { AttendeeService } from "../services/attendee.service";
import { OrderService } from "../services/order.service";
import { OrderDto } from "../types/order";
import * as QRCode from "qrcode";
import { MailService } from "../services/mail.service";
import { Invitation } from "../mail/templates/invitation";
import fs from 'fs/promises';
export class AttendeeController {
    private attendeeService;
    private orderService;
    private mailService;
    constructor() {
        this.attendeeService = new AttendeeService();
        this.orderService = new OrderService();
        this.mailService = new MailService();
    }

    async createAttendee(req: Request<AttendeeDTO>, res: Response) {
        const attendee = req.body;
        try {
            if (!attendee) {
                logger.error('missing value')
                res.status(400).json({ message: 'missing values' });
                return;
            }
            const newAttendee = await this.attendeeService.createAttendee(attendee);
            if (newAttendee) {
                const order: OrderDto = {
                    attendeeId: newAttendee.id,
                    ticket: "Event",
                }
                const newOrder = await this.orderService.createOrder(order);
                if (newOrder) {
                    try {

                        const test = await QRCode.toFile(newOrder.orderNo + '.png', newOrder.orderNo);
                        console.log(test)
                        const mailStatus = await this.mailService.sendMail(newAttendee.email, 'Event Invitation', '', Invitation(newAttendee.fullname, newAttendee.email, newAttendee.phone, 'qrcode.png'), [{ filename: 'qrcode.png', cid: 'qrcode.png', path: newOrder.orderNo + '.png' }]);
                        fs.rm(newOrder.orderNo + '.png', { maxRetries: 3 });
                        res.status(200).json({ data: newOrder, message: 'Order created Successfully' });
                        return;


                    } catch (error) {
                        logger.error(error + ' new order failed');
                    }
                }

            }
            res.status(500).json({ message: 'something went wrong' })

        } catch (error) {
            logger.error(error);
            res.status(400).json({ message: 'unable to create order' });
        }

    }
}