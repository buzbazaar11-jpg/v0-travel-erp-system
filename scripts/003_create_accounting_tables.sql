-- Chart of Accounts (COA) - Pakistan Tax Authority Compliant
CREATE TABLE IF NOT EXISTS chart_of_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  account_code VARCHAR(50) NOT NULL,
  account_name VARCHAR(255) NOT NULL,
  account_type VARCHAR(50) NOT NULL, -- Asset, Liability, Equity, Income, Expense
  sub_type VARCHAR(100), -- Current Asset, Fixed Asset, etc.
  description TEXT,
  opening_balance DECIMAL(15, 2) DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  requires_gst BOOLEAN DEFAULT FALSE,
  is_header_account BOOLEAN DEFAULT FALSE,
  parent_account_id UUID REFERENCES chart_of_accounts(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(company_id, account_code)
);

-- General Ledger (Double Entry)
CREATE TABLE IF NOT EXISTS general_ledger (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  transaction_id UUID NOT NULL, -- Links to various transaction types
  transaction_type VARCHAR(50) NOT NULL, -- invoice, payment, journal_entry, etc.
  account_id UUID NOT NULL REFERENCES chart_of_accounts(id),
  debit DECIMAL(15, 2) DEFAULT 0,
  credit DECIMAL(15, 2) DEFAULT 0,
  reference_number VARCHAR(100),
  narration TEXT,
  transaction_date DATE NOT NULL,
  fiscal_year INTEGER,
  is_reconciled BOOLEAN DEFAULT FALSE,
  reconciled_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- GST Register (Pakistan FBR Compliance)
CREATE TABLE IF NOT EXISTS gst_register (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  transaction_id UUID NOT NULL,
  transaction_type VARCHAR(50) NOT NULL, -- sales, purchase, import, export
  gst_rate DECIMAL(5, 2),
  gst_amount DECIMAL(15, 2),
  taxable_amount DECIMAL(15, 2),
  gst_type VARCHAR(50), -- standard_rated, zero_rated, exempt, etc.
  transaction_date DATE,
  reference_number VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Journal Entries
CREATE TABLE IF NOT EXISTS journal_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  entry_number VARCHAR(100) NOT NULL,
  entry_date DATE NOT NULL,
  narration TEXT NOT NULL,
  total_debit DECIMAL(15, 2),
  total_credit DECIMAL(15, 2),
  status VARCHAR(50) DEFAULT 'draft', -- draft, posted, reversed
  created_by UUID REFERENCES user_profiles(id),
  approved_by UUID REFERENCES user_profiles(id),
  approved_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(company_id, entry_number)
);

-- Journal Entry Details
CREATE TABLE IF NOT EXISTS journal_entry_details (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  journal_entry_id UUID NOT NULL REFERENCES journal_entries(id) ON DELETE CASCADE,
  account_id UUID NOT NULL REFERENCES chart_of_accounts(id),
  debit DECIMAL(15, 2) DEFAULT 0,
  credit DECIMAL(15, 2) DEFAULT 0,
  description TEXT
);

ALTER TABLE chart_of_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE general_ledger ENABLE ROW LEVEL SECURITY;
ALTER TABLE gst_register ENABLE ROW LEVEL SECURITY;
ALTER TABLE journal_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE journal_entry_details ENABLE ROW LEVEL SECURITY;

-- RLS Policies for Accounting Tables
CREATE POLICY "Users can view COA for their company" ON chart_of_accounts 
  FOR SELECT USING (
    company_id = (SELECT company_id FROM user_profiles WHERE id = auth.uid() LIMIT 1)
  );

CREATE POLICY "Users can view GL for their company" ON general_ledger 
  FOR SELECT USING (
    company_id = (SELECT company_id FROM user_profiles WHERE id = auth.uid() LIMIT 1)
  );

CREATE POLICY "Users can view GST register for their company" ON gst_register 
  FOR SELECT USING (
    company_id = (SELECT company_id FROM user_profiles WHERE id = auth.uid() LIMIT 1)
  );

CREATE POLICY "Users can view journal entries for their company" ON journal_entries 
  FOR SELECT USING (
    company_id = (SELECT company_id FROM user_profiles WHERE id = auth.uid() LIMIT 1)
  );

CREATE POLICY "Users can view journal entry details for their company" ON journal_entry_details 
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM journal_entries 
      WHERE journal_entries.id = journal_entry_details.journal_entry_id
      AND journal_entries.company_id = (SELECT company_id FROM user_profiles WHERE id = auth.uid() LIMIT 1)
    )
  );
