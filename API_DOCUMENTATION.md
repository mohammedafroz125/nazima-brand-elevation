# StyledByNazima - API Documentation

## Setup Instructions

### 1. Install MongoDB (Local Development)

#### Windows
1. Download MongoDB Community Edition: https://www.mongodb.com/try/download/community
2. Run the installer and follow the setup wizard
3. MongoDB will run as a service by default

#### Verify MongoDB is running:
```bash
mongosh
# Should connect successfully
```

### 2. Update Environment Variables

Edit `server.env`:
```env
MONGODB_URI=mongodb://localhost:27017/nazima-brand
JWT_SECRET=your_jwt_secret_key_change_in_production
```

Or for MongoDB Atlas (cloud):
```env
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/nazima-brand
```

### 3. Start Backend

```bash
npm --prefix server run dev
```

---

## Authentication API

### Register User
**POST** `/api/auth/register`

```json
{
  "firstName": "Ahmed",
  "lastName": "Khan",
  "email": "ahmed@example.com",
  "phone": "+91-9876543210",
  "password": "SecurePass123",
  "confirmPassword": "SecurePass123"
}
```

**Response:**
```json
{
  "message": "Registration successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "_id": "user_mongo_id",
    "firstName": "Ahmed",
    "lastName": "Khan",
    "email": "ahmed@example.com",
    "role": "user"
  }
}
```

---

### Login User
**POST** `/api/auth/login`

```json
{
  "email": "ahmed@example.com",
  "password": "SecurePass123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": { ... }
}
```

---

### Get Current User
**GET** `/api/auth/me`

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

**Response:**
```json
{
  "_id": "user_mongo_id",
  "firstName": "Ahmed",
  "email": "ahmed@example.com",
  "addresses": [],
  "role": "user"
}
```

---

### Update Profile
**PUT** `/api/auth/profile`

**Headers:** `Authorization: Bearer token`

```json
{
  "firstName": "Ahmed",
  "lastName": "Khan",
  "phone": "+91-9876543210"
}
```

---

### Add Address
**POST** `/api/auth/addresses`

**Headers:** `Authorization: Bearer token`

```json
{
  "type": "home",
  "addressLine1": "123 Main Street",
  "addressLine2": "Apartment 4B",
  "city": "New York",
  "state": "NY",
  "zipCode": "10001",
  "country": "USA",
  "isDefault": true
}
```

---

### Update Address
**PUT** `/api/auth/addresses/:addressId`

**Headers:** `Authorization: Bearer token`

```json
{
  "addressLine1": "456 Oak Avenue",
  "isDefault": true
}
```

---

### Delete Address
**DELETE** `/api/auth/addresses/:addressId`

**Headers:** `Authorization: Bearer token`

---

## Products API

### Get All Products
**GET** `/api/products`

**Query Parameters:**
- `category`: "abayas" | "jilbab" | "khimar" | "dresses" | "hijabs"
- `minPrice`: number
- `maxPrice`: number
- `search`: string
- `isFeatured`: true | false
- `page`: 1 (default)
- `limit`: 12 (default)

**Response:**
```json
{
  "products": [
    {
      "_id": "product_id",
      "name": "Premium Abaya",
      "description": "Beautiful black abaya",
      "category": "abayas",
      "price": 4999,
      "discount": 10,
      "images": ["url1", "url2"],
      "sizes": [
        { "size": "S", "stock": 5 },
        { "size": "M", "stock": 3 }
      ],
      "rating": 4.5,
      "isFeatured": true
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 12,
    "total": 24,
    "pages": 2
  }
}
```

---

### Get Single Product
**GET** `/api/products/:productId`

**Response:**
```json
{
  "_id": "product_id",
  "name": "Premium Abaya",
  "price": 4999,
  "sizes": [ ... ],
  ...
}
```

---

### Create Product (Admin Only)
**POST** `/api/products`

**Headers:** `Authorization: Bearer admin_token`

```json
{
  "name": "Premium Abaya",
  "description": "Beautiful black abaya",
  "category": "abayas",
  "price": 4999,
  "discount": 10,
  "images": ["https://cdn.example.com/image1.jpg"],
  "sizes": [
    { "size": "S", "stock": 10 },
    { "size": "M", "stock": 8 },
    { "size": "L", "stock": 5 }
  ],
  "colors": ["Black", "Navy"],
  "material": "Premium Crepe",
  "isFeatured": true
}
```

---

### Update Product (Admin Only)
**PUT** `/api/products/:productId`

**Headers:** `Authorization: Bearer admin_token`

---

### Delete Product (Admin Only)
**DELETE** `/api/products/:productId`

**Headers:** `Authorization: Bearer admin_token`

---

## Cart API

### Get Cart
**GET** `/api/cart`

**Headers:** `Authorization: Bearer token`

**Response:**
```json
{
  "_id": "cart_id",
  "userId": "user_id",
  "items": [
    {
      "productId": "product_id",
      "name": "Premium Abaya",
      "price": 4499,
      "quantity": 2,
      "size": "M",
      "color": "Black",
      "image": "url"
    }
  ],
  "subtotal": 8998
}
```

---

### Add to Cart
**POST** `/api/cart/add`

**Headers:** `Authorization: Bearer token`

```json
{
  "productId": "product_id",
  "quantity": 1,
  "size": "M",
  "color": "Black"
}
```

---

### Update Cart Item
**PUT** `/api/cart/item/:itemId`

**Headers:** `Authorization: Bearer token`

```json
{
  "quantity": 3
}
```

---

