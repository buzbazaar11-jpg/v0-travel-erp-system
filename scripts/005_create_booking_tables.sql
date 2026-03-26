-- Booking & Tour Management Tables
CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  booking_number VARCHAR(100) NOT NULL,
  customer_id UUID NOT NULL REFERENCES customers(id),
  lead_id UUID REFERENCES leads(id),
  booking_type VARCHAR(50) NOT NULL, -- umrah, hajj, tour, visa, hotel, flight
  status VARCHAR(50) DEFAULT 'pending', -- pending, confirmed, completed, cancelled, refunded
  tour_package_id UUID, -- references tour packages
  tour_start_date DATE,
  tour_end_date DATE,
  number_of_passengers INTEGER NOT NULL,
  total_price DECIMAL(15, 2) NOT NULL,
  total_cost DECIMAL(15, 2),
  profit DECIMAL(15, 2),
  profit_margin DECIMAL(5, 2),
  advance_paid DECIMAL(15, 2) DEFAULT 0,
  balance_due DECIMAL(15, 2),
  payment_status VARCHAR(50) DEFAULT 'pending', -- pending, partial, full
  itinerary_id UUID,
  special_requests TEXT,
  notes TEXT,
  assigned_agent UUID REFERENCES user_profiles(id),
  created_by UUID NOT NULL REFERENCES user_profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(company_id, booking_number)
);

-- Booking Passengers
CREATE TABLE IF NOT EXISTS booking_passengers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  customer_id UUID REFERENCES customers(id),
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  date_of_birth DATE,
  cnic VARCHAR(20),
  passport_number VARCHAR(50),
  passport_expiry DATE,
  passport_issue_date DATE,
  visa_status VARCHAR(50), -- not_applied, applied, approved, rejected, expired
  visa_issue_date DATE,
  visa_expiry DATE,
  special_requirements TEXT,
  seat_number VARCHAR(20),
  room_number VARCHAR(20),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tour Packages
CREATE TABLE IF NOT EXISTS tour_packages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  package_name VARCHAR(255) NOT NULL,
  package_code VARCHAR(100) NOT NULL,
  tour_type VARCHAR(50) NOT NULL, -- umrah, hajj, domestic, international
  destination VARCHAR(255),
  duration_days INTEGER,
  start_date DATE,
  end_date DATE,
  description TEXT,
  inclusions TEXT, -- JSON array
  exclusions TEXT, -- JSON array
  pricing_structure TEXT, -- JSON
  capacity_total INTEGER,
  capacity_booked INTEGER DEFAULT 0,
  cost_per_person DECIMAL(15, 2),
  selling_price DECIMAL(15, 2),
  commission_percent DECIMAL(5, 2),
  itinerary TEXT, -- JSON
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(company_id, package_code)
);

-- Itineraries
CREATE TABLE IF NOT EXISTS itineraries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,
  package_id UUID REFERENCES tour_packages(id),
  day_number INTEGER NOT NULL,
  title VARCHAR(255),
  description TEXT,
  activities TEXT, -- JSON array
  accommodation_id UUID,
  accommodation_check_in TIME,
  accommodation_check_out TIME,
  meal_plan VARCHAR(50), -- breakfast, breakfast_lunch, all_inclusive, etc.
  transportation VARCHAR(100),
  meeting_point VARCHAR(255),
  guide_name VARCHAR(255),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE booking_passengers ENABLE ROW LEVEL SECURITY;
ALTER TABLE tour_packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE itineraries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view bookings for their company" ON bookings 
  FOR SELECT USING (
    company_id = (SELECT company_id FROM user_profiles WHERE id = auth.uid() LIMIT 1)
  );

CREATE POLICY "Users can view booking passengers for their company" ON booking_passengers 
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM bookings 
      WHERE bookings.id = booking_passengers.booking_id
      AND bookings.company_id = (SELECT company_id FROM user_profiles WHERE id = auth.uid() LIMIT 1)
    )
  );

CREATE POLICY "Users can view tour packages for their company" ON tour_packages 
  FOR SELECT USING (
    company_id = (SELECT company_id FROM user_profiles WHERE id = auth.uid() LIMIT 1)
  );

CREATE POLICY "Users can view itineraries for their company" ON itineraries 
  FOR SELECT USING (
    company_id = (SELECT company_id FROM user_profiles WHERE id = auth.uid() LIMIT 1)
  );
