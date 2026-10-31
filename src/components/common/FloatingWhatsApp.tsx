import { MessageCircle } from 'lucide-react'
import { ALVIN_WA_URL } from '../../constants/contact'

export function FloatingWhatsApp() {
  return (
    <aside
      aria-label="WhatsApp Direct Chat"
      className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-40 flex items-center group select-none"
    >
      <a
        href={ALVIN_WA_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex items-center justify-center h-11 w-11 sm:h-13 sm:w-13 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white shadow-xl shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer"
        aria-label="Chat WhatsApp langsung dengan Alvin Nugraha"
      >
        {/* Animated Radar Pulse Rings */}
        <span className="absolute -inset-1.5 rounded-2xl bg-emerald-500/40 animate-ping opacity-60 pointer-events-none" />
        <span className="absolute -inset-1 rounded-2xl bg-emerald-400/20 blur-xs pointer-events-none" />

        {/* WhatsApp Icon */}
        <MessageCircle className="h-6 w-6 relative z-10 fill-white/20 group-hover:rotate-12 transition-transform duration-300" />

        {/* Floating Tooltip Pill */}
        <div className="absolute left-16 px-3 py-1.5 rounded-xl bg-slate-900/95 border border-slate-700/80 text-xs font-bold text-white shadow-2xl backdrop-blur-md opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none whitespace-nowrap">
          <span className="text-emerald-400 mr-1.5">●</span>
          Chat WhatsApp
          <div className="text-[10px] font-normal text-slate-400">Pesan otomatis siap terisi</div>
        </div>
      </a>
    </aside>
  )
}

