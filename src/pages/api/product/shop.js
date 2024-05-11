import { createRouter } from "next-connect";
import AquaProduct from "@/Backend/models/product";
import db from "@/utils/db";

const router = createRouter();

router.get(async (req, res) => {
    try {
        db.connectDb(); // Ensure your database connection is established

        // Extracting query parameters
        const { category, subcategory, price } = req.query;

        // Constructing the query object based on provided parameters
        let query = {};
        let filterUsed = false; // To check if any filter is applied
        if (category) {
            query.category = category;
            filterUsed = true;
        }
        if (subcategory) {
            query.subCategory = subcategory;
            filterUsed = true;
        }
        if (price) {
            query.price = { $lte: Number(price) };
            filterUsed = true;
        }

        if (!filterUsed) {
            // If no filters are provided, return no products
            return res.json({ success: false, message: 'No filters provided. Please specify a category, subcategory, or price.' });
        }

        // Executing the query to find products based on the query object
        const products = await AquaProduct.find(query);

        if (products.length === 0) {
            // If no products found that match the query
            return res.json({ success: false, message: 'No products found that match the provided filters.' });
        }

        // If products are found
        res.json({ success: true, products });
    } catch (error
