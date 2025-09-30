import { db } from "../util/config/db";
import logger from "../util/logger";

export class CheckInService{
    constructor(){}

    async checkOrderNo(orderNo:string){
        if(orderNo.length > 5){
            throw new Error('Invalid code');
        }
        try{
            const order = await db.orders.findFirstOrThrow({
                where:{
                    orderNo: orderNo
                }
            });
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

        }catch(error){
            logger.error(error)
            return 'error'
        }
        
    }
}