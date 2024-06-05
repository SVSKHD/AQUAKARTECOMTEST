import { createRouter } from "next-connect";
import db from "@/utils/db";
import AquaBlog from "@/Backend/models/blog";

const Router = createRouter();

Router.use((req, res, next) => {
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
  next();
});

Router.get(async (req, res) => {
  try {
    await db.connectDb();

    const { categoryId, subCategoryId, id } = req.query;

    if (id) {
      const blogById = await AquaBlog.findById(id).lean();
      if (!blogById) {
        db.disconnectDb();
        return res.status(404).json({ error: "Blog not found" });
      }
      db.disconnectDb();
      return res.status(200).json({ data: blogById });
    } else {
      const query = {};

      if (categoryId) {
        query.category = categoryId;
      }
      if (subCategoryId) {
        query.subCategory = subCategoryId;
      }

      const blogs = await AquaBlog.find(query).lean();
      db.disconnectDb();
      return res.status(200).json({ data: blogs });
    }
  } catch (error) {
    console.error(error);
    db.disconnectDb();
    res.status(500).json({ error: "Server error" });
  }
});

export default Router.handler();
