
import mongoose from "mongoose";

const VenueSchema = new mongoose.Schema({
  name: { type: String },
  address: { type: String },
  city: { type: String },
});

const EventSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    eventType: { type: String, enum: ["Single event", "Recurring event"], default: "Single event" },
    locationType: { type: String, enum: ["Venue", "Online", "Recorded events"], default: "Venue" },
    startDate: { type: Date },
    startTime: { type: String },
    endTime: { type: String },
    timezone: { type: String, default: "(GMT+05:30) India Standard Time - Colombo" },
    organizerPage: { type: String },
    venue: VenueSchema,
    venueName: { type: String },
    venueAddress: { type: String },
    venueCity: { type: String },
    imageUrl: { type: String }, // ✅ Cloudinary URL store
    banner: { type: String },   // optional
    isPublished: { type: Boolean, default: false }, // ✅ Add this field
  },
  { timestamps: true }
);

const Event = mongoose.model("Event", EventSchema);

export default Event;


