# Travel & Tours ERP - Deployment & Setup Guide

## Quick Start

### 1. Clone & Setup
```bash
git clone <repository-url>
cd travel-erp
pnpm install
```

### 2. Environment Configuration
Create `.env.local`:
```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Optional: Payment Gateways
NEXT_PUBLIC_JAZZCASH_STORE_ID=your_store_id
NEXT_PUBLIC_EASYPAISA_API_KEY=your_api_key

# Optional: Email Service
RESEND_API_KEY=your_resend_key

# Optional: WhatsApp Business
WHATSAPP_BUSINESS_ACCOUNT_ID=your_account_id
WHATSAPP_BUSINESS_API_KEY=your_api_key
```

### 3. Database Setup (Supabase)
```sql
-- Run these in Supabase SQL Editor

-- Companies Table
CREATE TABLE companies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR NOT NULL,
  email VARCHAR NOT NULL,
  phone VARCHAR,
  gst_number VARCHAR,
  address TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tours Table
CREATE TABLE tours (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID REFERENCES companies(id),
  name VARCHAR NOT NULL,
  destination VARCHAR NOT NULL,
  duration INT NOT NULL,
  base_price DECIMAL(12,2),
  sell_price DECIMAL(12,2),
  max_participants INT,
  current_participants INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Bookings Table
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID REFERENCES companies(id),
  customer_name VARCHAR NOT NULL,
  email VARCHAR,
  phone VARCHAR,
  package_id UUID REFERENCES tours(id),
  passengers INT,
  total_amount DECIMAL(12,2),
  status VARCHAR DEFAULT 'Pending',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Invoices Table
CREATE TABLE invoices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID REFERENCES companies(id),
  booking_id UUID REFERENCES bookings(id),
  invoice_number VARCHAR UNIQUE,
  amount DECIMAL(12,2),
  gst_amount DECIMAL(12,2),
  total DECIMAL(12,2),
  status VARCHAR DEFAULT 'Draft',
  due_date DATE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Chart of Accounts
CREATE TABLE chart_of_accounts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID REFERENCES companies(id),
  code VARCHAR NOT NULL,
  name VARCHAR NOT NULL,
  account_type VARCHAR NOT NULL, -- Asset, Liability, Equity, Revenue, Expense
  balance DECIMAL(15,2) DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Ledger Entries
CREATE TABLE ledger_entries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID REFERENCES companies(id),
  account_id UUID REFERENCES chart_of_accounts(id),
  entry_date DATE,
  description TEXT,
  debit DECIMAL(12,2),
  credit DECIMAL(12,2),
  reference_number VARCHAR,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE tours ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
```

### 4. Run Development Server
```bash
pnpm dev
```
Visit `http://localhost:3000`

### 5. Build for Production
```bash
pnpm build
pnpm start
```

## Deployment to Vercel

### Option 1: GitHub Integration (Recommended)
```bash
# Push to GitHub
git add .
git commit -m "Initial Travel ERP setup"
git push origin main

# Then:
# 1. Go to vercel.com
# 2. Import your GitHub repository
# 3. Add environment variables
# 4. Deploy
```

### Option 2: Manual Deployment
```bash
npm i -g vercel
vercel

# Follow the prompts
# Add environment variables when asked
```

### Vercel Environment Variables
1. Go to Project Settings → Environment Variables
2. Add each variable:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Other optional variables

## Configuration Checklist

- [ ] Create Supabase project
- [ ] Copy project URL and anon key
- [ ] Create `.env.local` with credentials
- [ ] Run database migrations
- [ ] Test locally with `pnpm dev`
- [ ] Push to GitHub
- [ ] Create Vercel project
- [ ] Add environment variables to Vercel
- [ ] Deploy to production
- [ ] Test production URL
- [ ] Set up custom domain (optional)

## Feature Implementation Guide

