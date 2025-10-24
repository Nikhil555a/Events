
import express from "express";
import upload from "../middleware/multer.js";
import { createPublish } from "../controllers/publishController.js";

const publishRouter = express.Router();
publishRouter.post("/", upload.single("banner"), createPublish);

export default publishRouter;

