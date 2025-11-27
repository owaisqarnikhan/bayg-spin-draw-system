# 🚀 Quick Start Guide for Replit

## 1️⃣ Import Your Project to Replit

1. Go to [Replit](https://replit.com)
2. Click **"+ Create Repl"**
3. Choose **"Import from GitHub"**
4. Paste your repository URL: `https://github.com/owaisqarnikhan/bayg-spin-draw-system.git`
5. Click **"Import from GitHub"**

## 2️⃣ Configure Environment Variables

### Add Replit Secrets (Tools → Secrets):

**Backend Secrets:**
- **Key:** `DATABASE_URL`
  **Value:** Will be auto-configured by Replit PostgreSQL (see step 3)
- **Key:** `PORT`
  **Value:** `4000`
- **Key:** `NODE_ENV`
  **Value:** `production`

## 3️⃣ Add PostgreSQL Database

1. Click **"Tools"** icon in left sidebar
2. Search for **"PostgreSQL"**
3. Click **"Add"** to install PostgreSQL
4. Replit will automatically create and set the `DATABASE_URL` secret

## 4️⃣ Run the Project

Just click the big green **"Run"** button at the top! 🎯

The `start.sh` script will automatically:
- ✅ Install backend dependencies
- ✅ Generate Prisma client
- ✅ Run database migrations
- ✅ Start backend server (port 4000)
- ✅ Install frontend dependencies
- ✅ Start frontend server (port 3000)

## 5️⃣ Access Your Application

Once running, Replit will show you the URLs:

- **Frontend (Live Page):** `https://your-repl-name.yourusername.repl.co/live`
- **Admin Dashboard:** `https://your-repl-name.yourusername.repl.co/admin`
- **Backend API:** `https://your-repl-name.yourusername.repl.co:3000`

## 🎯 How to Use

### Admin Panel (`/admin`)
1. **Download Template:** Click "Download CSV Template"
2. **Fill Employee Data:** Add tokenNumber and name columns
3. **Upload CSV:** Click "Upload CSV" and select your file
4. **Start Drawing:** Click "Start Spin" button

### Live Preview (`/live`)
- Display this page on a projector/TV
- When admin clicks "Start Spin", the wheel spins
- Winner appears with token number and name
- Winner displayed for 10 seconds then resets

## 🔧 Troubleshooting

### Database Connection Error?
Run in Shell (Tools → Shell):
```bash
cd backend
npx prisma migrate deploy
```

### Frontend Can't Connect to Backend?
1. Go to frontend/.env.local
2. Update `NEXT_PUBLIC_BACKEND_URL` with your Replit backend URL
3. Restart the Repl

### Ports Not Working?
The `.replit` file is already configured:
- Port 3000 (Frontend) → External Port 80
- Port 4000 (Backend) → External Port 3000

## 📦 Project Structure

```
BAYG Spin Draw System/
├── start.sh                 # Main startup script
├── .replit                  # Replit configuration
├── replit.nix              # Nix packages
├── backend/
│   ├── prisma/
│   │   └── schema.prisma   # Database schema
│   ├── src/
│   │   └── server.js       # Express + Socket.io
│   └── package.json
└── frontend/
    ├── src/app/
    │   ├── admin/          # Admin dashboard
    │   └── live/           # Live preview
    └── package.json
```

## 🎨 Features

✅ Real-time lucky draw with spinning wheel  
✅ Admin panel for employee management  
✅ CSV import/export  
✅ Live preview for audience display  
✅ PostgreSQL database  
✅ Socket.io for real-time updates  
✅ Responsive design  

## 🔒 Security Notes

- Don't commit `.env` files (already in `.gitignore`)
- Use Replit Secrets for sensitive data
- PostgreSQL is automatically managed by Replit

## ✨ You're All Set!

Your BAYG Spin Draw System is ready for the **Bahrain Asian Youth Games 2025**! 🏆

**Support:** If you need help, check `REPLIT_DEPLOYMENT.md` for detailed documentation.
