import mongoose from "mongoose";

const AquaCategorySchema = new mongoose.Schema(
    {
        title: {
            type: String,
        },
        description: {
            type: String,
        },
        image: {
            type: String
        },
        keywords: {
            type: String
        }
    },
    {
        timestamps: true,
    }
);

const AquaInvoices =
    mongoose.models.AquaCategory ||
    mongoose.model("AquaCategory", AquaCategorySchema);

export default AquaInvoices;
