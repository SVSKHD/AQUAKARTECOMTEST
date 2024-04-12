import { createRouter } from "next-connect";
import db from "@/utils/db";
import AquaEcomUser from "@/Backend/models/user";

const Router = createRouter();

Router.get(async (req, res) => {
  const { id } = req.query;
  db.connectDb();
  const getDataById = await AquaEcomUser.findById(id);
  if (!getDataById) {
    return res.status(400).json({ success: false, data: null });
  }
  res.status(200).json({ success: true, data: getDataById });
});

export default Router.handler();
