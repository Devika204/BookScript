import mongoose from "mongoose"

// Define Product schema
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    author: { type: String, required: true },
    price: { type: String, required: true },
    image: { type: String, required: true }
})

// Define User schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true }
});

// Create collections in DB)
export const User = mongoose.model("users", userSchema);
export const Product = mongoose.model("products", productSchema);

