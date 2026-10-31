import { Menu, Globe, Bell } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '../ui/Button'

interface AdminHeaderProps {
  title: string
  subtitle?: string
  onOpenMobileSidebar: () => void
}

export function AdminHeader({ title, subtitle, onOpenMobileSidebar }: AdminHeaderProps) {
  return (
    <header className="h-16 border-b border-slate-800/80 bg-slate-900/80 backdrop-blur-xl px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30 transition-all duration-300">
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileSidebar}
          className="lg:hidden p-2 rounded-xl border border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
          aria-label="Open sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div>
          <h1 className="text-base sm:text-lg font-bold text-white leading-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xs text-slate-400 hidden sm:block font-light">{subtitle}</p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2.5">
        <Link to="/admin/messages">
          <Button variant="ghost" size="icon" className="relative text-slate-400 hover:text-white hover:bg-slate-800">
            <Bell className="h-4 w-4" />
          </Button>
        </Link>

        <a href="/" target="_blank" rel="noopener noreferrer">
          <Button variant="outline" size="sm" className="hidden sm:inline-flex text-xs">
            <Globe className="h-3.5 w-3.5 mr-1.5" />
            Website Publik
          </Button>
        </a>
      </div>
    </header>
  )
}
