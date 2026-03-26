-- Payment Processing
CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,
  invoice_id UUID,
  payment_type VARCHAR(50) NOT NULL, -- advance, partial, full, refund
  amount DECIMAL(15, 2) NOT NULL,
  payment_method VARCHAR(50) NOT NULL, -- cash, credit_card, bank_transfer, easypaisa, jazzcash, alipay
  payment_date DATE NOT NULL,
  payment_time TIME,
  transaction_id VARCHAR(100),
  status VARCHAR(50) DEFAULT 'pending', -- pending, completed, failed, refunded
  gateway_response TEXT,
  processed_by UUID REFERENCES user_profiles(id),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Invoices
CREATE TABLE IF NOT EXISTS invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  invoice_number VARCHAR(100) NOT NULL,
  customer_id UUID NOT NULL REFERENCES customers(id),
  invoice_date DATE NOT NULL,
  due_date DATE,
  subtotal DECIMAL(15, 2),
  gst_amount DECIMAL(15, 2),
  other_charges DECIMAL(15, 2) DEFAULT 0,
  discount_percent DECIMAL(5, 2) DEFAULT 0,
  discount_amount DECIMAL(15, 2) DEFAULT 0,
  total_amount DECIMAL(15, 2) NOT NULL,
  paid_amount DECIMAL(15, 2) DEFAULT 0,
  balance_due DECIMAL(15, 2),
  status VARCHAR(50) DEFAULT 'draft', -- draft, sent, viewed, partially_paid, paid, overdue, cancelled
  notes TEXT,
  terms_and_conditions TEXT,
  sent_at TIMESTAMP WITH TIME ZONE,
  viewed_at TIMESTAMP WITH TIME ZONE,
  created_by UUID NOT NULL REFERENCES user_profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(company_id, invoice_number)
);

CREATE TABLE IF NOT EXISTS invoice_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_id UUID NOT NULL REFERENCES invoices(id) ON DELETE CASCADE,
  service_name VARCHAR(255) NOT NULL,
  description TEXT,
  quantity INTEGER DEFAULT 1,
  unit_price DECIMAL(15, 2) NOT NULL,
  gst_rate DECIMAL(5, 2),
  gst_amount DECIMAL(15, 2),
  line_total DECIMAL(15, 2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Documents & Compliance
CREATE TABLE IF NOT EXISTS documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  document_type VARCHAR(50) NOT NULL, -- passport, visa, cnic, ticket, invoice, etc.
  related_entity VARCHAR(50) NOT NULL, -- passenger, booking, customer, supplier
  related_entity_id UUID NOT NULL,
  document_name VARCHAR(255),
  file_url TEXT,
  file_type VARCHAR(50),
  file_size INTEGER,
  upload_date TIMESTAMP WITH TIME ZONE,
  expiry_date DATE,
  is_verified BOOLEAN DEFAULT FALSE,
  verified_by UUID REFERENCES user_profiles(id),
  verified_at TIMESTAMP WITH TIME ZONE,
  notes TEXT,
  created_by UUID NOT NULL REFERENCES user_profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Audit Log
CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  user_id UUID REFERENCES user_profiles(id),
  module VARCHAR(100),
  action VARCHAR(50), -- create, read, update, delete, approve, reject
  entity_type VARCHAR(100),
  entity_id UUID,
  changes_json TEXT, -- JSON of before/after changes
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Notifications & Alerts
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  recipient_id UUID NOT NULL REFERENCES user_profiles(id),
  notification_type VARCHAR(50), -- payment_due, document_expiring, booking_status, approval_required
  title VARCHAR(255) NOT NULL,
  message TEXT,
  related_entity VARCHAR(50),
  related_entity_id UUID,
  priority VARCHAR(50) DEFAULT 'normal', -- low, normal, high, urgent
  is_read BOOLEAN DEFAULT FALSE,
  read_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() + INTERVAL '30 days'
);

-- Compliance & Document Expiry Alerts
CREATE TABLE IF NOT EXISTS document_expiry_alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  document_id UUID NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
  passenger_id UUID REFERENCES booking_passengers(id),
  expiry_date DATE,
  days_until_expiry INTEGER,
  alert_sent BOOLEAN DEFAULT FALSE,
  alert_sent_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoice_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE document_expiry_alerts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view payments for their company" ON payments 
  FOR SELECT USING (
    company_id = (SELECT company_id FROM user_profiles WHERE id = auth.uid() LIMIT 1)
  );

CREATE POLICY "Users can view invoices for their company" ON invoices 
  FOR SELECT USING (
    company_id = (SELECT company_id FROM user_profiles WHERE id = auth.uid() LIMIT 1)
  );

CREATE POLICY "Users can view invoice items for their company" ON invoice_items 
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM invoices 
      WHERE invoices.id = invoice_items.invoice_id
      AND invoices.company_id = (SELECT company_id FROM user_profiles WHERE id = auth.uid() LIMIT 1)
    )
  );

CREATE POLICY "Users can view documents for their company" ON documents 
  FOR SELECT USING (
    company_id = (SELECT company_id FROM user_profiles WHERE id = auth.uid() LIMIT 1)
  );

CREATE POLICY "Users can view audit logs for their company" ON audit_logs 
  FOR SELECT USING (
    company_id = (SELECT company_id FROM user_profiles WHERE id = auth.uid() LIMIT 1)
  );

CREATE POLICY "Users can view their own notifications" ON notifications 
  FOR SELECT USING (
    recipient_id = auth.uid()
  );

CREATE POLICY "Users can view expiry alerts for their company" ON document_expiry_alerts 
  FOR SELECT USING (
    company_id = (SELECT company_id FROM user_profiles WHERE id = auth.uid() LIMIT 1)
  );