### Remove from Cart
**DELETE** `/api/cart/item/:itemId`

**Headers:** `Authorization: Bearer token`

---

### Clear Cart
**DELETE** `/api/cart`

**Headers:** `Authorization: Bearer token`

---

## Orders API

### Get User Orders
**GET** `/api/orders`

**Headers:** `Authorization: Bearer token`

**Response:**
```json
[
  {
    "_id": "order_id",
    "orderId": "ORD-1234567890",
    "userId": "user_id",
    "items": [ ... ],
    "total": 8998,
    "paymentStatus": "completed",
    "orderStatus": "shipped",
    "createdAt": "2026-04-13T10:30:00Z"
  }
]
```

---

### Get Single Order
**GET** `/api/orders/:orderId`

**Headers:** `Authorization: Bearer token`

---

### Create Order (Checkout)
**POST** `/api/orders/checkout`

**Headers:** `Authorization: Bearer token`

```json
{
  "shippingAddress": {
    "firstName": "Ahmed",
    "lastName": "Khan",
    "phone": "+91-9876543210",
    "addressLine1": "123 Main Street",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA"
  },
  "paymentMethod": "razorpay"
}
```

**Response:**
```json
{
  "message": "Order created",
  "order": {
    "_id": "order_id",
    "orderId": "ORD-1234567890",
    "items": [ ... ],
    "subtotal": 8998,
    "tax": 1620,
    "shipping": 0,
    "total": 10618,
    "paymentStatus": "pending"
  },
  "razorpayData": {
    "amount": 1061800,
    "orderId": "ORD-1234567890"
  }
}
```

---

### Update Order Status (Admin Only)
**PUT** `/api/orders/:orderId/status`

**Headers:** `Authorization: Bearer admin_token`

```json
{
  "orderStatus": "shipped"
}
```

**Valid statuses:** pending, confirmed, processing, shipped, delivered, cancelled

---

## Razorpay Payment (Existing)

### Create Razorpay Order
**POST** `/create-order`

```json
{
  "amount": 10618,
  "currency": "INR",
  "customerName": "Ahmed Khan",
  "customerEmail": "ahmed@example.com",
  "productName": "Order #ORD-1234567890"
}
```

---

### Verify Payment
**POST** `/verify-payment`

```json
{
  "razorpay_order_id": "order_123",
  "razorpay_payment_id": "pay_123",
  "razorpay_signature": "signature_hash"
}
```

---

## Frontend Integration Examples

### Register User (React)
```javascript
const register = async (userData) => {
  const response = await fetch("http://localhost:3001/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  const data = await response.json();
  localStorage.setItem("token", data.token);
  return data;
};
```

### Get Cart
```javascript
const getCart = async (token) => {
  const response = await fetch("http://localhost:3001/api/cart", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.json();
};
```

### Get Products
```javascript
const getProducts = async (filters = {}) => {
  const params = new URLSearchParams(filters);
  const response = await fetch(`http://localhost:3001/api/products?${params}`);
  return response.json();
};
```

---

## Error Responses

All endpoints return standard error format:

```json
{
  "message": "Error description"
}
```

**Common Status Codes:**
- `400`: Bad request (missing/invalid fields)
- `401`: Unauthorized (missing/invalid token)
- `403`: Forbidden (insufficient permissions)
- `404`: Not found
- `500`: Server error

---

## Next Steps for You

After implementing the frontend integration:

1. **User Authentication**: Add login/register pages with localStorage token management
2. **Cart Persistence**: Store cart in MongoDB via API
3. **Checkout Flow**: Connect cart → orders → Razorpay payment
4. **Order Tracking**: Display user's order history with status updates
5. **Admin Dashboard**: Add admin pages for order/product management

---

## Database Models

### User Schema
```
- firstName (String, required)
- lastName (String, required)
- email (String, unique, required)
- phone (String, required)
- password (String, hashed, required)
- addresses (Array of Address objects)
- favoriteProducts (Array of Product IDs)
- role (String: "user" or "admin")
- createdAt, updatedAt (Timestamps)
```

### Product Schema
```
- name (String, required)
- description (String)
- category (Enum: abayas, jilbab, khimar, dresses, hijabs, scarfs, occasion, bridal, winter)
- price (Number, required)
- discount (Number: 0-100)
- images (Array of URLs)
- sizes (Array: { size: String, stock: Number })
- colors (Array of Strings)
- material (String)
- rating (Number: 0-5)
- isFeatured (Boolean)
- createdAt, updatedAt (Timestamps)
```

### Order Schema
```
- orderId (String, unique)
- userId (User reference)
- items (Array of cart items)
- shippingAddress (Object with full address)
- subtotal, tax, shipping, discount (Numbers)
- total (Number, required)
- paymentStatus (Enum: pending, completed, failed, refunded)
- orderStatus (Enum: pending, confirmed, processing, shipped, delivered, cancelled)
- paymentId (Razorpay payment ID)
- createdAt, updatedAt (Timestamps)
```

### Cart Schema
```
- userId (User reference, unique)
- items (Array of cart items)
- subtotal (Number)
- createdAt, updatedAt (Timestamps)
```

---

## Security Notes

✅ **Implemented:**
- Password hashing with bcryptjs
- JWT token-based authentication
- Admin role verification
- Input validation

📋 **To Implement:**
- Rate limiting
- HTTPS in production
- CORS whitelist (only your domain)
- API key rotation
- SQL injection prevention (using Mongoose)
- XSS protection headers

---

**Questions?** Refer to individual API section or check the backend route files in `/server/routes/`
