import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

let products = [
  { id: "1", name: "Champagne Embroidered Abaya", price: 8999, category: "Abayas", imageUrl: "/assets/product-abaya-1.jpg" },
  { id: "2", name: "Ivory Lace Abaya", price: 7499, category: "Abayas", imageUrl: "/assets/product-abaya-2.jpg" },
  { id: "3", name: "Olive Belted A-Line Abaya", price: 6999, category: "Abayas", imageUrl: "/assets/product-abaya-3.jpg" },
  { id: "4", name: "Black Open Layered Abaya", price: 9499, category: "Abayas", imageUrl: "/assets/product-abaya-4.jpg" },
  { id: "5", name: "Sage Embroidered Dress", price: 6999, category: "Modest Dresses", imageUrl: "/assets/product-dress-1.jpg" },
  { id: "6", name: "Dusty Rose Maxi Dress", price: 5999, category: "Modest Dresses", imageUrl: "/assets/product-dress-2.jpg" },
  { id: "7", name: "Blush Pearl Occasion Gown", price: 12999, category: "Occasion Wear", imageUrl: "/assets/product-occasion-1.jpg" },
  { id: "8", name: "Burgundy Embroidered Kaftan", price: 14999, category: "Occasion Wear", imageUrl: "/assets/product-occasion-2.jpg" },
  { id: "9", name: "Mocha Jilbab Set", price: 5499, category: "Jilbab & Makhna", imageUrl: "/assets/product-jilbab-1.jpg" },
  { id: "10", name: "Olive Jilbab Makhna Set", price: 5999, category: "Jilbab & Makhna", imageUrl: "/assets/product-jilbab-2.jpg" },
  { id: "11", name: "Ivory Lace Khimar", price: 3999, category: "Khimar & Prayer", imageUrl: "/assets/product-khimar-1.jpg" },
  { id: "12", name: "Sage Prayer Gown", price: 4499, category: "Khimar & Prayer", imageUrl: "/assets/product-khimar-2.jpg" },
  { id: "13", name: "Champagne Silk Hijab", price: 1499, category: "Hijabs & Scarves", imageUrl: "/assets/product-hijab-1.jpg" },
  { id: "14", name: "Premium Hijab Collection", price: 2999, category: "Hijabs & Scarves", imageUrl: "/assets/collection-hijabs.jpg" },
  { id: "15", name: "Premium Evening Dress", price: 8999, category: "Modest Dresses", imageUrl: "/assets/product-1.jpg" },
  { id: "16", name: "Golden Occasion Dress", price: 11999, category: "Occasion Wear", imageUrl: "/assets/product-2.jpg" },
];

let orders = [
  {
    id: "o1",
    customerName: "Fatima",
    phone: "+91 9000000001",
    address: "H NO.xxx-xx-xx, Borabanda, Hyderabad",
    products: [{ productId: "1", name: "Champagne Embroidered Abaya", qty: 1, price: 8999 }],
    totalAmount: 8999,
    status: "Pending",
    createdAt: new Date().toISOString(),
  },
  {
    id: "o2",
    customerName: "Ayesha",
    phone: "+91 9000000002",
    address: "Hyderabad",
    products: [
      { productId: "6", name: "Dusty Rose Maxi Dress", qty: 1, price: 5999 },
      { productId: "13", name: "Champagne Silk Hijab", qty: 1, price: 1499 },
    ],
    totalAmount: 7498,
    status: "Shipped",
    createdAt: new Date().toISOString(),
  },
];

let users = [
  { id: "u1", name: "Fatima", phone: "+91 9000000001", email: "fatima@example.com" },
  { id: "u2", name: "Ayesha", phone: "+91 9000000002", email: "ayesha@example.com" },
  { id: "u3", name: "Zara", phone: "+91 9000000003", email: "zara@example.com" },
];

app.get("/api/products", (_req, res) => {
  res.json(products);
});

app.post("/api/products", (req, res) => {
  const { id, name, price, category, imageUrl } = req.body || {};
  if (!name || !category || !imageUrl || typeof price !== "number" || price <= 0) {
    return res.status(400).json({ error: "Invalid product data" });
  }
  const product = { id: id || crypto.randomUUID(), name, price, category, imageUrl };
  products = [product, ...products];
  res.status(201).json(product);
});

app.delete("/api/products/:id", (req, res) => {
  const { id } = req.params;
  const exists = products.some((p) => p.id === id);
  products = products.filter((p) => p.id !== id);
  res.json({ ok: true, deleted: exists });
});

app.post("/api/auth/login", (req, res) => {
  const email = String((req.body?.email ?? "")).trim().toLowerCase();
  const password = String((req.body?.password ?? "")).trim();
  if (email === "admin@nazima.com" && password === "123456") {
    return res.json({ ok: true });
  }
  res.status(401).json({ ok: false, error: "Invalid credentials" });
});

app.get("/api/orders", (_req, res) => {
  res.json(orders);
});

app.post("/api/orders", (req, res) => {
  const { customerName, phone, address, products: prods, totalAmount } = req.body || {};
  if (!customerName || !phone || !address || !Array.isArray(prods) || typeof totalAmount !== "number") {
    return res.status(400).json({ error: "Invalid order data" });
  }
  const order = {
    id: crypto.randomUUID(),
    customerName,
    phone,
    address,
    products: prods,
    totalAmount,
    status: "Pending",
    createdAt: new Date().toISOString(),
  };
  orders = [order, ...orders];
  res.status(201).json(order);
});

app.put("/api/orders/:id", (req, res) => {
  const { id } = req.params;
  const { status } = req.body || {};
  const allowed = ["Pending", "Shipped", "Delivered"];
  if (!allowed.includes(status)) return res.status(400).json({ error: "Invalid status" });
  let found = false;
  orders = orders.map((o) => {
    if (o.id === id) {
      found = true;
      return { ...o, status };
    }
    return o;
  });
  if (!found) return res.status(404).json({ error: "Order not found" });
  res.json({ ok: true });
});

app.get("/api/users", (_req, res) => {
  res.json(users);
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Admin products server running on http://localhost:${PORT}`);
});
