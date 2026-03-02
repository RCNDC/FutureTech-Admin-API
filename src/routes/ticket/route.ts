import { Request, Response, Router } from "express";
import TicketController from "../../controllers/ticket.controller";
import AuthAPIKey from "../../middlewares/authAPIKey";
import { TicketDto } from "../../types/ticketdto";
import AuthGuard from "../../middlewares/authGuard";

const ticketRoutes = Router();
const taskController = new TicketController();
ticketRoutes.post(
  "/create",
  [AuthAPIKey, AuthGuard],
  (req: Request<{}, any, TicketDto, any>, res: Response) =>
    taskController.createTicket(req, res),
);

ticketRoutes.put(
  "/update/:id",
  [AuthAPIKey, AuthGuard],
  (req: Request<{ id: string }, any, TicketDto, any>, res: Response) =>
    taskController.updateTicket(req, res),
);

ticketRoutes.delete(
  "/delete/:id",
   [AuthAPIKey, AuthGuard],
  (req: Request<{ id: string }, any, {}, any>, res: Response) =>
    taskController.deleteTicket(req, res),
);

export default ticketRoutes;
