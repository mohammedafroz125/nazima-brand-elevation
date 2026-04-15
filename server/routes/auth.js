import express from "express";
import User from "../models/User.js";
import { generateToken, authMiddleware } from "../middleware/auth.js";
import validator from "validator";

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password, confirmPassword } = req.body;

    // Validation
    if (!firstName || !lastName || !email || !phone || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email address" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Create user
    const user = new User({ firstName, lastName, email, phone, password });
    await user.save();

    const token = generateToken(user._id, user.role);

    res.status(201).json({
      message: "Registration successful",
      token,
      user: user.toJSON(),
    });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = generateToken(user._id, user.role);

    res.json({
      message: "Login successful",
      token,
      user: user.toJSON(),
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: err.message });
  }
});

// Get current user
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update user profile
router.put("/profile", authMiddleware, async (req, res) => {
  try {
    const { firstName, lastName, phone } = req.body;
    const user = await User.findByIdAndUpdate(
      req.userId,
      { firstName, lastName, phone },
      { new: true, runValidators: true }
    );
    res.json({ message: "Profile updated", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add address
router.post("/addresses", authMiddleware, async (req, res) => {
  try {
    const { type, addressLine1, addressLine2, city, state, zipCode, country, isDefault } = req.body;

    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const address = { type, addressLine1, addressLine2, city, state, zipCode, country, isDefault };
    user.addresses.push(address);

    // If default, remove default from others
    if (isDefault) {
      user.addresses.forEach((addr, idx) => {
        if (idx !== user.addresses.length - 1) addr.isDefault = false;
      });
    }

    await user.save();
    res.status(201).json({ message: "Address added", addresses: user.addresses });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update address
router.put("/addresses/:id", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const address = user.addresses.id(req.params.id);

    if (!address) return res.status(404).json({ message: "Address not found" });

    Object.assign(address, req.body);
    await user.save();

    res.json({ message: "Address updated", address });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete address
router.delete("/addresses/:id", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    user.addresses.id(req.params.id).deleteOne();
    await user.save();

    res.json({ message: "Address deleted", addresses: user.addresses });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
