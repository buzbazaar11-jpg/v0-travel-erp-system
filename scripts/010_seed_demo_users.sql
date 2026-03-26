-- Seed Demo Users for Testing and Development
-- This script creates demo user accounts with test data

-- Note: In Supabase, you need to create auth users first through the dashboard or auth API
-- This script creates the profile data for demo users

-- Demo Admin User Profile
INSERT INTO public.users (id, company_id, first_name, last_name, email, phone_number, is_active, role)
VALUES 
  ('550e8400-e29b-41d4-a716-446655440001'::uuid, 
   '550e8400-e29b-41d4-a716-446655440000'::uuid,
   'Admin',
   'User',
   'admin@eagent.com',
   '03142678230',
   true,
   'admin')
ON CONFLICT (id) DO NOTHING;

-- Demo Demo Company
INSERT INTO public.companies (id, name, registration_number, tax_id, phone, email, website, address, city, province, country, postal_code, is_active)
VALUES
  ('550e8400-e29b-41d4-a716-446655440000'::uuid,
   'EAgent Travel & Tours',
   'PK-2024-001',
   'PKR-0123456789',
   '021-1234567',
   'admin@eagent.com',
   'https://eagent.com',
   '123 Travel Street',
   'Karachi',
   'Sindh',
   'Pakistan',
   '75500',
   true)
ON CONFLICT (id) DO NOTHING;

-- Demo Head Branch
INSERT INTO public.branches (id, company_id, name, manager_id, phone, email, address, city, is_head_office, is_active)
VALUES
  ('550e8400-e29b-41d4-a716-446655440002'::uuid,
   '550e8400-e29b-41d4-a716-446655440000'::uuid,
   'Karachi Head Office',
   '550e8400-e29b-41d4-a716-446655440001'::uuid,
   '021-1234567',
   'karachi@eagent.com',
   '123 Travel Street',
   'Karachi',
   true,
   true)
ON CONFLICT (id) DO NOTHING;

-- Demo Departments
INSERT INTO public.departments (id, branch_id, name, head_id, description, is_active)
VALUES
  ('550e8400-e29b-41d4-a716-446655440010'::uuid,
   '550e8400-e29b-41d4-a716-446655440002'::uuid,
   'Sales',
   '550e8400-e29b-41d4-a716-446655440001'::uuid,
   'Sales and booking department',
   true),
  ('550e8400-e29b-41d4-a716-446655440011'::uuid,
   '550e8400-e29b-41d4-a716-446655440002'::uuid,
   'Finance',
   '550e8400-e29b-41d4-a716-446655440001'::uuid,
   'Finance and accounting department',
   true),
  ('550e8400-e29b-41d4-a716-446655440012'::uuid,
   '550e8400-e29b-41d4-a716-446655440002'::uuid,
   'Operations',
   '550e8400-e29b-41d4-a716-446655440001'::uuid,
   'Operations and customer service',
   true)
ON CONFLICT (id) DO NOTHING;

-- Demo Roles
INSERT INTO public.roles (id, company_id, name, description, permissions, is_active)
VALUES
  ('550e8400-e29b-41d4-a716-446655440020'::uuid,
   '550e8400-e29b-41d4-a716-446655440000'::uuid,
   'Admin',
   'Full system access',
   '{"all": true}'::jsonb,
   true),
  ('550e8400-e29b-41d4-a716-446655440021'::uuid,
   '550e8400-e29b-41d4-a716-446655440000'::uuid,
   'Manager',
   'Manage sales and operations',
   '{"bookings": true, "crm": true, "finance": true}'::jsonb,
   true),
  ('550e8400-e29b-41d4-a716-446655440022'::uuid,
   '550e8400-e29b-41d4-a716-446655440000'::uuid,
   'Staff',
   'Basic operations access',
   '{"bookings": true, "crm": true}'::jsonb,
   true)
ON CONFLICT (id) DO NOTHING;

-- Assign Admin Role to Admin User
INSERT INTO public.user_roles (user_id, role_id)
VALUES ('550e8400-e29b-41d4-a716-446655440001'::uuid, '550e8400-e29b-41d4-a716-446655440020'::uuid)
ON CONFLICT (user_id, role_id) DO NOTHING;

-- Demo Chart of Accounts
INSERT INTO public.account_categories (id, company_id, name, description, category_type, is_active)
VALUES
  ('550e8400-e29b-41d4-a716-446655440030'::uuid, '550e8400-e29b-41d4-a716-446655440000'::uuid, 'Current Assets', 'Short-term assets', 'ASSET', true),
  ('550e8400-e29b-41d4-a716-446655440031'::uuid, '550e8400-e29b-41d4-a716-446655440000'::uuid, 'Current Liabilities', 'Short-term liabilities', 'LIABILITY', true),
  ('550e8400-e29b-41d4-a716-446655440032'::uuid, '550e8400-e29b-41d4-a716-446655440000'::uuid, 'Revenue', 'Income from sales', 'REVENUE', true),
  ('550e8400-e29b-41d4-a716-446655440033'::uuid, '550e8400-e29b-41d4-a716-446655440000'::uuid, 'Expenses', 'Operating expenses', 'EXPENSE', true)
ON CONFLICT (id) DO NOTHING;

