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
      const blogById = await AquaBlog.findById(id);
      if (!blogById) {
        return res.status(404).json({ error: "Blog not found" });
      }
      res.status(200).json(blogById);
    } else {
      const query = {};

      if (categoryId) {
        query.category = categoryId;
      }
      if (subCategoryId) {
        query.subCategory = subCategoryId;
      }

      const blogs = await AquaBlog.find(query).lean();
      res.status(200).json(blogs);
    }

    db.disconnectDb();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

export default Router.handler();
