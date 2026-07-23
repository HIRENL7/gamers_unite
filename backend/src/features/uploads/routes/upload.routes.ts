import { Router } from "express";

import { uploadImage, uploadValidators } from "../controllers/upload.controller.js";
import { uploadService } from "../services/upload.service.js";

const uploadRouter = Router();

uploadRouter.post(
  "/image",
  ...uploadValidators.image,
  uploadService.middleware,
  uploadImage,
);

export { uploadRouter };
