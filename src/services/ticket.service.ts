import type { dashboard_user, ticket_db } from "@prisma/client";
import logger from "../util/logger";
import { db } from "../util/db";
import { v4 as uuidv4 } from "uuid";
import { generateId } from "../util/generateId";
import { TicketDto } from "../types/ticketdto";

export class TicketService {
  async createTicket(ticketDto:TicketDto ):Promise<ticket_db> {
    try {
      const ticket = await db.ticket_db.create({
        data: {
          Id: await generateId(),
          Name: ticketDto.name,
          Description: ticketDto.description,
          Created_By: '',
          Event_End_Date: new Date(ticketDto.eventenddate),
          Event_Start_Date: new Date(ticketDto.eventstartdate),
          Ticket_Type: ticketDto.tickettype,
          Created_Date: new Date(),
          Updated_Date: new Date(),
        },
      });
      return ticket;
    } catch (error) {
      logger.error(`Failed to create ticket: ${error}`);
      throw new Error(`Failed to create ticket: ${error}`);
    }
  }


  async updateTicket(id: string, ticketData: { title?: string; type: string; status?: string }) {
    try {
      const updatedTicket = await db.ticket_db.update({
        where: { id },
        data: {
          ...ticketData,
          updatedAt: new Date(),
        },
      });
      return updatedTicket;
    } catch (error) {
      logger.error('Failed to update ticket: ${error.message}');
      throw new Error('Failed to update ticket: ${error.message}');
    }
  }

  async deleteTicket(id: string) {
    try {
      const deletedTicket = await db.ticket.delete({
        where: { id },
      });

      return { message: 'Ticket deleted successfully' };
    } catch (error) {
      logger.error("Failed to delete ticket: ${error.message}");
      throw new Error('Failed to delete ticket: ${error.message}');
    }
  }
}
