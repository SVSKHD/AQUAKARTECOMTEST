import mongoose from "mongoose";

const AquaProductSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discountedPrice: {
      type: Number,
    },
    discountedPercentage: {
      type: Number,
    },
    images: [{
      type: String, // You can use a String to store image URLs
    }],
    links: [{
      type: String, // You can use a String to store links
    }],
    socialLinks: [{
      type: String, // You can use a String to store social media links
    }],
    category: {
      type: String,
      required: true,
    },
    subcategory: {
      type: String,
    },
    notes: {
      type: String,
    },
    instructions: {
      type: String,
    },
  });

const AquaProduct =
    mongoose.models.AquaCategory ||
    mongoose.model("AquaCategory", AquaProductSchema);

export default AquaCategory;
