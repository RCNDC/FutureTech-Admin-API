import { Request, Response, Router } from "express";
import AuthAPIKey from "../../middlewares/authAPIKey";
import { AttendeeController } from "../../controllers/attendee.controller";
import { AttendeeDTO } from "../../types/attendee";
import { CheckInDto } from "../../types/order";
import { CheckInController } from "../../controllers/checkin.controller";

const attendeeController = new AttendeeController();
const checkInController = new CheckInController();
const attendeeRoutes = Router();

attendeeRoutes.post('/checkout', AuthAPIKey, (req:Request<AttendeeDTO>, res:Response)=>attendeeController.createAttendee(req, res));
attendeeRoutes.post('/checkin', AuthAPIKey, (req:Request<CheckInDto>, res:Response)=>checkInController.checkIn(req, res));
attendeeRoutes.get('/getAllAttendees', AuthAPIKey, (req: Request, res:Response)=>attendeeController.getAllAttendees(req, res));
export default attendeeRoutes;