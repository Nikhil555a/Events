
import uploadCloudinary from "../config/cloudinary.js";
import Event from "../model/eventmodel.js"; // Ensure correct path

// ✅ Create new event with Cloudinary image upload
export const createEvent = async (req, res) => {
  try {
    console.log("Received File:", req.file);
    console.log("Received Body:", req.body);

    let imageUrl = null;

    // ✅ Agar image file frontend se aayi hai, Cloudinary pe upload karo
    if (req.file) {
      console.log("Uploading to Cloudinary...");
      imageUrl = await uploadCloudinary(req.file.path);
      console.log("Cloudinary Upload Result:", imageUrl);
    }

    // ✅ Event ka data create karo with Cloudinary URL
    const newEvent = new Event({
      name: req.body.name,
      description: req.body.description,
      eventType: req.body.eventType,
      venueName: req.body.venueName,
      venueAddress: req.body.venueAddress,
      venueCity: req.body.venueCity,
      startDate: req.body.startDate,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      timezone: req.body.timezone,
      organizerPage: req.body.organizerPage,
      locationType: req.body.locationType,
      imageUrl: imageUrl, // ✅ Cloudinary image link save
    });

    console.log(newEvent)

    const savedEvent = await newEvent.save();
    res.status(201).json({
      message: "Event created successfully",
      event: savedEvent,
    });
  } catch (error) {
    console.error("Event Create Error:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// ✅ Get all events (latest first)
export const getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.status(200).json(events);
  } catch (error) {
    console.error("Get Events Error:", error);
    res.status(500).json({ message: "Failed to get events", error: error.message });
  }
};

// ✅ Delete event by ID
export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    await event.deleteOne();
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error("Delete Event Error:", error);
    res.status(500).json({ message: "Failed to delete event", error: error.message });
  }
};

// ✅ Get event by ID
export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json(event);
  } catch (error) {
    console.error("Get Event By ID Error:", error);
    res.status(500).json({ message: "Failed to fetch event", error: error.message });
  }
};






export const updateEvent = async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(500).json({ message: "Error updating event", error: error.message });
  }
};