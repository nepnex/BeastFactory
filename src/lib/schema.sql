-- BEAST FACTORY V2 DATABASE SCHEMA (Supabase / PostgreSQL)

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. GYM SETTINGS
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
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. FOUNDERS
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

-- 3. TRAINERS
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

-- 4. SERVICES
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

-- 5. BOXING PROGRAMS
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

-- 6. MEMBERSHIP PLANS
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

-- 7. SPA SERVICES
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

-- 8. PRODUCTS
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

-- 9. TRANSFORMATIONS
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

-- 10. GALLERY
CREATE TABLE IF NOT EXISTS gallery_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'Facility',
  image_url TEXT NOT NULL,
  display_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. TESTIMONIALS
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  comment TEXT NOT NULL,
  rating INT DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  is_verified BOOLEAN DEFAULT TRUE,
  display_order INT DEFAULT 0,
  is_published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. FAQS
CREATE TABLE IF NOT EXISTS faqs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT DEFAULT 'General',
  display_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 13. INQUIRIES / LEADS
CREATE TABLE IF NOT EXISTS inquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  inquiry_type TEXT NOT NULL DEFAULT 'general',
  message TEXT,
  membership_plan_id UUID REFERENCES membership_plans(id) ON DELETE SET NULL,
  boxing_program_id UUID REFERENCES boxing_programs(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'interested', 'converted', 'not_interested', 'closed')),
  admin_notes TEXT,
  assigned_staff TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 14. BOOKINGS
CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_type TEXT NOT NULL CHECK (booking_type IN ('spa', 'trainer', 'free_trial')),
  spa_service_id UUID REFERENCES spa_services(id) ON DELETE SET NULL,
  trainer_id UUID REFERENCES trainers(id) ON DELETE SET NULL,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_email TEXT,
  preferred_date DATE NOT NULL,
  preferred_time_slot TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  admin_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 15. NOTIFICATIONS
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type TEXT NOT NULL,
  priority TEXT NOT NULL DEFAULT 'NORMAL' CHECK (priority IN ('HIGH', 'NORMAL', 'SYSTEM')),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  related_id UUID,
  related_type TEXT,
  action_url TEXT NOT NULL DEFAULT '/admin',
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_notifications_is_read ON notifications(is_read);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON notifications(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_notifications_priority ON notifications(priority);

-- RLS Policies
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Allow public users / anon to INSERT notifications during public submissions
CREATE POLICY "Public insert notifications" ON notifications
  FOR INSERT WITH CHECK (true);

-- Allow authenticated admins full access to read and update notifications
CREATE POLICY "Admin select notifications" ON notifications
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Admin update notifications" ON notifications
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Admin delete notifications" ON notifications
  FOR DELETE USING (auth.role() = 'authenticated');

