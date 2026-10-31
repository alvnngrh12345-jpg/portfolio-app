import React, { useEffect, useState } from 'react'
import { Plus, Edit2, Trash2, Award, ExternalLink, Upload } from 'lucide-react'
import { AdminLayout } from '../../layouts/AdminLayout'
import { Card, CardContent } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { Modal } from '../../components/ui/Modal'
import { useToast } from '../../components/ui/Toast'
import { portfolioService } from '../../services/portfolioService'
import { adminService } from '../../services/adminService'
import { formatDate } from '../../lib/utils'
import type { Certificate } from '../../types/database.types'

export function CertificatesManagePage() {
  const { success, error } = useToast()
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isUploading, setIsUploading] = useState(false)

  const [editingCert, setEditingCert] = useState<Partial<Certificate> | null>(null)

  const fetchCertificates = async () => {
    try {
      const data = await portfolioService.getCertificates()
      setCertificates(data)
    } catch (err) {
      console.error('Error fetching certificates:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCertificates()
  }, [])

  const handleOpenAdd = () => {
    setEditingCert({
      title: '',
      issuer: '',
      issue_date: new Date().toISOString().split('T')[0],
      expiry_date: null,
      credential_id: '',
      credential_url: '',
      image_url: 'https://images.unsplash.com/photo-1589330694653-ded6df03f754?w=600',
      display_order: certificates.length + 1,
    })
    setIsModalOpen(true)
  }

  const handleOpenEdit = (cert: Certificate) => {
    setEditingCert(cert)
    setIsModalOpen(true)
  }

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Hapus sertifikat "${title}"?`)) return
    try {
      await adminService.deleteCertificate(id)
      success('Dihapus', `Sertifikat "${title}" telah dihapus.`)
      setCertificates((prev) => prev.filter((c) => c.id !== id))
    } catch (err: any) {
      error('Gagal Menghapus', err.message)
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    try {
      const url = await adminService.uploadFile('certificates', file)
      setEditingCert((prev) => (prev ? { ...prev, image_url: url } : null))
      success('Gambar Terunggah', 'Bukti sertifikat berhasil diunggah.')
    } catch (err: any) {
      error('Upload Gagal', err.message)
    } finally {
      setIsUploading(false)
    }
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingCert?.title || !editingCert?.issuer) return

    setIsSaving(true)
    try {
      await adminService.saveCertificate(editingCert)
      success('Disimpan!', 'Sertifikat berhasil disimpan.')
      setIsModalOpen(false)
      fetchCertificates()
    } catch (err: any) {
      error('Gagal Menyimpan', err.message)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <AdminLayout
      title="Certificates Management"
      subtitle="Kelola sertifikasi profesional, lisensi resmi, dan dokumen kredensial keahlian."
    >
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <p className="text-xs text-slate-400">
            Total {certificates.length} sertifikasi terverifikasi
          </p>
          <Button onClick={handleOpenAdd} className="shadow-lg shadow-indigo-600/30 cursor-pointer">
            <Plus className="h-4 w-4 mr-1.5" />
            Tambah Sertifikat Baru
          </Button>
        </div>

        {loading ? (
          <div className="py-20 text-center text-slate-500">Memuat daftar sertifikasi...</div>
        ) : certificates.length === 0 ? (
          <Card className="p-12 text-center text-slate-500 bg-slate-900/60 border-slate-800">Belum ada sertifikat terdaftar.</Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((cert) => (
              <Card key={cert.id} className="overflow-hidden flex flex-col justify-between hover:shadow-2xl hover:border-indigo-500/50 hover:-translate-y-1 transition-all duration-300 bg-slate-900/70 border-slate-800">
                <div>
                  <div className="relative aspect-4/3 w-full bg-slate-950 overflow-hidden">
                    <img
                      src={cert.image_url}
                      alt={cert.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <CardContent className="p-5 space-y-2">
                    <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
                      <Award className="h-4 w-4" />
                      <span>{cert.issuer}</span>
                    </div>
                    <h4 className="font-bold text-white text-base">{cert.title}</h4>
                    <p className="text-xs text-slate-400 font-light">
                      Diterbitkan: {formatDate(cert.issue_date)}
                    </p>
                  </CardContent>
                </div>

                <div className="p-5 pt-0 border-t border-slate-800/80 flex items-center justify-between gap-2 mt-4">
                  <div>
                    {cert.credential_url && (
                      <a
                        href={cert.credential_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-indigo-400 font-semibold inline-flex items-center gap-1 hover:underline"
                      >
                        Kredensial
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>

                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleOpenEdit(cert)}
                      className="h-8 text-xs text-slate-400 hover:text-indigo-400 hover:bg-slate-800"
                    >
                      <Edit2 className="h-3.5 w-3.5 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(cert.id, cert.title)}
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

      {/* Modal Add / Edit Certificate */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        maxWidth="lg"
        title={editingCert?.id ? 'Edit Sertifikat' : 'Tambah Sertifikat Baru'}
      >
        {editingCert && (
          <form onSubmit={handleSave} className="space-y-4">
            <Input
              label="Nama Sertifikasi *"
              placeholder="e.g. AWS Certified Solutions Architect"
              value={editingCert.title || ''}
              onChange={(e) => setEditingCert({ ...editingCert, title: e.target.value })}
              required
            />

            <Input
              label="Penerbit / Lembaga *"
              placeholder="e.g. Amazon Web Services, Meta, Coursera"
              value={editingCert.issuer || ''}
              onChange={(e) => setEditingCert({ ...editingCert, issuer: e.target.value })}
              required
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Tanggal Penerbitan *"
                type="date"
                value={editingCert.issue_date || ''}
                onChange={(e) => setEditingCert({ ...editingCert, issue_date: e.target.value })}
                required
              />
              <Input
                label="ID Kredensial (Opsional)"
                placeholder="AWS-12345"
                value={editingCert.credential_id || ''}
                onChange={(e) => setEditingCert({ ...editingCert, credential_id: e.target.value })}
              />
            </div>

            <Input
              label="URL Verifikasi Kredensial"
              placeholder="https://..."
              value={editingCert.credential_url || ''}
              onChange={(e) => setEditingCert({ ...editingCert, credential_url: e.target.value })}
            />

            {/* Certificate Image Upload */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                Gambar Sertifikat *
              </label>
              <div className="flex items-center gap-4">
                <div className="w-20 h-16 rounded-xl bg-slate-950 overflow-hidden border border-slate-800 shrink-0">
                  <img
                    src={editingCert.image_url || ''}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 space-y-2">
                  <Input
                    placeholder="URL Gambar Sertifikat"
                    value={editingCert.image_url || ''}
                    onChange={(e) => setEditingCert({ ...editingCert, image_url: e.target.value })}
                    required
                  />
                  <label className="inline-block cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
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
                      Upload File Bukti
                    </Button>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t border-slate-800">
              <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
                Batal
              </Button>
              <Button type="submit" isLoading={isSaving}>
                Simpan Sertifikat
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </AdminLayout>
  )
}
