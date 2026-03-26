-- Service Providers (Hotels, Airlines, Visa Agents, etc.)
CREATE TABLE IF NOT EXISTS suppliers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  supplier_type VARCHAR(50) NOT NULL, -- hotel, airline, visa_agent, transport, guide, etc.
  email VARCHAR(255),
  phone VARCHAR(20),
  country VARCHAR(100),
  city VARCHAR(100),
  address TEXT,
  website VARCHAR(255),
  tax_id VARCHAR(100),
  bank_account VARCHAR(100),
  is_active BOOLEAN DEFAULT TRUE,
  rating DECIMAL(3, 2),
  payment_terms VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Hotels
CREATE TABLE IF NOT EXISTS hotels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  supplier_id UUID REFERENCES suppliers(id),
  hotel_name VARCHAR(255) NOT NULL,
  city VARCHAR(100) NOT NULL,
  country VARCHAR(100),
  star_rating INTEGER,
  total_rooms INTEGER,
  room_types TEXT, -- JSON array
  amenities TEXT, -- JSON array
  check_in_time TIME,
  check_out_time TIME,
  is_halal_certified BOOLEAN,
  contact_person VARCHAR(255),
  phone VARCHAR(20),
  email VARCHAR(255),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Hotel Room Types & Pricing
CREATE TABLE IF NOT EXISTS hotel_room_types (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hotel_id UUID NOT NULL REFERENCES hotels(id) ON DELETE CASCADE,
  room_type VARCHAR(100) NOT NULL, -- single, double, triple, dormitory
  capacity INTEGER,
  total_rooms INTEGER,
  cost_per_night DECIMAL(15, 2),
  selling_price DECIMAL(15, 2),
  amenities TEXT, -- JSON
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Flights & Airlines
CREATE TABLE IF NOT EXISTS airlines (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  supplier_id UUID REFERENCES suppliers(id),
  airline_code VARCHAR(10) UNIQUE,
  airline_name VARCHAR(255) NOT NULL,
  country VARCHAR(100),
  contact_email VARCHAR(255),
  contact_phone VARCHAR(20),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS flights (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  airline_id UUID REFERENCES airlines(id),
  flight_number VARCHAR(20) NOT NULL,
  departure_airport VARCHAR(10),
  arrival_airport VARCHAR(10),
  departure_time TIMESTAMP,
  arrival_time TIMESTAMP,
  aircraft_type VARCHAR(50),
  total_seats INTEGER,
  available_seats INTEGER,
  economy_price DECIMAL(15, 2),
  business_price DECIMAL(15, 2),
  first_class_price DECIMAL(15, 2),
  cost_per_seat DECIMAL(15, 2),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Visa Processing
CREATE TABLE IF NOT EXISTS visa_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  passenger_id UUID NOT NULL REFERENCES booking_passengers(id),
  booking_id UUID NOT NULL REFERENCES bookings(id),
  destination_country VARCHAR(100),
  visa_type VARCHAR(50), -- tourist, business, pilgrimage, etc.
  status VARCHAR(50) DEFAULT 'pending', -- pending, submitted, approved, rejected, expired
  application_date DATE,
  approval_date DATE,
  expiry_date DATE,
  cost DECIMAL(15, 2),
  visa_agent_id UUID REFERENCES suppliers(id),
  tracking_number VARCHAR(100),
  documents_submitted TEXT, -- JSON array
  rejection_reason TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Transportation (Buses, Cars, etc.)
CREATE TABLE IF NOT EXISTS transportation (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  supplier_id UUID REFERENCES suppliers(id),
  vehicle_type VARCHAR(50), -- bus, car, van, coach
  vehicle_registration VARCHAR(50),
  seating_capacity INTEGER,
  amenities TEXT, -- JSON
  cost_per_km DECIMAL(10, 2),
  cost_per_day DECIMAL(15, 2),
  driver_name VARCHAR(255),
  driver_license VARCHAR(50),
  phone VARCHAR(20),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE suppliers ENABLE ROW LEVEL SECURITY;
ALTER TABLE hotels ENABLE ROW LEVEL SECURITY;
ALTER TABLE hotel_room_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE airlines ENABLE ROW LEVEL SECURITY;
ALTER TABLE flights ENABLE ROW LEVEL SECURITY;
ALTER TABLE visa_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE transportation ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view suppliers for their company" ON suppliers 
  FOR SELECT USING (
    company_id = (SELECT company_id FROM user_profiles WHERE id = auth.uid() LIMIT 1)
  );

CREATE POLICY "Users can view hotels for their company" ON hotels 
  FOR SELECT USING (
    company_id = (SELECT company_id FROM user_profiles WHERE id = auth.uid() LIMIT 1)
  );

CREATE POLICY "Users can view hotel room types for their company" ON hotel_room_types 
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM hotels 
      WHERE hotels.id = hotel_room_types.hotel_id
      AND hotels.company_id = (SELECT company_id FROM user_profiles WHERE id = auth.uid() LIMIT 1)
    )
  );

CREATE POLICY "Users can view airlines for their company" ON airlines 
  FOR SELECT USING (
    company_id = (SELECT company_id FROM user_profiles WHERE id = auth.uid() LIMIT 1)
  );

CREATE POLICY "Users can view flights for their company" ON flights 
  FOR SELECT USING (
    company_id = (SELECT company_id FROM user_profiles WHERE id = auth.uid() LIMIT 1)
  );

CREATE POLICY "Users can view visa applications for their company" ON visa_applications 
  FOR SELECT USING (
    company_id = (SELECT company_id FROM user_profiles WHERE id = auth.uid() LIMIT 1)
  );

CREATE POLICY "Users can view transportation for their company" ON transportation 
  FOR SELECT USING (
    company_id = (SELECT company_id FROM user_profiles WHERE id = auth.uid() LIMIT 1)
  );
