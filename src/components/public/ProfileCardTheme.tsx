import { GraduationCap, Sparkles } from 'lucide-react'

interface ProfileCardThemeProps {
  photoUrl: string
  fullName: string
  title?: string
  location?: string | null
  className?: string
}

export function ProfileCardTheme({
  photoUrl,
  fullName,
  className = '',
}: ProfileCardThemeProps) {
  return (
    <div className={`relative flex flex-col items-center select-none w-full max-w-[340px] sm:max-w-md lg:max-w-lg mx-auto ${className}`}>
      {/* Circular Profile Photo Frame */}
      <div className="relative group cursor-pointer my-2 sm:my-4">
        {/* Animated Outer Atmospheric Aurora Glow */}
        <div className="absolute -inset-4 sm:-inset-6 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 rounded-full blur-2xl sm:blur-3xl opacity-40 group-hover:opacity-75 transition-all duration-700 pointer-events-none" />

        {/* Gradient Border Halo Ring */}
        <div className="relative p-[3px] sm:p-[4px] rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 shadow-2xl shadow-indigo-500/25 group-hover:shadow-indigo-500/40 transition-all duration-500">
          {/* Inner Circle Container - Fully Responsive Dimensions */}
          <div className="relative w-52 h-52 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-[#090d16] bg-slate-900 shadow-inner">
            <img
              src={photoUrl}
              alt={fullName}
              style={{ objectPosition: 'center 28%' }}
              className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-700 ease-out filter contrast-[1.03] brightness-[1.01]"
            />

            {/* Hover Glass Light Sweep Sheen */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none rounded-full" />
          </div>
        </div>

        {/* Floating Top-Left Badge: Informatics Student */}
        <div className="absolute -top-2 left-0 sm:-top-3 sm:-left-3 z-20 animate-float-slow">
          <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl sm:rounded-2xl bg-slate-900/95 backdrop-blur-xl border border-slate-700/80 shadow-2xl hover:border-indigo-500/80 hover:shadow-indigo-500/20 transition-all duration-300">
            <div className="h-5 w-5 sm:h-7 sm:w-7 rounded-lg bg-indigo-950/90 border border-indigo-700/60 flex items-center justify-center text-indigo-400">
              <GraduationCap className="h-3 w-3 sm:h-4 sm:w-4" />
            </div>
            <div className="text-left">
              <p className="text-[9px] sm:text-[10px] text-slate-400 font-medium leading-none">Informatics</p>
              <p className="text-[10px] sm:text-xs font-bold text-white leading-tight">Student</p>
            </div>
          </div>
        </div>

        {/* Floating Bottom-Right Badge: Available for Work */}
        <div className="absolute -bottom-2 right-0 sm:-bottom-3 sm:-right-3 z-20 animate-float-reverse">
          <div className="flex items-center gap-1.5 sm:gap-2.5 px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-xl sm:rounded-2xl bg-slate-900/95 backdrop-blur-xl border border-slate-700/80 shadow-2xl hover:border-emerald-500/80 hover:shadow-emerald-500/20 transition-all duration-300">
            <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 sm:h-2.5 sm:w-2.5 bg-emerald-500" />
            </span>
            <div className="text-left">
              <p className="text-[9px] sm:text-[10px] text-slate-400 font-medium leading-none">Status</p>
              <p className="text-[10px] sm:text-xs font-bold text-white leading-tight">Available</p>
            </div>
            <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-emerald-400 hidden xs:inline" />
          </div>
        </div>
      </div>
    </div>
  )
}
