import React, { useEffect, useState } from 'react'
import { Plus, Edit2, Trash2, Briefcase, GraduationCap } from 'lucide-react'
import { AdminLayout } from '../../layouts/AdminLayout'
import { Card, CardContent } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Badge } from '../../components/ui/Badge'
import { Input } from '../../components/ui/Input'
import { Textarea } from '../../components/ui/Textarea'
import { Modal } from '../../components/ui/Modal'
import { useToast } from '../../components/ui/Toast'
import { portfolioService } from '../../services/portfolioService'
import { adminService } from '../../services/adminService'
import { formatDate } from '../../lib/utils'
import type { Experience, Education, ExperienceType } from '../../types/database.types'

export function ExperienceManagePage() {
  const { success, error } = useToast()
  const [activeTab, setActiveTab] = useState<'experiences' | 'educations'>('experiences')
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [educations, setEducations] = useState<Education[]>([])
  const [loading, setLoading] = useState(true)

  const [isExpModalOpen, setIsExpModalOpen] = useState(false)
  const [isEduModalOpen, setIsEduModalOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const [editingExp, setEditingExp] = useState<Partial<Experience> | null>(null)
  const [editingEdu, setEditingEdu] = useState<Partial<Education> | null>(null)

  const fetchData = async () => {
    try {
      const [expData, eduData] = await Promise.all([
        portfolioService.getExperiences(),
        portfolioService.getEducations(),
      ])
      setExperiences(expData)
      setEducations(eduData)
    } catch (err) {
      console.error('Error fetching data:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  // Experience handlers
  const handleOpenAddExp = () => {
    setEditingExp({
      type: 'work',
      institution: '',
      role: '',
      description: '',
      location: 'Jakarta (Hybrid)',
      start_date: new Date().toISOString().split('T')[0],
      end_date: null,
      is_current: true,
      display_order: experiences.length + 1,
    })
    setIsExpModalOpen(true)
  }

  const handleOpenEditExp = (exp: Experience) => {
    setEditingExp(exp)
    setIsExpModalOpen(true)
  }

  const handleDeleteExp = async (id: string, role: string) => {
    if (!window.confirm(`Hapus pengalaman "${role}"?`)) return
    try {
      await adminService.deleteExperience(id)
      success('Dihapus', 'Pengalaman berhasil dihapus.')
      setExperiences((prev) => prev.filter((e) => e.id !== id))
    } catch (err: any) {
      error('Gagal Menghapus', err.message)
    }
  }

  const handleSaveExp = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingExp?.institution || !editingExp?.role) return

    setIsSaving(true)
    try {
      await adminService.saveExperience(editingExp)
      success('Disimpan!', 'Pengalaman kerja/organisasi berhasil disimpan.')
      setIsExpModalOpen(false)
      fetchData()
    } catch (err: any) {
      error('Gagal Menyimpan', err.message)
    } finally {
      setIsSaving(false)
    }
  }

  // Education handlers
  const handleOpenAddEdu = () => {
    setEditingEdu({
      institution: '',
      degree: 'Sarjana Komputer (S.Kom)',
      field_of_study: 'Sistem Informasi',
      gpa: '3.80 / 4.00',
      start_date: '2023-09-01',
      end_date: null,
      is_current: true,
      description: '',
    })
    setIsEduModalOpen(true)
  }

  const handleOpenEditEdu = (edu: Education) => {
    setEditingEdu(edu)
    setIsEduModalOpen(true)
  }

  const handleDeleteEdu = async (id: string, inst: string) => {
    if (!window.confirm(`Hapus pendidikan "${inst}"?`)) return
    try {
      await adminService.deleteEducation(id)
      success('Dihapus', 'Riwayat pendidikan berhasil dihapus.')
      setEducations((prev) => prev.filter((e) => e.id !== id))
    } catch (err: any) {
      error('Gagal Menghapus', err.message)
    }
  }

  const handleSaveEdu = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingEdu?.institution || !editingEdu?.degree) return

    setIsSaving(true)
    try {
      await adminService.saveEducation(editingEdu)
      success('Disimpan!', 'Riwayat pendidikan berhasil disimpan.')
      setIsEduModalOpen(false)
      fetchData()
    } catch (err: any) {
      error('Gagal Menyimpan', err.message)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <AdminLayout
      title="Experience & Education Management"
      subtitle="Kelola linimasa rekam jejak kerja, organisasi, magang, dan riwayat akademik."
    >
      <div className="space-y-6">
        {/* Sub Navigation Tabs */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('experiences')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'experiences'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              Pengalaman (Kerja, Magang, Org)
            </button>
            <button
              onClick={() => setActiveTab('educations')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'educations'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              Riwayat Pendidikan
            </button>
          </div>

          {activeTab === 'experiences' ? (
            <Button onClick={handleOpenAddExp} size="sm">
              <Plus className="h-4 w-4 mr-1.5" />
              Tambah Pengalaman
            </Button>
          ) : (
            <Button onClick={handleOpenAddEdu} size="sm">
              <Plus className="h-4 w-4 mr-1.5" />
              Tambah Pendidikan
            </Button>
          )}
        </div>

        {/* Tab 1: Experiences */}
        {activeTab === 'experiences' && (
          <div className="space-y-4">
            {loading ? (
              <div className="py-20 text-center text-slate-500">Memuat data pengalaman...</div>
            ) : experiences.length === 0 ? (
              <Card className="p-12 text-center text-slate-500 bg-slate-900/60 border-slate-800">Belum ada pengalaman tercatat.</Card>
            ) : (
              experiences.map((exp) => (
                <Card key={exp.id} className="p-5 bg-slate-900/70 border-slate-800 hover:border-indigo-500/50 transition-all">
                  <CardContent className="p-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Briefcase className="h-4 w-4 text-indigo-400 shrink-0" />
                        <h4 className="font-bold text-white text-base">{exp.role}</h4>
                        <Badge variant="secondary" className="capitalize text-[10px]">
                          {exp.type}
                        </Badge>
                      </div>
                      <p className="text-sm font-semibold text-slate-300">{exp.institution}</p>
                      <p className="text-xs text-slate-400">
                        {formatDate(exp.start_date)} — {exp.is_current ? 'Present' : formatDate(exp.end_date)}
                        {exp.location && ` • ${exp.location}`}
                      </p>
                      <p className="text-xs text-slate-400 pt-1 line-clamp-2 font-light">{exp.description}</p>
                    </div>

                    <div className="flex items-center gap-1 shrink-0 self-end sm:self-center">
                      <Button variant="ghost" size="icon" onClick={() => handleOpenEditExp(exp)} className="h-8 w-8 text-slate-400 hover:text-indigo-400 hover:bg-slate-800">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteExp(exp.id, exp.role)} className="h-8 w-8 text-slate-400 hover:text-rose-400 hover:bg-slate-800">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}

        {/* Tab 2: Educations */}
        {activeTab === 'educations' && (
          <div className="space-y-4">
            {loading ? (
              <div className="py-20 text-center text-slate-500">Memuat data pendidikan...</div>
            ) : educations.length === 0 ? (
              <Card className="p-12 text-center text-slate-500 bg-slate-900/60 border-slate-800">Belum ada riwayat pendidikan.</Card>
            ) : (
              educations.map((edu) => (
                <Card key={edu.id} className="p-5 bg-slate-900/70 border-slate-800 hover:border-indigo-500/50 transition-all">
                  <CardContent className="p-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <GraduationCap className="h-4 w-4 text-indigo-400 shrink-0" />
                        <h4 className="font-bold text-white text-base">{edu.institution}</h4>
                      </div>
                      <p className="text-sm font-semibold text-slate-300">
                        {edu.degree} — {edu.field_of_study}
                      </p>
                      <p className="text-xs text-slate-400">
                        {edu.start_date.substring(0, 4)} — {edu.is_current ? 'Present' : edu.end_date?.substring(0, 4)}
                        {edu.gpa && ` • IPK: ${edu.gpa}`}
                      </p>
                    </div>

                    <div className="flex items-center gap-1 shrink-0 self-end sm:self-center">
                      <Button variant="ghost" size="icon" onClick={() => handleOpenEditEdu(edu)} className="h-8 w-8 text-slate-400 hover:text-indigo-400 hover:bg-slate-800">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteEdu(edu.id, edu.institution)} className="h-8 w-8 text-slate-400 hover:text-rose-400 hover:bg-slate-800">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}
      </div>

      {/* Modal Add/Edit Experience */}
      <Modal
        isOpen={isExpModalOpen}
        onClose={() => setIsExpModalOpen(false)}
        maxWidth="lg"
        title={editingExp?.id ? 'Edit Pengalaman' : 'Tambah Pengalaman Baru'}
      >
        {editingExp && (
          <form onSubmit={handleSaveExp} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">Tipe Pengalaman</label>
              <select
                className="flex h-11 w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={editingExp.type}
                onChange={(e) => setEditingExp({ ...editingExp, type: e.target.value as ExperienceType })}
              >
                <option value="work" className="bg-slate-900">Pekerjaan Profesional</option>
                <option value="internship" className="bg-slate-900">Magang (Internship)</option>
                <option value="organization" className="bg-slate-900">Organisasi / Kepanitiaan</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Institusi / Perusahaan *"
                value={editingExp.institution || ''}
                onChange={(e) => setEditingExp({ ...editingExp, institution: e.target.value })}
                required
              />
              <Input
                label="Posisi / Jabatan *"
                value={editingExp.role || ''}
                onChange={(e) => setEditingExp({ ...editingExp, role: e.target.value })}
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Input
                label="Tanggal Mulai *"
                type="date"
                value={editingExp.start_date || ''}
                onChange={(e) => setEditingExp({ ...editingExp, start_date: e.target.value })}
                required
              />
              <Input
                label="Tanggal Selesai"
                type="date"
                disabled={editingExp.is_current}
                value={editingExp.end_date || ''}
                onChange={(e) => setEditingExp({ ...editingExp, end_date: e.target.value })}
              />
              <Input
                label="Lokasi"
                placeholder="Jakarta / Remote"
                value={editingExp.location || ''}
                onChange={(e) => setEditingExp({ ...editingExp, location: e.target.value })}
              />
            </div>

            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-300">
              <input
                type="checkbox"
                checked={editingExp.is_current || false}
                onChange={(e) => setEditingExp({ ...editingExp, is_current: e.target.checked, end_date: null })}
                className="rounded text-indigo-600 focus:ring-indigo-500 h-4 w-4"
              />
              Sedang Berlangsung Saat Ini (Present)
            </label>

            <Textarea
              label="Deskripsi Tanggung Jawab & Pencapaian *"
              rows={4}
              value={editingExp.description || ''}
              onChange={(e) => setEditingExp({ ...editingExp, description: e.target.value })}
              required
            />

            <div className="flex justify-end gap-2 pt-4 border-t border-slate-800">
              <Button type="button" variant="outline" onClick={() => setIsExpModalOpen(false)}>Batal</Button>
              <Button type="submit" isLoading={isSaving}>Simpan Pengalaman</Button>
            </div>
          </form>
        )}
      </Modal>

      {/* Modal Add/Edit Education */}
      <Modal
        isOpen={isEduModalOpen}
        onClose={() => setIsEduModalOpen(false)}
        maxWidth="lg"
        title={editingEdu?.id ? 'Edit Pendidikan' : 'Tambah Pendidikan Baru'}
      >
        {editingEdu && (
          <form onSubmit={handleSaveEdu} className="space-y-4">
            <Input
              label="Nama Universitas / Sekolah *"
              value={editingEdu.institution || ''}
              onChange={(e) => setEditingEdu({ ...editingEdu, institution: e.target.value })}
              required
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Jenjang Gelar *"
                placeholder="Sarjana Komputer (S.Kom)"
                value={editingEdu.degree || ''}
                onChange={(e) => setEditingEdu({ ...editingEdu, degree: e.target.value })}
                required
              />
              <Input
                label="Program Studi *"
                placeholder="Sistem Informasi"
                value={editingEdu.field_of_study || ''}
                onChange={(e) => setEditingEdu({ ...editingEdu, field_of_study: e.target.value })}
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Input
                label="Tanggal Mulai *"
                type="date"
                value={editingEdu.start_date || ''}
                onChange={(e) => setEditingEdu({ ...editingEdu, start_date: e.target.value })}
                required
              />
              <Input
                label="Tanggal Selesai / Kelulusan"
                type="date"
                disabled={editingEdu.is_current}
                value={editingEdu.end_date || ''}
                onChange={(e) => setEditingEdu({ ...editingEdu, end_date: e.target.value })}
              />
              <Input
                label="IPK / GPA"
                placeholder="3.88 / 4.00"
                value={editingEdu.gpa || ''}
                onChange={(e) => setEditingEdu({ ...editingEdu, gpa: e.target.value })}
              />
            </div>

            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-300">
              <input
                type="checkbox"
                checked={editingEdu.is_current || false}
                onChange={(e) => setEditingEdu({ ...editingEdu, is_current: e.target.checked, end_date: null })}
                className="rounded text-indigo-600 focus:ring-indigo-500 h-4 w-4"
              />
              Masih Menempuh Studi (Aktif)
            </label>

            <Textarea
              label="Deskripsi / Fokus Akademik"
              rows={3}
              value={editingEdu.description || ''}
              onChange={(e) => setEditingEdu({ ...editingEdu, description: e.target.value })}
            />

            <div className="flex justify-end gap-2 pt-4 border-t border-slate-800">
              <Button type="button" variant="outline" onClick={() => setIsEduModalOpen(false)}>Batal</Button>
              <Button type="submit" isLoading={isSaving}>Simpan Pendidikan</Button>
            </div>
          </form>
        )}
      </Modal>
    </AdminLayout>
  )
}
