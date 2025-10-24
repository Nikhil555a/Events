
import express from "express";
import dotenv from "dotenv";
import connectdb from "./config/db.js";
import authRouter from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import eventRouter from "./routes/eventRoutes.js";
import ticketRouter from "./routes/ticketRoutes.js";
import publishRouter from "./routes/publishRoutes.js";

dotenv.config();

const app = express();
const Port = process.env.PORT || 5000;

// ✅ Fix 1: Allow large payloads (for images, videos, etc.)
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use("/uploads", express.static("uploads"));

// ✅ Fix 2: Use cookie parser
app.use(cookieParser());

// ✅ Fix 3: Proper CORS config
app.use(
  cors({
    origin: "https://events-frontend1.onrender.com", // your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// ✅ Routes
app.use("/api/auth", authRouter);
app.use("/api/events", eventRouter);
app.use("/api", ticketRouter);
app.use("/api/publish", publishRouter);

// ✅ Debug log for Cloudinary env check
console.log(
  "Cloudinary ENV:",
  process.env.CLOUDINARY_NAME,
  process.env.CLOUDINARY_API_KEY,
  process.env.CLOUDINARY_API_SECRET ? "Loaded ✅" : "Missing ❌"
);

// ✅ Start server
app.listen(Port, () => {
  connectdb();
  console.log(`🚀 Server started at port ${Port}`);
});
