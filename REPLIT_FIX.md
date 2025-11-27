# 🔧 Replit Deployment - FIXED VERSION

## ✅ What Was Fixed

The "no webpage to preview" issue has been resolved by:

1. **Server Binding:** Changed from `localhost` to `0.0.0.0`
2. **Next.js Configuration:** Added `-H 0.0.0.0` flag
3. **Port Exposure:** Enabled `exposeLocalhost` in .replit
4. **Start Script:** Improved with proper port binding

## 🚀 Deploy to Replit (Step by Step)

### Step 1: Import Project

1. Go to [Replit.com](https://replit.com)
2. Click **"+ Create Repl"**
3. Select **"Import from GitHub"**
4. Paste: `https://github.com/owaisqarnikhan/bayg-spin-draw-system.git`
5. Click **"Import from GitHub"**

### Step 2: Add PostgreSQL Database

1. In your Repl, click **"Tools"** (left sidebar)
2. Search for **"PostgreSQL"**
3. Click **"+ Add"**
4. Wait for database to provision
5. Database URL is automatically set as `DATABASE_URL` secret ✅

### Step 3: Configure Environment (Optional)

Replit Secrets (Tools → Secrets):
- `DATABASE_URL` - Auto-set by PostgreSQL ✅
- `PORT` - `4000` (optional)
- `NODE_ENV` - `production` (optional)

### Step 4: Run the Project

Click the big green **"Run"** button at the top!

The script will automatically:
- ✅ Kill any existing processes
- ✅ Install backend dependencies
- ✅ Generate Prisma client
- ✅ Setup database (using `db push`)
- ✅ Start backend on `0.0.0.0:4000`
- ✅ Install frontend dependencies  
- ✅ Start frontend on `0.0.0.0:3000`

### Step 5: Access Your Application

Replit will automatically show the **Webview** tab!

Your URLs:
- **Main App:** Click the webview or use the Replit URL
- **Admin Panel:** Add `/admin` to your URL
- **Live Preview:** Add `/live` to your URL

Example URLs:
```
https://your-repl-name.yourusername.repl.co/
https://your-repl-name.yourusername.repl.co/admin
https://your-repl-name.yourusername.repl.co/live
```

## 🎯 How to Use

### 1. Admin Panel (`/admin`)

**Download Template:**
- Click "Download CSV Template"
- Get `BAYG_Employee_Template.csv`

**Fill Employee Data:**
```csv
tokenNumber,name
1,Ahmed Al-Khalifa
2,Fatima Hassan
3,Mohammed Ali
```

**Upload CSV:**
- Click "Upload CSV"
- Select your filled file
- Employees imported! ✅

**Start Lucky Draw:**
- Click "Start Spin"
- Winner appears on `/live` page
- Winner added to Winners list

### 2. Live Preview (`/live`)

**Setup:**
1. Open `/live` on projector/screen
2. Keep it visible
3. Admin starts spin from dashboard

**What Happens:**
- Wheel spins for 1 second
- Winner displayed (token + name)
- Auto-resets after 10 seconds

## 🐛 Troubleshooting

### Issue: "No webpage to preview"

**Solution:**
1. Stop the Repl (click Stop button)
2. In Shell, run:
   ```bash
   chmod +x start.sh
   ```
3. Click Run again

### Issue: Database connection error

**Solution:**
```bash
cd backend
npx prisma db push
```

### Issue: Frontend can't connect to backend

**Solution:**
1. Check that both servers started (look for "✅ BAYG Spin Draw System is running!" in console)
2. If using custom domain, update `frontend/.env.local`:
   ```env
   NEXT_PUBLIC_BACKEND_URL=https://your-repl-name.yourusername.repl.co:3000
   ```

### Issue: Port already in use

**Solution:**
The start script automatically kills old processes, but if needed:
```bash
pkill -f node
```
Then click Run again.

### Issue: Prisma Client not generated

**Solution:**
```bash
cd backend
npx prisma generate
```

## 📁 Project Structure on Replit

```
~/BAYG Spin Draw System/
├── start.sh              ← Main startup script
├── .replit              ← Replit configuration
├── replit.nix           ← Nix packages
│
├── backend/             ← Express API (Port 4000)
│   ├── src/
│   │   └── server.js    ← Binds to 0.0.0.0:4000
│   └── prisma/
│       └── schema.prisma
│
└── frontend/            ← Next.js App (Port 3000)
    ├── package.json     ← Uses -H 0.0.0.0
    └── src/app/
        ├── admin/       ← Admin dashboard
        └── live/        ← Live preview
```

## 🔍 Verify Everything Works

### 1. Check Console Output

You should see:
```
✅ BAYG Spin Draw System is running!
===============================================
📍 Frontend (Main): http://0.0.0.0:3000
📍 Backend API: http://0.0.0.0:4000
📍 Admin Panel: http://0.0.0.0:3000/admin
📍 Live Preview: http://0.0.0.0:3000/live
===============================================
```

### 2. Test the Webview

Replit should automatically show:
- The home page
- A "Webview" tab

### 3. Test Admin Panel

Navigate to `/admin`:
- You should see the dashboard
- Try downloading the CSV template
- Upload test data

### 4. Test Live Preview

Navigate to `/live`:
- You should see the spinning wheel
- Start spin from admin
- Winner should appear

## 🎨 Key Changes for Replit

### Backend Server (`backend/src/server.js`)
```javascript
// Before
server.listen(PORT, () => { ... });

// After (Replit compatible)
const HOST = '0.0.0.0';
server.listen(PORT, HOST, () => { ... });
```

### Frontend Server (`frontend/package.json`)
```json
{
  "scripts": {
    "dev": "next dev -H 0.0.0.0"
  }
}
```

### Port Configuration (`.replit`)
```toml
[[ports]]
localPort = 3000
externalPort = 80
exposeLocalhost = true  ← This is crucial!
```

## ✨ Success Indicators

✅ Console shows both servers running  
✅ Webview tab appears automatically  
✅ Can access `/admin` and `/live`  
✅ No "webpage to preview" error  
✅ Database connected successfully  

## 📞 Still Having Issues?

1. **Check the Console** - Look for error messages
2. **Restart the Repl** - Click Stop, then Run
3. **Clear Cache** - Run: `rm -rf node_modules && bash start.sh`
4. **Check PostgreSQL** - Make sure it's added in Tools
5. **Review Logs** - Look for specific error messages

## 🎯 Production Checklist

Before going live:
- [ ] PostgreSQL database added
- [ ] Test CSV upload with real data
- [ ] Test spin functionality
- [ ] Verify live preview on external screen
- [ ] Test with multiple simultaneous users
- [ ] Backup employee data

---

**Your BAYG Spin Draw System is now ready for Replit! 🚀**

The webview should appear automatically when you click Run.

**Made with ❤️ for BAYG 2025**
