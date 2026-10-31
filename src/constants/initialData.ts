import type {
  Profile,
  Skill,
  Project,
  Experience,
  Education,
  Certificate,
  SocialLink,
  SiteSettings,
} from '../types/database.types'
import alvinPhoto from '../assets/images/WhatsApp Image 2026-10-31 at 11.58.42.jpeg'

export const DEFAULT_PROFILE: Profile = {
  id: 'default-profile',
  full_name: 'Alvin Nugraha',
  title: 'Full-Stack Developer & Information Systems Student',
  headline: 'Passionate about crafting elegant web apps, scalable backend architectures, and delightful user experiences.',
  bio: 'Mahasiswa tingkat akhir Sistem Informasi dengan fokus keahlian pada ekosistem web modern (React, TypeScript, Tailwind, Node.js, dan Supabase).',
  about_narrative:
    'Halo! Saya Alvin Nugraha, mahasiswa Sistem Informasi yang memiliki antusiasme tinggi terhadap pengembangan web modern. Saya berdedikasi membangun aplikasi yang responsif, terstruktur rapi, dan memberikan dampak nyata bagi pengguna.',
  avatar_url: alvinPhoto,
  cv_url: '#',
  email: 'alvnngrh12345@gmail.com',
  phone: '+62 877-1670-1824',
  location: 'Bekasi, Indonesia',
}

export const DEFAULT_SETTINGS: SiteSettings = {
  id: 'default-settings',
  site_title: 'Alvin Nugraha | Modern Portfolio & Software Engineer',
  site_description: 'Personal portfolio website showcasing software development projects, technical skills, and achievements.',
  primary_color: '#6366f1',
  favicon_url: null,
  contact_email: 'alvnngrh12345@gmail.com',
  contact_phone: '+62 877-1670-1824',
  address: 'Bekasi, Indonesia',
  meta_keywords: 'portfolio, web developer, software engineer, react, supabase',
}

export const DEFAULT_SKILLS: Skill[] = [
  { id: '1', name: 'TypeScript', category: 'programming', icon_name: 'Code2', proficiency_level: 90, display_order: 1 },
  { id: '2', name: 'JavaScript (ES6+)', category: 'programming', icon_name: 'FileCode', proficiency_level: 95, display_order: 2 },
  { id: '3', name: 'Python', category: 'programming', icon_name: 'Terminal', proficiency_level: 80, display_order: 3 },
  { id: '4', name: 'React.js', category: 'frontend', icon_name: 'Layers', proficiency_level: 92, display_order: 4 },
  { id: '5', name: 'Next.js', category: 'frontend', icon_name: 'Globe', proficiency_level: 85, display_order: 5 },
  { id: '6', name: 'Tailwind CSS', category: 'frontend', icon_name: 'Palette', proficiency_level: 95, display_order: 6 },
  { id: '7', name: 'Node.js & Express', category: 'backend', icon_name: 'Server', proficiency_level: 88, display_order: 7 },
  { id: '8', name: 'Supabase & BaaS', category: 'backend', icon_name: 'Zap', proficiency_level: 90, display_order: 8 },
  { id: '9', name: 'PostgreSQL', category: 'database', icon_name: 'Database', proficiency_level: 85, display_order: 9 },
  { id: '10', name: 'Prisma ORM', category: 'database', icon_name: 'Cpu', proficiency_level: 82, display_order: 10 },
  { id: '11', name: 'Git & GitHub', category: 'tools', icon_name: 'GitBranch', proficiency_level: 92, display_order: 11 },
  { id: '12', name: 'Docker & CI/CD', category: 'tools', icon_name: 'Box', proficiency_level: 78, display_order: 12 },
  { id: '13', name: 'Figma & UI Design', category: 'tools', icon_name: 'Layout', proficiency_level: 80, display_order: 13 },
]

