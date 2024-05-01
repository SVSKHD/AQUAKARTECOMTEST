import { createRouter } from "next-connect";
import AquaCoupon from "@/Backend/models/coupon";

const router = createRouter();

// Create a new coupon
router.post(async (req, res) => {
  const { code, description, discountPercentage, validity, conditions } =
    req.body;

  try {
    const existingCoupon = await AquaCoupon.findOne({ code });
    if (existingCoupon) {
      return res.status(400).json({ message: "Coupon code already exists." });
    }

    const newCoupon = new AquaCoupon({
      code,
      description,
      discountPercentage,
      validity,
      conditions,
    });
    await newCoupon.save();
    res.status(201).json(newCoupon);
  } catch (error) {
    res.status(500).json({ message: "Server error, please try again later." });
  }
});

// Read all coupons
router.get(async (req, res) => {
  try {
    const coupons = await AquaCoupon.find({});
    res.status(200).json(coupons);
  } catch (error) {
    res.status(500).json({ message: "Server error, please try again later." });
  }
});

// Update a coupon
router.put("/:code", async (req, res) => {
  const { code } = req.params;
  const updates = req.body;

  try {
    const updatedCoupon = await AquaCoupon.findOneAndUpdate({ code }, updates, {
      new: true,
    });
    if (!updatedCoupon) {
      return res.status(404).json({ message: "Coupon not found." });
    }
    res.status(200).json(updatedCoupon);
  } catch (error) {
    res.status(500).json({ message: "Server error, please try again later." });
  }
});

// Delete a coupon
router.delete("/:code", async (req, res) => {
  const { code } = req.params;

  try {
    const deletedCoupon = await AquaCoupon.findOneAndDelete({ code });
    if (!deletedCoupon) {
      return res.status(404).json({ message: "Coupon not found." });
    }
    res.status(200).json({ message: "Coupon deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Server error, please try again later." });
  }
});

export default router.handler();
