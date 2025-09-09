import { Ticket } from '../FutureTech-Admin-API/services/';


export const createTicket = async (req: Request, res: Response) => {
  try {
    const { id, type, status } = req.body;
    const ticket = new Ticket({id, type, status });
    const savedTicket = await ticket.save();
    res.status(201).json(savedTicket);
  } catch (error) {
    logger.error("Error, something went wrong while creating a ticket", error.message);
  }
};

export const updateTicket = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {type, status } = req.body;
    const updatedTicket = await Ticket.findByIdAndUpdate(id, { type, status }, { new: true, runValidators: true});
    
    if (!updatedTicket) {
      logger.error(' Ticket not found ');
    }
    res.status(200).json(updatedTicket);
  } catch (error) {
    logger.error('Error', error.message);
  }
};


export const deleteTicket = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedTicket = await Ticket.findByIdandDelete(id);
    if (!deletedTicket) {
      return 
    }
  }
}