export const DEFAULT_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    title: 'Campus Event Hub',
    slug: 'campus-event-hub',
    description:
      'Platform manajemen tiket dan pendaftaran event kampus terintegrasi dengan payment gateway dan QR scanner tiket.',
    category: 'Web App',
    thumbnail_url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800',
    github_url: 'https://github.com',
    demo_url: 'https://example.com',
    is_featured: true,
    is_published: true,
    display_order: 1,
    technologies: ['React.js', 'TypeScript', 'Tailwind CSS', 'Supabase'],
  },
  {
    id: 'proj-2',
    title: 'AI Smart Journaling',
    slug: 'ai-smart-journaling',
    description:
      'Aplikasi catatan harian dengan analisis mood berbasis AI dan insight produktivitas mingguan.',
    category: 'AI & Web',
    thumbnail_url: 'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&q=80&w=800',
    github_url: 'https://github.com',
    demo_url: 'https://example.com',
    is_featured: true,
    is_published: true,
    display_order: 2,
    technologies: ['React', 'Gemini AI API', 'Node.js', 'Tailwind CSS'],
  },
  {
    id: 'proj-3',
    title: 'AgriTech Monitoring System',
    slug: 'agritech-monitoring-system',
    description:
      'Dashboard IoT monitoring kelembaban tanah dan otomasi penyiraman tanaman secara real-time.',
    category: 'IoT & Dashboard',
    thumbnail_url: 'https://images.unsplash.com/photo-1558441719-8d48980f89a6?auto=format&fit=crop&q=80&w=800',
    github_url: 'https://github.com',
    demo_url: 'https://example.com',
    is_featured: false,
    is_published: true,
    display_order: 3,
    technologies: ['React', 'MQTT', 'PostgreSQL', 'Chart.js'],
  },
]

export const DEFAULT_EXPERIENCES: Experience[] = [
  {
    id: 'exp-1',
    type: 'internship',
    institution: 'Tech Innovator Asia',
    role: 'Frontend Developer Intern',
    description:
      'Mengembangkan fitur dashboard analytics menggunakan React, TypeScript, dan Tailwind CSS. Mengoptimalkan waktu render komponen hingga 35%.',
    location: 'Jakarta (Hybrid)',
    start_date: '2025-07-01',
    end_date: '2025-12-31',
    is_current: false,
    display_order: 1,
  },
  {
    id: 'exp-2',
    type: 'organization',
    institution: 'Himpunan Mahasiswa Informatika',
    role: 'Head of Technology & Web Development',
    description:
      'Memimpin tim pengembang beranggotakan 8 orang untuk membangun portal web event kampus yang melayani lebih dari 1.500 pengunjung aktif.',
    location: 'Kampus',
    start_date: '2024-02-01',
    end_date: '2025-01-31',
    is_current: false,
    display_order: 2,
  },
  {
    id: 'exp-3',
    type: 'work',
    institution: 'Freelance Software Developer',
    role: 'Full-Stack Web Developer',
    description:
      'Membangun aplikasi web kustom untuk klien UMKM dan organisasi, menerapkan integrasi REST API, database PostgreSQL, dan responsive UI.',
    location: 'Remote',
    start_date: '2024-01-01',
    end_date: null,
    is_current: true,
    display_order: 3,
  },
]

export const DEFAULT_EDUCATIONS: Education[] = [
  {
    id: 'edu-1',
    institution: 'Universitas Teknologi Indonesia',
    degree: 'Sarjana Komputer (S.Kom)',
    field_of_study: 'Sistem Informasi',
    gpa: '3.88 / 4.00',
    start_date: '2023-09-01',
    end_date: null,
    is_current: true,
    description: 'Fokus penelitian pada Software Engineering, Cloud Computing, dan Human-Computer Interaction.',
  },
]

export const DEFAULT_CERTIFICATES: Certificate[] = [
  {
    id: 'cert-1',
    title: 'Meta Front-End Developer Professional Certificate',
    issuer: 'Meta & Coursera',
    issue_date: '2025-05-15',
    expiry_date: null,
    credential_id: 'META-FE-998273',
    credential_url: 'https://coursera.org/verify/professional-cert/sample',
    image_url: 'https://images.unsplash.com/photo-1589330694653-ded6df03f754?auto=format&fit=crop&q=80&w=600',
    display_order: 1,
  },
  {
    id: 'cert-2',
    title: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services',
    issue_date: '2025-03-20',
    expiry_date: '2028-03-20',
    credential_id: 'AWS-CCP-102938',
    credential_url: 'https://aws.amazon.com/verification',
    image_url: 'https://images.unsplash.com/photo-1523289333742-be1143f6b766?auto=format&fit=crop&q=80&w=600',
    display_order: 2,
  },
]

import { ALVIN_WA_URL, ALVIN_LINKEDIN_URL } from './contact'

export const DEFAULT_SOCIALS: SocialLink[] = [
  { id: '2', platform: 'linkedin', url: ALVIN_LINKEDIN_URL, is_visible: true, display_order: 1 },
  { id: '3', platform: 'whatsapp', url: ALVIN_WA_URL, is_visible: true, display_order: 2 },
  { id: '4', platform: 'instagram', url: 'https://instagram.com/alvnngrhh', is_visible: true, display_order: 3 },
]

