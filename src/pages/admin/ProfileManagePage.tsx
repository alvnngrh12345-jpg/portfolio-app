import React, { useEffect, useState } from 'react'
import { Upload, Save } from 'lucide-react'
import { AdminLayout } from '../../layouts/AdminLayout'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card'
import { Input } from '../../components/ui/Input'
import { Textarea } from '../../components/ui/Textarea'
import { Button } from '../../components/ui/Button'
import { useToast } from '../../components/ui/Toast'
import { portfolioService } from '../../services/portfolioService'
import { adminService } from '../../services/adminService'
import { DEFAULT_PROFILE } from '../../constants/initialData'
import type { Profile } from '../../types/database.types'
import alvinPhoto from '../../assets/images/WhatsApp Image 2026-10-31 at 11.58.42.jpeg'

export function ProfileManagePage() {
  const { success, error } = useToast()
  const [profile, setProfile] = useState<Profile>(DEFAULT_PROFILE)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false)
  const [isUploadingCv, setIsUploadingCv] = useState(false)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await portfolioService.getProfile()
        setProfile(data)
      } catch (err) {
        console.error('Error fetching profile:', err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchProfile()
  }, [])

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploadingAvatar(true)
    try {
      const url = await adminService.uploadFile('profile-images', file)
      setProfile((prev) => ({ ...prev, avatar_url: url }))
      success('Foto Berhasil Diupload', 'URL foto profil telah diperbarui.')
    } catch (err: any) {
      error('Upload Gagal', err.message || 'Gagal mengunggah foto.')
    } finally {
      setIsUploadingAvatar(false)
    }
  }

  const handleCvUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploadingCv(true)
    try {
      const url = await adminService.uploadFile('documents', file)
      setProfile((prev) => ({ ...prev, cv_url: url }))
      success('File CV Berhasil Diupload', 'Dokumen resume/CV telah diperbarui.')
    } catch (err: any) {
      error('Upload Gagal', err.message || 'Gagal mengunggah dokumen CV.')
    } finally {
      setIsUploadingCv(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    try {
      await adminService.updateProfile(profile)
      success('Perubahan Disimpan!', 'Profil dan informasi About Me berhasil diperbarui.')
    } catch (err: any) {
      error('Gagal Menyimpan', err.message || 'Terjadi kesalahan saat menyimpan profil.')
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <AdminLayout title="Profile & About Management">
        <div className="py-20 text-center text-slate-400">Memuat profil...</div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout
      title="Profile & About Management"
      subtitle="Kelola identitas personal, foto, headline, bio, dan file CV Anda."
    >
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Main Profile Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Avatar & Quick Upload */}
          <div className="lg:col-span-4">
            <Card className="bg-slate-900/70 border-slate-800">
              <CardHeader>
                <CardTitle className="text-base font-bold">Foto Profil & CV</CardTitle>
                <CardDescription>Unggah foto formal profesional dan file resume.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Avatar Preview */}
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative w-36 h-36 rounded-3xl overflow-hidden border-2 border-indigo-500/50 bg-slate-950 shadow-xl">
                    <img
                      src={
                        profile.avatar_url && !profile.avatar_url.includes('images.unsplash.com')
                          ? profile.avatar_url
                          : alvinPhoto
                      }
                      alt="Avatar"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>

                  <label className="cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleAvatarUpload}
                      disabled={isUploadingAvatar}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      isLoading={isUploadingAvatar}
                      className="cursor-pointer"
                      onClick={() => {
                        const input = document.querySelector('input[accept="image/*"]') as HTMLInputElement
                        input?.click()
                      }}
                    >
                      <Upload className="h-4 w-4 mr-1.5" />
                      Ganti Foto Profil
                    </Button>
                  </label>
                </div>

                {/* CV File Upload */}
                <div className="pt-4 border-t border-slate-800 space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                    File Dokumen CV / Resume
                  </p>
                  <Input
                    label="URL CV Langsung (Atau Upload File)"
                    placeholder="https://... atau klik upload"
                    value={profile.cv_url || ''}
                    onChange={(e) => setProfile({ ...profile, cv_url: e.target.value })}
                  />

                  <label className="block">
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                      onChange={handleCvUpload}
                      disabled={isUploadingCv}
                    />
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      isLoading={isUploadingCv}
                      className="w-full cursor-pointer"
                      onClick={() => {
                        const input = document.querySelector('input[accept=".pdf,.doc,.docx"]') as HTMLInputElement
                        input?.click()
                      }}
                    >
                      <Upload className="h-4 w-4 mr-1.5" />
                      Upload File PDF CV
                    </Button>
                  </label>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Form Fields */}
          <div className="lg:col-span-8 space-y-6">
            <Card className="bg-slate-900/70 border-slate-800">
              <CardHeader>
                <CardTitle className="text-base font-bold">Informasi Utama</CardTitle>
                <CardDescription>Nama, profesi, headline, dan detail kontak personal.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Nama Lengkap *"
                    value={profile.full_name}
                    onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                    required
                  />
                  <Input
                    label="Profesi / Bidang Keahlian *"
                    value={profile.title}
                    onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                    placeholder="e.g. Full-Stack Developer & Informatics Student"
                    required
                  />
                </div>

                <Input
                  label="Headline Menarik (Hero Section) *"
                  value={profile.headline}
                  onChange={(e) => setProfile({ ...profile, headline: e.target.value })}
                  placeholder="Deskripsi singkat yang tampil menonjol pada Hero Section"
                  required
                />

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Input
                    label="Alamat Email *"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    required
                  />
                  <Input
                    label="Nomor WhatsApp / Telepon"
                    value={profile.phone || ''}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    placeholder="+62 812-..."
                  />
                  <Input
                    label="Lokasi / Domisili"
                    value={profile.location || ''}
                    onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                    placeholder="Jakarta, Indonesia"
                  />
                </div>
              </CardContent>
            </Card>

            {/* About Me Section Narrative */}
            <Card className="bg-slate-900/70 border-slate-800">
              <CardHeader>
                <CardTitle className="text-base font-bold">Deskripsi & Narasi About Me</CardTitle>
                <CardDescription>Ceritakan latar belakang, fokus minat, dan filosofi pengembangan Anda.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  label="Bio Singkat (Ringkasan Diri)"
                  rows={3}
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  placeholder="Ringkasan 1-2 kalimat mengenai siapa diri Anda"
                />

                <Textarea
                  label="Narasi Lengkap About Me"
                  rows={6}
                  value={profile.about_narrative}
                  onChange={(e) => setProfile({ ...profile, about_narrative: e.target.value })}
                  placeholder="Cerita mendalam tentang perjalanan, antusiasme teknologi, dan nilai yang Anda bawa..."
                />
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button
                type="submit"
                size="lg"
                isLoading={isSaving}
                className="px-8 shadow-xl shadow-indigo-600/30 cursor-pointer"
              >
                <Save className="h-4 w-4 mr-2" />
                Simpan Perubahan Profil
              </Button>
            </div>
          </div>
        </div>
      </form>
    </AdminLayout>
  )
}