-- Demo Accounts
INSERT INTO public.accounts (id, company_id, category_id, code, name, description, account_type, normal_balance, opening_balance, is_active)
VALUES
  ('550e8400-e29b-41d4-a716-446655440040'::uuid, '550e8400-e29b-41d4-a716-446655440000'::uuid, '550e8400-e29b-41d4-a716-446655440030'::uuid, '1010', 'Cash in Hand', 'Physical cash', 'Cash', 'DEBIT', 100000, true),
  ('550e8400-e29b-41d4-a716-446655440041'::uuid, '550e8400-e29b-41d4-a716-446655440000'::uuid, '550e8400-e29b-41d4-a716-446655440030'::uuid, '1020', 'Bank Account', 'Primary business account', 'Bank', 'DEBIT', 500000, true),
  ('550e8400-e29b-41d4-a716-446655440042'::uuid, '550e8400-e29b-41d4-a716-446655440000'::uuid, '550e8400-e29b-41d4-a716-446655440032'::uuid, '4010', 'Tour Revenue', 'Revenue from tour packages', 'Revenue', 'CREDIT', 0, true),
  ('550e8400-e29b-41d4-a716-446655440043'::uuid, '550e8400-e29b-41d4-a716-446655440000'::uuid, '550e8400-e29b-41d4-a716-446655440032'::uuid, '4020', 'Visa Service Revenue', 'Revenue from visa services', 'Revenue', 'CREDIT', 0, true),
  ('550e8400-e29b-41d4-a716-446655440044'::uuid, '550e8400-e29b-41d4-a716-446655440000'::uuid, '550e8400-e29b-41d4-a716-446655440033'::uuid, '5010', 'Supplier Costs', 'Payment to suppliers', 'Expense', 'DEBIT', 0, true),
  ('550e8400-e29b-41d4-a716-446655440045'::uuid, '550e8400-e29b-41d4-a716-446655440000'::uuid, '550e8400-e29b-41d4-a716-446655440033'::uuid, '5020', 'Salaries', 'Employee salaries', 'Expense', 'DEBIT', 0, true)
ON CONFLICT (id) DO NOTHING;

-- Demo GST Rates
INSERT INTO public.tax_rates (id, company_id, tax_name, tax_rate, tax_type, account_id, is_active, effective_from)
VALUES
  ('550e8400-e29b-41d4-a716-446655440050'::uuid, '550e8400-e29b-41d4-a716-446655440000'::uuid, 'GST 17%', 17, 'GST', '550e8400-e29b-41d4-a716-446655440041'::uuid, true, CURRENT_DATE)
ON CONFLICT (id) DO NOTHING;

-- Demo Travel Packages
INSERT INTO public.travel_packages (id, company_id, name, package_type, description, duration_days, destination_country, destination_city, inclusions, exclusions, base_price, sell_price, profit_margin, is_active)
VALUES
  ('550e8400-e29b-41d4-a716-446655440060'::uuid, '550e8400-e29b-41d4-a716-446655440000'::uuid, 'Umrah Gold Package', 'Umrah', '5-star Umrah experience', 14, 'Saudi Arabia', 'Mecca', 'Flight, Hotel, Meals, Guide', 'Personal expenses', 150000, 199000, 32.67, true),
  ('550e8400-e29b-41d4-a716-446655440061'::uuid, '550e8400-e29b-41d4-a716-446655440000'::uuid, 'Turkey Tour', 'Tours', 'Explore Istanbul and Cappadocia', 10, 'Turkey', 'Istanbul', 'Flight, Hotel, Tours, Visa', 'Insurance', 120000, 159000, 32.50, true),
  ('550e8400-e29b-41d4-a716-446655440062'::uuid, '550e8400-e29b-41d4-a716-446655440000'::uuid, 'Dubai Shopping Festival', 'Tours', 'Weekend shopping tour', 3, 'UAE', 'Dubai', 'Flight, Hotel, Visa', 'Meals', 50000, 69000, 38.00, true)
ON CONFLICT (id) DO NOTHING;

-- Demo Hotels
INSERT INTO public.hotels (id, company_id, name, city, country, star_rating, address, phone, email, is_active)
VALUES
  ('550e8400-e29b-41d4-a716-446655440070'::uuid, '550e8400-e29b-41d4-a716-446655440000'::uuid, 'Hilton Mecca', 'Mecca', 'Saudi Arabia', 5, 'Haram Road', '+966-1-5746666', 'hilton@mecca.sa', true),
  ('550e8400-e29b-41d4-a716-446655440071'::uuid, '550e8400-e29b-41d4-a716-446655440000'::uuid, 'Hyatt Istanbul', 'Istanbul', 'Turkey', 5, 'Taksim Square', '+90-2-1222222', 'hyatt@istanbul.tr', true),
  ('550e8400-e29b-41d4-a716-446655440072'::uuid, '550e8400-e29b-41d4-a716-446655440000'::uuid, 'Burj Al Arab Dubai', 'Dubai', 'UAE', 7, 'Jumeirah Beach', '+971-4-3013000', 'reservations@burjalarab.ae', true)
ON CONFLICT (id) DO NOTHING;

-- Demo Customers
INSERT INTO public.customers (id, company_id, first_name, last_name, email, phone, phone_country_code, customer_type, passport_number, cnic_number, is_active)
VALUES
  ('550e8400-e29b-41d4-a716-446655440080'::uuid, '550e8400-e29b-41d4-a716-446655440000'::uuid, 'Ahmed', 'Khan', 'ahmed@example.com', '3001234567', '+92', 'INDIVIDUAL', 'AB123456', '12345-6789012-3', true),
  ('550e8400-e29b-41d4-a716-446655440081'::uuid, '550e8400-e29b-41d4-a716-446655440000'::uuid, 'Fatima', 'Ali', 'fatima@example.com', '3009876543', '+92', 'INDIVIDUAL', 'CD789012', '98765-4321098-7', true),
  ('550e8400-e29b-41d4-a716-446655440082'::uuid, '550e8400-e29b-41d4-a716-446655440000'::uuid, 'Universal', 'Tours Ltd', 'contact@universaltours.pk', '2134567890', '+92', 'CORPORATE', 'UT-CORPORATE-001', null, true)
ON CONFLICT (id) DO NOTHING;
