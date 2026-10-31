import { supabase, isSupabaseConfigured } from '../lib/supabase'
import type {
  Profile,
  Skill,
  Project,
  Experience,
  Education,
  Certificate,
  Message,
  SiteSettings,
} from '../types/database.types'

const client = supabase as any

export const adminService = {
  // --- STATS OVERVIEW ---
  async getOverviewStats() {
    if (!isSupabaseConfigured()) {
      return {
        totalProjects: 3,
        totalSkills: 13,
        totalCertificates: 2,
        totalMessages: 1,
        totalExperience: 3,
      }
    }

    try {
      const [
        { count: projCount },
        { count: skillCount },
        { count: certCount },
        { count: msgCount },
        { count: expCount },
      ] = await Promise.all([
        client.from('projects').select('*', { count: 'exact', head: true }),
        client.from('skills').select('*', { count: 'exact', head: true }),
        client.from('certificates').select('*', { count: 'exact', head: true }),
        client.from('messages').select('*', { count: 'exact', head: true }),
        client.from('experiences').select('*', { count: 'exact', head: true }),
      ])

      return {
        totalProjects: projCount || 0,
        totalSkills: skillCount || 0,
        totalCertificates: certCount || 0,
        totalMessages: msgCount || 0,
        totalExperience: expCount || 0,
      }
    } catch {
      return {
        totalProjects: 0,
        totalSkills: 0,
        totalCertificates: 0,
        totalMessages: 0,
        totalExperience: 0,
      }
    }
  },

  // --- STORAGE UPLOAD ---
  async uploadFile(bucket: 'profile-images' | 'project-images' | 'certificates' | 'documents', file: File): Promise<string> {
    if (!isSupabaseConfigured()) {
      return URL.createObjectURL(file)
    }

    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`
    const filePath = `${fileName}`

    const { error } = await supabase.storage.from(bucket).upload(filePath, file)
    if (error) throw error

    const { data } = supabase.storage.from(bucket).getPublicUrl(filePath)
    return data.publicUrl
  },

  // --- PROFILE ---
  async updateProfile(profileData: Partial<Profile>) {
    if (!isSupabaseConfigured()) return { success: true }
    const { data: existing } = await client.from('profiles').select('id').limit(1).single()
    if (existing?.id) {
      const { error } = await client
        .from('profiles')
        .update({ ...profileData, updated_at: new Date().toISOString() })
        .eq('id', existing.id)
      if (error) throw error
    } else {
      const { error } = await client.from('profiles').insert([profileData])
      if (error) throw error
    }
    return { success: true }
  },

  // --- SITE SETTINGS ---
  async updateSettings(settingsData: Partial<SiteSettings>) {
    if (!isSupabaseConfigured()) return { success: true }
    const { data: existing } = await client.from('site_settings').select('id').limit(1).single()
    if (existing?.id) {
      const { error } = await client
        .from('site_settings')
        .update({ ...settingsData, updated_at: new Date().toISOString() })
        .eq('id', existing.id)
      if (error) throw error
    } else {
      const { error } = await client.from('site_settings').insert([settingsData])
      if (error) throw error
    }
    return { success: true }
  },

  // --- SKILLS CRUD ---
  async saveSkill(skill: Partial<Skill>) {
    if (!isSupabaseConfigured()) return { success: true }
    if (skill.id) {
      const { error } = await client.from('skills').update(skill).eq('id', skill.id)
      if (error) throw error
    } else {
      const { error } = await client.from('skills').insert([skill])
      if (error) throw error
    }
    return { success: true }
  },

  async deleteSkill(id: string) {
    if (!isSupabaseConfigured()) return { success: true }
    const { error } = await client.from('skills').delete().eq('id', id)
    if (error) throw error
    return { success: true }
  },

  // --- PROJECTS CRUD ---
  async saveProject(project: Partial<Project>, technologies: string[] = []) {
    if (!isSupabaseConfigured()) return { success: true }

    let projectId = project.id

    if (projectId) {
      const { error } = await client
        .from('projects')
        .update({
          title: project.title,
          slug: project.slug,
          description: project.description,
          category: project.category,
          thumbnail_url: project.thumbnail_url,
          github_url: project.github_url,
          demo_url: project.demo_url,
          is_featured: project.is_featured,
          is_published: project.is_published,
          display_order: project.display_order,
          updated_at: new Date().toISOString(),
        })
        .eq('id', projectId)
      if (error) throw error

      await client.from('project_technologies').delete().eq('project_id', projectId)
    } else {
      const { data, error } = await client
        .from('projects')
        .insert([
          {
            title: project.title,
            slug: project.slug,
            description: project.description,
            category: project.category,
            thumbnail_url: project.thumbnail_url,
            github_url: project.github_url,
            demo_url: project.demo_url,
            is_featured: project.is_featured ?? false,
            is_published: project.is_published ?? true,
            display_order: project.display_order ?? 0,
          },
        ])
        .select('id')
        .single()
      if (error) throw error
      projectId = data.id
    }

    if (technologies.length > 0 && projectId) {
      const techRows = technologies.map((tech) => ({
        project_id: projectId,
        tech_name: tech.trim(),
      }))
      await client.from('project_technologies').insert(techRows)
    }

    return { success: true }
  },

  async deleteProject(id: string) {
    if (!isSupabaseConfigured()) return { success: true }
    const { error } = await client.from('projects').delete().eq('id', id)
    if (error) throw error
    return { success: true }
  },

  // --- EXPERIENCES CRUD ---
  async saveExperience(exp: Partial<Experience>) {
    if (!isSupabaseConfigured()) return { success: true }
    if (exp.id) {
      const { error } = await client.from('experiences').update(exp).eq('id', exp.id)
      if (error) throw error
    } else {
      const { error } = await client.from('experiences').insert([exp])
      if (error) throw error
    }
    return { success: true }
  },

  async deleteExperience(id: string) {
    if (!isSupabaseConfigured()) return { success: true }
    const { error } = await client.from('experiences').delete().eq('id', id)
    if (error) throw error
    return { success: true }
  },

  // --- EDUCATIONS CRUD ---
  async saveEducation(edu: Partial<Education>) {
    if (!isSupabaseConfigured()) return { success: true }
    if (edu.id) {
      const { error } = await client.from('educations').update(edu).eq('id', edu.id)
      if (error) throw error
    } else {
      const { error } = await client.from('educations').insert([edu])
      if (error) throw error
    }
    return { success: true }
  },

  async deleteEducation(id: string) {
    if (!isSupabaseConfigured()) return { success: true }
    const { error } = await client.from('educations').delete().eq('id', id)
    if (error) throw error
    return { success: true }
  },

  // --- CERTIFICATES CRUD ---
  async saveCertificate(cert: Partial<Certificate>) {
    if (!isSupabaseConfigured()) return { success: true }
    if (cert.id) {
      const { error } = await client.from('certificates').update(cert).eq('id', cert.id)
      if (error) throw error
    } else {
      const { error } = await client.from('certificates').insert([cert])
      if (error) throw error
    }
    return { success: true }
  },

  async deleteCertificate(id: string) {
    if (!isSupabaseConfigured()) return { success: true }
    const { error } = await client.from('certificates').delete().eq('id', id)
    if (error) throw error
    return { success: true }
  },

  // --- MESSAGES INBOX ---
  async getMessages(): Promise<Message[]> {
    if (!isSupabaseConfigured()) {
      return [
        {
          id: 'demo-msg-1',
          sender_name: 'Sarah Amanda',
          sender_email: 'sarah@company.id',
          subject: 'Peluang Kerja Sama Proyek Web',
          message:
            'Halo Alvin, saya melihat portfolio kamu dan sangat terkesan dengan clean design dan performanya. Apakah kamu terbuka untuk proyek freelance bulan depan?',
          is_read: false,
          created_at: new Date().toISOString(),
        },
      ]
    }
    const { data, error } = await client
      .from('messages')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) throw error
    return data || []
  },

  async markMessageAsRead(id: string, is_read: boolean) {
    if (!isSupabaseConfigured()) return { success: true }
    const { error } = await client.from('messages').update({ is_read }).eq('id', id)
    if (error) throw error
    return { success: true }
  },

  async deleteMessage(id: string) {
    if (!isSupabaseConfigured()) return { success: true }
    const { error } = await client.from('messages').delete().eq('id', id)
    if (error) throw error
    return { success: true }
  },
}
