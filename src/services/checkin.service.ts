import { db } from "../util/db";
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
            db.attendees.update({
            where:{
                id: order.id
            },
            data:{
                status: 'CHECKEDIN'
            }
        });
        return 'success';

        }catch(error){
            logger.error(error)
            return 'error'
        }
        
    }
}