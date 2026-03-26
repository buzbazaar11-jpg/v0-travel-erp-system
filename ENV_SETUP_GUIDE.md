# Environment Setup Guide

## Prerequisites
- Node.js 18+ installed
- npm or pnpm package manager
- Supabase account (free tier works fine)
- Vercel account for deployment (optional)

## Step 1: Clone or Download Project
```bash
git clone <repository-url>
cd travel-erp
```

## Step 2: Install Dependencies
```bash
npm install
# or
pnpm install
```

## Step 3: Create Supabase Project

### 3.1 Create New Project
1. Go to https://supabase.com/dashboard
2. Click "New Project"
3. Choose:
   - Organization: Your org
   - Name: travel-erp
   - Database Password: (store securely)
   - Region: Closest to your users
4. Click "Create new project" and wait for completion

### 3.2 Get Your Credentials
1. Go to Project Settings → API
2. Copy:
   - **Project URL** (looks like: https://xxxxx.supabase.co)
   - **anon public key** (looks like: eyJ...)

## Step 4: Configure Environment Variables

### 4.1 Create `.env.local` file
Create a new file `.env.local` in project root (same level as package.json)

### 4.2 Add Supabase Variables
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000/dashboard
```

Replace `xxxxx.supabase.co` and `eyJ...` with your actual credentials

## Step 5: Setup Database

### 5.1 Connect to Supabase
1. In Supabase dashboard, go to SQL Editor
2. Create a new query

### 5.2 Run Migrations in Order
Copy and paste each migration file content from `/scripts` folder in this order:
1. `001_create_extensions.sql`
2. `002_create_base_tables.sql`
3. `003_create_accounting_tables.sql`
4. `004_create_crm_tables.sql`
5. `005_create_booking_tables.sql`
6. `006_create_service_provider_tables.sql`
7. `007_create_payment_documents_tables.sql`
8. `008_create_loyalty_reports_settings.sql`
9. `009_create_user_trigger.sql`
10. `010_seed_demo_users.sql` (optional - adds demo data)

For each file:
- Paste content into SQL Editor
- Click "Run"
- Wait for completion ✓

## Step 6: Create Admin User in Supabase

### 6.1 Create Auth User
1. Go to Supabase Dashboard
2. Navigate to Authentication → Users
3. Click "Add user"
4. Enter:
   - Email: `admin@eagent.com`
   - Password: `Mezu@1107`
   - Auto Confirm: Toggle ON
5. Click "Create user"

### 6.2 Verify User Created
User should appear in the Users list immediately

## Step 7: Run Development Server
```bash
npm run dev
```

Output should show:
```
> Local:        http://localhost:3000
```

## Step 8: Test the Application

### 8.1 Open in Browser
Navigate to: http://localhost:3000

### 8.2 Test Login
1. Click "Login" button
2. Email: `admin@eagent.com`
3. Password: `Mezu@1107`
4. Should redirect to dashboard

### 8.3 Explore Features
1. Visit different modules
2. Try creating sample records
3. Test responsive design (resize browser)
4. Check dark mode toggle

## Step 9: (Optional) Install PWA on Desktop
1. Click address bar icon (install button)
2. Click "Install" or "Add to home screen"
3. App installs as native application

---

## Environment Variables Reference

| Variable | Example | Purpose |
|----------|---------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | https://xxxxx.supabase.co | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | eyJ... | Public API key for frontend |
| `NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL` | http://localhost:3000/dashboard | Redirect after auth |

## Troubleshooting

### "Cannot find module '@supabase/ssr'"
```bash
npm install
npm run dev
```

### "Database connection failed"
- Verify Supabase URL is correct (no trailing slash)
- Check ANON_KEY is correct (should start with eyJ)
- Ensure `.env.local` file exists with correct values
- Restart dev server: Ctrl+C then `npm run dev`

### "User not found" on login
- Verify user exists in Supabase Authentication → Users
- Check email spelling matches exactly
- Ensure password is correct (Mezu@1107)
- If user missing, create via Supabase dashboard

### "Migration failed"
- Check you're running migrations in correct order
- Copy entire SQL file content (don't skip parts)
- Check for error messages in Supabase SQL Editor
- Verify RLS is enabled on created tables

### Port 3000 already in use
Use a different port:
```bash
npm run dev -- -p 3001
# or
PORT=3001 npm run dev
```

---

## Next Steps After Setup

1. **Explore the Dashboard** - Get familiar with modules
2. **Read Documentation** - Check README_ERP_SYSTEM.md
3. **Customize Settings** - Update company info in Settings
4. **Load Real Data** - Start adding your actual business data
5. **Test Workflows** - Create sample bookings and invoices
6. **Setup Payment Gateway** - Configure for actual payments
7. **Deploy to Vercel** - When ready for production

---

## Quick Reference Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Lint code
npm run lint

# Format code
npm run format
```

---

## Support Resources

- **Supabase Docs**: https://supabase.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Project README**: See README_ERP_SYSTEM.md
- **Deployment**: See DEPLOYMENT_GUIDE.md

---

**Setup Complete! You're ready to use Travel & Tours ERP.** 🎉
