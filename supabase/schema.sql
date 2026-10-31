-- ==============================================================================
-- MASTER SCHEMA SCRIPT: MODERN PERSONAL PORTFOLIO & ADMIN DASHBOARD
-- Run this script in your Supabase Project: SQL Editor -> New Query -> Run
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. CREATE TABLES

-- Profiles Table
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name TEXT NOT NULL,
    title TEXT NOT NULL,
    headline TEXT NOT NULL,
    bio TEXT NOT NULL,
    about_narrative TEXT NOT NULL,
    avatar_url TEXT,
    cv_url TEXT,
    email TEXT NOT NULL,
    phone TEXT,
    location TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Skills Table
CREATE TABLE IF NOT EXISTS public.skills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('programming', 'frontend', 'backend', 'database', 'tools')),
    icon_name TEXT NOT NULL,
    proficiency_level INT CHECK (proficiency_level BETWEEN 1 AND 100),
    display_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Projects Table
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    thumbnail_url TEXT,
    github_url TEXT,
    demo_url TEXT,
    is_featured BOOLEAN DEFAULT false,
    is_published BOOLEAN DEFAULT true,
    display_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Project Technologies (Relasi N-to-1 dengan Projects)
CREATE TABLE IF NOT EXISTS public.project_technologies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
    tech_name TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Experiences Table
