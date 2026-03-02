import { Request, Response, Router } from "express";
import { SubmissionsController } from "../../controllers/submissions.controller";
import AuthAPIKey from "../../middlewares/authAPIKey";
import AuthGuard from "../../middlewares/authGuard";

const submissionRoute = Router();
const submissionController = new SubmissionsController();

submissionRoute.get('/submission/ngo', [AuthAPIKey, AuthGuard], (req: Request, res: Response) => submissionController.getNGOSubmissions(req, res))
submissionRoute.get('/submission/ngo/:id', [AuthAPIKey, AuthGuard], (req: Request, res: Response) => submissionController.getNGOSubmissionById(req, res));
submissionRoute.get('/submission/localcompany', [AuthAPIKey, AuthGuard], (req: Request, res: Response) => submissionController.getLocalCompanySubmissions(req, res))
submissionRoute.get('/submission/localcompany/:id', [AuthAPIKey, AuthGuard], (req: Request, res: Response) => submissionController.getLocalCompanySubmissionById(req, res));
submissionRoute.get('/submission/embassy', [AuthAPIKey, AuthGuard], (req: Request, res: Response) => submissionController.getEmbassySubmissions(req, res))
submissionRoute.get('/submission/embassy/:id', [AuthAPIKey, AuthGuard], (req: Request, res: Response) => submissionController.getEmbassySubmissionsById(req, res))
submissionRoute.get('/submission/internationalcompany', [AuthAPIKey, AuthGuard], (req: Request, res: Response) => submissionController.getInternationalCompanySubmissions(req, res))
submissionRoute.get('/submission/internationalcompany/:id', [AuthAPIKey, AuthGuard], (req: Request, res: Response) => submissionController.getInternationalCompanySubmissionById(req, res))
submissionRoute.get('/submission/startup', [AuthAPIKey, AuthGuard], (req: Request, res: Response) => submissionController.getStartupSubmissions(req, res))
submissionRoute.get('/submission/startup/:id', [AuthAPIKey, AuthGuard], (req: Request, res: Response) => submissionController.getStartupSubmissionsById(req, res))
submissionRoute.get('/submission/event', [AuthAPIKey, AuthGuard], (req: Request, res: Response) => submissionController.getEventSubmissions(req, res))
submissionRoute.get('/submission/conference', [AuthAPIKey, AuthGuard], (req: Request, res: Response) => submissionController.getConferenceSubmissions(req, res))

submissionRoute.delete('/submission/ngo/:id', [AuthAPIKey, AuthGuard], (req: Request, res: Response) => submissionController.deleteNGOSubmission(req, res));
submissionRoute.delete('/submission/localcompany/:id', [AuthAPIKey, AuthGuard], (req: Request, res: Response) => submissionController.deleteLocalCompanySubmission(req, res));
submissionRoute.delete('/submission/embassy/:id', [AuthAPIKey, AuthGuard], (req: Request, res: Response) => submissionController.deleteEmbassySubmission(req, res));
submissionRoute.delete('/submission/internationalcompany/:id', [AuthAPIKey, AuthGuard], (req: Request, res: Response) => submissionController.deleteInternationalCompanySubmission(req, res));
submissionRoute.delete('/submission/startup/:id', [AuthAPIKey, AuthGuard], (req: Request, res: Response) => submissionController.deleteStartupSubmission(req, res));
submissionRoute.delete('/submission/event/:id', [AuthAPIKey, AuthGuard], (req: Request, res: Response) => submissionController.deleteEventSubmission(req, res));
submissionRoute.delete('/submission/conference/:id', [AuthAPIKey, AuthGuard], (req: Request, res: Response) => submissionController.deleteConferenceSubmission(req, res));


submissionRoute.get('/submission/stat', [AuthAPIKey, AuthGuard], (req: Request, res: Response) => submissionController.getSubmissionStat(req, res));
submissionRoute.get('/submission/chart', [AuthAPIKey, AuthGuard], (req: Request, res: Response) => submissionController.getSubmissionChart(req, res));



export default submissionRoute;
