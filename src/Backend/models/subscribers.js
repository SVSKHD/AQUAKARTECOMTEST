import mongoose from "mongoose";

const AquaSubscriberSchema = new mongoose.Schema(
  {
    email: {
      type: String,
    },
    subscribed: {
      type: Boolean,
    },
    unSubscribed: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  },
);

const AquaSubscribers =
  mongoose.models.AquaSubscribers ||
  mongoose.model("AquaSubscribers", AquaSubscriberSchema);

export default AquaSubscribers;
