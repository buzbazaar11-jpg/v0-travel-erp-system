-- Insert 50 Demo Businesses with Admin Users and Subscriptions

-- First, ensure subscription plans exist
INSERT INTO public.subscription_plans (name, price, duration_months, max_users, max_bookings, features, is_active)
VALUES 
  ('BASIC', 5000, 1, 5, 100, '["bookings", "crm", "leads", "dashboard"]', true),
  ('MEDIUM', 15000, 1, 25, 500, '["bookings", "crm", "leads", "invoicing", "finance", "dashboard"]', true),
  ('ADVANCED', 30000, 1, 100, 1000, '["bookings", "crm", "leads", "invoicing", "finance", "reports", "analytics", "ai_features"]', true),
  ('ENTERPRISE', 100000, 1, 999, 9999, '["all"]', true)
ON CONFLICT (name) DO NOTHING;

-- Insert 50 Demo Businesses
INSERT INTO public.companies (
  name, registration_number, phone, email, address, city, province, postal_code, status
) VALUES
('Bright Travels Karachi', 'REG-001', '+92-300-1234001', 'info@brighttravels.com', 'Plot 123, Main Street', 'Karachi', 'Sindh', '75000', 'active'),
('Journey Express Lahore', 'REG-002', '+92-300-1234002', 'contact@journeyexpress.com', 'Mall Road Office', 'Lahore', 'Punjab', '54000', 'active'),
('Paradise Tours Islamabad', 'REG-003', '+92-300-1234003', 'info@paradisetours.com', 'F-7 Sector', 'Islamabad', 'Federal', '44000', 'active'),
('Wanderlust Adventures', 'REG-004', '+92-300-1234004', 'hello@wanderlust.com', 'Tariq Road', 'Karachi', 'Sindh', '75000', 'active'),
('Global Holidays Pvt Ltd', 'REG-005', '+92-300-1234005', 'bookings@globalholidays.com', 'Cliff Drive', 'Karachi', 'Sindh', '75600', 'active'),
('Emirates Travel Agency', 'REG-006', '+92-300-1234006', 'info@emiratestravel.pk', 'Downtown Lahore', 'Lahore', 'Punjab', '54000', 'active'),
('Hajj Tours International', 'REG-007', '+92-300-1234007', 'hajj@toursintl.com', 'Gulberg III', 'Lahore', 'Punjab', '54660', 'active'),
('Adventure Seekers Co', 'REG-008', '+92-300-1234008', 'contact@adventureseek.com', 'Blue Area', 'Islamabad', 'Federal', '44000', 'active'),
('Oasis Travel Solutions', 'REG-009', '+92-300-1234009', 'book@oasistravel.com', 'Jamshed Road', 'Karachi', 'Sindh', '75500', 'active'),
('Desert Safaris Pk', 'REG-010', '+92-300-1234010', 'info@desertsafaris.pk', 'Saddar', 'Karachi', 'Sindh', '75600', 'active'),
('Alpine Peaks Trekking', 'REG-011', '+92-300-1234011', 'trek@alpepeaks.com', 'Hunza Valley', 'Gilgit', 'GB', '15110', 'active'),
('Coastal Getaways Pvt', 'REG-012', '+92-300-1234012', 'coastal@getaways.pk', 'Clifton', 'Karachi', 'Sindh', '75600', 'active'),
('Northern Light Tours', 'REG-013', '+92-300-1234013', 'tours@northernlight.pk', 'Kaghan Valley', 'Mansehra', 'KP', '21300', 'active'),
('City Escape Holidays', 'REG-014', '+92-300-1234014', 'escape@cityelite.com', 'DHA', 'Lahore', 'Punjab', '54792', 'active'),
('Divine Journey Travels', 'REG-015', '+92-300-1234015', 'divine@journeytravel.pk', 'Mall Road', 'Lahore', 'Punjab', '54000', 'active'),
('Silk Road Expeditions', 'REG-016', '+92-300-1234016', 'silkroad@expeditions.pk', 'Abbottabad', 'Abbottabad', 'KP', '22010', 'active'),
('Beach Resort Tours', 'REG-017', '+92-300-1234017', 'beach@resorts.pk', 'Hawksbay', 'Karachi', 'Sindh', '75600', 'active'),
('Mountain Quest Adventures', 'REG-018', '+92-300-1234018', 'quest@mountainadv.pk', 'Swat Valley', 'Mingora', 'KP', '19200', 'active'),
('Cultural Tours Pakistan', 'REG-019', '+92-300-1234019', 'cultural@tourspk.com', 'Walled City', 'Lahore', 'Punjab', '54000', 'active'),
('Premium Visa Services', 'REG-020', '+92-300-1234020', 'visa@premiumsvc.pk', 'Karachi Office', 'Karachi', 'Sindh', '75500', 'active'),
('Royal Journey International', 'REG-021', '+92-300-1234021', 'royal@journeyint.com', 'Bilawal House', 'Karachi', 'Sindh', '75600', 'active'),
('Gateway Tours Ltd', 'REG-022', '+92-300-1234022', 'gateway@toursltd.pk', 'Faisalabad Hub', 'Faisalabad', 'Punjab', '38000', 'active'),
('Traveler Companion Co', 'REG-023', '+92-300-1234023', 'companion@traveler.pk', 'Multan Branch', 'Multan', 'Punjab', '60000', 'active'),
('Holiday Planners Elite', 'REG-024', '+92-300-1234024', 'elite@holidayplan.pk', 'Peshawar Office', 'Peshawar', 'KP', '25000', 'active'),
('Venture Beyond Tours', 'REG-025', '+92-300-1234025', 'venture@beyondtours.pk', 'Quetta Branch', 'Quetta', 'Balochistan', '87300', 'active'),
('Experience Tours Pvt', 'REG-026', '+92-300-1234026', 'experience@tourspvt.pk', 'Sukkur Office', 'Sukkur', 'Sindh', '65200', 'active'),
('Century Travels Agency', 'REG-027', '+92-300-1234027', 'century@travels.pk', 'Hyderabad Hub', 'Hyderabad', 'Sindh', '71000', 'active'),
('Sunny Days Holiday', 'REG-028', '+92-300-1234028', 'sunny@daysholiday.pk', 'Gujranwala Office', 'Gujranwala', 'Punjab', '52250', 'active'),
('Star Destination Tours', 'REG-029', '+92-300-1234029', 'star@destination.pk', 'Sialkot Branch', 'Sialkot', 'Punjab', '51310', 'active'),
('Global Adventure Partners', 'REG-030', '+92-300-1234030', 'global@adventure.pk', 'Rawalpindi Base', 'Rawalpindi', 'Punjab', '46000', 'active'),
('Exotic Escapes Tours', 'REG-031', '+92-300-1234031', 'exotic@escapes.pk', 'Mirpur Office', 'Mirpur', 'AJK', '10250', 'active'),
('Quest Travel Solutions', 'REG-032', '+92-300-1234032', 'quest@solutions.pk', 'Shogran Hill', 'Shogran', 'KP', '22400', 'active'),
('Paradise Valley Tours', 'REG-033', '+92-300-1234033', 'paradise@valley.pk', 'Hunza Base', 'Hunza', 'GB', '15110', 'active'),
('Elite Tours Network', 'REG-034', '+92-300-1234034', 'elite@network.pk', 'Karachi Hub', 'Karachi', 'Sindh', '75000', 'active'),
('Adventure Trail Co', 'REG-035', '+92-300-1234035', 'adventure@trail.pk', 'Skardu Base', 'Skardu', 'GB', '16200', 'active'),
('Journey Craft Travels', 'REG-036', '+92-300-1234036', 'craft@travels.pk', 'Naran Valley', 'Naran', 'KP', '21400', 'active'),
('Destination Dreams', 'REG-037', '+92-300-1234037', 'dreams@destination.pk', 'Murree Hills', 'Murree', 'Punjab', '47150', 'active'),
('Voyager Express Tours', 'REG-038', '+92-300-1234038', 'voyager@express.pk', 'Azad Kashmir', 'Muzaffarabad', 'AJK', '13100', 'active'),
('Heritage Tours Pak', 'REG-039', '+92-300-1234039', 'heritage@tours.pk', 'Mohenjo Daro', 'Larkana', 'Sindh', '68200', 'active'),
('Summit Seeker Adventures', 'REG-040', '+92-300-1234040', 'summit@seeker.pk', 'Fairy Meadows', 'Diamer', 'GB', '16500', 'active'),
('Cultural Routes Ltd', 'REG-041', '+92-300-1234041', 'cultural@routes.pk', 'Taxila Museum', 'Taxila', 'Punjab', '47080', 'active'),
('Scenic Routes Tours', 'REG-042', '+92-300-1234042', 'scenic@routes.pk', 'Chitral Valley', 'Chitral', 'KP', '13100', 'active'),
('Urban Explorer Tours', 'REG-043', '+92-300-1234043', 'urban@explorer.pk', 'Peshawar City', 'Peshawar', 'KP', '25000', 'active'),
('Nature Lover Holidays', 'REG-044', '+92-300-1234044', 'nature@lover.pk', 'Deosai Plains', 'Skardu', 'GB', '16200', 'active'),
('Enterprise Travel Co', 'REG-045', '+92-300-1234045', 'enterprise@travel.pk', 'Lahore Central', 'Lahore', 'Punjab', '54000', 'active'),
('Signature Tours Pvt', 'REG-046', '+92-300-1234046', 'signature@tours.pk', 'Islamabad Center', 'Islamabad', 'Federal', '44000', 'active'),
('Pinnacle Adventures', 'REG-047', '+92-300-1234047', 'pinnacle@adventure.pk', 'Concordia Camp', 'Concordia', 'GB', '19200', 'active'),
('Voyages Unlimited Ltd', 'REG-048', '+92-300-1234048', 'voyages@unlimited.pk', 'Karakoram Base', 'Gilgit', 'GB', '15100', 'active'),
('Express Holidays Pk', 'REG-049', '+92-300-1234049', 'express@holiday.pk', 'Karachi Downtown', 'Karachi', 'Sindh', '75500', 'active'),
('Ultimate Journey Tours', 'REG-050', '+92-300-1234050', 'ultimate@journey.pk', 'Lahore Office', 'Lahore', 'Punjab', '54000', 'active');

-- Get the company IDs and insert users with subscriptions
-- We'll do this in the application code since we need to hash passwords

-- For now, insert subscription plans for each company
DO $$
DECLARE
  company_id UUID;
  plan_id UUID;
  company_record RECORD;
BEGIN
  -- Get BASIC plan
  SELECT id INTO plan_id FROM public.subscription_plans WHERE name = 'BASIC' LIMIT 1;
  
  -- For each company, create subscription
  FOR company_record IN 
    SELECT id FROM public.companies ORDER BY created_at DESC LIMIT 50
  LOOP
    INSERT INTO public.company_subscriptions (company_id, plan_id, start_date, end_date, status, payment_status)
    VALUES (
      company_record.id,
      plan_id,
      CURRENT_DATE,
      CURRENT_DATE + INTERVAL '1 month',
      'active',
      'pending'
    )
    ON CONFLICT DO NOTHING;
  END LOOP;
END $$;

-- Create indices for faster queries
CREATE INDEX idx_companies_status ON public.companies(status);
CREATE INDEX idx_companies_city ON public.companies(city);
CREATE INDEX idx_companies_province ON public.companies(province);
