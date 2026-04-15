import express from "express";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

// Get cart
router.get("/", authMiddleware, async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: req.userId }).populate("items.productId");

    if (!cart) {
      cart = new Cart({ userId: req.userId, items: [] });
    }

    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add to cart
router.post("/add", authMiddleware, async (req, res) => {
  try {
    const { productId, quantity, size, color } = req.body;

    if (!productId || !quantity || !size) {
      return res.status(400).json({ message: "Product ID, quantity, and size are required" });
    }

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    let cart = await Cart.findOne({ userId: req.userId });
    if (!cart) {
      cart = new Cart({ userId: req.userId, items: [] });
    }

    // Check if item already in cart
    const existingItem = cart.items.find(
      (item) => item.productId.toString() === productId && item.size === size && item.color === color
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({
        productId,
        name: product.name,
        price: product.getFinalPrice(),
        quantity,
        size,
        color,
        image: product.images[0],
      });
    }

    cart.calculateSubtotal();
    await cart.save();

    res.status(201).json({ message: "Item added to cart", cart });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update cart item
router.put("/item/:itemId", authMiddleware, async (req, res) => {
  try {
    const { quantity } = req.body;

    if (quantity < 1) {
      return res.status(400).json({ message: "Quantity must be at least 1" });
    }

    const cart = await Cart.findOne({ userId: req.userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.id(req.params.itemId);
    if (!item) return res.status(404).json({ message: "Item not found in cart" });

    item.quantity = quantity;
    cart.calculateSubtotal();
    await cart.save();

    res.json({ message: "Item updated", cart });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Remove from cart
router.delete("/item/:itemId", authMiddleware, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items.id(req.params.itemId).deleteOne();
    cart.calculateSubtotal();
    await cart.save();

    res.json({ message: "Item removed from cart", cart });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Clear cart
router.delete("/", authMiddleware, async (req, res) => {
  try {
    await Cart.findOneAndUpdate({ userId: req.userId }, { items: [], subtotal: 0 });
    res.json({ message: "Cart cleared" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
