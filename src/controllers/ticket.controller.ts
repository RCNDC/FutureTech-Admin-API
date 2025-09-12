import { TicketService } from "../services/ticket.service";
import { Request, Response } from "express";
import logger from "../util/logger";
import { TicketDto } from "../types/ticketdto";

class TicketController {
  private ticketService: TicketService;

  constructor() {
    this.ticketService = new TicketService();
  }

  async createTicket(req: Request<TicketDto>, res: Response) {
    try {
      const ticketDto: TicketDto = req.body;
      if (!ticketDto) {
        res.status(400).json({ message: "Malformed Data" });
        return;
      }
      const ticket = await this.ticketService.createTicket(ticketDto);
      return res.status(201).json(ticket);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }

  async updateTicket(
    req: Request<{ id: string; TicketDto: TicketDto }>,
    res: Response,
  ) {
    try {
      const { id } = req.params;
      const ticketDto: TicketDto = req.body;
      if (!ticketDto || !id) {
        res.status(400).json({ message: "Malformed Data or Missing ID" });
        return;
      }
      const updatedTicket = await this.ticketService.updateTicket(
        id,
        ticketDto,
      );
      if (!updatedTicket) {
        return res.status(404).json({ message: "Ticket not found" });
      }
      return res.status(200).json(updatedTicket);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }

  async deleteTicket(req: Request<{ id: string }>, res: Response) {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({ message: "Missing ID" });
        return;
      }
      await this.ticketService.deleteTicket(id);
      return res.status(200).json({ message: "Ticket deleted successfully" });
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }
}

export default new TicketController();
