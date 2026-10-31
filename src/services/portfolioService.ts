import { supabase, isSupabaseConfigured } from '../lib/supabase'
import {
  DEFAULT_PROFILE,
  DEFAULT_SETTINGS,
  DEFAULT_SKILLS,
  DEFAULT_PROJECTS,
  DEFAULT_EXPERIENCES,
  DEFAULT_EDUCATIONS,
  DEFAULT_CERTIFICATES,
  DEFAULT_SOCIALS,
} from '../constants/initialData'
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

import { ALVIN_WA_URL } from '../constants/contact'

export const portfolioService = {
  async getProfile(): Promise<Profile> {
    if (!isSupabaseConfigured()) return DEFAULT_PROFILE
    try {
      const { data, error } = await (supabase as any)
        .from('profiles')
        .select('*')
        .limit(1)
        .single()
      if (error || !data) return DEFAULT_PROFILE

      const d = data as any

      // Sanitize placeholder template data so Alvin Nugraha & photo are always applied
      const isPlaceholderName = !d.full_name || d.full_name.includes('Alex Pratama')
      const isPlaceholderAvatar =
        !d.avatar_url ||
        d.avatar_url.includes('images.unsplash.com') ||
        d.avatar_url.includes('photo-1534528741775') ||
        d.avatar_url.includes('avatar')
      const isPlaceholderLocation = !d.location || d.location === 'Jakarta, Indonesia'
      const isPlaceholderEmail = !d.email || d.email.includes('alex')
      const isPlaceholderPhone = !d.phone || d.phone.includes('812-3456')

      const sanitizedProfile: Profile = {
        ...d,
        full_name: isPlaceholderName ? DEFAULT_PROFILE.full_name : d.full_name,
        avatar_url: isPlaceholderAvatar ? DEFAULT_PROFILE.avatar_url : d.avatar_url,
        location: isPlaceholderLocation ? DEFAULT_PROFILE.location : d.location,
        email: isPlaceholderEmail ? DEFAULT_PROFILE.email : d.email,
        phone: isPlaceholderPhone ? DEFAULT_PROFILE.phone : d.phone,
      }

      // If database contains old placeholder, attempt to update it in Supabase
      if (isPlaceholderName || isPlaceholderAvatar) {
        ;(supabase as any)
          .from('profiles')
          .update({
            full_name: DEFAULT_PROFILE.full_name,
            avatar_url: DEFAULT_PROFILE.avatar_url,
            location: DEFAULT_PROFILE.location,
            email: DEFAULT_PROFILE.email,
            phone: DEFAULT_PROFILE.phone,
          })
          .eq('id', d.id)
          .then(() => {})
          .catch(() => {})
      }

      return sanitizedProfile
    } catch {
      return DEFAULT_PROFILE
    }
  },

  async getSiteSettings(): Promise<SiteSettings> {
    if (!isSupabaseConfigured()) return DEFAULT_SETTINGS
    try {
      const { data, error } = await (supabase as any)
        .from('site_settings')
        .select('*')
        .limit(1)
        .single()
      if (error || !data) return DEFAULT_SETTINGS

      const d = data as any
      const isPlaceholderTitle = !d.site_title || d.site_title.includes('Alex Pratama')
      const isPlaceholderAddress = !d.address || d.address === 'Jakarta, Indonesia'
      const isPlaceholderEmail = !d.contact_email || d.contact_email.includes('alex')
      const isPlaceholderPhone = !d.contact_phone || d.contact_phone.includes('812-3456')

      return {
        ...d,
        site_title: isPlaceholderTitle ? DEFAULT_SETTINGS.site_title : d.site_title,
        contact_email: isPlaceholderEmail ? DEFAULT_SETTINGS.contact_email : d.contact_email,
        contact_phone: isPlaceholderPhone ? DEFAULT_SETTINGS.contact_phone : d.contact_phone,
        address: isPlaceholderAddress ? DEFAULT_SETTINGS.address : d.address,
      }
    } catch {
      return DEFAULT_SETTINGS
    }
  },

  async getSkills(): Promise<Skill[]> {
    if (!isSupabaseConfigured()) return DEFAULT_SKILLS
    try {
      const { data, error } = await supabase
        .from('skills')
        .select('*')
        .order('display_order', { ascending: true })
      if (error || !data || data.length === 0) return DEFAULT_SKILLS
      return data
    } catch {
      return DEFAULT_SKILLS
    }
  },

  async getProjects(): Promise<Project[]> {
    if (!isSupabaseConfigured()) return DEFAULT_PROJECTS
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*, project_technologies(tech_name)')
        .eq('is_published', true)
        .order('display_order', { ascending: true })

      if (error || !data || data.length === 0) return DEFAULT_PROJECTS

      return data.map((item: any) => ({
        ...item,
        technologies: item.project_technologies?.map((t: any) => t.tech_name) || [],
      }))
    } catch {
      return DEFAULT_PROJECTS
    }
  },

  async getExperiences(): Promise<Experience[]> {
    if (!isSupabaseConfigured()) return DEFAULT_EXPERIENCES
    try {
      const { data, error } = await supabase
        .from('experiences')
        .select('*')
        .order('display_order', { ascending: true })
      if (error || !data || data.length === 0) return DEFAULT_EXPERIENCES
      return data
    } catch {
      return DEFAULT_EXPERIENCES
    }
  },

  async getEducations(): Promise<Education[]> {
    if (!isSupabaseConfigured()) return DEFAULT_EDUCATIONS
    try {
      const { data, error } = await supabase
        .from('educations')
        .select('*')
        .order('start_date', { ascending: false })
      if (error || !data || data.length === 0) return DEFAULT_EDUCATIONS
      return data
    } catch {
      return DEFAULT_EDUCATIONS
    }
  },

  async getCertificates(): Promise<Certificate[]> {
    if (!isSupabaseConfigured()) return DEFAULT_CERTIFICATES
    try {
      const { data, error } = await supabase
        .from('certificates')
        .select('*')
        .order('display_order', { ascending: true })
      if (error || !data || data.length === 0) return DEFAULT_CERTIFICATES
      return data
    } catch {
      return DEFAULT_CERTIFICATES
    }
  },

  async getSocialLinks(): Promise<SocialLink[]> {
    if (!isSupabaseConfigured()) return DEFAULT_SOCIALS
    try {
      const { data, error } = await supabase
        .from('social_links')
        .select('*')
        .eq('is_visible', true)
        .order('display_order', { ascending: true })
      if (error || !data || data.length === 0) return DEFAULT_SOCIALS

      // Ensure WhatsApp and Instagram map to Alvin Nugraha's real links
      return data.map((item: any) => {
        const platform = item.platform?.toLowerCase()
        if (platform === 'whatsapp') {
          return { ...item, url: ALVIN_WA_URL }
        }
        if (platform === 'instagram') {
          return { ...item, url: 'https://instagram.com/alvnngrhh' }
        }
        return item
      })
    } catch {
      return DEFAULT_SOCIALS
    }
  },

  async sendMessage(sender_name: string, sender_email: string, message: string, subject?: string) {
    if (!isSupabaseConfigured()) {
      // Return simulated success if demo mode
      return { success: true, isDemo: true }
    }
    const { data, error } = await supabase.from('messages').insert({
      sender_name,
      sender_email,
      message,
      subject: subject || null,
      is_read: false,
    } as any)
    if (error) throw error
    return { success: true, data }
  },
}
