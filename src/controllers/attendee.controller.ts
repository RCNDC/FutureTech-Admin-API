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
import { PrismaClientInitializationError } from "@prisma/client/runtime/library";
import { addToMailQueue } from "../workers/mail.worker";
export class AttendeeController {
    private attendeeService;
    private orderService;
    private mailService;
    constructor() {
        this.attendeeService = new AttendeeService();
        this.orderService = new OrderService();
        this.mailService = new MailService();
    }

    async createAttendee(req: Request, res: Response) {
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
                try {

                const newOrder = await this.orderService.createOrder(order);
                if (newOrder) {
                    
                        const test = await QRCode.toFile(newOrder.orderNo + '.png', newOrder.orderNo);
                        await this.mailService.sendMail(newAttendee.email, 'Event Invitation', '', Invitation(newAttendee.fullname, newAttendee.email, newAttendee.phone, 'qrcode.png'), [{ filename: 'qrcode.png', cid: 'qrcode.png', path: newOrder.orderNo + '.png' }]);
                        fs.rm(newOrder.orderNo + '.png', { maxRetries: 3 });
                        res.status(200).json({ data: newOrder, message: 'Order created Successfully' });
                        return;

                        
                    }
                    } catch (error) {
                        logger.error(error + 'm');
                        // logger.error(error + ' new order failed');
                        res.status(500).json({message: error+' '});
                        return;
                    }

            }
            res.status(500).json({ message: 'something went wrong' })

        } catch (error) {
            logger.error(error);
            res.status(400).json({ message: 'unable to create order' });
        }

    }

    async createBulkAttendees(req: Request<{}, any, {attendees: AttendeeDTO[]}>, res: Response){
        const attendees = req.body.attendees;
        try{
            if(!attendees || !Array.isArray(attendees)){
                logger.error('malformed data or missing values')
                res.status(400).json({message: 'malformed data or missing values'});
                return;
            }
            const newAttendees = [];
            for(const attendee of attendees){
                try{
                    const newAttendee = await this.attendeeService.createAttendee(attendee);
                    if(newAttendee){
                         const order: OrderDto = {
                            attendeeId: newAttendee.id,
                            ticket: attendee.ticket || "Event",
                        }
                        
                        const newOrder = await this.orderService.createOrder(order);
                        await QRCode.toFile(newOrder.orderNo + '.png', newOrder.orderNo);
                        addToMailQueue({to:newAttendee.email, subject:'Event Invitation', body:'', html:Invitation(newAttendee.fullname, newAttendee.email, newAttendee.phone, 'qrcode.png'), attachments:[{ filename: 'qrcode.png', cid: 'qrcode.png', path: newOrder.orderNo + '.png' }]});
                        res.status(200).json({ data: newOrder, message: 'Order created Successfully' });
                        newAttendees.push(newAttendee);
                    }
                }catch(error){
                    logger.error(error);
                }
            }
            res.status(200).json({data: newAttendees, message: 'Attendees created Successfully'});
        }catch(error){
            logger.error(error);
            res.status(500).json({message: 'unable to create attendees'});
        }
    }

    async getAllAttendees(req:Request, res:Response){
        const {query} = req.query;
    
        const attendees = await this.attendeeService.getAllAttendees(query);
        
        res.status(200).json({message: 'fetched successful', data:attendees});

    }
    async getCheckInList(req:Request, res: Response){
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;

    }
}