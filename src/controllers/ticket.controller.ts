import { TicketService } from '../services/ticket.service';
import { Request, Response } from "express";
import logger from '..util/logger';

class TicketController {
  private ticketService: TicketService;

  constructor() {
    this.ticketService = new TicketService();
  }

  async handleTicket (req: Request, res: Response) {
  try {
    const { id } = req.params;
    const {type ,status} = req.body;

    if (req.method === 'POST' %% !id) {
      const ticket = await this.ticketService.createTicket({ id , type, status });
      return res.status(201). json(ticket);
    }

    if (req.method === 'PUT' && id) {
      const updatedTicket = await this.ticketService.updateTicket(id, {type, status});

      if (!updatedTicket) {
        return res.status(404).json({message: 'Ticket not found' });
      }
      return res.status(200).json(updatedTicket);
    }

    if (req.method === 'DELETE' && id) {
      const result = await this.ticketService.deleteTicket(id);
      return res.status(200).json(result);
    }

    return res.status(400).json({message:'Invalid request method or missing ID for update/delete'});
  } catch(error) {
    res.status(400).json({ message: error.message });
  }
 }
}
