import { User, Product} from "../model/userModel.js";
import multer from "multer";
import path from "path";

// Configure Multer for Image Uploads
const storage = multer.diskStorage({
  // file path
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Store images in 'uploads/' directory
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Unique file names
  },
});

// Only allow uploading a single file named "image"
export const upload = multer({ storage }).single("image");

// // Create a new product with image upload
export const create = async (req, res) => {
  try {
    const { name, author, price } = req.body;
    // Check if image is uploaded
    let image = req.file ? `/uploads/${req.file.filename}` : ""; // Save file path

    // Check if product already exists
    const productExist = await Product.findOne({ name });
    if (productExist) {
      return res.status(400).json({ message: "Book already exists" });
    }

    // Create new product to save in db
    const newProduct = new Product({ name, author, price, image });
    const saveData = await newProduct.save();
    
    res.status(200).json(saveData);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// Register a new user
export const reguser = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
   
    // Check if user with same email already exists
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user
    const newUser = new User({ name, email, phone });
    const saveData = await newUser.save();
    
    res.status(200).json(saveData);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// Login User or Admin
export const loginUser = async (req, res) => {
  console.log("Request Body Received:", req.body);

  const { name, email } = req.body;
  try {
    console.log("Checking User Collection...");
    // Find user with matching name & email (converted to lowercase for accuracy)
    const user = await User.findOne({ 
      name: name.trim().toLowerCase(), 
      email: email.trim().toLowerCase()
    });
    console.log("User Found in Database:", user);

    if (!user) {
      console.log("Invalid credentials");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check if user is admin
    if (user.name == "admin" && user.email == "admin@gmail.com") {
      console.log("Admin Login Successful");
      return res.status(200).json({
        message: "Admin login successful",
        name: user.name,
        email: user.email,
        role: "admin"
      });
    }

    console.log("User Login Successful");

    // Regular user login
    res.status(200).json({
      message: "Login successful",
      name: user.name,
      email: user.email,
      role: "user"
    });
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ message: error.message });
  }
};


// Get all registered users
export const getAllUsers = async (req, res) => {
  try {
    const userData = await User.find();
    if (!userData || userData.length == 0) {
      return res.status(404).json({ message: "User data not found" });
    }
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// Get all products
export const getAllProducts = async (req, res) => {
  try {
    const productData = await Product.find();
    if (!productData || productData.length == 0) {
      return res.status(404).json({ message: "Product data not found" });
    }
    res.status(200).json(productData);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// Update a product by ID (with optional image)
export const update = async (req, res) => {
  try {
    // Get the value of the id from the URL path.
    const id = req.params.id;
    // Copy updated fields from request body
    let updatedData = { ...req.body };

    // If a new image is uploaded, update image path
    if (req.file) {
      updatedData.image = `/uploads/${req.file.filename}`;
    }

    // Check if product exists
    const productExist = await Product.findById(id);
    if (!productExist) {
      return res.status(404).json({ message: "product not found." });
    }

    const updatedproduct = await Product.findByIdAndUpdate(id, updatedData, { new: true });
    res.status(200).json({ message: "Product Updated successfully.", updatedproduct });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// Get single product by ID
export const getProductById = async (req, res) => {
  try {
    // Get the value of the id from the URL path.
    const id = req.params.id;
    const productExist = await Product.findById(id);

    if (!productExist) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(productExist);
  } 
  catch (error) 
  {
    res.status(500).json({ errorMessage: error.message });
  }
};

// Delete product by ID
export const deleteUser = async (req, res) => {
  try {
    // Get the value of the id from the URL path.
    const id = req.params.id;
    const userExist = await User.findById(id);
    if (!userExist) {
      return res.status(404).json({ message: "User not found." });
    }

    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    // Get the value of the id from the URL path.
    const id = req.params.id;
    const productExist = await Product.findById(id);
    if (!productExist) {
      return res.status(404).json({ message: "Product not found." });
    }

    await Product.findByIdAndDelete(id);
    res.status(200).json({ message: "Product deleted successfully." });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};
