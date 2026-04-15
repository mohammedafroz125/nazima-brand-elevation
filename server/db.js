import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      console.log("✓ MongoDB already connected");
      return;
    }

    await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/nazima-brand");

    console.log("✓ MongoDB connected successfully");
  } catch (err) {
    console.error("✗ MongoDB connection error:", err.message);
    process.exit(1);
  }
};

export default connectDB;
