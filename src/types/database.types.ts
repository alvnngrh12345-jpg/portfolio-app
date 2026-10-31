export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Profile {
  id: string
  full_name: string
  title: string
  headline: string
  bio: string
  about_narrative: string
  avatar_url: string | null
  cv_url: string | null
  email: string
  phone: string | null
  location: string | null
  created_at?: string
  updated_at?: string
}

export type SkillCategory = 'programming' | 'frontend' | 'backend' | 'database' | 'tools'

export interface Skill {
  id: string
  name: string
  category: SkillCategory
  icon_name: string
  proficiency_level: number | null
  display_order: number
  created_at?: string
}

export interface ProjectTechnology {
  id: string
  project_id: string
  tech_name: string
}

export interface Project {
  id: string
  title: string
  slug: string
  description: string
  category: string
  thumbnail_url: string | null
  github_url: string | null
  demo_url: string | null
  is_featured: boolean
  is_published: boolean
  display_order: number
  created_at?: string
  updated_at?: string
  technologies?: string[]
}

export type ExperienceType = 'work' | 'organization' | 'internship'

export interface Experience {
  id: string
  type: ExperienceType
  institution: string
  role: string
  description: string
  location: string | null
  start_date: string
  end_date: string | null
  is_current: boolean
  display_order: number
  created_at?: string
}

export interface Education {
  id: string
  institution: string
  degree: string
  field_of_study: string
  gpa: string | null
  start_date: string
  end_date: string | null
  is_current: boolean
  description: string | null
  created_at?: string
}

export interface Certificate {
  id: string
  title: string
  issuer: string
  issue_date: string
  expiry_date: string | null
  credential_id: string | null
  credential_url: string | null
  image_url: string
  display_order: number
  created_at?: string
}

export interface SocialLink {
  id: string
  platform: 'github' | 'linkedin' | 'instagram' | 'whatsapp' | 'twitter' | 'youtube' | 'website' | string
  url: string
  is_visible: boolean
  display_order: number
  created_at?: string
}

export interface Message {
  id: string
  sender_name: string
  sender_email: string
  subject: string | null
  message: string
  is_read: boolean
  created_at: string
}

export interface SiteSettings {
  id: string
  site_title: string
  site_description: string
  primary_color: string
  favicon_url: string | null
  contact_email: string
  contact_phone: string
  address: string
  meta_keywords: string
  created_at?: string
  updated_at?: string
}

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile
        Insert: Partial<Profile>
        Update: Partial<Profile>
      }
      skills: {
        Row: Skill
        Insert: Partial<Skill>
        Update: Partial<Skill>
      }
      projects: {
        Row: Project
        Insert: Partial<Project>
        Update: Partial<Project>
      }
      project_technologies: {
        Row: ProjectTechnology
        Insert: Partial<ProjectTechnology>
        Update: Partial<ProjectTechnology>
      }
      experiences: {
        Row: Experience
        Insert: Partial<Experience>
        Update: Partial<Experience>
      }
      educations: {
        Row: Education
        Insert: Partial<Education>
        Update: Partial<Education>
      }
      certificates: {
        Row: Certificate
        Insert: Partial<Certificate>
        Update: Partial<Certificate>
      }
      social_links: {
        Row: SocialLink
        Insert: Partial<SocialLink>
        Update: Partial<SocialLink>
      }
      messages: {
        Row: Message
        Insert: Partial<Message>
        Update: Partial<Message>
      }
      site_settings: {
        Row: SiteSettings
        Insert: Partial<SiteSettings>
        Update: Partial<SiteSettings>
      }
    }
  }
}

