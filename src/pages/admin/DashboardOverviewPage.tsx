import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Code2,
  Award,
  Mail,
  Briefcase,
  User,
  Settings,
  ArrowUpRight,
  Clock,
  Sparkles,
  ExternalLink,
} from 'lucide-react'
import { AdminLayout } from '../../layouts/AdminLayout'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Badge } from '../../components/ui/Badge'
import { adminService } from '../../services/adminService'
import { formatDate } from '../../lib/utils'
import type { Message } from '../../types/database.types'

export function DashboardOverviewPage() {
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalSkills: 0,
    totalCertificates: 0,
    totalMessages: 0,
    totalExperience: 0,
  })
  const [recentMessages, setRecentMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsData, messagesData] = await Promise.all([
          adminService.getOverviewStats(),
          adminService.getMessages(),
        ])
        setStats(statsData)
        setRecentMessages(messagesData.slice(0, 5))
      } catch (err) {
        console.error('Error fetching dashboard overview:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const statCards = [
    {
      label: 'Total Skills',
      count: stats.totalSkills,
      icon: Code2,
      color: 'text-purple-400',
      bg: 'bg-purple-950/80 border border-purple-800/60',
      link: '/admin/skills',
    },
    {
      label: 'Sertifikasi',
      count: stats.totalCertificates,
      icon: Award,
      color: 'text-amber-400',
      bg: 'bg-amber-950/80 border border-amber-800/60',
      link: '/admin/certificates',
    },
    {
      label: 'Pesan Masuk',
      count: stats.totalMessages,
      icon: Mail,
      color: 'text-emerald-400',
      bg: 'bg-emerald-950/80 border border-emerald-800/60',
      link: '/admin/messages',
    },
    {
      label: 'Pengalaman',
      count: stats.totalExperience,
      icon: Briefcase,
      color: 'text-blue-400',
      bg: 'bg-blue-950/80 border border-blue-800/60',
      link: '/admin/experience',
    },
  ]

  const quickActions = [
    {
      title: 'Profil & Bio',
      description: 'Perbarui foto profil, headline, kontak, dan tautan CV.',
      icon: User,
      link: '/admin/profile',
      color: 'text-indigo-400',
    },
    {
      title: 'Keahlian Teknis',
      description: 'Tambah atau ubah kategori skill pemrograman & tools.',
      icon: Code2,
      link: '/admin/skills',
      color: 'text-purple-400',
    },
    {
      title: 'Pengalaman & Edukasi',
      description: 'Kelola riwayat pendidikan, magang, dan organisasi.',
      icon: Briefcase,
      link: '/admin/experience',
      color: 'text-blue-400',
    },
    {
      title: 'Sertifikat & Lisensi',
      description: 'Unggah file sertifikat dan tautan kredensial resmi.',
      icon: Award,
      link: '/admin/certificates',
      color: 'text-amber-400',
    },
    {
      title: 'Pengaturan Website',
      description: 'Ubah judul website, tema warna, dan metadata SEO.',
      icon: Settings,
      link: '/admin/settings',
      color: 'text-slate-400',
    },
  ]

  return (
    <AdminLayout
      title="Dashboard Overview"
      subtitle="Ringkasan konten dan performa personal portfolio Anda."
    >
      <div className="space-y-8">
        {/* Welcome Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-indigo-900/90 via-purple-900/80 to-slate-900 p-6 sm:p-8 shadow-2xl border border-indigo-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <Badge variant="default" className="bg-white/20 text-white border-none gap-1">
              <Sparkles className="h-3 w-3 text-amber-300" />
              Kontrol Penuh Dinamis
            </Badge>
            <h2 className="text-xl sm:text-2xl font-bold text-white">Selamat Datang di Admin Portal</h2>
            <p className="text-xs sm:text-sm text-indigo-200 max-w-xl font-light">
              Seluruh perubahan yang Anda simpan di sini akan langsung tampil pada halaman publik website secara otomatis.
            </p>
          </div>
          <div className="flex flex-wrap gap-2.5">
            <Link to="/admin/profile">
              <Button variant="default" className="bg-white text-indigo-950 hover:bg-slate-200 font-bold shadow-lg">
                <User className="h-4 w-4 mr-1.5" />
                Edit Profil
              </Button>
            </Link>
            <a href="/" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="text-white border-white/20 hover:bg-white/10">
                <ExternalLink className="h-4 w-4 mr-1.5" />
                Lihat Web
              </Button>
            </a>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((card, i) => {
            const Icon = card.icon
            return (
              <Link key={i} to={card.link}>
                <Card className="hover:border-indigo-500/60 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer h-full bg-slate-900/70 border-slate-800">
                  <CardContent className="p-5 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className={`h-11 w-11 rounded-2xl ${card.bg} flex items-center justify-center ${card.color}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <ArrowUpRight className="h-4 w-4 text-slate-500" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 font-medium">{card.label}</p>
                      <h3 className="text-2xl font-extrabold text-white">
                        {loading ? '...' : card.count}
                      </h3>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>

        {/* Two Columns: Quick Actions & Recent Messages */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Quick Actions Navigation */}
          <div className="lg:col-span-7">
            <Card className="bg-slate-900/70 border-slate-800 h-full">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-bold text-white">Aksi Cepat & Kelola Konten</CardTitle>
                <CardDescription>Pilih modul yang ingin Anda kelola secara langsung.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {quickActions.map((action, idx) => {
                  const Icon = action.icon
                  return (
                    <Link
                      key={idx}
                      to={action.link}
                      className="flex items-center justify-between p-3.5 rounded-2xl border border-slate-800/80 bg-slate-950/50 hover:bg-slate-800/60 hover:border-indigo-500/50 transition-all group gap-3"
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <div className="h-10 w-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                          <Icon className={`h-5 w-5 ${action.color}`} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-bold text-white group-hover:text-indigo-400 transition-colors">
                            {action.title}
                          </p>
                          <p className="text-xs text-slate-400 font-light truncate">
                            {action.description}
                          </p>
                        </div>
                      </div>
                      <ArrowUpRight className="h-4 w-4 text-slate-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                    </Link>
                  )
                })}
              </CardContent>
            </Card>
          </div>

          {/* Recent Messages */}
          <div className="lg:col-span-5">
            <Card className="bg-slate-900/70 border-slate-800 h-full flex flex-col justify-between">
              <div>
                <CardHeader className="flex flex-row items-center justify-between pb-3">
                  <CardTitle className="text-base font-bold text-white">Pesan Masuk Terbaru</CardTitle>
                  <Link to="/admin/messages" className="text-xs font-semibold text-indigo-400 hover:underline">
                    Buka Kotak Masuk &rarr;
                  </Link>
                </CardHeader>
                <CardContent className="space-y-3">
                  {recentMessages.length === 0 ? (
                    <p className="text-xs text-slate-500 py-12 text-center">
                      Belum ada pesan dari pengunjung contact form.
                    </p>
                  ) : (
                    recentMessages.map((m) => (
                      <div
                        key={m.id}
                        className="p-3.5 rounded-2xl border border-slate-800/80 bg-slate-950/50 hover:bg-slate-800/50 transition-colors space-y-1.5"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-white">{m.sender_name}</span>
                          {!m.is_read && (
                            <span className="h-2 w-2 rounded-full bg-indigo-500 animate-pulse" title="Belum dibaca" />
                          )}
                        </div>
                        <p className="text-xs text-slate-400 line-clamp-2 font-light">{m.message}</p>
                        <div className="flex items-center gap-1 text-[10px] text-slate-500 pt-1">
                          <Clock className="h-3 w-3" />
                          <span>{formatDate(m.created_at)}</span>
                        </div>
                      </div>
                    ))
                  )}
                </CardContent>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
