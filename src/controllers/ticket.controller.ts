import { TicketService } from '../services/ticket.service';
import { Request, Response } from "express";
import logger from '../util/logger';
import { TicketDto } from '../types/ticketdto';

class TicketController {
  private ticketService: TicketService;

  constructor() {
    this.ticketService = new TicketService();
  }

  async createTicket (req: Request<TicketDto>, res: Response) {
  try {
    const ticketDto:TicketDto = req.body;
    if(!ticketDto){
      res.status(400).json({ message: 'Malformed Data' });
      return;  
    }
      const ticket = await this.ticketService.createTicket(ticketDto);
      return res.status(201). json(ticket);
  } catch(error) {
      res.status(400).json({ message: error });
  }
 }
}
