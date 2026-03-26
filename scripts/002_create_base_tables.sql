-- Core Company & User Structure with Multi-tenancy Support
CREATE TABLE IF NOT EXISTS companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL UNIQUE,
  registration_number VARCHAR(100) UNIQUE,
  ntn VARCHAR(20), -- Pakistan NTN
  strn VARCHAR(20), -- Pakistan STRN
  contact_person VARCHAR(255),
  phone VARCHAR(20),
  email VARCHAR(255),
  address TEXT,
  city VARCHAR(100),
  province VARCHAR(100),
  country VARCHAR(100) DEFAULT 'Pakistan',
  postal_code VARCHAR(20),
  website VARCHAR(255),
  logo_url TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  financial_year_start_month INTEGER DEFAULT 1,
  currency VARCHAR(3) DEFAULT 'PKR',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User Profiles (linked to Supabase auth.users)
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  phone VARCHAR(20),
  designation VARCHAR(100),
  department VARCHAR(100),
  role VARCHAR(50) NOT NULL DEFAULT 'user', -- admin, manager, agent, viewer
  is_active BOOLEAN DEFAULT TRUE,
  last_login TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User Permissions (granular access control)
CREATE TABLE IF NOT EXISTS user_permissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  module VARCHAR(100) NOT NULL, -- crm, bookings, finance, etc.
  action VARCHAR(50) NOT NULL, -- read, create, update, delete, approve
  resource_id UUID, -- specific booking, lead, etc. for row-level permissions
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_permissions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for Companies
CREATE POLICY "Users can view their own company" ON companies 
  FOR SELECT USING (
    id = (SELECT company_id FROM user_profiles WHERE id = auth.uid() LIMIT 1)
  );

-- RLS Policies for User Profiles
CREATE POLICY "Users can view profiles in their company" ON user_profiles 
  FOR SELECT USING (
    company_id = (SELECT company_id FROM user_profiles WHERE id = auth.uid() LIMIT 1)
  );

-- RLS Policies for Permissions
CREATE POLICY "Users can view their own permissions" ON user_permissions 
  FOR SELECT USING (
    user_id = auth.uid()
  );
