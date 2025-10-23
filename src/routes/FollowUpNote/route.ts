import { Request, Response, Router } from "express";
import { FollowNoteController } from "../../controllers/follownote.controller";
import AuthAPIKey from "../../middlewares/authAPIKey";
import AuthGuard from "../../middlewares/authGuard";
import { FollowUpNoteParam } from "../../types/followup";

const followupNoteRoute = Router();
const followUpNoteController = new FollowNoteController();

followupNoteRoute.post('/followupnote/create',[AuthAPIKey, AuthGuard], (req:Request, res:Response)=>followUpNoteController.createNote(req, res));
followupNoteRoute.delete('/followupnote/delete/:followUpNoteId',[AuthAPIKey, AuthGuard], (req:Request<FollowUpNoteParam>, res:Response)=>followUpNoteController.deleteNote(req, res));
followupNoteRoute.post('/followupnote/update/:id',[AuthAPIKey, AuthGuard], (req:Request, res:Response)=>followUpNoteController.updateNote(req, res));
followupNoteRoute.get('/followupnote/:followUpId', [AuthAPIKey, AuthGuard], (req:Request, res:Response)=>followUpNoteController.getNotes(req, res));


export default followupNoteRoute;