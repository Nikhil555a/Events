
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

const uploadCloudinary = async (filepath) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  try {
    if (!filepath) return null;

    const uploadResult = await cloudinary.uploader.upload(filepath, {
      folder: "events",
    });

    fs.unlinkSync(filepath);
    return uploadResult.secure_url;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    fs.unlinkSync(filepath);
    return null;
  }
};

export default uploadCloudinary;
