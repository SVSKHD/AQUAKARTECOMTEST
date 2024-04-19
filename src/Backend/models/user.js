import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
const jwt = require("jsonwebtoken");
// Define the Address schema
const addressSchema = new mongoose.Schema({
  street: String,
  city: String,
  state: String,
  postalCode: String,
});

// Define the User schema
const aquaUserSchema = new mongoose.Schema({
  id: { type: String },
  confirmationOtp: { type: Number },
  resetPasswordExpires: { type: Number },
  resetPasswordOtp: { type: Number },
  username: String, // You can add other user-related fields as needed
  email: {
    type: String,
    required: [true, "Please provide an email"],
    validate: [validator.isEmail, "Please enter email in correct format"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: [6, "password should be atleast 6 char"],
    select: false,
  },
  alternativeEmail: {
    type: String,
    validate: [validator.isEmail, "Please enter email in correct format"],
  },
  role: {
    type: String,
    default: "user",
  },
  photo: {
    id: {
      type: String,
    },
    secure_url: {
      type: String,
    },
  },
  phoneNo: String,
  // You can store the photo URL or file path
  gstDetails: {
    gstEmail: { type: String },
    gstNo: { type: String },
    gstPhone: { type: Number },
    gstAddres: { type: String },
  },
  cart: [
    {
      // Define the structure of items in the cart
      productId: mongoose.Schema.Types.ObjectId, // Reference to the product
      quantity: Number,
    },
  ],
  orders: [
    {
      // Define the structure of user orders
      orderId: mongoose.Schema.Types.ObjectId, // Reference to the order
      orderDate: Date,
    },
  ],
  wishes: [
    {
      // Define the structure of user wishes
      productId: mongoose.Schema.Types.ObjectId, // Reference to the product
      addedDate: Date,
    },
  ],
  selectedAddress: addressSchema,
  addresses: [addressSchema], // Store multiple addresses as an array of address objects
});

aquaUserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// validate the password with passed on user password
aquaUserSchema.methods.isValidatedPassword = async function (usersendPassword) {
  return await bcrypt.compare(usersendPassword, this.password);
};

//create and return jwt token
aquaUserSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.NEXT_PUBLIC_JWT_SECRET, {
    expiresIn: process.env.NEXT_JWT_EXPIRES_IN,
  });
};

//generate forgot password token (string)
aquaUserSchema.methods.getForgotPasswordToken = function () {
  // generate a long and randomg string
  const forgotToken = crypto.randomBytes(20).toString("hex");

  // getting a hash - make sure to get a hash on backend
  this.forgotPasswordToken = crypto
    .createHash("sha256")
    .update(forgotToken)
    .digest("hex");

  //time of token
  this.forgotPasswordExpiry = Date.now() + 20 * 60 * 1000;

  return forgotToken;
};

const AquaEcomUser =
  mongoose.models.AquaEcomUser ||
  mongoose.model("AquaEcomUser", aquaUserSchema);

export default AquaEcomUser;
