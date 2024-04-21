import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  street: String,
  city: String,
  state: String,
  postalCode: String,
});

const UserSchema = new mongoose.Schema({
  id: { type: String },
  resetPasswordOtp: { type: Number },
  resetPasswordDate: { type: Date },
  confirmationOtp: { type: Number },
  confirmationOtpDate: { type: Date },
  userSignedupDate: { type: Date, default: Date.now },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    index: true,
    lowercase: true,
  },
  firstName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  forgotPasswordDate: {
    type: Date,
  },
  lastPasswordUpdated: {
    type: Date,
  },
  otp: {
    type: Number,
  },
  phone: {
    type: Number,
    unique: true,
    trim: true,
    index: true,
  },
  alternativeEmail: {
    type: String,
    trim: true,
  },
  photo: {
    id: {
      type: String,
    },
    secure_url: {
      type: String,
    },
  },
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
  role: {
    type: Number,
    default: 2,
  },
  selectedAddress: addressSchema,
  addresses: [addressSchema],
});

const AquaEcomUser =
  mongoose.models.AquaEcomUser || mongoose.model("AquaEcomUser", UserSchema);

export default AquaEcomUser;

// // Define the Address schema
// const addressSchema = new mongoose.Schema({
//   street: String,
//   city: String,
//   state: String,
//   postalCode: String,
// });

// // Define the User schema
// const aquaUserSchema = new mongoose.Schema({
//   id: { type: String },
//   confirmationOtp: { type: Number },
//   resetPasswordExpires: { type: Number },
//   resetPasswordOtp: { type: Number },
//   username: String, // You can add other user-related fields as needed
//   email: {
//     type: String,
//     required: [true, "Please provide an email"],
//     validate: [validator.isEmail, "Please enter email in correct format"],
//     unique: true,
//   },
//   password: {
//     type: String,
//     required: [true, "Please provide a password"],
//     minlength: [6, "password should be atleast 6 char"],
//     select: false,
//   },
//   alternativeEmail: {
//     type: String,
//     validate: [validator.isEmail, "Please enter email in correct format"],
//   },
//   role: {
//     type: String,
//     default: "user",
//   },
//   photo: {
//     id: {
//       type: String,
//     },
//     secure_url: {
//       type: String,
//     },
//   },
//   phoneNo: String,
//   // You can store the photo URL or file path
//   gstDetails: {
//     gstEmail: { type: String },
//     gstNo: { type: String },
//     gstPhone: { type: Number },
//     gstAddres: { type: String },
//   },
//   cart: [
//     {
//       // Define the structure of items in the cart
//       productId: mongoose.Schema.Types.ObjectId, // Reference to the product
//       quantity: Number,
//     },
//   ],
//   orders: [
//     {
//       // Define the structure of user orders
//       orderId: mongoose.Schema.Types.ObjectId, // Reference to the order
//       orderDate: Date,
//     },
//   ],
//   wishes: [
//     {
//       // Define the structure of user wishes
//       productId: mongoose.Schema.Types.ObjectId, // Reference to the product
//       addedDate: Date,
//     },
//   ],
//   selectedAddress: addressSchema,
//   addresses: [addressSchema], // Store multiple addresses as an array of address objects
// });

// const AquaEcomUser =
//   mongoose.models.AquaEcomUser ||
//   mongoose.model("AquaEcomUser", aquaUserSchema);

// export default AquaEcomUser;
