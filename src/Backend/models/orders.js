import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema.Types;

const OrderItemSchema = new mongoose.Schema({
  productId: {
    type: ObjectId,
    ref: "Product", // Assuming you have a Product model
  },
  name: String,
  price: Number,
  quantity: Number,
});

// Define PaymentInstrumentSchema
const PaymentInstrumentSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['UPI', 'Credit Card', 'Debit Card', 'Net Banking', 'Wallet', 'Other'] // Adjust based on your needs
  },
  utr: String,
  upiTransactionId: String,
  accountHolderName: String,
  cardNetwork: String,
  accountType: {
    type: String,
    enum: ['SAVINGS', 'CURRENT', 'OTHER'] // Adjust based on your needs
  }
});

const OrderSchema = new mongoose.Schema(
  {
    user: {
      type: ObjectId,
      ref: "User", // Assuming you have a User model
      required: true,
    },
    items: [OrderItemSchema],
    totalAmount: Number,
    paymentMethod: String,
    transactionId: String,
    paymentStatus: {
      type: String,
      enum: ["Paid", "Pending", "Failed"],
      default: "Pending",
    },
    paymentInstrument: PaymentInstrumentSchema, // Use PaymentInstrumentSchema here
    currency: String,
    billingAddress: {
      type: Map,
      of: String,
    },
    shippingAddress: {
      type: Map,
      of: String,
    },
    shippingMethod: String,
    shippingCost: Number,
    estimatedDelivery: Date,
    orderStatus: {
      type: String,
      enum: ["Pending", "Processing", "Shipped", "Completed", "Cancelled"],
      default: "Pending",
    },
    discounts: Number,
    taxes: Number,
    notes: String,
    gst: Number,
    paymentGatewayResponse: {
      type: Map,
      of: String,
    },
    refundInfo: {
      type: Map,
      of: String,
    },
  },
  {
    timestamps: true, // Add createdAt and updatedAt timestamps
  },
);

const AquaOrder = mongoose.models.AquaOrder || mongoose.model("AquaOrder", OrderSchema);

export default AquaOrder;
