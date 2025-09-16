import { AttendeeDTO } from "../types/attendee";
import { db } from "../util/db";
import { generateId } from "../util/generateId";
import logger from "../util/logger";

export class AttendeeService{
    constructor(){}

    async createAttendee(attendeeDto: AttendeeDTO){
        if(!attendeeDto) throw new Error('missing values');
        try{

            const attendee = await db.attendees.findUnique({
                where:{
                    email: attendeeDto.email
                }
            });
            if(attendee){
               return attendee; 
            }
        }catch(error){
            throw error
        }
        try{
            
            const newAttendee = await db.attendees.create({
                data:{
                    id: await generateId(),
                    email: attendeeDto.email,
                    fullname: attendeeDto.fullname,
                    phone: attendeeDto.phone,
                    status: 'PENDING',
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            });
            
            return newAttendee;
        }catch(error){
            logger.error(error);
            throw new Error('something went wrong');
        }        

    }

    async getAllAttendees(){
        return await db.attendees.findMany();
    }
}