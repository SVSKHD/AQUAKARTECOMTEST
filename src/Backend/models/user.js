import mongoose from "mongoose";

// Define the Address schema
const addressSchema = new mongoose.Schema({
    street: String,
    city: String,
    state: String,
    postalCode: String,
});

// Define the User schema
const aquaUserSchema = new mongoose.Schema({
    userDetails: {
        username: String, // You can add other user-related fields as needed
        email: {
            type: String,
            required: true,
            unique: true,
        },
        phoneNo: String,
        userPhoto: String,
    },
    // You can store the photo URL or file path
    gstDetails: {
        gstEmail: { type: String },
        gstNo: { type: String },
        gstPhone: { type: Number },

    },
    cart: [{
        // Define the structure of items in the cart
        productId: mongoose.Schema.Types.ObjectId, // Reference to the product
        quantity: Number,
    }],
    orders: [{
        // Define the structure of user orders
        orderId: mongoose.Schema.Types.ObjectId, // Reference to the order
        orderDate: Date,
    }],
    wishes: [{
        // Define the structure of user wishes
        productId: mongoose.Schema.Types.ObjectId, // Reference to the product
        addedDate: Date,
    }],
    addresses: [addressSchema], // Store multiple addresses as an array of address objects
});

const AquaUser = mongoose.model('AquaUser', aquaUserSchema);

export default AquaUser
