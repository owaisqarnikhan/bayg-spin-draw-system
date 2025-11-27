# 🎯 BAYG Spin Draw System

A professional lucky draw system for the Bahrain Asian Youth Games 2025, featuring real-time spinning animations, admin dashboard, and live preview display.

## 🌟 Features

### Admin Dashboard (`/admin`)
- ✅ **Download CSV Template** - Get Excel-compatible template with tokenNumber and name
- ✅ **Upload CSV** - Import employee data from filled template
- ✅ **Start Spin** - Initiate lucky draw with 1-second animation
- ✅ **Employee List** - Searchable, paginated view of all employees
- ✅ **Winners List** - Separate section for all winners with search
- ✅ **Real-time Stats** - Total employees, winners, and remaining

### Live Preview (`/live`)
- ✅ **Spinning Wheel** - Colorful 8-segment wheel with BAYG logo colors
- ✅ **Fast Animation** - 1-second spin with random token number flash
- ✅ **Winner Display** - Show token number and name only
- ✅ **Real-time Updates** - Socket.io for instant winner announcement
- ✅ **Fully Responsive** - Mobile to 8K display support

## 📦 Project Structure

```
BAYG Spin Draw System/
├── backend/                    # Express.js API server
│   ├── prisma/
│   │   ├── schema.prisma      # PostgreSQL database schema
│   │   └── prisma.config.ts   # Database configuration
│   ├── src/
│   │   ├── controllers/       # Business logic
│   │   ├── routes/            # API endpoints
│   │   ├── lib/               # Utilities (Prisma, Socket.io)
│   │   └── server.ts          # Express server setup
│   └── package.json
│
├── frontend/                   # Next.js 14 application
│   ├── src/
│   │   ├── app/
│   │   │   ├── admin/         # Admin dashboard
│   │   │   ├── live/          # Live preview page
│   │   │   └── page.tsx       # Home page
│   │   └── lib/
│   │       └── socket.ts      # Socket.io client
│   └── package.json
│
├── sample_employees.csv        # Sample CSV (tokenNumber, name)
├── REPLIT_DEPLOYMENT.md        # Replit deployment guide
└── README.md                   # This file
```

## 🚀 Quick Start

### Option 1: Replit Deployment (Recommended for Production)

See [REPLIT_DEPLOYMENT.md](./REPLIT_DEPLOYMENT.md) for complete setup instructions.

**Quick Steps:**
1. Import project to Replit
2. Add PostgreSQL database from Tools
3. Run the project
4. Access admin at `/admin` and live at `/live`

### Option 2: Local Development

