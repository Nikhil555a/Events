
import express from "express";
import { addTickets, getTicketsByEvent, deleteTicket  } from "../controllers/ticketController.js";

const ticketRouter = express.Router();

// POST - Add tickets for a specific event
ticketRouter.post("/events/:id/tickets", addTickets);

// GET - Get all tickets of an event
ticketRouter.get("/events/:id/tickets", getTicketsByEvent);

// DELETE - Delete a specific ticket
ticketRouter.delete("/tickets/:ticketId", deleteTicket);



export default ticketRouter;




