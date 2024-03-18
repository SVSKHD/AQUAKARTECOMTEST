import { createRouter } from "next-connect";
import db from "@/utils/db";
import AquaEcomUser from "@/Backend/models/user";

const router = createRouter()

router.put(async(req,res)=>{
db.connectDb()
console.log("id",req.body)
db.disconnectDb()
})


export default router.handler()