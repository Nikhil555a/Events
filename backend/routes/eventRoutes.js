
import express from "express";
import { createEvent, getEvents, deleteEvent, getEventById, updateEvent } from "../controllers/eventController.js";
import upload from "../middleware/multer.js";

const eventRouter = express.Router();

// eventRouter.post("/", upload.single("image"), createEvent);
eventRouter.post("/", upload.single("image"), createEvent);

eventRouter.get("/", getEvents);
eventRouter.get("/:id", getEventById); // ✅ ADD THIS LINE
eventRouter.delete("/:id", deleteEvent);

eventRouter.put("/:id", updateEvent);


export default eventRouter;

