# Quick Start Guide - Frontend Integration

## 🔧 Backend Status

✅ **All backend systems running:**
- MongoDB database (ready to connect)
- Express API server on http://localhost:3001
- JWT authentication system
- 14+ API endpoints
- Razorpay payment integration

---

## 📍 Key API Endpoints

| Method | Endpoint | Auth Required | Purpose |
|--------|----------|---------------|---------|
| POST | `/api/auth/register` | ❌ | Sign up new user |
| POST | `/api/auth/login` | ❌ | Login user |
| GET | `/api/auth/me` | ✅ | Get current user |
| GET | `/api/products` | ❌ | Get all products |
| GET | `/api/cart` | ✅ | Get user's cart |
| POST | `/api/cart/add` | ✅ | Add item to cart |
| POST | `/api/orders/checkout` | ✅ | Create order |
| GET | `/api/orders` | ✅ | Get order history |

---

## 🔐 Authentication Flow

### 1. User Registers/Logs In
```typescript
// Get token
const response = await fetch("http://localhost:3001/api/auth/register", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ firstName, lastName, email, phone, password, confirmPassword })
});

const { token, user } = await response.json();

// Store token
localStorage.setItem("token", token);
localStorage.setItem("user", JSON.stringify(user));
```

### 2. Make Authenticated Requests
```typescript
const token = localStorage.getItem("token");

const response = await fetch("http://localhost:3001/api/cart", {
  headers: { "Authorization": `Bearer ${token}` }
});
```

### 3. Handle Token Expiry
```typescript
if (response.status === 401) {
  // Token expired - redirect to login
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  navigate("/login");
}
```

---

## 🛒 Shopping Cart Flow

### Add Item to Cart
```typescript
const addToCart = async (productId, size, color, quantity) => {
  const response = await fetch("http://localhost:3001/api/cart/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ productId, quantity, size, color })
  });
  
  return await response.json();
};
```

### Get Cart Items
```typescript
const getCart = async () => {
  const response = await fetch("http://localhost:3001/api/cart", {
    headers: { "Authorization": `Bearer ${token}` }
  });
  
  const { items, subtotal } = await response.json();
  
  // Calculate totals
  const tax = subtotal * 0.18;
  const shipping = subtotal > 1000 ? 0 : 100;
  const total = subtotal + tax + shipping;
  
  return { items, subtotal, tax, shipping, total };
};
```

### Update Cart Item
```typescript
const updateQuantity = async (itemId, newQuantity) => {
  await fetch(`http://localhost:3001/api/cart/item/${itemId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ quantity: newQuantity })
  });
};
```

### Remove from Cart
```typescript
const removeFromCart = async (itemId) => {
  await fetch(`http://localhost:3001/api/cart/item/${itemId}`, {
    method: "DELETE",
    headers: { "Authorization": `Bearer ${token}` }
  });
};
```

---

## 💳 Checkout & Payment Flow

### Step 1: Create Order
```typescript
const handleCheckout = async (shippingAddress) => {
  const response = await fetch("http://localhost:3001/api/orders/checkout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({
      shippingAddress,
      paymentMethod: "razorpay"
    })
  });
  
  const { order, razorpayData } = await response.json();
  
  // Save order ID for later verification
  sessionStorage.setItem("currentOrder", JSON.stringify(order));
  
  return razorpayData;
};
```

### Step 2: Initiate Razorpay Payment
```typescript
const initializePayment = async (razorpayData) => {
  // Get public key
  const keyResponse = await fetch("http://localhost:3001/public-key");
  const { key_id } = await keyResponse.json();
  
  // Open Razorpay
  const options = {
    key: key_id,
    amount: razorpayData.amount,
    currency: "INR",
    name: "Styled By Nazima",
    description: "Premium Modest Fashion",
    order_id: razorpayData.orderId,
    handler: async (response) => {
      // Verify payment
      await verifyPayment(response);
    },
    theme: { color: "#D4AF37" } // Gold color
  };
  
  // Razorpay.open() is called automatically
  const razorpay = new window.Razorpay(options);
  razorpay.open();
};
```

### Step 3: Verify Payment
```typescript
const verifyPayment = async (response) => {
  const verifyResponse = await fetch("http://localhost:3001/verify-payment", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      razorpay_order_id: response.razorpay_order_id,
      razorpay_payment_id: response.razorpay_payment_id,
      razorpay_signature: response.razorpay_signature
    })
  });
  
  const result = await verifyResponse.json();
  
  if (result.success) {
    // Payment successful!
    // Clear cart from database
    await fetch("http://localhost:3001/api/cart", {
      method: "DELETE",
      headers: { "Authorization": `Bearer ${token}` }
    });
    
    // Redirect to thank you page
    navigate("/thank-you", { state: { orderId: result.order_id } });
  }
};
```

---

## 📦 Product Listing

### Get Products
```typescript
const getProducts = async (filters = {}) => {
  const params = new URLSearchParams({
    category: filters.category || "",
    minPrice: filters.minPrice || "",
    maxPrice: filters.maxPrice || "",
    search: filters.search || "",
    isFeatured: filters.isFeatured || false,
    page: filters.page || 1,
    limit: filters.limit || 12
  });
  
  const response = await fetch(
    `http://localhost:3001/api/products?${params}`
  );
  
  const { products, pagination } = await response.json();
  
  return { products, pagination };
};
```

### Get Single Product
```typescript
const getProductDetail = async (productId) => {
  const response = await fetch(
    `http://localhost:3001/api/products/${productId}`
  );
  
  return await response.json();
};
```

---

## 👤 User Profile

### Get User Details
```typescript
const getUserProfile = async () => {
  const response = await fetch("http://localhost:3001/api/auth/me", {
    headers: { "Authorization": `Bearer ${token}` }
  });
  
  return await response.json();
};
```

### Add Address
```typescript
const addAddress = async (addressData) => {
  const response = await fetch("http://localhost:3001/api/auth/addresses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(addressData)
  });
  
  return await response.json();
};
```

### Update Address
```typescript
const updateAddress = async (addressId, updates) => {
  const response = await fetch(
    `http://localhost:3001/api/auth/addresses/${addressId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(updates)
    }
  );
  
  return await response.json();
};
```

---

## 📋 Order History

### Get All Orders
```typescript
const getOrderHistory = async () => {
  const response = await fetch("http://localhost:3001/api/orders", {
    headers: { "Authorization": `Bearer ${token}` }
  });
  
  return await response.json();
};
```

### Get Order Details
```typescript
const getOrderDetail = async (orderId) => {
  const response = await fetch(
    `http://localhost:3001/api/orders/${orderId}`,
    {
      headers: { "Authorization": `Bearer ${token}` }
    }
  );
  
  return await response.json();
};
```

---

## 🛠️ Helper Utilities

### API Client
```typescript
// api.ts - Reusable API client

