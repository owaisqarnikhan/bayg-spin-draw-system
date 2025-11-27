# 🚀 Quick Start Guide

## Start the System (Both Backend & Frontend)

### Option 1: Using Two Terminals

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### Option 2: Using PowerShell Script

Create `start.ps1` in the root directory:
```powershell
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; npm run dev"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; npm run dev"
```

Then run: `.\start.ps1`

## Access the Application

1. **Home Page**: http://localhost:3000
2. **Admin Panel**: http://localhost:3000/admin
3. **Live Preview**: http://localhost:3000/live
4. **Backend API**: http://localhost:4000

## Test the System

### 1. Import Sample Data
1. Go to Admin Panel: http://localhost:3000/admin
2. Click "Upload CSV"
3. Select `sample_employees.csv`
4. Wait for success message
5. See 20 employees in the table

### 2. Test the Spin
1. Open Live Preview in another window/screen: http://localhost:3000/live
2. Go back to Admin Panel
3. Click "Start Spin"
4. Watch the live preview screen animate
5. See the winner displayed with confetti!

### 3. Verify Winner
1. Check Admin Panel - winner status changed to "WON"
2. Try spinning again - previous winner won't be selected
3. Check "Winners" count increased

## Common Tasks

### Reset Database
```bash
cd backend
rm dev.db
npx prisma migrate dev
```

### Clear All Winners
```bash
cd backend
npx prisma studio
# Manually update all employees status to NOT_WON
```

### Check Backend Status
Visit: http://localhost:4000
Should see: "Spin Draw System Backend is Running"

## Tips for LED Display

1. Open Live Preview: http://localhost:3000/live
2. Press F11 for fullscreen
3. Position on LED screen/projector
4. Control spins from Admin Panel on another device

## Keyboard Shortcuts

- **F11**: Toggle fullscreen (for live preview)
- **Ctrl + R**: Refresh page
- **Ctrl + Shift + I**: Open developer tools

## Next Steps

1. ✅ Import your actual employee data (CSV format)
2. ✅ Test the spin multiple times
3. ✅ Set up LED display with live preview
4. ✅ Position admin panel for operator
5. ✅ Start the event!

---

**Need Help?** Check the main README.md for detailed documentation.
