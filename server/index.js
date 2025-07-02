import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
// To allow cross-origin requests
import cors from "cors";
import route from "./routes/userRoute.js";

// Create Express app
const app = express();

// Load environment variables from .env file
dotenv.config();

// Middleware setup
app.use(bodyParser.json());

// Enable CORS
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// Serve uploaded images statically
app.use("/uploads", express.static("uploads"));

// MongoDB Connection
const PORT = process.env.PORT || 7000;
const MONGOURL = process.env.MONGO_URL;
  
mongoose.connect(MONGOURL)
  .then(() => {
    console.log("MongoDB connection successful");
    app.listen(PORT, () => {
      console.log(`Server running on port: ${PORT}`);
    });
  })
  .catch((error) => console.log("MongoDB connection error:", error));

// Connect all routes to "/api" path
app.use("/api", route);

