import React, { useEffect, useState } from 'react'
import { Plus, Edit2, Trash2, Code2 } from 'lucide-react'
import { AdminLayout } from '../../layouts/AdminLayout'
import { Card, CardContent } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Badge } from '../../components/ui/Badge'
import { Input } from '../../components/ui/Input'
import { Modal } from '../../components/ui/Modal'
import { useToast } from '../../components/ui/Toast'
import { portfolioService } from '../../services/portfolioService'
import { adminService } from '../../services/adminService'
import type { Skill, SkillCategory } from '../../types/database.types'

const CATEGORY_OPTIONS: { value: SkillCategory; label: string }[] = [
  { value: 'programming', label: 'Programming Languages' },
  { value: 'frontend', label: 'Frontend Development' },
  { value: 'backend', label: 'Backend Development' },
  { value: 'database', label: 'Database' },
  { value: 'tools', label: 'Tools & DevOps' },
]

export function SkillsManagePage() {
  const { success, error } = useToast()
  const [skills, setSkills] = useState<Skill[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [editingSkill, setEditingSkill] = useState<Partial<Skill> | null>(null)

  const fetchSkills = async () => {
    try {
      const data = await portfolioService.getSkills()
      setSkills(data)
    } catch (err) {
      console.error('Error fetching skills:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSkills()
  }, [])

  const handleOpenAdd = () => {
    setEditingSkill({
      name: '',
      category: 'frontend',
      icon_name: 'Code2',
      proficiency_level: 85,
      display_order: skills.length + 1,
    })
    setIsModalOpen(true)
  }

  const handleOpenEdit = (skill: Skill) => {
    setEditingSkill(skill)
    setIsModalOpen(true)
  }

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Hapus skill "${name}"?`)) return
    try {
      await adminService.deleteSkill(id)
      success('Skill Dihapus', `Skill "${name}" telah dihapus.`)
      setSkills((prev) => prev.filter((s) => s.id !== id))
    } catch (err: any) {
      error('Gagal Menghapus', err.message)
    }
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingSkill?.name) return

    setIsSaving(true)
    try {
      await adminService.saveSkill(editingSkill)
      success('Berhasil!', 'Data skill berhasil disimpan.')
      setIsModalOpen(false)
      fetchSkills()
    } catch (err: any) {
      error('Gagal Menyimpan', err.message)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <AdminLayout
      title="Skills Management"
      subtitle="Kelola daftar keahlian teknis, kategori bahasa/framework, dan level penguasaan."
    >
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <p className="text-xs text-slate-400">
            Total {skills.length} keahlian terdaftar
          </p>
          <Button onClick={handleOpenAdd} className="shadow-lg shadow-indigo-600/30 cursor-pointer">
            <Plus className="h-4 w-4 mr-1.5" />
            Tambah Skill Baru
          </Button>
        </div>

        {/* Skills Grid */}
        {loading ? (
          <div className="py-20 text-center text-slate-500">Memuat daftar skills...</div>
        ) : skills.length === 0 ? (
          <Card className="p-12 text-center text-slate-500 bg-slate-900/60 border-slate-800">
            Belum ada skill yang ditambahkan.
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {skills.map((skill) => (
              <Card key={skill.id} className="p-4 bg-slate-900/70 border-slate-800 hover:border-indigo-500/50 transition-all">
                <CardContent className="p-0 flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Code2 className="h-4 w-4 text-indigo-400" />
                      <h4 className="font-bold text-white text-sm">{skill.name}</h4>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-[10px] capitalize">
                        {skill.category}
                      </Badge>
                      {skill.proficiency_level && (
                        <span className="text-[11px] font-semibold text-indigo-400">
                          {skill.proficiency_level}%
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleOpenEdit(skill)}
                      className="h-8 w-8 text-slate-400 hover:text-indigo-400 hover:bg-slate-800"
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(skill.id, skill.name)}
                      className="h-8 w-8 text-slate-400 hover:text-rose-400 hover:bg-slate-800"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Modal Add/Edit Skill */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingSkill?.id ? 'Edit Skill' : 'Tambah Skill Baru'}
        description="Masukkan rincian nama skill, kategori, dan tingkat penguasaan."
      >
        {editingSkill && (
          <form onSubmit={handleSave} className="space-y-4">
            <Input
              label="Nama Skill *"
              placeholder="e.g. React.js, PostgreSQL, Docker"
              value={editingSkill.name || ''}
              onChange={(e) => setEditingSkill({ ...editingSkill, name: e.target.value })}
              required
            />

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                Kategori *
              </label>
              <select
                className="flex h-11 w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={editingSkill.category}
                onChange={(e) =>
                  setEditingSkill({
                    ...editingSkill,
                    category: e.target.value as SkillCategory,
                  })
                }
              >
                {CATEGORY_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value} className="bg-slate-900 text-slate-100">
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Nama Icon (Lucide Icon)"
                placeholder="Code2, Server, Database, etc."
                value={editingSkill.icon_name || ''}
                onChange={(e) => setEditingSkill({ ...editingSkill, icon_name: e.target.value })}
              />
              <Input
                label="Level Penguasaan (1-100)"
                type="number"
                min={1}
                max={100}
                value={editingSkill.proficiency_level ?? 85}
                onChange={(e) =>
                  setEditingSkill({
                    ...editingSkill,
                    proficiency_level: parseInt(e.target.value) || null,
                  })
                }
              />
            </div>

            <Input
              label="Urutan Tampilan (Display Order)"
              type="number"
              value={editingSkill.display_order ?? 0}
              onChange={(e) =>
                setEditingSkill({
                  ...editingSkill,
                  display_order: parseInt(e.target.value) || 0,
                })
              }
            />

            <div className="flex justify-end gap-2 pt-4 border-t border-slate-800">
              <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
                Batal
              </Button>
              <Button type="submit" isLoading={isSaving}>
                Simpan Skill
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </AdminLayout>
  )
}
