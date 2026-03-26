-- CRM Module Tables
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(20),
  source VARCHAR(100), -- website, referral, advertisement, social_media, etc.
  status VARCHAR(50) DEFAULT 'new', -- new, contacted, qualified, proposal_sent, won, lost
  travel_type VARCHAR(100), -- umrah, hajj, domestic_tour, international_tour
  package_interest VARCHAR(255),
  budget_min DECIMAL(15, 2),
  budget_max DECIMAL(15, 2),
  travel_dates TEXT, -- JSON for date ranges
  number_of_travelers INTEGER,
  notes TEXT,
  ai_score DECIMAL(3, 2), -- AI-generated lead quality score
  assigned_to UUID REFERENCES user_profiles(id),
  created_by UUID NOT NULL REFERENCES user_profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_contacted TIMESTAMP WITH TIME ZONE,
  converted_booking_id UUID
);

CREATE TABLE IF NOT EXISTS customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE,
  phone VARCHAR(20) NOT NULL,
  cnic VARCHAR(20), -- Pakistan CNIC
  passport_number VARCHAR(50),
  passport_expiry DATE,
  date_of_birth DATE,
  address TEXT,
  city VARCHAR(100),
  province VARCHAR(100),
  postal_code VARCHAR(20),
  country VARCHAR(100) DEFAULT 'Pakistan',
  customer_type VARCHAR(50) DEFAULT 'individual', -- individual, corporate
  corporate_name VARCHAR(255),
  tax_id VARCHAR(100),
  loyalty_points INTEGER DEFAULT 0,
  loyalty_tier VARCHAR(50) DEFAULT 'bronze', -- bronze, silver, gold, platinum
  total_spending DECIMAL(15, 2) DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contacts (for customers and suppliers)
CREATE TABLE IF NOT EXISTS contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_id UUID NOT NULL, -- customer_id or supplier_id
  entity_type VARCHAR(50) NOT NULL, -- customer, supplier
  contact_name VARCHAR(255),
  designation VARCHAR(100),
  email VARCHAR(255),
  phone VARCHAR(20),
  is_primary BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view leads for their company" ON leads 
  FOR SELECT USING (
    company_id = (SELECT company_id FROM user_profiles WHERE id = auth.uid() LIMIT 1)
  );

CREATE POLICY "Users can view customers for their company" ON customers 
  FOR SELECT USING (
    company_id = (SELECT company_id FROM user_profiles WHERE id = auth.uid() LIMIT 1)
  );

CREATE POLICY "Users can view contacts in their company" ON contacts 
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM customers 
      WHERE customers.id = contacts.entity_id 
      AND customers.company_id = (SELECT company_id FROM user_profiles WHERE id = auth.uid() LIMIT 1)
    )
    OR
    EXISTS (
      SELECT 1 FROM suppliers 
      WHERE suppliers.id = contacts.entity_id 
      AND suppliers.company_id = (SELECT company_id FROM user_profiles WHERE id = auth.uid() LIMIT 1)
    )
  );
