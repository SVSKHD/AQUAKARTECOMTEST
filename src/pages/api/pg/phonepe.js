import { createRouter } from "next-connect";
import crypto from "crypto";
import axios from "axios";
import { nanoid } from "nanoid";
import AquaEcomUser from "@/Backend/models/user";
import db from "@/utils/db";
const router = createRouter();

router.post(async (req, res) => {
  const passedPaylaod = req.body;
  console.log(req.body.totalAmount);
  db.connectDb();
  const createUserName = (email) => {
    if (email) {
      const usernamePart = email.split("@")[0]; // Get the part before '@'
      return usernamePart.split(".")[0] + "."; // Get the part before the first '.' and add '.' back
    }
  };
  try {
    const getUserById = AquaEcomUser.findById(passedPaylaod.user);

    const merchantTransactionId = req.body.transactionId;
    const data = {
      merchantId: process.env.PHONE_PE_MERCHANT_ID,
      merchantTransactionId: merchantTransactionId,
      merchantUserId: passedPaylaod.user,
      name: getUserById.name || createUserName(getUserById.email),
      amount: passedPaylaod.totalAmount * 100,
      redirectUrl: `https://aquakart.co.in/api/order/${merchantTransactionId}`,
      redirectMode: "POST",
      callbackUrl: `https://aquakart.co.in/api/order/${merchantTransactionId}`,
      mobileNumber: req.body.number,
      paymentInstrument: {
        type: "PAY_PAGE",
      },
    };
    const payload = JSON.stringify(data);
    const payloadMain = Buffer.from(payload).toString("base64");
    const keyIndex = 1;
    const string =
      payloadMain + "/pg/v1/pay" + "fb0244a9-34b5-48ae-a7a3-741d3de823d3";
    const sha256 = crypto.createHash("sha256").update(string).digest("hex");
    const checksum = sha256 + "###" + keyIndex;

    const prod_URL = "https://api.phonepe.com/apis/hermes/pg/v1/pay";
    // const prod_URL = "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay"

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

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);

        return res.json(response.data.data.instrumentResponse.redirectInfo.url);
      })
      .catch(function (error) {
        console.error(error);
      });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      success: false,
    });
  }
});

export default router.handler();
