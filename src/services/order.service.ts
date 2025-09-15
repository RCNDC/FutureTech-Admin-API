import { OrderDto } from "../types/order";
import { db } from "../util/db";
import { generateId, generateOrder } from "../util/generateId";
import logger from "../util/logger";

export class OrderService{
    constructor(){}

    async createOrder(orderDto: OrderDto){
        if(!orderDto){
            throw new Error('order data missing');
        }
        try{
            const newOrder = await db.orders.create({
                data: {
                    id: await generateId(),
                    attendeeId: orderDto.attendeeId,
                    status: 'COMPLETED',
                    orderNo: await generateOrder(),
                    ticket: orderDto.ticket,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                }
            });
            
            return newOrder;
        }catch(error){
            logger.error(error);
            throw new Error('Can not create order');
        }
    }
}