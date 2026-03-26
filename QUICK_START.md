# Quick Start Guide - Travel & Tours ERP

## 🚀 Access the System

### Demo Credentials
```
Email:    admin@eagent.com
Password: Mezu@1107
Phone:    03142678230
Role:     Admin (Full Access)
```

### Quick Access Links
- **Home Page**: https://travel-erp.vercel.app/
- **Login**: https://travel-erp.vercel.app/auth/login
- **Sign Up**: https://travel-erp.vercel.app/auth/sign-up
- **Demo Credentials Page**: https://travel-erp.vercel.app/auth/demo-credentials
- **Dashboard**: https://travel-erp.vercel.app/dashboard

---

## 🎯 What's Already Pre-Populated

### Demo Data Available:
1. **Admin User Account** - Full system access
2. **Demo Company** - "EAgent Travel & Tours" with branches and departments
3. **Chart of Accounts** - Ready for bookkeeping
4. **Travel Packages** - Umrah, Tours, and special packages
5. **Hotels** - Pre-registered luxury hotels
6. **Sample Customers** - Individual and corporate customers
7. **GST Configuration** - Pakistan tax rates configured

---

## 📋 System Modules Overview

### CRM Module
- **Leads Management** - Track and score potential customers
- **Customers** - Manage individual and corporate customers
- **Sales Pipeline** - Track deals through stages
- **Interactions** - Log calls, emails, and meetings

### Bookings Module
- **Create Bookings** - Multi-step booking process
- **Manage Passengers** - Track passenger details
- **Itinerary Builder** - Create custom itineraries with drag-and-drop

### Tours & Packages
- **Package Management** - Create and manage tour packages
- **Package Templates** - Pre-built packages for common destinations
- **Pricing** - Set base and selling prices with profit margins

### Travel Services
- **Visa Applications** - Track visa processing
- **Hotels** - Manage hotel inventory and availability
- **Flights** - Track flight bookings
- **Transportation** - Manage ground transport

### Finance & Accounting
- **Dashboard** - Financial KPIs and summaries
- **General Ledger** - Double-entry bookkeeping
- **Trial Balance** - Account reconciliation
- **Reports** - Financial and operational reports

### Invoicing & Payments
- **Invoices** - Create and manage customer invoices
- **Payments** - Track payment received
- **GST Compliance** - Automatic GST calculations

### Additional Features
- **Loyalty Program** - Customer reward points
- **Notifications Hub** - System-wide notifications
- **Document Management** - Store and track documents
- **Settings** - Customize company preferences

---

## ⚙️ Initial Setup Steps

### 1. Environment Variables
Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000/dashboard
```

### 2. Database Setup
1. Go to your Supabase dashboard
2. Run the migration scripts in order:
   - `scripts/001_create_extensions.sql`
   - `scripts/002_create_base_tables.sql`
   - `scripts/003_create_accounting_tables.sql`
   - `scripts/004_create_crm_tables.sql`
   - `scripts/005_create_booking_tables.sql`
   - `scripts/006_create_service_provider_tables.sql`
   - `scripts/007_create_payment_documents_tables.sql`
   - `scripts/008_create_loyalty_reports_settings.sql`
   - `scripts/009_create_user_trigger.sql`
   - `scripts/010_seed_demo_users.sql` (Optional - for demo data)

### 3. Create Auth User in Supabase
1. Go to Supabase Dashboard → Authentication → Users
2. Create a new user with:
   - Email: `admin@eagent.com`
   - Password: `Mezu@1107`
   - Or use the SQL script to seed automatically

### 4. Run Development Server
```bash
npm install
npm run dev
```

The application will be available at `http://localhost:3000`

---

## 🔐 Default User Roles

| Role | Permissions | Access |
|------|------------|--------|
| **Admin** | All | Full system access |
| **Manager** | Bookings, CRM, Finance | Department management |
| **Staff** | Bookings, CRM | Basic operations |

---

## 📱 PWA Installation

### Desktop Installation
1. Open the app in Chrome/Edge
2. Click the "Install" button in the address bar
3. The app will be installed as a desktop application

### Mobile Installation
1. Open the app in mobile browser
2. Tap "Share" → "Add to Home Screen"
3. The app will appear on your home screen

### Offline Access
- Once installed, the app works offline
- Changes sync when connection is restored

---

## 🎨 Customization Options

### Change Company Name
1. Go to Settings module
2. Update company details
3. Logo and branding options available

### Modify Modules
1. Navigate to respective modules
2. Create, edit, or delete records as needed
3. All changes are saved in real-time

### Set Tax Rates
1. Go to Finance → Reports
2. Configure GST and other tax rates
3. Applied automatically to all invoices

---

## 🐛 Troubleshooting

### Login Issues
- Verify email and password are correct
- Check if user exists in Supabase
- Clear browser cache and try again

### Database Connection
- Verify Supabase URL and keys are correct
- Check if all migrations have been run
- Ensure RLS policies are properly configured

### Module Access
- Check user role permissions
- Verify company and branch assignments
- Clear session and re-login

---

## 📞 Support

### Documentation Files
- `README_ERP_SYSTEM.md` - Detailed module documentation
- `DEPLOYMENT_GUIDE.md` - Production deployment steps
- `IMPLEMENTATION_SUMMARY.md` - Technical overview

### Common Tasks

#### Create a New Tour Package
1. Go to Tours → Create Package
2. Fill package details (name, duration, price)
3. Set availability dates
4. Save and publish

#### Process a Booking
1. Go to Bookings → New Booking
2. Select customer and package
3. Add passengers
4. Set payment status
5. Confirm booking

#### Generate Invoice
1. Go to Finance → Invoices
2. Create new invoice
3. Link to booking
4. Set payment terms
5. Send to customer

#### Track Visa Application
1. Go to Visa → Applications
2. Create new application
3. Upload documents
4. Track status progression
5. Update when approved

---

## ✅ Verification Checklist

Before going live, ensure:
- [ ] All environment variables are set
- [ ] Database migrations are completed
- [ ] Admin user is created and can login
- [ ] Sample data is visible in all modules
- [ ] PWA installation works
- [ ] Dark mode toggle functions
- [ ] Mobile responsiveness verified
- [ ] All notifications work
- [ ] PDF exports generate correctly
- [ ] Backup strategy is in place

---

## 🚢 Deployment

### Deploy to Vercel
```bash
npm run build
vercel deploy --prod
```

### Production Checklist
- [ ] Update environment variables for production
- [ ] Enable HTTPS
- [ ] Set up monitoring and logging
- [ ] Configure backup strategy
- [ ] Update DNS records
- [ ] Test all critical workflows
- [ ] Train team on the system
- [ ] Create user documentation

---

## 📊 Key Features to Explore

1. **Itinerary Builder** - Drag-and-drop day planning
2. **Finance Dashboard** - Real-time KPIs
3. **CRM Pipeline** - Visual sales tracking
4. **Mobile PWA** - Native app experience
5. **Dark Mode** - Eye-friendly interface
6. **Responsive Design** - Works on all devices
7. **Real-time Notifications** - Stay updated
8. **Multi-language Ready** - Extensible

---

## 🎓 Learning Resources

- Check the README files for detailed documentation
- Explore each module to understand features
- Review demo data to see how to structure yours
- Try creating test records to learn workflows

---

**Happy travels! 🌍✈️**

For questions or issues, refer to the comprehensive documentation or contact support.
