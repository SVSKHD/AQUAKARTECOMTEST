import { createRouter } from "next-connect";
import AquaProduct from "@/Backend/models/product";
import db from "@/utils/db";

const router = createRouter();

router.get(async (req, res) => {
    try {
        db.connectDb(); // Ensure your database connection is established
        // Extracting query parameters
        const { category, subcategory, price } = req.query;

        // Constructing the query object
        let query = {};
        if (category) {
            query.category = category; // Filter by category if it's provided
        }
        if (subcategory) {
            query.subCategory = subcategory; // Filter by subcategory if it's provided
        }
        if (price) {
            query.price = { $lte: Number(price) }; // Filter products with price less than or equal to the provided value
        }

        // Check if no query parameters are provided
        if (Object.keys(query).length === 0) {
            return res.status(400).json({ success: false, message: 'No products in this category or according to query yet.' });
        }

        // Executing the query to find products based on the query object
        const products = await AquaProduct.find(query);
        if (products.length === 0) {
            return res.status(404).json({ success: false, message: 'No products found matching the criteria.' });
        }
        res.json({ success: true, products });
    } catch (error) {
        // It's important to handle the error
        console.error("Failed to fetch products:", error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

export default router.handler();
