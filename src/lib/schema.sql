-- ==============================================================================
-- BEAST FACTORY V2 — PRODUCTION DATABASE SCHEMA & LEAST-PRIVILEGE RLS POLICIES
-- ==============================================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ------------------------------------------------------------------------------
-- 1. GYM SETTINGS
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS gym_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  gym_name TEXT NOT NULL DEFAULT 'Beast Factory',
  tagline TEXT DEFAULT 'The Fitness Paradise',
  phone TEXT DEFAULT '+977 23577880',
  email TEXT DEFAULT 'beastfactorynepal@gmail.com',
  location_address TEXT DEFAULT 'Damak-1, Falgunanda Chowk, Jhapa, Nepal',
  operating_hours TEXT DEFAULT '3:30 AM - 11:00 PM',
  days_open TEXT DEFAULT '365 Days Open',
  facebook_url TEXT DEFAULT 'https://www.facebook.com/BeastFactoryGymCenter/',
  instagram_url TEXT DEFAULT 'https://www.instagram.com/beastfactory21/',
  tiktok_url TEXT DEFAULT 'https://www.tiktok.com/@beastfactory_official',
  latitude NUMERIC(10, 7) DEFAULT 26.6697485,
  longitude NUMERIC(10, 7) DEFAULT 87.7029086,
  site_title TEXT DEFAULT 'Beast Factory Gym | Best Fitness Center in Damak, Jhapa',
  default_meta_description TEXT DEFAULT 'Beast Factory is the premier gym & fitness center in Damak-1, Falgunanda Chowk, Jhapa.',
  default_og_image TEXT DEFAULT 'https://beastfactorynepal.com/assets/hero_bg.png',
  site_url TEXT DEFAULT 'https://beastfactorynepal.com',
  google_maps_url TEXT DEFAULT 'https://maps.google.com/?q=26.6697485,87.7029086',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 2. FOUNDERS
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS founders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  position TEXT NOT NULL,
  photo_url TEXT NOT NULL,
  short_bio TEXT NOT NULL,
  role_description TEXT NOT NULL,
  expertise TEXT[] DEFAULT '{}',
  socials JSONB DEFAULT '{}'::jsonb,
  display_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 3. TRAINERS
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS trainers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name TEXT NOT NULL,
  photo_url TEXT NOT NULL,
  title TEXT NOT NULL,
  short_bio TEXT NOT NULL,
  full_bio TEXT NOT NULL,
  years_experience INT DEFAULT 0,
  specializations TEXT[] DEFAULT '{}',
  certifications TEXT[] DEFAULT '{}',
  languages TEXT[] DEFAULT '{"Nepali", "English"}',
  session_price_npr NUMERIC(10, 2) DEFAULT 0,
  socials JSONB DEFAULT '{}'::jsonb,
  is_available BOOLEAN DEFAULT TRUE,
  is_featured BOOLEAN DEFAULT FALSE,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 4. SERVICES
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  short_description TEXT NOT NULL,
  long_description TEXT NOT NULL,
  icon_name TEXT DEFAULT 'Dumbbell',
  cover_image_url TEXT NOT NULL,
  features TEXT[] DEFAULT '{}',
  starting_price_npr NUMERIC(10, 2) DEFAULT 0,
  is_featured BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 5. BOXING PROGRAMS
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS boxing_programs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  program_name TEXT NOT NULL,
  description TEXT NOT NULL,
  duration_text TEXT NOT NULL,
  price_npr NUMERIC(10, 2) NOT NULL,
  schedule_details TEXT NOT NULL,
  features TEXT[] DEFAULT '{}',
  is_active BOOLEAN DEFAULT TRUE,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 6. MEMBERSHIP PLANS
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS membership_plans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price_monthly_npr NUMERIC(10, 2) NOT NULL,
  price_yearly_npr NUMERIC(10, 2),
  features TEXT[] DEFAULT '{}',
  badge_text TEXT,
  is_popular BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 7. SPA SERVICES
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS spa_services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  duration_minutes INT NOT NULL DEFAULT 30,
  price_npr NUMERIC(10, 2) NOT NULL,
  image_url TEXT NOT NULL,
  is_available BOOLEAN DEFAULT TRUE,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 8. PRODUCTS
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  price_npr NUMERIC(10, 2) NOT NULL,
  image_urls TEXT[] DEFAULT '{}',
  sku TEXT UNIQUE,
  in_stock BOOLEAN DEFAULT TRUE,
  is_featured BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 9. TRANSFORMATIONS
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS transformations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_name TEXT NOT NULL,
  before_photo_url TEXT NOT NULL,
  after_photo_url TEXT NOT NULL,
  starting_weight_kg NUMERIC(5, 2),
  final_weight_kg NUMERIC(5, 2),
  duration_weeks INT,
  program_name TEXT,
  service_id UUID REFERENCES services(id) ON DELETE SET NULL,
  story_text TEXT NOT NULL,
  testimonial_quote TEXT,
  has_client_consent BOOLEAN DEFAULT TRUE,
  is_featured BOOLEAN DEFAULT FALSE,
  is_published BOOLEAN DEFAULT TRUE,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 10. GALLERY
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS gallery_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'Facility',
  image_url TEXT NOT NULL,
  display_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 11. TESTIMONIALS
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  comment TEXT NOT NULL,
  rating INT DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  review_date DATE DEFAULT CURRENT_DATE,
  source TEXT DEFAULT 'Direct',
  source_url TEXT,
  is_featured BOOLEAN DEFAULT FALSE,
  is_verified BOOLEAN DEFAULT TRUE,
  display_order INT DEFAULT 0,
  is_published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 12. FAQS
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS faqs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT DEFAULT 'General',
  display_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 13. INQUIRIES / LEADS (Public Submission Table)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS inquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name TEXT NOT NULL CHECK (char_length(full_name) >= 2 AND char_length(full_name) <= 100),
  phone TEXT NOT NULL CHECK (char_length(phone) >= 7 AND char_length(phone) <= 20),
  email TEXT CHECK (email IS NULL OR char_length(email) <= 120),
  inquiry_type TEXT NOT NULL DEFAULT 'general',
  message TEXT CHECK (message IS NULL OR char_length(message) <= 2000),
  membership_plan_id UUID REFERENCES membership_plans(id) ON DELETE SET NULL,
  boxing_program_id UUID REFERENCES boxing_programs(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'interested', 'converted', 'not_interested', 'closed')),
  admin_notes TEXT,
  assigned_staff TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 14. BOOKINGS (Public Submission Table)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_type TEXT NOT NULL CHECK (booking_type IN ('spa', 'trainer', 'free_trial')),
  spa_service_id UUID REFERENCES spa_services(id) ON DELETE SET NULL,
  trainer_id UUID REFERENCES trainers(id) ON DELETE SET NULL,
  customer_name TEXT NOT NULL CHECK (char_length(customer_name) >= 2 AND char_length(customer_name) <= 100),
  customer_phone TEXT NOT NULL CHECK (char_length(customer_phone) >= 7 AND char_length(customer_phone) <= 20),
  customer_email TEXT CHECK (customer_email IS NULL OR char_length(customer_email) <= 120),
  preferred_date DATE NOT NULL,
  preferred_time_slot TEXT NOT NULL CHECK (char_length(preferred_time_slot) <= 50),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  admin_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 15. NOTIFICATIONS (Internal Alerts)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type TEXT NOT NULL,
  priority TEXT NOT NULL DEFAULT 'NORMAL' CHECK (priority IN ('HIGH', 'NORMAL', 'SYSTEM')),
  title TEXT NOT NULL CHECK (char_length(title) <= 200),
  message TEXT NOT NULL CHECK (char_length(message) <= 1000),
  related_id UUID,
  related_type TEXT,
  action_url TEXT NOT NULL DEFAULT '/admin',
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 16. ADMIN AUDIT LOGS
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS admin_audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  admin_user_id UUID,
  admin_email TEXT,
  action TEXT NOT NULL,
  entity_table TEXT NOT NULL,
  record_id TEXT,
  details JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for Query Performance
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON inquiries(status);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_notifications_is_read ON notifications(is_read);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON notifications(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON admin_audit_logs(created_at DESC);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES — LEAST PRIVILEGE ENFORCEMENT
-- ==============================================================================

-- Enable RLS on all tables
ALTER TABLE gym_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE founders ENABLE ROW LEVEL SECURITY;
ALTER TABLE trainers ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE boxing_programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE membership_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE spa_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE transformations ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_audit_logs ENABLE ROW LEVEL SECURITY;

-- ------------------------------------------------------------------------------
-- PUBLIC READ POLICIES (Active / Published Content Only)
-- ------------------------------------------------------------------------------
CREATE POLICY "Public select gym_settings" ON gym_settings FOR SELECT USING (true);
CREATE POLICY "Public select founders" ON founders FOR SELECT USING (is_active = true);
CREATE POLICY "Public select trainers" ON trainers FOR SELECT USING (is_available = true);
CREATE POLICY "Public select services" ON services FOR SELECT USING (is_active = true);
CREATE POLICY "Public select boxing_programs" ON boxing_programs FOR SELECT USING (is_active = true);
CREATE POLICY "Public select membership_plans" ON membership_plans FOR SELECT USING (is_active = true);
CREATE POLICY "Public select spa_services" ON spa_services FOR SELECT USING (is_available = true);
CREATE POLICY "Public select products" ON products FOR SELECT USING (is_active = true);
CREATE POLICY "Public select transformations" ON transformations FOR SELECT USING (is_published = true);
CREATE POLICY "Public select gallery_items" ON gallery_items FOR SELECT USING (is_active = true);
CREATE POLICY "Public select testimonials" ON testimonials FOR SELECT USING (is_published = true);
CREATE POLICY "Public select faqs" ON faqs FOR SELECT USING (is_active = true);

-- ------------------------------------------------------------------------------
-- PUBLIC SUBMISSION POLICIES (INSERT Only for Inquiries, Bookings, Notifications)
-- ------------------------------------------------------------------------------
CREATE POLICY "Public insert inquiries" ON inquiries
  FOR INSERT WITH CHECK (
    char_length(full_name) >= 2 AND char_length(full_name) <= 100 AND
    char_length(phone) >= 7 AND char_length(phone) <= 20 AND
    status = 'new'
  );

CREATE POLICY "Public insert bookings" ON bookings
  FOR INSERT WITH CHECK (
    char_length(customer_name) >= 2 AND char_length(customer_name) <= 100 AND
    char_length(customer_phone) >= 7 AND char_length(customer_phone) <= 20 AND
    status = 'pending'
  );

CREATE POLICY "Public insert notifications" ON notifications
  FOR INSERT WITH CHECK (
    char_length(title) <= 200 AND
    char_length(message) <= 1000
  );

-- ------------------------------------------------------------------------------
-- AUTHENTICATED ADMIN FULL ACCESS POLICIES (INSERT, UPDATE, DELETE, ALL SELECT)
-- ------------------------------------------------------------------------------
CREATE POLICY "Admin full gym_settings" ON gym_settings FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full founders" ON founders FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full trainers" ON trainers FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full services" ON services FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full boxing_programs" ON boxing_programs FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full membership_plans" ON membership_plans FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full spa_services" ON spa_services FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full products" ON products FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full transformations" ON transformations FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full gallery_items" ON gallery_items FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full testimonials" ON testimonials FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full faqs" ON faqs FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full inquiries" ON inquiries FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full bookings" ON bookings FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full notifications" ON notifications FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full audit_logs" ON admin_audit_logs FOR ALL USING (auth.role() = 'authenticated');

-- ==============================================================================
-- STORAGE BUCKET POLICIES (beast-factory-assets)
-- ==============================================================================
-- Create public bucket if not exists
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'beast-factory-assets',
  'beast-factory-assets',
  true,
  5242880, -- 5 MB limit
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif']
)
ON CONFLICT (id) DO UPDATE SET
  public = true,
  file_size_limit = 5242880,
  allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif'];

-- Storage Policies
CREATE POLICY "Public Read Storage" ON storage.objects
  FOR SELECT USING (bucket_id = 'beast-factory-assets');

CREATE POLICY "Admin Insert Storage" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'beast-factory-assets' AND
    auth.role() = 'authenticated'
  );

CREATE POLICY "Admin Delete Storage" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'beast-factory-assets' AND
    auth.role() = 'authenticated'
  );
