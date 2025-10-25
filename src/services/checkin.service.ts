import defaultTemplate from "../mail/templates/defaulttemplate";
import WelcomeTemplate from "../mail/templates/welcometemplate";
import { db } from "../util/config/db";
import logger from "../util/logger";
import { addToMailQueue } from "../workers/mail.worker";

export class CheckInService{
    constructor(){}

    async checkOrderNo(orderNo:string){
        if(orderNo.length > 5){
            throw new Error('Invalid code');
        }
            const order = await db.orders.findFirst({
                where:{
                    orderNo: orderNo
                },
            });

            if(!order) 
                throw new Error('ticket not found');
            
            const attendee = await db.attendees.findUnique({
                where:{
                    id: order.attendeeId
                }
            });
            if(attendee && attendee.status !== 'CHECKEDIN'){
                addToMailQueue({to: attendee.email, subject: 'Welcome to Future Tech Addis Expo', body:'', html: defaultTemplate('','', WelcomeTemplate({ticket: order.ticket, days: '3 days', eventName:'Future Tech Addis Expo', location:'Addis Ababa Convention Center', time:new Date().toLocaleTimeString()}))});
            }

            await db.checkinTracker.create({
                data:{
                    attendeeId: order.attendeeId,
                    checkedTime: new Date()
                }
            })

            await db.attendees.update({
            where:{
                id: order.attendeeId
            },
            data:{
                status: 'CHECKEDIN',
                updatedAt: new Date()
            }
            });
           
        return 'success';

        
        
    }
}