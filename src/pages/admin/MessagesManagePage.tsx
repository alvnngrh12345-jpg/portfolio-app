import { useEffect, useState } from 'react'
import { Trash2, Mail, CheckCircle2, Clock, Reply, User } from 'lucide-react'
import { AdminLayout } from '../../layouts/AdminLayout'
import { Card, CardContent } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Badge } from '../../components/ui/Badge'
import { Modal } from '../../components/ui/Modal'
import { useToast } from '../../components/ui/Toast'
import { adminService } from '../../services/adminService'
import { formatDate } from '../../lib/utils'
import type { Message } from '../../types/database.types'

export function MessagesManagePage() {
  const { success, error } = useToast()
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [activeMessage, setActiveMessage] = useState<Message | null>(null)

  const fetchMessages = async () => {
    try {
      const data = await adminService.getMessages()
      setMessages(data)
    } catch (err) {
      console.error('Error fetching messages:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMessages()
  }, [])

  const handleOpenDetail = async (msg: Message) => {
    setActiveMessage(msg)
    if (!msg.is_read) {
      try {
        await adminService.markMessageAsRead(msg.id, true)
        setMessages((prev) =>
          prev.map((m) => (m.id === msg.id ? { ...m, is_read: true } : m))
        )
      } catch (err) {
        console.error('Error marking as read:', err)
      }
    }
  }

  const handleToggleRead = async (id: string, currentStatus: boolean, e: React.MouseEvent) => {
    e.stopPropagation()
    try {
      await adminService.markMessageAsRead(id, !currentStatus)
      setMessages((prev) =>
        prev.map((m) => (m.id === id ? { ...m, is_read: !currentStatus } : m))
      )
      success('Status Diperbarui', !currentStatus ? 'Pesan ditandai sudah dibaca.' : 'Pesan ditandai belum dibaca.')
    } catch (err: any) {
      error('Gagal Mengubah Status', err.message)
    }
  }

  const handleDelete = async (id: string, name: string, e: React.MouseEvent) => {
    e.stopPropagation()
    if (!window.confirm(`Hapus pesan dari "${name}"?`)) return
    try {
      await adminService.deleteMessage(id)
      success('Pesan Dihapus', 'Pesan telah dihapus dari inbox.')
      setMessages((prev) => prev.filter((m) => m.id !== id))
      if (activeMessage?.id === id) setActiveMessage(null)
    } catch (err: any) {
      error('Gagal Menghapus', err.message)
    }
  }

  const unreadCount = messages.filter((m) => !m.is_read).length

  return (
    <AdminLayout
      title="Messages Inbox"
      subtitle="Kelola dan baca pertanyaan atau tawaran kerja sama yang masuk dari formulir kontak."
    >
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <p className="text-xs text-slate-400">
              Total {messages.length} pesan masuk
            </p>
            {unreadCount > 0 && (
              <Badge variant="default" className="text-[11px] bg-indigo-600 text-white">
                {unreadCount} belum dibaca
              </Badge>
            )}
          </div>
        </div>

        {loading ? (
          <div className="py-20 text-center text-slate-500">Memuat pesan masuk...</div>
        ) : messages.length === 0 ? (
          <Card className="p-16 text-center text-slate-500 space-y-2 bg-slate-900/60 border-slate-800">
            <Mail className="h-8 w-8 mx-auto text-slate-600" />
            <p className="font-semibold text-slate-300">Kotak Masuk Kosong</p>
            <p className="text-xs">Belum ada pesan yang dikirimkan oleh pengunjung situs Anda.</p>
          </Card>
        ) : (
          <div className="space-y-3">
            {messages.map((msg) => (
              <Card
                key={msg.id}
                onClick={() => handleOpenDetail(msg)}
                className={`p-5 transition-all duration-300 cursor-pointer hover:border-indigo-500/50 hover:shadow-xl hover:-translate-y-0.5 ${
                  !msg.is_read ? 'bg-indigo-950/30 border-indigo-700/60' : 'bg-slate-900/70 border-slate-800'
                }`}
              >
                <CardContent className="p-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1.5 min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      {!msg.is_read && (
                        <span className="h-2 w-2 rounded-full bg-indigo-500 animate-pulse shrink-0" />
                      )}
                      <h4 className="font-bold text-white text-sm truncate">
                        {msg.sender_name}
                      </h4>
                      <span className="text-xs text-slate-600">•</span>
                      <span className="text-xs text-slate-400 truncate">{msg.sender_email}</span>
                    </div>

                    <p className="text-xs font-semibold text-slate-200">
                      {msg.subject || '(Tanpa Subjek)'}
                    </p>
                    <p className="text-xs text-slate-400 line-clamp-1 font-light">{msg.message}</p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                    <div className="flex items-center gap-1 text-[11px] text-slate-500">
                      <Clock className="h-3 w-3" />
                      <span>{formatDate(msg.created_at)}</span>
                    </div>

                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        title={msg.is_read ? 'Tandai belum dibaca' : 'Tandai sudah dibaca'}
                        onClick={(e) => handleToggleRead(msg.id, msg.is_read, e)}
                        className="h-8 w-8 text-slate-400 hover:text-indigo-400 hover:bg-slate-800"
                      >
                        <CheckCircle2 className={`h-4 w-4 ${msg.is_read ? 'text-emerald-400' : ''}`} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        title="Hapus pesan"
                        onClick={(e) => handleDelete(msg.id, msg.sender_name, e)}
                        className="h-8 w-8 text-slate-400 hover:text-rose-400 hover:bg-slate-800"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Message Detail Modal */}
      <Modal
        isOpen={Boolean(activeMessage)}
        onClose={() => setActiveMessage(null)}
        maxWidth="lg"
        title={activeMessage?.subject || 'Detail Pesan Masuk'}
      >
        {activeMessage && (
          <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-indigo-400" />
                <span className="text-sm font-bold text-white">{activeMessage.sender_name}</span>
              </div>
              <p className="text-xs text-slate-400">
                Email: <a href={`mailto:${activeMessage.sender_email}`} className="text-indigo-400 hover:underline">{activeMessage.sender_email}</a>
              </p>
              <p className="text-[11px] text-slate-500">
                Diterima pada: {new Date(activeMessage.created_at).toLocaleString('id-ID')}
              </p>
            </div>

            <div className="space-y-2">
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400">Isi Pesan:</h5>
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-sm text-slate-300 leading-relaxed whitespace-pre-line font-light">
                {activeMessage.message}
              </div>
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-slate-800">
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => handleDelete(activeMessage.id, activeMessage.sender_name, e)}
                className="text-rose-400 hover:bg-rose-950/50 border-rose-800/80"
              >
                <Trash2 className="h-3.5 w-3.5 mr-1" />
                Hapus Pesan
              </Button>

              <a
                href={`mailto:${activeMessage.sender_email}?subject=Re: ${encodeURIComponent(activeMessage.subject || 'Portfolio Inquiry')}`}
                className="inline-block"
              >
                <Button size="sm">
                  <Reply className="h-3.5 w-3.5 mr-1.5" />
                  Balas via Email
                </Button>
              </a>
            </div>
          </div>
        )}
      </Modal>
    </AdminLayout>
  )
}
