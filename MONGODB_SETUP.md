# MongoDB Setup Guide for StyledByNazima

## Option 1: Local MongoDB (Recommended for Development)

### Windows Installation

#### Step 1: Download MongoDB
1. Go to https://www.mongodb.com/try/download/community
2. Select "Windows" as your OS
3. Download version 7.0 or later
4. Run the installer (.msi file)

#### Step 2: Installation Process
1. Accept the license agreement
2. **Important:** Choose "Complete" installation type
3. Check the box for "Install as a Service" (recommended)
4. Click "Next" → "Install"
5. MongoDB will now run automatically as a Windows Service

#### Step 3: Verify Installation
Open PowerShell and run:
```powershell
mongosh
```

You should see:
```
Current Mongo Server: 7.0.x
Current Date: ...
Test> 
```

**Success!** Type `exit` to quit.

---

### Start/Stop MongoDB Service

#### Start MongoDB
```powershell
# Service should start automatically, but to manually start:
net start MongoDB
```

#### Stop MongoDB
```powershell
net stop MongoDB
```

#### Check if MongoDB is Running
```powershell
Get-Service MongoDB
```

---

## Option 2: MongoDB Atlas (Cloud - Free Tier)

### Step 1: Create Account
1. Go to https://www.mongodb.com/cloud/atlas
2. Click "Sign Up"
3. Create account with email

### Step 2: Create Free Cluster
1. Click "Build a Database"
2. Select **M0 (Free Tier)**
3. Choose a cloud provider (AWS recommended)
4. Select a region close to you
5. Click "Create"

### Step 3: Set Database Access
1. Click "Database Access"
2. Click "Add New Database User"
3. Create username and password
4. Give it Database Admin privileges
5. Click "Add User"

### Step 4: Set Network Access
1. Click "Network Access"
2. Click "Add IP Address"
3. Select "Allow Access from Anywhere" (for dev)
4. Click "Confirm"

### Step 5: Get Connection String
1. Go to "Databases" → Click "Connect"
2. Select "Drivers"
3. Copy the connection string
4. Replace `<username>` and `<password>` with your credentials
5. Replace `myFirstDatabase` with `nazima-brand`

Example: 
```
mongodb+srv://afroz:password123@cluster0.abc123.mongodb.net/nazima-brand
```

### Step 6: Update Environment
Edit `server.env`:
```env
MONGODB_URI=mongodb+srv://username:password@cluster0.abc123.mongodb.net/nazima-brand
```

---

## Testing Database Connection

### Test from Backend

```bash
# Start backend
npm --prefix server run dev
```

You should see in console:
```
✓ MongoDB already connected
✓ Backend running on http://localhost:3001
✓ Database: MongoDB (connected)
```

### Test from MongoDB Shell

#### Local MongoDB:
```powershell
mongosh
```

#### MongoDB Atlas:
```powershell
mongosh "mongodb+srv://username:password@cluster0.abc123.mongodb.net/nazima-brand"
```

#### Create Test Document
```javascript
// In mongosh console:
use nazima-brand
db.users.insertOne({ name: "Test User", email: "test@example.com" })
db.users.find()
```

---

## Troubleshooting

### Error: "MongoDB connection failed"

**Solution 1: Check if MongoDB is running**
```powershell
Get-Service MongoDB
```

Should show "Running". If not:
```powershell
net start MongoDB
```

**Solution 2: Wrong connection string**
- Local: `mongodb://localhost:27017/nazima-brand`
- Atlas: `mongodb+srv://username:password@...`

**Solution 3: Firewall blocking**
- Ensure port 27017 is not blocked (local only)
- Atlas handles this automatically

### Error: "Authentication failed" (Atlas only)

- Check username and password
- Make sure special characters are URL-encoded
- Example: `pass@word` → `pass%40word`

### Error: "IP not whitelisted" (Atlas)

- Go to Network Access
- Add your IP address
- Or select "Allow Access from Anywhere" for dev

---

## Database Management

### View Databases
```javascript
show dbs
```

### View Collections (Tables)
```javascript
use nazima-brand
show collections
```

### View Sample Documents
```javascript
db.products.find().limit(2)
```

### Delete Database
```javascript
db.dropDatabase()
```

---

## MongoDB Compass (GUI Tool)

### Optional: Install MongoDB Compass
- Download from https://www.mongodb.com/products/compass
- Free GUI tool to view/edit data
- Great for debugging

### Connect to Local MongoDB
- Host: `localhost`
- Port: `27017`
- Click "Connect"

### Connect to MongoDB Atlas
- Paste your connection string
- Click "Connect"

---

## Data Backup & Export

### Export to JSON
```powershell
mongoexport --uri="mongodb://localhost:27017/nazima-brand" --collection=products --out=products.json
```

### Import from JSON
```powershell
mongoimport --uri="mongodb://localhost:27017/nazima-brand" --collection=products --file=products.json
```

---

## Next Steps

1. ✅ Set up MongoDB (local or Atlas)
2. ✅ Update `server.env` with connection string
3. ✅ Start backend: `npm --prefix server run dev`
4. ✅ Test API endpoints using provided documentation
5. ⏳ Implement frontend authentication & cart functionality

---

## Quick Start Command

After MongoDB is running:

```bash
# Terminal 1: Start Backend
npm --prefix server run dev

# Terminal 2: Start Frontend
npm run dev
```

Both should show "connected" messages.

---

**Stuck?** Check if:
- ✅ MongoDB service is running
- ✅ Connection string is correct in `server.env`
- ✅ Port 3001 is available for backend
- ✅ No firewall blocking connections
