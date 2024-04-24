import { createRouter } from "next-connect";
import crypto from "crypto";
import axios from "axios";
import { nanoid } from "nanoid";
import AquaEcomUser from "@/Backend/models/user";
import db from "@/utils/db";
const router = createRouter();

// router.get(async (req, res) => {
//   const payload = {
//     merchantId: "PGTESTPAYUAT",
//     merchantTransactionId: "MT7850590068188104",
//     merchantUserId: "MUID123",
//     amount: 10000,
//     redirectUrl: `https://aquakart.co.in/api/order/MT7850590068188104`,
//     redirectMode: "POST",
//     callbackUrl: `https://aquakart.co.in/api/order/MT7850590068188104`,
//     mobileNumber: "9999999999",
//     paymentInstrument: {
//       type: "PAY_PAGE",
//     },
//   };
//   const dataPayload = JSON.stringify(payload);
//   const dataBase64 = Buffer.from(dataPayload).toString("base64");
//   const fullURL =
//     dataBase64 + "/pg/v1/pay" + "fb0244a9-34b5-48ae-a7a3-741d3de823d3";
//   const dataSha256 = sha256(fullURL).toString();
//   const checksum = dataSha256 + "###" + process.env.NEXT_PUBLIC_SALT_INDEX;
//   const UAT_PAY_API_URL = `https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay`;

//   const options = {
//     method: "post",
//     url: "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay",
//     headers: {
//       accept: "text/plain",
//       "Content-Type": "application/json",
//       "X-VERIFY": checksum,
//     },
//   };
//   axios
//     .request(options)
//     .then(function (response) {
//       console.log(response.data);
//       res.status(200).json({message:"hello"})
//     })
//     .catch(function (error) {
//         console.error("error", error.message);
//         if (error.response) {
//           // The request was made and the server responded with a status code
//           // that falls out of the range of 2xx
//           console.error(error.response.data);
//           console.error(error.response.status);
//           console.error(error.response.headers);
//           res.status(500).json({message:"hello error" , error:error})
//         } else if (error.request) {
//           // The request was made but no response was received
//           console.error(error.request);
//           res.status(500).json({message:"hello"})
//         } else {
//           // Something happened in setting up the request that triggered an Error
//           console.error('Error', error.message);
//           res.status(500).json({message:"hello"})
//         }
//       });
// });

// router.post(async (req, res) => {
//   console.log("user",req.body);
//   const passedPayload = req.body
//   db.connectDb()
//   try {
//     console.log(passedPayload.user);
//     const User = AquaEcomUser.findById(passedPayload.user)
//     console.log("user", User.email)
//     const merchantTransactionId = passedPayload.transactionId;
//     const data = {
//       merchantId: process.env.PHONE_PE_MERCHANT_ID,
//       merchantTransactionId: merchantTransactionId,
//       merchantUserId: merchantTransactionId,
//       name: req.body.name,
//       amount: req.body.amount * 100,
//       redirectUrl: `https://aquakart.co.in/api/order/${merchantTransactionId}`,
//       redirectMode: "POST",
//       callbackUrl: `https://aquakart.co.in/api/order/${merchantTransactionId}`,
//       mobileNumber: req.body.number,
//       paymentInstrument: {
//         type: "PAY_PAGE",
//       },
//     };
//     const payload = JSON.stringify(data);
//     const payloadMain = Buffer.from(payload).toString("base64");
//     const keyIndex = 1;
//     const string =
//       payloadMain + "/pg/v1/pay" + process.env.PHONE_PE_SALT_KEY ;
//     const sha256 = crypto.createHash("sha256").update(string).digest("hex");
//     const checksum = sha256 + "###" + keyIndex;

//     const prod_URL = "https://api.phonepe.com/apis/hermes/pg/v1/pay";
//     // const prod_URL =
//     // "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay";

//     const options = {
//       method: "POST",
//       url: prod_URL,
//       headers: {
//         accept: "application/json",
//         "Content-Type": "application/json",
//         "X-VERIFY": checksum,
//       },
//       data: {
//         request: payloadMain,
//       },
//     };
// console.log(options)
//     axios
//       .request(options)
//       .then(function (response) {
//         // console.log(response.data.data);

//         return res.json({
//           success: true,
//           data: response.data.message,
//         });
//       })
//       .catch(function (error) {
//         console.error("error");
//       });
//       db.disconnectDb()
//   } catch (error) {
//     res.status(500).send({
//       message: "please try again",
//       success: false,
//     });
//     db.disconnectDb()
//   }
// });

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