const API_URL = "http://localhost:3001";

export const apiClient = {
  async get(endpoint: string, token?: string) {
    const headers: any = { "Content-Type": "application/json" };
    if (token) headers["Authorization"] = `Bearer ${token}`;
    
    const response = await fetch(`${API_URL}${endpoint}`, { headers });
    return this.handleResponse(response);
  },
  
  async post(endpoint: string, data: any, token?: string) {
    const headers: any = { "Content-Type": "application/json" };
    if (token) headers["Authorization"] = `Bearer ${token}`;
    
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: "POST",
      headers,
      body: JSON.stringify(data)
    });
    return this.handleResponse(response);
  },
  
  async handleResponse(response: Response) {
    if (response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
      return null;
    }
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
    
    return await response.json();
  }
};

// Usage:
const products = await apiClient.get("/api/products");
const order = await apiClient.post("/api/orders/checkout", orderData, token);
```

### Auth Context (React)
```typescript
// AuthContext.tsx
import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Verify token on mount
    if (token) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);
  
  const fetchUser = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/auth/me", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        localStorage.removeItem("token");
        setToken(null);
      }
    } catch (err) {
      console.error("Failed to fetch user:", err);
    } finally {
      setLoading(false);
    }
  };
  
  const login = async (email, password) => {
    const response = await fetch("http://localhost:3001/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    
    const data = await response.json();
    
    if (response.ok) {
      localStorage.setItem("token", data.token);
      setToken(data.token);
      setUser(data.user);
      return data;
    } else {
      throw new Error(data.message);
    }
  };
  
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };
  
  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
```

---

## 🧪 Testing Your Integration

1. **Test Registration:**
   - Fill registration form
   - Should redirect to home page
   - Token should be in localStorage

2. **Test Product Listing:**
   - Products should load with filters
   - Search should work
   - Pagination should work

3. **Test Shopping Cart:**
   - Add item → should appear in cart
   - Update quantity → should persist
   - Remove item → should disappear
   - **Important:** Cart is in database, not localStorage!

4. **Test Checkout:**
   - Can select shipping address
   - Order created with correct totals
   - Razorpay payment opens
   - After payment → redirect to thank you
   - Email should be sent (check backend console)

---

## 🚨 Common Issues

### 401 Unauthorized
- Check if token is being sent in Authorization header
- Verify token format: `Bearer token_here` (space after Bearer!)
- Token might be expired (30-day expiry)

### 404 Not Found
- Check endpoint spelling
- Verify full path `/api/products` not just `/products`
- Check request method (GET vs POST)

### CORS Error
- Backend CORS is enabled in index.js
- If still failing, check allowed origins
- Make sure you're sending requests to `http://localhost:3001` not `http://localhost:3000`

### Cart Not Persisting
- Remember: Cart is in database, not localStorage!
- Must be authenticated (send token)
- Each user has their own cart

### Payment Not Working
- Check Razorpay test key credentials in server.env
- Payment handler must call verify endpoint
- Verify endpoint must receive all 3 fields: order_id, payment_id, signature

---

## 📚 Full Documentation

For complete API details, see:
- `API_DOCUMENTATION.md` - All endpoints with JSON examples
- `IMPLEMENTATION_SUMMARY.md` - Architecture overview
- `MONGODB_SETUP.md` - Database setup guide

---

**Backend is ready! Start integrating! 🚀**
