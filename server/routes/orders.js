import express from "express";
import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

// Get user's orders
router.get("/", authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single order
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) return res.status(404).json({ message: "Order not found" });

    // Check if user owns this order
    if (order.userId.toString() !== req.userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create order from cart (checkout)
router.post("/checkout", authMiddleware, async (req, res) => {
  try {
    const { shippingAddress, paymentMethod } = req.body;

    if (!shippingAddress) {
      return res.status(400).json({ message: "Shipping address is required" });
    }

    const cart = await Cart.findOne({ userId: req.userId });
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Calculate totals
    const subtotal = cart.calculateSubtotal();
    const tax = subtotal * 0.18; // 18% GST for India
    const shipping = subtotal > 1000 ? 0 : 100; // Free shipping above 1000
    const total = subtotal + tax + shipping;

    // Create order
    const order = new Order({
      orderId: `ORD-${Date.now()}`,
      userId: req.userId,
      items: cart.items,
      shippingAddress,
      subtotal,
      tax,
      shipping,
      total,
      paymentMethod,
      paymentStatus: paymentMethod === "cod" ? "pending" : "pending",
      orderStatus: paymentMethod === "cod" ? "confirmed" : "pending",
    });

    await order.save();

    // Clear cart
    await Cart.findOneAndUpdate({ userId: req.userId }, { items: [], subtotal: 0 });

    res.status(201).json({
      message: "Order created",
      order,
      razorpayData: {
        amount: Math.round(total * 100), // Amount in paise
        orderId: order.orderId,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update order status (admin only)
router.put("/:id/status", authMiddleware, async (req, res) => {
  try {
    const { orderStatus } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { orderStatus },
      { new: true, runValidators: true }
    );

    if (!order) return res.status(404).json({ message: "Order not found" });

    res.json({ message: "Order status updated", order });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
