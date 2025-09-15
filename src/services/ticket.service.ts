import type { dashboard_user, ticket_db } from "@prisma/client";
import logger from "../util/logger";
import { db } from "../util/db";
import { v4 as uuidv4 } from "uuid";
import { generateId } from "../util/generateId";
import { TicketDto } from "../types/ticketdto";

export class TicketService {
  async createTicket(ticketDto: TicketDto): Promise<ticket_db> {
    try {
      const ticket = await db.ticket_db.create({
        data: {
          Id: await generateId(),
          Name: ticketDto.name,
          Description: ticketDto.description,
          createdBy: "",
          eventEnddate: new Date(ticketDto.eventenddate),
          eventStartdate: new Date(ticketDto.eventstartdate),
          ticketType: ticketDto.tickettype,
          createdDate: new Date(),
          updatedDate: new Date(),
        },
      });
      return ticket;
    } catch (error) {
      logger.error(`Failed to create ticket: ${error}`);
      throw new Error(`Failed to create ticket: ${error}`);
    }
  }

  async updateTicket(id: string, ticketDto: TicketDto): Promise<ticket_db> {
    try {
      const Updatedticket = await db.ticket_db.update({
        where: { Id: id },
        data: {
          Name: ticketDto.name,
          Description: ticketDto.description,
          eventEnddate: ticketDto.eventenddate
            ? new Date(ticketDto.eventenddate)
            : undefined,
          eventStartdate: ticketDto.eventstartdate
            ? new Date(ticketDto.eventstartdate)
            : undefined,
          updatedDate: new Date(),
        },
      });
      return Updatedticket;
    } catch (error) {
      logger.error(`Failed to update ticket: ${error}`);
      throw new Error(`Failed to update ticket: ${error}`);
    }
  }

  async deleteTicket(id: string): Promise<void> {
    try {
      await db.ticket_db.delete({
        where: { Id: id },
      });
    } catch (error) {
      logger.error(`Failed to delete ticket: ${error}`);
      throw new Error(`Failed to delete ticket: ${error}`);
    }
  }
}