CREATE TABLE IF NOT EXISTS public.experiences (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    type TEXT NOT NULL CHECK (type IN ('work', 'organization', 'internship')),
    institution TEXT NOT NULL,
    role TEXT NOT NULL,
    description TEXT NOT NULL,
    location TEXT,
    start_date DATE NOT NULL,
    end_date DATE,
    is_current BOOLEAN DEFAULT false,
    display_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Educations Table
CREATE TABLE IF NOT EXISTS public.educations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    institution TEXT NOT NULL,
    degree TEXT NOT NULL,
    field_of_study TEXT NOT NULL,
    gpa TEXT,
    start_date DATE NOT NULL,
    end_date DATE,
    is_current BOOLEAN DEFAULT false,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Certificates Table
CREATE TABLE IF NOT EXISTS public.certificates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    issuer TEXT NOT NULL,
    issue_date DATE NOT NULL,
    expiry_date DATE,
    credential_id TEXT,
    credential_url TEXT,
    image_url TEXT NOT NULL,
    display_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Social Links Table
CREATE TABLE IF NOT EXISTS public.social_links (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    platform TEXT NOT NULL,
    url TEXT NOT NULL,
    is_visible BOOLEAN DEFAULT true,
    display_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Messages Table (Public Contact Form)
CREATE TABLE IF NOT EXISTS public.messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sender_name TEXT NOT NULL,
    sender_email TEXT NOT NULL,
    subject TEXT,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Site Settings Table
CREATE TABLE IF NOT EXISTS public.site_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    site_title TEXT NOT NULL DEFAULT 'Portfolio Mahasiswa & Developer',
    site_description TEXT NOT NULL DEFAULT 'Personal modern portfolio and showcase of projects and achievements.',
    primary_color TEXT NOT NULL DEFAULT '#6366f1',
    favicon_url TEXT,
    contact_email TEXT NOT NULL DEFAULT 'contact@example.com',
    contact_phone TEXT NOT NULL DEFAULT '+62 812 3456 7890',
    address TEXT NOT NULL DEFAULT 'Jakarta, Indonesia',
    meta_keywords TEXT DEFAULT 'portfolio, web developer, software engineer, react, supabase',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. ENABLE ROW LEVEL SECURITY (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_technologies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.educations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- 4. RLS POLICIES

-- Public Read Policies
CREATE POLICY "Allow public read on profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Allow public read on skills" ON public.skills FOR SELECT USING (true);
CREATE POLICY "Allow public read on published projects" ON public.projects FOR SELECT USING (is_published = true OR auth.role() = 'authenticated');
CREATE POLICY "Allow public read on project_technologies" ON public.project_technologies FOR SELECT USING (true);
CREATE POLICY "Allow public read on experiences" ON public.experiences FOR SELECT USING (true);
CREATE POLICY "Allow public read on educations" ON public.educations FOR SELECT USING (true);
CREATE POLICY "Allow public read on certificates" ON public.certificates FOR SELECT USING (true);
CREATE POLICY "Allow public read on social_links" ON public.social_links FOR SELECT USING (is_visible = true OR auth.role() = 'authenticated');
CREATE POLICY "Allow public read on site_settings" ON public.site_settings FOR SELECT USING (true);

-- Public Insert for Contact Messages
CREATE POLICY "Allow public insert on messages" ON public.messages FOR INSERT WITH CHECK (true);

-- Admin Full Access (Authenticated users can CRUD everything)
CREATE POLICY "Allow admin full access on profiles" ON public.profiles FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow admin full access on skills" ON public.skills FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow admin full access on projects" ON public.projects FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow admin full access on project_technologies" ON public.project_technologies FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow admin full access on experiences" ON public.experiences FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow admin full access on educations" ON public.educations FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow admin full access on certificates" ON public.certificates FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow admin full access on social_links" ON public.social_links FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow admin full access on site_settings" ON public.site_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow admin full access on messages" ON public.messages FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 5. STORAGE BUCKETS SETUP
INSERT INTO storage.buckets (id, name, public)
VALUES 
    ('profile-images', 'profile-images', true),
    ('project-images', 'project-images', true),
    ('certificates', 'certificates', true),
    ('documents', 'documents', true)
ON CONFLICT (id) DO NOTHING;

-- Storage RLS Policies
CREATE POLICY "Public Read Storage Buckets" ON storage.objects FOR SELECT
USING (bucket_id IN ('profile-images', 'project-images', 'certificates', 'documents'));

CREATE POLICY "Admin Upload Storage" ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id IN ('profile-images', 'project-images', 'certificates', 'documents'));

CREATE POLICY "Admin Update Storage" ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id IN ('profile-images', 'project-images', 'certificates', 'documents'));

CREATE POLICY "Admin Delete Storage" ON storage.objects FOR DELETE TO authenticated
USING (bucket_id IN ('profile-images', 'project-images', 'certificates', 'documents'));

-- 6. SEED / INITIAL DUMMY DATA
-- Profiles
INSERT INTO public.profiles (
    full_name, title, headline, bio, about_narrative, email, phone, location, avatar_url
) VALUES (
    'Alvin Nugraha',
    'Full-Stack Developer & Informatics Student',
    'Passionate about crafting elegant web apps, scalable backend architectures, and delightful user experiences.',
    'Mahasiswa tingkat akhir Sistem Informasi dengan fokus keahlian pada ekosistem web modern (React, TypeScript, Tailwind, Node.js, dan Supabase).',
    'Halo! Saya Alvin Nugraha, mahasiswa Sistem Informasi yang memiliki antusiasme tinggi terhadap pengembangan perangkat lunak modern. Sejak awal perkuliahan, saya aktif membangun berbagai proyek web, berkontribusi dalam tim pengembang, serta mendalami arsitektur berbasis cloud. Saya percaya bahwa kode yang bersih dan desain yang intuitif adalah kunci dalam menciptakan solusi digital yang berdampak nyata.',
    'alvnngrh12345@gmail.com',
    '+62 877-1670-1824',
    'Bekasi, Indonesia',
    '/profile.png'
) ON CONFLICT DO NOTHING;

-- Site Settings
INSERT INTO public.site_settings (
    site_title, site_description, primary_color, contact_email, contact_phone, address, meta_keywords
) VALUES (
    'Alvin Nugraha | Portfolio & Software Engineer',
    'Personal portfolio of Alvin Nugraha, Full-Stack Developer & Informatics Student. Showcase of web development projects, skills, and experiences.',
    '#6366f1',
    'alvnngrh12345@gmail.com',
    '+62 877-1670-1824',
    'Bekasi, Indonesia',
    'alvin nugraha, portfolio, fullstack developer, react, typescript, supabase, tailwind'
) ON CONFLICT DO NOTHING;

-- Sample Skills
INSERT INTO public.skills (name, category, icon_name, proficiency_level, display_order) VALUES
('TypeScript', 'programming', 'Code2', 90, 1),
('JavaScript (ES6+)', 'programming', 'FileCode', 95, 2),
('Python', 'programming', 'Terminal', 80, 3),
('React.js', 'frontend', 'Layers', 92, 4),
('Next.js', 'frontend', 'Globe', 85, 5),
('Tailwind CSS', 'frontend', 'Palette', 95, 6),
('Node.js & Express', 'backend', 'Server', 88, 7),
('Supabase & BaaS', 'backend', 'Zap', 90, 8),
('PostgreSQL', 'database', 'Database', 85, 9),
('Prisma ORM', 'database', 'Cpu', 82, 10),
('Git & GitHub', 'tools', 'GitBranch', 92, 11),
('Docker & CI/CD', 'tools', 'Box', 78, 12),
('Figma & UI Design', 'tools', 'Layout', 80, 13)
ON CONFLICT DO NOTHING;

-- Sample Projects
INSERT INTO public.projects (id, title, slug, description, category, thumbnail_url, github_url, demo_url, is_featured, is_published, display_order) VALUES
('b271d44c-c04d-49d7-897b-944f2ef97591', 'Campus Event Hub', 'campus-event-hub', 'Platform manajemen tiket dan pendaftaran event kampus terintegrasi dengan payment gateway dan QR scanner tiket.', 'Web App', 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800', 'https://github.com/example/campus-event-hub', 'https://campus-events.demo.app', true, true, 1),
('b271d44c-c04d-49d7-897b-944f2ef97592', 'AI Smart Journaling', 'ai-smart-journaling', 'Aplikasi catatan harian dengan analisis mood berbasis AI dan insight produktivitas mingguan.', 'AI & Web', 'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&q=80&w=800', 'https://github.com/example/ai-smart-journal', 'https://ai-journal.demo.app', true, true, 2),
('b271d44c-c04d-49d7-897b-944f2ef97593', 'AgriTech Monitoring System', 'agritech-monitoring-system', 'Dashboard IoT monitoring kelembaban tanah dan otomasi penyiraman tanaman secara real-time.', 'IoT & Dashboard', 'https://images.unsplash.com/photo-1558441719-8d48980f89a6?auto=format&fit=crop&q=80&w=800', 'https://github.com/example/agritech-dashboard', 'https://agritech.demo.app', false, true, 3)
ON CONFLICT DO NOTHING;

-- Project Technologies
INSERT INTO public.project_technologies (project_id, tech_name) VALUES
('b271d44c-c04d-49d7-897b-944f2ef97591', 'React.js'),
('b271d44c-c04d-49d7-897b-944f2ef97591', 'TypeScript'),
('b271d44c-c04d-49d7-897b-944f2ef97591', 'Tailwind CSS'),
('b271d44c-c04d-49d7-897b-944f2ef97591', 'Supabase'),
('b271d44c-c04d-49d7-897b-944f2ef97592', 'React'),
('b271d44c-c04d-49d7-897b-944f2ef97592', 'Gemini AI API'),
('b271d44c-c04d-49d7-897b-944f2ef97592', 'Node.js'),
('b271d44c-c04d-49d7-897b-944f2ef97593', 'Vue.js'),
('b271d44c-c04d-49d7-897b-944f2ef97593', 'MQTT'),
('b271d44c-c04d-49d7-897b-944f2ef97593', 'PostgreSQL')
ON CONFLICT DO NOTHING;

-- Experiences
INSERT INTO public.experiences (type, institution, role, description, location, start_date, end_date, is_current, display_order) VALUES
('internship', 'Tech Innovator Asia', 'Frontend Developer Intern', 'Mengembangkan fitur dashboard analytics menggunakan React, TypeScript, dan Tailwind CSS. Mengoptimalkan waktu render komponen hingga 35%.', 'Jakarta (Hybrid)', '2025-07-01', '2025-12-31', false, 1),
('organization', 'Himpunan Mahasiswa Informatika', 'Head of Technology & Web Development', 'Memimpin tim pengembang beranggotakan 8 orang untuk membangun portal web event kampus yang melayani lebih dari 1.500 pengunjung aktif.', 'Kampus', '2024-02-01', '2025-01-31', false, 2),
('work', 'Freelance Software Developer', 'Full-Stack Web Developer', 'Membangun aplikasi web kustom untuk klien UMKM dan organisasi, menerapkan integrasi REST API, database PostgreSQL, dan responsive UI.', 'Remote', '2024-01-01', NULL, true, 3)
ON CONFLICT DO NOTHING;

-- Educations
INSERT INTO public.educations (institution, degree, field_of_study, gpa, start_date, end_date, is_current, description) VALUES
('Universitas Teknologi Indonesia', 'Sarjana Komputer (S.Kom)', 'Teknik Informatika', '3.88 / 4.00', '2023-09-01', NULL, true, 'Fokus penelitian pada Software Engineering, Cloud Computing, dan Human-Computer Interaction.')
ON CONFLICT DO NOTHING;

-- Certificates
INSERT INTO public.certificates (title, issuer, issue_date, expiry_date, credential_id, credential_url, image_url, display_order) VALUES
('Meta Front-End Developer Professional Certificate', 'Meta & Coursera', '2025-05-15', NULL, 'META-FE-998273', 'https://coursera.org/verify/professional-cert/sample', 'https://images.unsplash.com/photo-1589330694653-ded6df03f754?auto=format&fit=crop&q=80&w=600', 1),
('AWS Certified Cloud Practitioner', 'Amazon Web Services', '2025-03-20', '2028-03-20', 'AWS-CCP-102938', 'https://aws.amazon.com/verification', 'https://images.unsplash.com/photo-1523289333742-be1143f6b766?auto=format&fit=crop&q=80&w=600', 2)
ON CONFLICT DO NOTHING;

-- Social Links
INSERT INTO public.social_links (platform, url, is_visible, display_order) VALUES
('github', 'https://github.com', true, 1),
('linkedin', 'https://linkedin.com', true, 2),
('whatsapp', 'https://wa.me/6287716701824', true, 3),
('instagram', 'https://instagram.com/alvnngrhh', true, 4)
ON CONFLICT DO NOTHING;

