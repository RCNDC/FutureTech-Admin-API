import { Request, Response, Router } from "express";
import TicketController from "../controllers/ticket.controller";
import AuthAPIKey from "../../middlewares/authAPIKey";

const ticketRoutes = Router();
ticketRoutes.post("/tickets", AuthAPIKey, (req: Request, res: Response) =>
  TicketController.handleTicket(req, res),
);

ticketRoutes.put("/tickets/:id", AuthAPIKey, (req: Request, res: Response) =>
  TicketController.handleTicket(req, res),
);

ticketRoutes.delete("/tickets/:id", AuthAPIKey, (req: Request, res: Response) =>
  TicketController.handleTicket(req, res),
);

export default ticketRoutes;