### Adding Payment Gateway (JazzCash)
```typescript
// app/api/payments/jazzcash/route.ts
export async function POST(req: Request) {
  const { amount, bookingRef } = await req.json()
  
  const storeId = process.env.NEXT_PUBLIC_JAZZCASH_STORE_ID
  const apiKey = process.env.NEXT_PUBLIC_JAZZCASH_API_KEY
  
  // Call JazzCash API
  const response = await fetch('https://api.jazzcash.com.pk/payments', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${apiKey}` },
    body: JSON.stringify({
      storeId,
      amount,
      reference: bookingRef,
    })
  })
  
  return response
}
```

### Adding Email Notifications (Resend)
```typescript
// lib/email.ts
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendBookingConfirmation(
  email: string,
  bookingRef: string,
  details: any
) {
  await resend.emails.send({
    from: 'bookings@travelagency.com',
    to: email,
    subject: `Booking Confirmed: ${bookingRef}`,
    html: `
      <h1>Booking Confirmation</h1>
      <p>Your booking has been confirmed!</p>
      <p>Reference: ${bookingRef}</p>
      <p>Details: ${JSON.stringify(details)}</p>
    `
  })
}
```

### Adding WhatsApp Integration
```typescript
// lib/whatsapp.ts
export async function sendWhatsAppMessage(
  phone: string,
  message: string
) {
  const response = await fetch(
    'https://graph.instagram.com/v18.0/{phone_number_id}/messages',
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.WHATSAPP_BUSINESS_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to: phone,
        type: 'text',
        text: { body: message }
      })
    }
  )
  
  return response.json()
}
```

## Performance Optimization

### Image Optimization
```bash
# Use Next.js Image component
<Image 
  src="/tour-image.jpg"
  alt="Tour Package"
  width={400}
  height={300}
  priority
/>
```

### Code Splitting
```bash
# Automatic by Next.js - routes split by page
# Dynamic imports for heavy components:
const HeavyChart = dynamic(() => import('@/components/chart'), {
  loading: () => <Spinner />
})
```

### Database Query Optimization
```typescript
// Use indexes
CREATE INDEX idx_bookings_company ON bookings(company_id);
CREATE INDEX idx_invoices_status ON invoices(status);
CREATE INDEX idx_ledger_date ON ledger_entries(entry_date);
```

## Monitoring & Analytics

### Vercel Analytics
```bash
# Already included - view at https://vercel.com/your-project/analytics
```

### Supabase Monitoring
```bash
# Dashboard at https://supabase.com/projects/your-project
# Monitor: Database usage, Auth sessions, API calls
```

## Backup & Recovery

### Database Backup (Supabase)
```bash
# Automatic daily backups included in paid plan
# Manual export:
pg_dump postgres://user:password@db.supabase.co:5432/postgres > backup.sql
```

### Environment Variables Backup
```bash
# Store in secure location, never commit to git
# Use .env.local (already in .gitignore)
```

## Troubleshooting

### Build Fails
```bash
# Clear cache
rm -rf .next
pnpm build

# Check for TypeScript errors
pnpm tsc --noEmit
```

### Slow Page Load
```bash
# Check Vercel Analytics
# Optimize images
# Enable caching headers in next.config.mjs
```

### Database Connection Issues
```bash
# Verify NEXT_PUBLIC_SUPABASE_URL is correct
# Check NEXT_PUBLIC_SUPABASE_ANON_KEY permissions
# Test with Supabase CLI:
supabase link --project-ref=your-project
supabase status
```

## Support & Resources

- **Next.js Docs**: https://nextjs.org/docs
- **Supabase Docs**: https://supabase.com/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **shadcn/ui**: https://ui.shadcn.com

## Security Best Practices

1. **Never commit `.env.local`** - Already in .gitignore
2. **Use RLS for database** - Implemented in schema
3. **Validate all inputs** - Using Zod schemas
4. **Keep dependencies updated**: `pnpm update`
5. **Enable HTTPS** - Automatic on Vercel
6. **Rate limiting** - Implement in API routes

## Next Steps After Deployment

1. Test all modules in production
2. Set up custom domain
3. Configure payment gateways
4. Set up email service
5. Enable analytics
6. Monitor performance
7. Collect user feedback
8. Plan for scaling

---

**Version**: 1.0.0
**Last Updated**: March 2026
**Status**: Ready for Production ✅
