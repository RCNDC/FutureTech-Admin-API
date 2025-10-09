import { Router } from "express";
import { upload } from "../../util/config/multer";
import { partnerFileHandler } from "../../middlewares/fileHandler";

const uploadRouter = Router();

uploadRouter.post('/partners', upload.single('file'), partnerFileHandler);

export default uploadRouter; 