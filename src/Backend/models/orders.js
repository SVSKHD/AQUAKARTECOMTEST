import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema.Types;

const OrderItemSchema = new mongoose.Schema({
  productId: {
    type: ObjectId,
    ref: 'Product', // Assuming you have a Product model
  },
  name: String,
  price: Number,
  quantity: Number,
});

const OrderSchema = new mongoose.Schema({
  user: {
    type: ObjectId,
    ref: 'User', // Assuming you have a User model
    required: true,
  },
  items: [OrderItemSchema],
  totalAmount: Number,
  paymentMethod: String,
  transactionId: String,
  paymentStatus: {
    type: String,
    enum: ['Paid', 'Pending', 'Failed'],
    default: 'Pending',
  },
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
    enum: ['Pending', 'Processing', 'Shipped', 'Completed', 'Cancelled'],
    default: 'Pending',
  },
  discounts: Number,
  taxes: Number,
  notes: String,
  paymentGatewayResponse: {
    type: Map,
    of: String,
  },
  refundInfo: {
    type: Map,
    of: String,
  },
}, {
  timestamps: true, // Add createdAt and updatedAt timestamps
});

const Order = mongoose.models.Order || mongoose.model("Order", OrderSchema);

export default Order;
