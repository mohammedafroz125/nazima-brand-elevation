import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    items: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
        name: String,
        price: Number,
        quantity: { type: Number, required: true, min: 1 },
        size: { type: String, required: true },
        color: String,
        image: String,
      },
    ],
    subtotal: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Calculate subtotal
cartSchema.methods.calculateSubtotal = function () {
  this.subtotal = this.items.reduce((total, item) => total + item.price * item.quantity, 0);
  return this.subtotal;
};

export default mongoose.model("Cart", cartSchema);
