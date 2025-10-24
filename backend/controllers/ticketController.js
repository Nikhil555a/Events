
import Event from "../model/eventmodel.js";
import Ticket from "../model/ticketModel.js";

// 🟢 Create tickets for a specific event
// export const addTickets = async (req, res) => {
//   try {
//     const { id: eventId } = req.params;
//     const { tickets } = req.body;

//     // Validate event
//     const event = await Event.findById(eventId);
//     if (!event) {
//       return res.status(404).json({ message: "Event not found" });
//     }

//     // Create tickets
//     const createdTickets = await Ticket.insertMany(
//       tickets.map((t) => ({ ...t, eventId }))
//     );

//     res.status(201).json({
//       success: true,
//       message: "Tickets added successfully",
//       tickets: createdTickets,
//     });
//   } catch (error) {
//     console.error("Error adding tickets:", error);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

// 🟡 Get all tickets for a specific event
export const getTicketsByEvent = async (req, res) => {
  try {
    const { id: eventId } = req.params;
    const tickets = await Ticket.find({ eventId }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, tickets });
  } catch (error) {
    console.error("Error fetching tickets:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// 🔴 Delete a ticket
export const deleteTicket = async (req, res) => {
  try {
    const { ticketId } = req.params;
    const ticket = await Ticket.findByIdAndDelete(ticketId);
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }
    res.status(200).json({ success: true, message: "Ticket deleted successfully" });
  } catch (error) {
    console.error("Error deleting ticket:", error);
    res.status(500).json({ message: "Server error" });
  }
};



export const addTickets = async (req, res) => {
  try {
    const { id: eventId } = req.params;
    const { tickets } = req.body;

    // Validate event
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });

    // Include organizer name in each ticket
    const createdTickets = await Ticket.insertMany(
      tickets.map((t) => ({
        ...t,
        eventId,
        organizerPage: event.organizerPage, // ✅ added
      }))
    );

    res.status(201).json({
      success: true,
      message: "Tickets added successfully",
      tickets: createdTickets,
    });
  } catch (error) {
    console.error("Error adding tickets:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
