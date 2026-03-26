-- Loyalty Program
CREATE TABLE IF NOT EXISTS loyalty_points (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  transaction_id VARCHAR(100),
  transaction_type VARCHAR(50), -- booking, referral, review, purchase
  points_earned INTEGER,
  points_redeemed INTEGER DEFAULT 0,
  points_balance INTEGER,
  expiry_date DATE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS loyalty_tiers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  tier_name VARCHAR(100) NOT NULL,
  min_spending DECIMAL(15, 2),
  max_spending DECIMAL(15, 2),
  points_multiplier DECIMAL(3, 2),
  discount_percent DECIMAL(5, 2),
  benefits TEXT, -- JSON array
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Referral Program
CREATE TABLE IF NOT EXISTS referrals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  referrer_id UUID NOT NULL REFERENCES customers(id),
  referred_customer_id UUID REFERENCES customers(id),
  referral_code VARCHAR(50) UNIQUE,
  status VARCHAR(50) DEFAULT 'pending', -- pending, converted, failed
  referred_booking_id UUID REFERENCES bookings(id),
  referral_bonus DECIMAL(15, 2),
  bonus_paid BOOLEAN DEFAULT FALSE,
  bonus_paid_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Reports Configuration & Saved Reports
CREATE TABLE IF NOT EXISTS report_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  report_type VARCHAR(100) NOT NULL, -- sales_analysis, profit_margin, gst_register, etc.
  report_name VARCHAR(255),
  description TEXT,
  filters TEXT, -- JSON of default filters
  metrics TEXT, -- JSON array of metrics
  grouping TEXT, -- JSON
  is_public BOOLEAN DEFAULT FALSE,
  created_by UUID NOT NULL REFERENCES user_profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS saved_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  template_id UUID REFERENCES report_templates(id),
  report_name VARCHAR(255),
  report_data TEXT, -- JSON of report data
  generated_by UUID NOT NULL REFERENCES user_profiles(id),
  generated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Calendar & Events
CREATE TABLE IF NOT EXISTS calendar_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  booking_id UUID REFERENCES bookings(id),
  event_type VARCHAR(50), -- departure, arrival, payment_due, follow_up, inspection
  title VARCHAR(255),
  description TEXT,
  event_date DATE,
  event_time TIME,
  location VARCHAR(255),
  assigned_to UUID REFERENCES user_profiles(id),
  created_by UUID NOT NULL REFERENCES user_profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS calendar_reminders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID NOT NULL REFERENCES calendar_events(id) ON DELETE CASCADE,
  reminder_type VARCHAR(50), -- email, sms, whatsapp, in_app
  reminder_time TIMESTAMP WITH TIME ZONE,
  is_sent BOOLEAN DEFAULT FALSE,
  sent_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Company Settings
CREATE TABLE IF NOT EXISTS company_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL UNIQUE REFERENCES companies(id) ON DELETE CASCADE,
  default_currency VARCHAR(3) DEFAULT 'PKR',
  tax_system VARCHAR(50) DEFAULT 'gst', -- gst, vat, sales_tax
  financial_year_start DATE,
  financial_year_end DATE,
  invoice_prefix VARCHAR(20),
  invoice_next_number INTEGER DEFAULT 1001,
  booking_prefix VARCHAR(20),
  booking_next_number INTEGER DEFAULT 1001,
  default_payment_terms INTEGER DEFAULT 30, -- days
  auto_invoice_days INTEGER DEFAULT 1, -- create invoice after N days of booking
  enable_whatsapp_integration BOOLEAN DEFAULT FALSE,
  whatsapp_business_id VARCHAR(100),
  whatsapp_api_key TEXT,
  enable_sms_notifications BOOLEAN DEFAULT FALSE,
  sms_api_provider VARCHAR(50),
  sms_api_key TEXT,
  logo_url TEXT,
  primary_color VARCHAR(7),
  secondary_color VARCHAR(7),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Email Templates
CREATE TABLE IF NOT EXISTS email_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  template_name VARCHAR(255) NOT NULL,
  template_type VARCHAR(50), -- booking_confirmation, invoice, payment_reminder, etc.
  subject VARCHAR(255),
  body TEXT,
  variables TEXT, -- JSON array of available variables
  is_default BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Feedback & Reviews
CREATE TABLE IF NOT EXISTS customer_feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  booking_id UUID NOT NULL REFERENCES bookings(id),
  customer_id UUID NOT NULL REFERENCES customers(id),
  rating INTEGER, -- 1-5
  title VARCHAR(255),
  comment TEXT,
  areas_of_satisfaction TEXT, -- JSON
  areas_for_improvement TEXT, -- JSON
  would_recommend BOOLEAN,
  feedback_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE loyalty_points ENABLE ROW LEVEL SECURITY;
ALTER TABLE loyalty_tiers ENABLE ROW LEVEL SECURITY;
ALTER TABLE referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE report_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE calendar_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE calendar_reminders ENABLE ROW LEVEL SECURITY;
ALTER TABLE company_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE customer_feedback ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view loyalty points for their company" ON loyalty_points 
  FOR SELECT USING (
    company_id = (SELECT company_id FROM user_profiles WHERE id = auth.uid() LIMIT 1)
  );

CREATE POLICY "Users can view events for their company" ON calendar_events 
  FOR SELECT USING (
    company_id = (SELECT company_id FROM user_profiles WHERE id = auth.uid() LIMIT 1)
  );

CREATE POLICY "Users can view company settings" ON company_settings 
  FOR SELECT USING (
    company_id = (SELECT company_id FROM user_profiles WHERE id = auth.uid() LIMIT 1)
  );

CREATE POLICY "Users can view feedback for their company" ON customer_feedback 
  FOR SELECT USING (
    company_id = (SELECT company_id FROM user_profiles WHERE id = auth.uid() LIMIT 1)
  );
