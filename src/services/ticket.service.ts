import type { dashboard_user } from "../generated/prisma";
import logger from "..util/logger";
import {db} from "../util/db";
import {v4 as uuidv4} from "uuid";

export class TicketService {
  async createTicket(ticketData: { title: string; type: string; status?: string}) {
    try {
      const ticket = await db.ticket.create({
        data: {
          id: uuidv4(),
          name: ticketData.name,
          description: ticketData.description,
          tickettype: ticketData.tickettype,
          eventstartdate: ticketData.eventstartdate,
          eventenddate: ticketData.eventenddate,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        });
        return ticket;
    } catch (error) {
          logger.error('Failed to create ticket: ${error.message}');
          throw new Error('Failed to create ticket: ${error.message}');
    }
  }

  async updateTicket(id: string, ticketData: { title?: string; type: string; status?: string}) {
    try {
      const updatedTicket = await db.ticket.update({
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

        return {message: 'Ticket deleted successfully' };
    }   catch (error) {
          logger.error("Failed to delete ticket: ${error.message}');
            throw new Error('Failed to delete ticket: ${error.message}');
    }
  }
}
