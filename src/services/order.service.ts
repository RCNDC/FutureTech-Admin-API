import { PrismaClientInitializationError, PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { OrderDto } from "../types/order";
import { db } from "../util/config/db";
import { generateId, generateOrder } from "../util/generateId";
import logger from "../util/logger";

export class OrderService {
    constructor() { }

    async createOrder(orderDto: OrderDto) {
        if (!orderDto) {
            throw new Error('order data missing');
        }
        try {
            // const order = await db.orders.findFirst({
            //     where: {
            //         attendeeId: orderDto.attendeeId
            //     }
            // });
            
            // if (order) return order;

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
        } catch (error) {
            logger.error(error);
            if(error instanceof PrismaClientInitializationError || error instanceof PrismaClientKnownRequestError){
                throw new Error('Can not create order');
            }
            if(error instanceof Error){
                
                throw error;
                
            }
            throw new Error(typeof error === 'string' ? error : (error instanceof Error ? error.message : JSON.stringify(error)))
        }
    }
}