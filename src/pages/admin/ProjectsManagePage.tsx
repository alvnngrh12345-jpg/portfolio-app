import React, { useEffect, useState } from 'react'
import { Plus, Edit2, Trash2, ExternalLink, Star, Upload, Globe } from 'lucide-react'
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
import type { Project } from '../../types/database.types'

export function ProjectsManagePage() {
  const { success, error } = useToast()
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isUploading, setIsUploading] = useState(false)

  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null)
  const [techString, setTechString] = useState('')

  const fetchProjects = async () => {
    try {
      const data = await portfolioService.getProjects()
      setProjects(data)
    } catch (err) {
      console.error('Error fetching projects:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  const handleOpenAdd = () => {
    setEditingProject({
      title: '',
      slug: '',
      description: '',
      category: 'Web App',
      thumbnail_url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
      github_url: '',
      demo_url: '',
      is_featured: false,
      is_published: true,
      display_order: projects.length + 1,
    })
    setTechString('React.js, TypeScript, Tailwind CSS')
    setIsModalOpen(true)
  }

  const handleOpenEdit = (project: Project) => {
    setEditingProject(project)
    setTechString(project.technologies?.join(', ') || '')
    setIsModalOpen(true)
  }

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Hapus proyek "${title}"?`)) return
    try {
      await adminService.deleteProject(id)
      success('Proyek Dihapus', `Proyek "${title}" telah dihapus.`)
      setProjects((prev) => prev.filter((p) => p.id !== id))
    } catch (err: any) {
      error('Gagal Menghapus', err.message)
    }
  }

  const handleThumbnailUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    try {
      const url = await adminService.uploadFile('project-images', file)
      setEditingProject((prev) => (prev ? { ...prev, thumbnail_url: url } : null))
      success('Gambar Terunggah', 'Thumbnail proyek berhasil diunggah ke Supabase Storage.')
    } catch (err: any) {
      error('Upload Gagal', err.message)
    } finally {
      setIsUploading(false)
    }
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingProject?.title) return

    const slug =
      editingProject.slug?.trim() ||
      editingProject.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')

    const technologies = techString
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean)

    setIsSaving(true)
    try {
      await adminService.saveProject({ ...editingProject, slug }, technologies)
      success('Berhasil!', 'Data proyek berhasil disimpan.')
      setIsModalOpen(false)
      fetchProjects()
    } catch (err: any) {
      error('Gagal Menyimpan', err.message)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <AdminLayout
      title="Projects Management"
      subtitle="Kelola portofolio karya, showcase aplikasi, link demo, dan repositori GitHub."
    >
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <p className="text-xs text-slate-400">
            Total {projects.length} proyek aktif
          </p>
          <Button onClick={handleOpenAdd} className="shadow-lg shadow-indigo-600/30 cursor-pointer">
            <Plus className="h-4 w-4 mr-1.5" />
            Tambah Proyek Baru
          </Button>
        </div>

        {loading ? (
          <div className="py-20 text-center text-slate-500">Memuat daftar proyek...</div>
        ) : projects.length === 0 ? (
          <Card className="p-12 text-center text-slate-500 bg-slate-900/60 border-slate-800">
            Belum ada proyek yang dibuat.
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Card key={project.id} className="overflow-hidden flex flex-col justify-between hover:shadow-2xl hover:border-indigo-500/50 hover:-translate-y-1 transition-all duration-300 bg-slate-900/70 border-slate-800">
                <div>
                  <div className="relative aspect-video w-full bg-slate-950 overflow-hidden">
                    <img
                      src={project.thumbnail_url || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600'}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 flex gap-1">
                      {project.is_featured && (
                        <Badge variant="default" className="text-[10px] bg-indigo-600 text-white gap-1">
                          <Star className="h-2.5 w-2.5 fill-current" />
                          Featured
                        </Badge>
                      )}
                      <Badge variant={project.is_published ? 'success' : 'secondary'} className="text-[10px]">
                        {project.is_published ? 'Published' : 'Draft'}
                      </Badge>
                    </div>
                  </div>

                  <CardContent className="p-5 space-y-2">
                    <Badge variant="secondary" className="text-[10px]">{project.category}</Badge>
                    <h4 className="font-bold text-white text-base">{project.title}</h4>
                    <p className="text-xs text-slate-400 line-clamp-2 font-light">{project.description}</p>

                    <div className="flex flex-wrap gap-1 pt-2">
                      {project.technologies?.map((tech, i) => (
                        <span key={i} className="text-[10px] bg-slate-800 text-slate-300 border border-slate-700/60 px-2 py-0.5 rounded-md">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </div>

                <div className="p-5 pt-0 border-t border-slate-800/80 flex items-center justify-between gap-2 mt-4">
                  <div className="flex items-center gap-1">
                    {project.demo_url && (
                      <a href={project.demo_url} target="_blank" rel="noopener noreferrer" className="p-1.5 text-slate-400 hover:text-indigo-400">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                    {project.github_url && (
                      <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="p-1.5 text-slate-400 hover:text-white">
                        <Globe className="h-4 w-4" />
                      </a>
                    )}
                  </div>

                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleOpenEdit(project)}
                      className="h-8 text-xs text-slate-400 hover:text-indigo-400 hover:bg-slate-800"
                    >
                      <Edit2 className="h-3.5 w-3.5 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(project.id, project.title)}
                      className="h-8 text-xs text-slate-400 hover:text-rose-400 hover:bg-slate-800"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Modal Add / Edit Project */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        maxWidth="xl"
        title={editingProject?.id ? 'Edit Proyek' : 'Tambah Proyek Baru'}
        description="Lengkapi detail proyek, thumbnail, tautan live demo, dan teknologi yang digunakan."
      >
        {editingProject && (
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Nama Proyek *"
                placeholder="e.g. Campus Event Hub"
                value={editingProject.title || ''}
                onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                required
              />
              <Input
                label="Kategori *"
                placeholder="e.g. Web App, AI & ML, Mobile"
                value={editingProject.category || ''}
                onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                required
              />
            </div>

            <Textarea
              label="Deskripsi Proyek *"
              rows={3}
              placeholder="Jelaskan fitur utama, masalah yang dipecahkan, dan arsitektur..."
              value={editingProject.description || ''}
              onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
              required
            />

            {/* Thumbnail Upload & Preview */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                Thumbnail Proyek
              </label>
              <div className="flex items-center gap-4">
                <div className="w-24 h-16 rounded-xl bg-slate-950 overflow-hidden border border-slate-800 shrink-0">
                  <img
                    src={editingProject.thumbnail_url || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=100'}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 space-y-2">
                  <Input
                    placeholder="URL Gambar Thumbnail"
                    value={editingProject.thumbnail_url || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, thumbnail_url: e.target.value })}
                  />
                  <label className="inline-block cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleThumbnailUpload}
                      disabled={isUploading}
                    />
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      isLoading={isUploading}
                      onClick={() => {
                        const input = document.querySelector('input[type="file"]') as HTMLInputElement
                        input?.click()
                      }}
                    >
                      <Upload className="h-3.5 w-3.5 mr-1" />
                      Upload File Gambar
                    </Button>
                  </label>
                </div>
              </div>
            </div>

            <Input
              label="Teknologi Digunakan (Pisahkan dengan tanda koma)"
              placeholder="React, TypeScript, Tailwind CSS, Supabase"
              value={techString}
              onChange={(e) => setTechString(e.target.value)}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="GitHub URL"
                placeholder="https://github.com/username/project"
                value={editingProject.github_url || ''}
                onChange={(e) => setEditingProject({ ...editingProject, github_url: e.target.value })}
              />
              <Input
                label="Live Demo URL"
                placeholder="https://myproject.demo.app"
                value={editingProject.demo_url || ''}
                onChange={(e) => setEditingProject({ ...editingProject, demo_url: e.target.value })}
              />
            </div>

            <div className="flex items-center gap-6 pt-2">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-300">
                <input
                  type="checkbox"
                  checked={editingProject.is_featured || false}
                  onChange={(e) => setEditingProject({ ...editingProject, is_featured: e.target.checked })}
                  className="rounded text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                />
                Jadikan Proyek Unggulan (Featured)
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-300">
                <input
                  type="checkbox"
                  checked={editingProject.is_published ?? true}
                  onChange={(e) => setEditingProject({ ...editingProject, is_published: e.target.checked })}
                  className="rounded text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                />
                Publikasikan ke Website (Published)
              </label>
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t border-slate-800">
              <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
                Batal
              </Button>
              <Button type="submit" isLoading={isSaving}>
                Simpan Proyek
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </AdminLayout>
  )
}
