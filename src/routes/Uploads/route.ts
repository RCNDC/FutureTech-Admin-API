import { Router } from "express";
import { upload } from "../../util/config/multer";
import { fileHandler } from "../../middlewares/fileHandler";

const uploadRouter = Router();

uploadRouter.post('/partners', upload.single('file'), fileHandler);

export default uploadRouter; 