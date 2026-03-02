import { Request, Response, Router } from "express";
import { upload } from "../../util/config/multer";
import { fileParser } from "../../middlewares/fileParser";
import { PartnersController } from "../../controllers/partners.controller";

const uploadRouter = Router();
const partnerController = new PartnersController();
uploadRouter.post('/partners', [upload.single('file'), fileParser],(req:Request, res:Response)=>partnerController.uploadPartnersCSV(req, res));
uploadRouter.post('/localcompany', upload.single('file'), )

export default uploadRouter; 