# 🚀 MULTI-TENANT TRAVEL ERP - COMPLETE SETUP GUIDE

## Overview
- **50 Demo Businesses** - Each with own login & dashboard
- **AI Features** - 10 advanced features integrated
- **Environment Setup** - All keys & links configured
- **Database** - Fully wired with real-time sync
- **Subscription System** - 4 tiers (Basic, Medium, Advanced, Enterprise)
- **Admin Panel** - 20+ management modules

---

## 🔧 STEP 1: Environment Setup

### Copy Environment Template
```bash
cp .env.local.example .env.local
```

### Required Keys to Add

#### 1. Supabase Configuration
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_KEY=eyJhbGc...
```

#### 2. AI Services (Pick One or Use Multiple)
```
# Google Gemini (Recommended)
GOOGLE_GEMINI_API_KEY=AIza...

# OpenAI (Alternative)
OPENAI_API_KEY=sk-proj-...

# Claude (Alternative)
CLAUDE_API_KEY=sk-ant-...
```

#### 3. Payment Gateway
```
STRIPE_PUBLIC_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

#### 4. Email Service
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
```

#### 5. SMS Service (Twilio - for Pakistan)
```
TWILIO_ACCOUNT_SID=AC...
TWILIO_AUTH_TOKEN=...
TWILIO_PHONE_NUMBER=+1...
```

---

## 📊 STEP 2: Database Setup

### Run Migration Scripts in Order
```bash
# Script 1: Create main tables
psql -h your-db.supabase.co -U postgres -d postgres < scripts/001_initial_schema.sql

# Script 2: Seed 50 demo businesses
psql -h your-db.supabase.co -U postgres -d postgres < scripts/020_seed_50_demo_businesses.sql
```

### Database Tables Structure
```
companies
  ├── company_subscriptions
  ├── company_users
  ├── bookings
  ├── customers
  ├── invoices
  ├── travel_packages
  ├── visa_applications
  ├── hotels
  └── flights

subscription_plans (4 tiers)
admin_activity_logs
sync_queue (real-time)
```

---

## 🏢 STEP 3: Multi-Tenant Access

### 50 Pre-created Demo Businesses

Each business has:
- Unique company ID
- Admin user credentials
- Subscription plan (BASIC by default)
- Sample data (bookings, customers, invoices)

#### Access Demo Businesses
```
Dashboard: http://localhost:3000/dashboard
Businesses: 50 unique companies loaded
Each sees ONLY their data
```

---

## 🤖 STEP 4: AI Features Integration

### 10 AI Features Available

**1. Lead Scoring** - Auto-qualify leads
```
Page: /dashboard/crm/leads/ai-scoring
AI scores each lead 0-100
```

**2. Invoice Generation** - Auto-create invoices from bookings
```
API: /api/ai/generate-invoice
Extracts booking details → creates invoice
```

**3. Smart Recommendations** - Suggest tours based on history
```
Based on: Previous trips, budget, style
Returns: 3 recommended packages
```

**4. Dynamic Pricing** - Adjust prices based on demand
```
Inputs: Base price, bookings, season
Output: Optimal price for maximum revenue
```

**5. Visa Requirements** - Auto-list required documents
```
Input: Country, visa type, nationality
Output: Complete document checklist
```

**6. Itinerary Optimization** - Optimize day-by-day plans
```
Input: Destination, duration, activities
Output: Optimal itinerary order
```

**7. Smart Notifications** - Generate professional alerts
```
Triggered on: Booking, payment, deadline
Content: AI-written professional message
```

**8. Expense Categorization** - Auto-categorize expenses
```
Input: Description, amount, date
Output: Category + anomaly detection
```

**9. Customer Support Chatbot** - AI chat responses
```
Available 24/7 for customer queries
Trained on company data
```

**10. Revenue Forecasting** - Predict next 3 months revenue
```
Based on: Current metrics, growth rate, seasonality
Output: Month-by-month forecast
```

---

## 🎯 STEP 5: Running the Application

### Development
```bash
npm run dev
```

### Access Points
```
Admin: http://localhost:3000/admin
User Dashboard: http://localhost:3000/dashboard
Register New Business: http://localhost:3000/auth/register-business
```

---

## 👥 STEP 6: Demo Business Access

### Pre-loaded Admin Credentials
Each of 50 businesses has auto-generated admin account.

To access demo data:
1. Go to: `/auth/register-business`
2. Register a new business OR
3. Use pre-created admin accounts (see scripts/020)

### Admin Panel
```
Path: /admin
Access: Admin users only
Modules: 20+ business management tools

Available Modules:
- Dashboard
- Businesses (all 50)
- Subscriptions & Plans
- Users & Permissions
- Payments & Transactions
- Reports & Analytics
- Support Tickets
- Activity Logs
- Settings
- And 11+ more
```

---

## 🔐 STEP 7: Security & Multi-Tenancy

### Company Data Isolation
```typescript
// Each query automatically filters by company_id
// Users can ONLY see their company data

// Example: Get bookings
const bookings = await getCompanyBookings()
// Returns only bookings for logged-in user's company
```

### Role-Based Access Control
```
Admin - Full access
Manager - Limited management access
User - View-only access
```

### Subscription Limits
```
BASIC - 5 users, 100 bookings, core features
MEDIUM - 25 users, 500 bookings, + finance
ADVANCED - 100 users, 1000 bookings, + analytics
ENTERPRISE - Unlimited everything
```

---

## 📈 STEP 8: Real-Time Updates

### Instant Data Sync
```typescript
// Changes in database instantly update UI
import { subscribeToCompanyData } from '@/lib/multi-tenant-db'

subscribeToCompanyData('bookings', (payload) => {
  // Real-time update when booking changes
})
```

---

## 🚀 STEP 9: Deployment

### Deploy to Vercel
```bash
git add .
git commit -m "Add multi-tenant Travel ERP"
git push origin main
```

### Environment Variables on Vercel
1. Go to Vercel Dashboard
2. Project Settings → Environment Variables
3. Add all values from .env.local

### PWA Deployment
```
✓ Manifest: /public/manifest.json
✓ Service Worker: /public/sw.js
✓ Install prompt enabled
✓ Offline support enabled
```

---

## 📱 STEP 10: PWA & Offline Support

### Install as Mobile App
1. Visit app on mobile
2. Click "Install" prompt
3. App works offline with cached data

### Offline Features
- Browse cached data
- Create records (sync when online)
- Full functionality without internet

---

## ✅ VERIFICATION CHECKLIST

- [ ] .env.local configured with all keys
- [ ] Database migrations executed
- [ ] 50 demo businesses loaded
- [ ] Admin panel accessible
- [ ] Multiple businesses login working
- [ ] AI features responding
- [ ] Real-time sync working
- [ ] Subscription limits enforced
- [ ] PWA installable
- [ ] Offline mode working

---

## 🆘 TROUBLESHOOTING

### Businesses Not Showing
```bash
# Re-run seed script
psql -f scripts/020_seed_50_demo_businesses.sql
```

### AI Features Not Working
- Check API key in .env.local
- Verify API quota limits
- Check network requests in browser DevTools

### Multi-Tenant Not Isolating
- Check company_id in queries
- Verify RLS policies enabled in Supabase
- Check user company association

---

## 📞 Support
- Email: support@travelerp.com
- Docs: /docs
- Admin: /admin/support-tickets

---

**✨ Your Multi-Tenant Travel ERP is Ready! 🎉**

Start with registering a business or use demo credentials.
Each business has complete isolation and full feature access.
