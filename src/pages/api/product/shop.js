import { createRouter } from "next-connect";
import AquaProduct from "@/Backend/models/product";
import db from "@/utils/db";

const router = createRouter();

router.get(async (req, res) => {
  try {
    await db.connectDb(); // Ensure your database connection is established and awaits the connection

    // Extracting query parameters
    const { category, subcategory, price, all } = req.query;

    // Constructing the query object
    let query = {};

    if (all === "true") {
      query = {}; // If 'all' parameter is true, send all products
    } else {
      if (category) {
        query.category = category; // Filter by category if it's provided
      }
      if (subcategory) {
        query.subCategory = subcategory; // Filter by subcategory if it's provided
      }
      if (price) {
        query.price = { $lte: Number(price) }; // Filter products with price less than or equal to the provided value
      }
    }

    // Find products based on the query object. If query is empty, all products are returned.
    const products = await AquaProduct.find(query);

    if (products.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No products found matching the criteria.",
      });
    }

    res.json({ success: true, products });
  } catch (error) {
    console.error("Failed to fetch products:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router.handler();
