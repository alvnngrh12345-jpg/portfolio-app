import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  User,
  Code2,
  Briefcase,
  Award,
  Mail,
  Settings,
  LogOut,
  ExternalLink,
  Shield,
  X,
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { cn } from '../../lib/utils'

interface AdminSidebarProps {
  onCloseMobile?: () => void
}

const NAV_ITEMS = [
  { label: 'Overview', href: '/admin', icon: LayoutDashboard, end: true },
  { label: 'Profile & About', href: '/admin/profile', icon: User },
  { label: 'Skills', href: '/admin/skills', icon: Code2 },
  { label: 'Experience & Edu', href: '/admin/experience', icon: Briefcase },
  { label: 'Certificates', href: '/admin/certificates', icon: Award },
  { label: 'Messages', href: '/admin/messages', icon: Mail },
  { label: 'Site Settings', href: '/admin/settings', icon: Settings },
]

export function AdminSidebar({ onCloseMobile }: AdminSidebarProps) {
  const { user, signOut } = useAuth()

  return (
    <aside className="w-64 h-full bg-slate-900/95 border-r border-slate-800 flex flex-col justify-between backdrop-blur-xl transition-all duration-300">
      {/* Top Brand */}
      <div>
        <div className="h-16 px-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-600/30">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white leading-tight">Admin Console</h2>
              <p className="text-[10px] text-slate-400 font-medium">Portfolio Manager</p>
            </div>
          </div>
          {onCloseMobile && (
            <button
              onClick={onCloseMobile}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Navigation Links */}
        <nav className="p-3 space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon
            return (
              <NavLink
                key={item.href}
                to={item.href}
                end={item.end}
                onClick={onCloseMobile}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200',
                    isActive
                      ? 'bg-indigo-950/80 text-indigo-300 font-bold border border-indigo-800/60 shadow-md shadow-indigo-950/50'
                      : 'text-slate-400 hover:bg-slate-800/60 hover:text-white'
                  )
                }
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span>{item.label}</span>
              </NavLink>
            )
          })}
        </nav>
      </div>

      {/* Bottom Profile & Actions */}
      <div className="p-3 border-t border-slate-800 space-y-2">
        {/* Link to Public Website */}
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:bg-slate-800 hover:text-indigo-400 transition-colors"
        >
          <span className="flex items-center gap-2">
            <ExternalLink className="h-3.5 w-3.5" />
            Lihat Website
          </span>
          <span className="text-[10px] bg-slate-800 text-indigo-400 px-1.5 py-0.5 rounded border border-slate-700">Live</span>
        </a>

        {/* User Card */}
        <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-center justify-between">
          <div className="overflow-hidden pr-2">
            <p className="text-xs font-bold text-white truncate">
              {user?.email || 'Admin'}
            </p>
            <p className="text-[10px] text-emerald-400 font-medium flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
              Authenticated
            </p>
          </div>
          <button
            onClick={() => signOut()}
            className="p-1.5 rounded-lg text-slate-400 hover:bg-rose-950/50 hover:text-rose-400 transition-colors cursor-pointer"
            title="Keluar"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  )
}
