
import uploadCloudinary from "../config/cloudinary.js";
import Publish from "../model/publishmodel.js";
import Event from "../model/eventmodel.js"; // ✅ Import Event model

export const createPublish = async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({ message: "No file uploaded" });

    // ✅ Upload image to Cloudinary
    const imageUrl = await uploadCloudinary(req.file.path);
    if (!imageUrl)
      return res.status(500).json({ message: "Cloudinary upload failed" });

    // ✅ Extract all data from frontend
    const {
      title,
      location,
      category,
      listingType,
      notificationType,
      allowDiscussions,
      organizerName,
      organizerEmail,
      organizerId,
      eventId, // ⚡ make sure this is sent from frontend
    } = req.body;

    // ✅ Create publish entry
    const newPublish = new Publish({
      title,
      location,
      category,
      listingType,
      notificationType,
      allowDiscussions:
        allowDiscussions === "true" || allowDiscussions === true,
      banner: imageUrl,
      imageUrl: imageUrl,
      organizer: {
        name: organizerName || "Unknown Organizer",
        email: organizerEmail || "No Email",
        userId: organizerId || null,
      },
    });

    const savedPublish = await newPublish.save();

    // ✅ Update the event collection with imageUrl
    if (eventId) {
      await Event.findByIdAndUpdate(
        eventId,
        { imageUrl, isPublished: true }, // update both
        { new: true }
      );
    }

    res.status(200).json({
      message: "Event published successfully",
      publish: savedPublish,
    });
  } catch (error) {
    console.error("❌ Publish Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

