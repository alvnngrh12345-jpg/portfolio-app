import React, { useEffect, useState } from 'react'
import { Save, Globe, Palette } from 'lucide-react'
import { AdminLayout } from '../../layouts/AdminLayout'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card'
import { Input } from '../../components/ui/Input'
import { Textarea } from '../../components/ui/Textarea'
import { Button } from '../../components/ui/Button'
import { useToast } from '../../components/ui/Toast'
import { portfolioService } from '../../services/portfolioService'
import { adminService } from '../../services/adminService'
import { DEFAULT_SETTINGS } from '../../constants/initialData'
import type { SiteSettings } from '../../types/database.types'

export function SettingsManagePage() {
  const { success, error } = useToast()
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SETTINGS)
  const [loading, setLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await portfolioService.getSiteSettings()
        setSettings(data)
      } catch (err) {
        console.error('Error fetching site settings:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchSettings()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    try {
      await adminService.updateSettings(settings)
      success('Pengaturan Disimpan!', 'Pengaturan website & SEO berhasil diperbarui.')
    } catch (err: any) {
      error('Gagal Menyimpan', err.message)
    } finally {
      setIsSaving(false)
    }
  }

  if (loading) {
    return (
      <AdminLayout title="Site Settings">
        <div className="py-20 text-center text-slate-400">Memuat pengaturan...</div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout
      title="Website Settings"
      subtitle="Konfigurasi metadata SEO, judul situs, identitas kontak, dan tema website."
    >
      <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
        {/* SEO & Identity */}
        <Card className="bg-slate-900/70 border-slate-800">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-indigo-400" />
              <CardTitle className="text-base font-bold">SEO & Metadata Website</CardTitle>
            </div>
            <CardDescription>
              Informasi yang akan dibaca oleh search engine seperti Google dan preview saat link dibagikan.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              label="Judul Website (SEO Title) *"
              value={settings.site_title}
              onChange={(e) => setSettings({ ...settings, site_title: e.target.value })}
              placeholder="e.g. Alvin Nugraha | Modern Portfolio & Software Engineer"
              required
            />

            <Textarea
              label="Deskripsi Website (Meta Description) *"
              rows={3}
              value={settings.site_description}
              onChange={(e) => setSettings({ ...settings, site_description: e.target.value })}
              placeholder="Ringkasan deskripsi website untuk mesin pencari..."
              required
            />

            <Input
              label="Kata Kunci SEO (Meta Keywords - Pisahkan dengan koma)"
              value={settings.meta_keywords || ''}
              onChange={(e) => setSettings({ ...settings, meta_keywords: e.target.value })}
              placeholder="portfolio, developer, react, typescript, backend"
            />
          </CardContent>
        </Card>

        {/* Visual & Theme Accent */}
        <Card className="bg-slate-900/70 border-slate-800">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Palette className="h-5 w-5 text-indigo-400" />
              <CardTitle className="text-base font-bold">Tema & Aksen Warna</CardTitle>
            </div>
            <CardDescription>Sesuaikan warna aksen utama yang memperkuat personal branding Anda.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Warna Utama (Primary Accent)
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={settings.primary_color || '#6366f1'}
                    onChange={(e) => setSettings({ ...settings, primary_color: e.target.value })}
                    className="h-11 w-14 rounded-xl border border-slate-800 cursor-pointer p-1 bg-slate-950"
                  />
                  <Input
                    value={settings.primary_color || '#6366f1'}
                    onChange={(e) => setSettings({ ...settings, primary_color: e.target.value })}
                    placeholder="#6366f1"
                  />
                </div>
              </div>

              <Input
                label="Favicon URL"
                placeholder="https://... /favicon.ico"
                value={settings.favicon_url || ''}
                onChange={(e) => setSettings({ ...settings, favicon_url: e.target.value })}
              />
            </div>
          </CardContent>
        </Card>

        {/* Contact Info */}
        <Card className="bg-slate-900/70 border-slate-800">
          <CardHeader>
            <CardTitle className="text-base font-bold">Informasi Kontak & Footer</CardTitle>
            <CardDescription>Kontak publik yang ditampilkan pada footer dan formulir situs.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Input
                label="Email Kontak Utama *"
                type="email"
                value={settings.contact_email}
                onChange={(e) => setSettings({ ...settings, contact_email: e.target.value })}
                required
              />
              <Input
                label="Nomor WhatsApp Publik"
                value={settings.contact_phone}
                onChange={(e) => setSettings({ ...settings, contact_phone: e.target.value })}
              />
              <Input
                label="Alamat / Kota"
                value={settings.address}
                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" size="lg" isLoading={isSaving} className="px-8 shadow-xl shadow-indigo-600/30">
            <Save className="h-4 w-4 mr-2" />
            Simpan Pengaturan
          </Button>
        </div>
      </form>
    </AdminLayout>
  )
}
