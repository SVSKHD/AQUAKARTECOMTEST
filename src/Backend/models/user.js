import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
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

const AquaEcomUser =
  mongoose.models.AquaEcomUser ||
  mongoose.model("AquaEcomUser", aquaUserSchema);

export default AquaEcomUser;