#### Prerequisites
- Node.js 18+ and npm
- PostgreSQL database (or use Replit's managed PostgreSQL)

#### Backend Setup
```bash
cd backend
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run dev
```

Backend runs on: `http://localhost:4000`

#### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

Frontend runs on: `http://localhost:3000`

## 🗄️ Database Configuration

### Replit (Production)
- Uses **PostgreSQL** managed by Replit
- `DATABASE_URL` automatically set
- No manual configuration needed

### Local Development
Update `backend/prisma/prisma.config.ts`:
```typescript
export default {
  datasources: {
    db: {
      url: 'postgresql://user:password@localhost:5432/bayg_db'
    }
  }
};
```

## 📊 CSV Template Format

The system uses a simplified CSV format with only 2 columns:

```csv
tokenNumber,name
1,Ahmed Al-Khalifa
2,Fatima Hassan
3,Mohammed Ali
```

### Workflow:
1. **Download** template from admin panel
2. **Fill** with employee data in Excel
3. **Upload** CSV file
4. **View** employees in Employee List
5. **Start** spin to select winner

## 🎨 Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Socket.io Client** - Real-time updates
- **Lucide React** - Icons

### Backend
- **Express.js** - Web server
- **Prisma 7** - ORM with PostgreSQL
- **Socket.io** - Real-time communication
- **Multer** - File upload handling
- **csv-parser** - CSV processing

### Database
- **PostgreSQL** - Production (Replit)
- Prisma schema with Employee, Prize, Admin, and SpinLog models

## 🔧 API Endpoints

### Employees
- `GET /api/employees` - Get all employees
- `POST /api/employees/import` - Upload CSV file
- `DELETE /api/employees/:id` - Delete employee

### Spin
- `POST /api/spin/start` - Start lucky draw
- `GET /api/spin/winners` - Get all winners

## 🎯 Usage Guide

### Admin Panel

1. **Access Admin**
   ```
   http://localhost:3000/admin (local)
   https://your-repl.username.repl.co/admin (Replit)
   ```

2. **Download CSV Template**
   - Click "Download CSV Template"
   - Opens with headers: `tokenNumber,name`
   - Contains 10 sample rows for reference

3. **Prepare Employee Data**
   - Open template in Excel
   - Fill with your employee data
   - Keep header row intact
   - Save as CSV file

4. **Upload Data**
   - Click "Upload CSV"
   - Select your filled CSV
   - Data imports to database
   - View in Employee List

5. **Run Lucky Draw**
   - Click "Start Spin"
   - Winner selected randomly from remaining employees
   - Live page shows spinning animation
   - Winner displayed with token number and name

### Live Preview

1. **Access Live Page**
   ```
   http://localhost:3000/live (local)
   https://your-repl.username.repl.co/live (Replit)
   ```

2. **Display States**
   - **Waiting**: Static colorful wheel
   - **Spinning**: Fast rotation (1 second)
   - **Winner**: Token number and name display

3. **Features**
   - Real-time updates via Socket.io
   - BAYG logo colors (gold, red, orange, green, blue)
   - Responsive design for all screens
   - Footer with event branding

## 🎨 Design Details

### Live Preview Page
- **Background**: Dark gray (#2d3436)
- **Logo**: Top-left with proper sizing
- **LIVE Indicator**: Top-right with pulsing green dot
- **Spinning Wheel**: 8 segments, BAYG colors, static by default
- **Winner Card**: Large token number and name display
- **Mascot & Decorative**: Bottom corners, above footer
- **Footer**: Always visible with event branding

### Admin Dashboard
- **Purple/Blue Gradient**: Professional look
- **Stats Cards**: Total, Winners, Remaining
- **Three Buttons**: Download, Upload, Start Spin
- **Two Tables**: Winners (yellow highlight) and Employees
- **Search Bars**: Real-time filtering
- **Pagination**: Load more functionality for 2500+ records

## 📈 Performance

- **Client-side Pagination**: 50 items per page
- **Lazy Loading**: Load more on demand
- **Optimized Search**: Filters on loaded data
- **Sticky Headers**: Better UX
- **Efficient Rendering**: Only visible items

## 🔒 Security

- **Database**: PostgreSQL with Prisma ORM
- **Environment Variables**: Secure credential storage
- **File Validation**: CSV format and content checks
- **CORS**: Configured allowed origins

## 📝 Environment Variables

### Backend (.env)
```env
DATABASE_URL=postgresql://...  # Auto-set by Replit
PORT=4000
NODE_ENV=production
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:4000
```

## 🐛 Troubleshooting

### Database Issues
```bash
# Regenerate Prisma client
npx prisma generate

# Reset database (WARNING: Deletes all data)
npx prisma migrate reset

# View database in GUI
npx prisma studio
```

### Port Conflicts
```bash
# Kill processes
pkill -f "node"
```

### CSV Upload Errors
- Ensure headers are: `tokenNumber,name`
- Check for duplicate token numbers
- Verify file is saved as CSV (not Excel)

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px - 1920px
- **2K**: 1920px - 2560px
- **4K**: 2560px - 3840px
- **8K**: 3840px+

## 🎯 Ready for Production!

This system is optimized for:
- ✅ 2500+ employee records
- ✅ Real-time lucky draw
- ✅ Excel CSV compatibility
- ✅ Replit PostgreSQL deployment
- ✅ Mobile to 8K responsiveness

## 📄 License

MIT License - See LICENSE file for details

## 👥 Credits

Developed for the **Bahrain Asian Youth Games 2025**  
By **Innovance Orbit**

---

**Good luck with your lucky draw event! 🎉🏆**
