import { createRouter } from "next-connect";
import crypto from "crypto";
import axios from "axios";
import AquaEcomUser from "@/Backend/models/user";
import db from "@/utils/db";
import AquaOrder from "@/Backend/models/orders";
const router = createRouter();

router.post(async (req, res) => {
  console.log(process.env.PHONEPE_KEY)
  const passedPayload = req.body;
  await db.connectDb(); // Ensure database connection is awaited

  const createUserName = (email) => {
    if (email) {
      const usernamePart = email.split("@")[0]; // Get the part before '@'
      return usernamePart.split(".")[0] + "."; // Get the part before the first '.' and add '.' back
    }
  };

  try {
    const getUserById = await AquaEcomUser.findById(passedPayload.user); // Await the async call to find user
    if (!getUserById) {
      return res
        .status(404)
        .send({ message: "User not found", success: false });
    }

    let order = new AquaOrder({
      ...passedPayload,
      userName: getUserById.name || createUserName(getUserById.email),
    });
    await order.save(); // Save the order with proper await

    const merchantTransactionId = passedPayload.transactionId;
    const data = {
      merchantId: process.env.PHONE_PE_MERCHANT_ID,
      merchantTransactionId,
      merchantUserId: passedPayload.user,
      name: getUserById.name || createUserName(getUserById.email),
      amount: passedPayload.totalAmount * 100,
      redirectUrl: `https://aquakart.co.in/api/order/${merchantTransactionId}`,
      redirectMode: "POST",
      callbackUrl: `https://aquakart.co.in/api/order/${merchantTransactionId}`,
      mobileNumber: passedPayload.number,
      paymentInstrument: {
        type: "PAY_PAGE",
      },
    };
    const payload = JSON.stringify(data);
    const payloadMain = Buffer.from(payload).toString("base64");
    const keyIndex = 1;
    const string =
      payloadMain + "/pg/v1/pay" + process.env.PHONEPE_KEY;
    const sha256 = crypto.createHash("sha256").update(string).digest("hex");
    const checksum = sha256 + "###" + keyIndex;

    const prod_URL = "https://api.phonepe.com/apis/hermes/pg/v1/pay";
    const options = {
      method: "POST",
      url: prod_URL,
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "X-VERIFY": checksum,
      },
      data: {
        request: payloadMain,
      },
    };

    const response = await axios.request(options);
    return res.json(response.data.data.instrumentResponse.redirectInfo.url);
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: error.message,
      success: false,
    });
  }
});

export default router.handler();
