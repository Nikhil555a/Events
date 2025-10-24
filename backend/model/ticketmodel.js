
import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema(
  {
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    organizerPage: {
      type: String, // ✅ Store organizer name for easy filtering
    },
    name: { type: String, required: true },
    type: { type: String, enum: ["Paid", "Free", "Donation"], required: true },
    price: { type: Number, default: 0 },
    currency: { type: String, default: "INR" },
    ticketsOnSale: { type: Number, default: 0 },
    description: { type: String },
    minDonation: { type: Number, default: 0 },
    maxDonation: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Ticket = mongoose.model("Ticket", ticketSchema);
export default Ticket;
