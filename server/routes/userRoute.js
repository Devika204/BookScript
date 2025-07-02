import express from "express";
import multer from "multer";
import path from "path";

// Import controller functions
import {create, reguser , loginUser , getAllUsers, getAllProducts,update, deleteUser,getProductById, deleteProduct} from "../controller/userController.js";

// Create router object
const route = express.Router();

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save images in "uploads" folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

// Create multer instance with storage setup
const upload = multer({ storage });

// API Routes
route.post("/product_details", upload.single("image"), create); // Add image upload support
route.get("/users", getAllUsers);
route.get("/products", getAllProducts);
route.get("/product/:id",getProductById);
route.put("/update/product/:id", upload.single("image"), update); // Allow image updates
route.delete("/delete/user/:id", deleteUser);
route.delete("/delete/product/:id", deleteProduct);
route.post("/userreg", reguser);
route.post("/login", loginUser);

export default route;
