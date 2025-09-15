import { Request, Response, Router } from "express";
import AuthAPIKey from "../../middlewares/authAPIKey";
import { AttendeeController } from "../../controllers/attendee.controller";
import { AttendeeDTO } from "../../types/attendee";

const attendeeController = new AttendeeController();

const attendeeRoutes = Router();

attendeeRoutes.post('/checkout', AuthAPIKey, (req:Request<AttendeeDTO>, res:Response)=>attendeeController.createAttendee(req, res));


export default attendeeRoutes;