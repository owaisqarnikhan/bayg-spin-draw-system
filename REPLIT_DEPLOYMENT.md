# 🚀 BAYG Spin Draw System - Replit Deployment Guide

## Prerequisites
- A Replit account
- Basic knowledge of Replit's interface

## 📦 Deployment Steps

### Step 1: Import Project to Replit

1. Go to [Replit](https://replit.com)
2. Click "Create Repl"
3. Choose "Import from GitHub" (or upload your project files)
4. Select Node.js as the language

### Step 2: Setup PostgreSQL Database

1. In your Repl, click on the **Tools** icon in the left sidebar
2. Search for and add **PostgreSQL**
3. Replit will automatically:
   - Provision a PostgreSQL database
   - Set the `DATABASE_URL` environment variable
   - Start the database service

### Step 3: Backend Configuration

#### 3.1 Navigate to Backend Directory
```bash
cd backend
```

#### 3.2 Install Dependencies
```bash
npm install
```

#### 3.3 Generate Prisma Client
```bash
npx prisma generate
```

#### 3.4 Run Database Migrations
```bash
npx prisma migrate deploy
```

Or for development:
```bash
npx prisma migrate dev --name init
```

#### 3.5 (Optional) Seed Database with Sample Data
```bash
npm run seed
```

### Step 4: Frontend Configuration

#### 4.1 Navigate to Frontend Directory
```bash
cd ../frontend
```

#### 4.2 Install Dependencies
```bash
npm install
```

#### 4.3 Create Environment Variables
Create `.env.local` in the frontend directory:
```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:4000
```

For production on Replit, update with your backend URL:
```env
NEXT_PUBLIC_BACKEND_URL=https://your-repl-name.username.repl.co
```

### Step 5: Configure Replit Run Command

Create or update `.replit` file in the root directory:

```toml
run = "cd backend && npm run dev & cd frontend && npm run dev"

[nix]
channel = "stable-22_11"

[env]
PATH = "/home/runner/$REPL_SLUG/.config/npm/node_global/bin:/home/runner/$REPL_SLUG/node_modules/.bin"

[[ports]]
localPort = 3000
externalPort = 80

[[ports]]
localPort = 4000
externalPort = 3000
```

### Step 6: Start the Application

Click the **Run** button in Replit, or execute:
```bash
npm start
```

The application will start:
- **Frontend**: Port 3000 (mapped to external port 80)
- **Backend**: Port 4000 (mapped to external port 3000)

## 🔧 Environment Variables in Replit

### Backend (.env)
These are automatically set by Replit:
- `DATABASE_URL` - Automatically configured by Replit PostgreSQL

You can add additional variables in the Replit Secrets tab:
- `PORT` - 4000
- `NODE_ENV` - production
- `FRONTEND_URL` - Your Replit frontend URL

### Frontend (.env.local)
- `NEXT_PUBLIC_BACKEND_URL` - Your Replit backend URL

## 📝 Important Notes

### Database Connection
- Replit provides a **managed PostgreSQL database**
- The `DATABASE_URL` is automatically set as a secret
- No manual database configuration needed

### Port Configuration
- Frontend runs on port **3000**
- Backend runs on port **4000**
- Replit's port forwarding handles external access

### File Uploads
- Uploaded CSV files are stored in memory
- For persistent storage, consider using Replit's file system or external storage (AWS S3, etc.)

## 🎯 Admin Panel Workflow

### 1. Download CSV Template
1. Navigate to `/admin`
2. Click "Download CSV Template"
3. Template contains: `tokenNumber,name`

### 2. Fill Employee Data
1. Open template in Excel
2. Add employee data (tokenNumber and name)
3. Save as CSV

### 3. Upload CSV
1. Click "Upload CSV" in admin panel
2. Select your filled CSV file
3. Employees are imported to database

### 4. Run Lucky Draw
1. Click "Start Spin"
2. Winner appears on `/live` page
3. Winners are tracked in the Winners section

## 🔍 Troubleshooting

### Database Connection Issues
```bash
# Check database status
npx prisma db push

# Reset database (WARNING: Deletes all data)
npx prisma migrate reset
```

### Port Already in Use
```bash
# Kill processes on ports and restart
pkill -f "node"
```

### Prisma Client Issues
```bash
# Regenerate Prisma client
npx prisma generate
```

## 📚 Project Structure

```
BAYG Spin Draw System/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma        # Database schema (PostgreSQL)
│   │   └── prisma.config.ts     # Database configuration
│   ├── src/
│   │   ├── controllers/         # Business logic
│   │   ├── routes/              # API routes
│   │   ├── lib/                 # Utilities (Prisma client, Socket.io)
│   │   └── server.js            # Express server
│   ├── package.json
│   └── .env                     # Environment variables (auto-set by Replit)
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── admin/           # Admin dashboard
│   │   │   ├── live/            # Live preview page
│   │   │   └── page.tsx         # Home page
│   │   └── lib/
│   │       └── socket.ts        # Socket.io client
│   ├── package.json
│   └── .env.local               # Frontend environment variables
│
└── sample_employees.csv         # Sample CSV with tokenNumber and name
```

## 🎨 Features

### Admin Dashboard (`/admin`)
- ✅ Download CSV Template (tokenNumber, name)
- ✅ Upload CSV with employee data
- ✅ Start Lucky Draw spin
- ✅ View all employees (searchable, paginated)
- ✅ View all winners (searchable, paginated)
- ✅ Real-time stats (Total, Winners, Remaining)

### Live Preview (`/live`)
- ✅ Colorful spinning wheel (BAYG logo colors)
- ✅ 1-second spin animation
- ✅ Winner display (Token Number + Name)
- ✅ Real-time updates via Socket.io
- ✅ Responsive design (mobile to 8K)

## 🔒 Security Considerations

1. **Database**: PostgreSQL is managed by Replit with automatic backups
2. **Environment Variables**: Use Replit Secrets for sensitive data
3. **CORS**: Configure allowed origins in backend server
4. **File Uploads**: Validate CSV format and content

## 📊 Database Schema

```prisma
model Employee {
  id          Int       @id @default(autoincrement())
  name        String
  department  String?
  phone       String?
  tokenNumber String    @unique
  status      String    @default("NOT_WON")
  prizeId     Int?
  prize       Prize?    @relation(fields: [prizeId], references: [id])
  wonAt       DateTime?
  createdAt   DateTime  @default(now())
}
```

## 🚀 Ready for Production!

Your BAYG Spin Draw System is now configured for Replit with:
- ✅ PostgreSQL database
- ✅ Simplified CSV format (tokenNumber, name)
- ✅ Real-time lucky draw functionality
- ✅ Responsive admin and live preview
- ✅ Optimized for 2500+ employees

**Access your application:**
- Admin: `https://your-repl.username.repl.co/admin`
- Live: `https://your-repl.username.repl.co/live`

Good luck with the Bahrain Asian Youth Games 2025! 🎯🏆
