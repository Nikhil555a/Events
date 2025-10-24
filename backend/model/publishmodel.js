
import mongoose from "mongoose";

const publishSchema = new mongoose.Schema(
  {
    title: String,
    location: String,
    category: String,
    listingType: String,
    notificationType: String,
    allowDiscussions: Boolean,
    banner: String,
    imageUrl: String,

    // ✅ Organizer info
    organizer: {
      name: { type: String, required: true },
      // email: { type: String, required: true },
      // userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
  },
  { timestamps: true }
);

const Publish = mongoose.model("Publish", publishSchema);
export default Publish;
