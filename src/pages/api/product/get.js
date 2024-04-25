import { createRouter } from "next-connect";
import db from "@/utils/db";
import AquaProduct from "@/Backend/models/product";

const Router = createRouter();

Router.get(async (req, res) => {
  const allowedOrigins = [
    "https://www.aquakart.co.in",
    "http://localhost:3000",
  ];
  const origin = req.headers.origin;

  // Set CORS headers if the origin is allowed
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  await db.connectDb();

  const { categoryId, subCategoryId, id, maxPrice } = req.query;
  const minPrice = req.query.minPrice || 0; // Default minPrice to 0 if not provided

  const priceFilter = {
    price: {
      $gte: Number(minPrice),
      ...(maxPrice && { $lte: Number(maxPrice) }),
    },
  };

  if (id) {
    const productById = await AquaProduct.findById(id);
    const relatedProducts = await AquaProduct.find({
      category: productById.category,
      _id: { $ne: id },
      ...priceFilter,
    }).lean();

    const productWithRelated = {
      ...productById.toObject(),
      relatedProducts,
    };
    res.status(200).json(productWithRelated);
  } else {
    const query = { ...priceFilter };

    if (categoryId) {
      query.category = categoryId;
    }
    if (subCategoryId) {
      query.subCategory = subCategoryId;
    }

    const products = await AquaProduct.find(query).lean();
    res.status(200).json(products);
  }

  db.disconnectDb();
});

export default Router.handler();
