import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: {
      type: String,
      enum: [
        "abayas",
        "jilbab",
        "khimar",
        "dresses",
        "hijabs",
        "scarfs",
        "occasion",
        "bridal",
        "winter",
      ],
      required: true,
    },
    price: { type: Number, required: true, min: 0 },
    originalPrice: { type: Number, min: 0 }, // For showing discount
    discount: { type: Number, min: 0, max: 100, default: 0 }, // Percentage
    images: [{ type: String, required: true }], // Array of image URLs
    sizes: [
      {
        size: { type: String, enum: ["XS", "S", "M", "L", "XL", "XXL"], required: true },
        stock: { type: Number, required: true, min: 0 },
      },
    ],
    colors: [String], // e.g., ["Gold", "Champagne", "Ivory"]
    material: String,
    careInstructions: String,
    rating: { type: Number, default: 0, min: 0, max: 5 },
    reviewCount: { type: Number, default: 0 },
    isFeatured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Calculate available stock
productSchema.methods.getTotalStock = function () {
  return this.sizes.reduce((total, size) => total + size.stock, 0);
};

// Get final price after discount
productSchema.methods.getFinalPrice = function () {
  return this.price - (this.price * this.discount) / 100;
};

export default mongoose.model("Product", productSchema);
