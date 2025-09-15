import { Request, Response, Router } from "express";
import TicketController from "../../controllers/ticket.controller";
import AuthAPIKey from "../../middlewares/authAPIKey";
import { TicketDto } from "../../types/ticketdto";

const ticketRoutes = Router();

ticketRoutes.post(
  "/create",
  AuthAPIKey,
  (req: Request<{}, any, TicketDto, any>, res: Response) =>
    TicketController.createTicket(req, res),
);

ticketRoutes.put(
  "/tickets/:id",
  AuthAPIKey,
  (req: Request<{ id: string }, any, TicketDto, any>, res: Response) =>
    TicketController.updateTicket(req, res),
);

ticketRoutes.delete(
  "/tickets/:id",
  AuthAPIKey,
  (req: Request<{ id: string }, any, {}, any>, res: Response) =>
    TicketController.deleteTicket(req, res),
);

export default ticketRoutes;
