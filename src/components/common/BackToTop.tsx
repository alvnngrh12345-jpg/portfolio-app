import { useState, useEffect } from 'react'
import { ArrowUp } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'
import { useSound } from '../../context/SoundContext'

export function BackToTop() {
  const { t } = useLanguage()
  const { playScrollTop } = useSound()
  const [isVisible, setIsVisible] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isLaunching, setIsLaunching] = useState(false)
  const [isGliding, setIsGliding] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = docHeight > 0 ? Math.min((scrollY / docHeight) * 100, 100) : 0

      setScrollProgress(progress)
      setIsVisible(scrollY > 300)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    if (isGliding) return

    playScrollTop()
    setIsLaunching(true)
    setIsGliding(true)

    // Reset rocket launch state after initial momentum
    setTimeout(() => {
      setIsLaunching(false)
    }, 400)

    const startPosition = window.pageYOffset || document.documentElement.scrollTop
    const distance = -startPosition
    const duration = Math.min(Math.max(Math.abs(distance) * 0.45, 650), 950)
    let startTime: number | null = null

    // Natural cubic ease-in-out easing for cinematic gliding momentum
    const easeInOutCubic = (t: number) =>
      t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1

    const animation = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const timeElapsed = currentTime - startTime
      const progress = Math.min(timeElapsed / duration, 1)
      const ease = easeInOutCubic(progress)

      window.scrollTo(0, startPosition + distance * ease)

      if (timeElapsed < duration) {
        requestAnimationFrame(animation)
      } else {
        window.scrollTo(0, 0)
        setIsGliding(false)
      }
    }

    requestAnimationFrame(animation)
  }

  return (
    <div
      className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 transition-all duration-400 ease-out ${
        isVisible
          ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
          : 'opacity-0 translate-y-8 scale-90 pointer-events-none'
      }`}
    >
      <button
        type="button"
        onClick={scrollToTop}
        className={`group relative flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl sm:rounded-2xl bg-[#0b0f19]/90 border border-slate-700/80 text-slate-300 shadow-2xl backdrop-blur-xl hover:text-white hover:border-indigo-500 hover:bg-slate-900/95 hover:shadow-indigo-500/30 active:scale-90 transition-all duration-300 cursor-pointer ${
          isGliding
            ? 'ring-2 ring-indigo-400/80 ring-offset-2 ring-offset-[#090d16] shadow-indigo-500/50 scale-105'
            : 'hover:-translate-y-1'
        }`}
        aria-label={t('backToTop')}
        title={t('backToTop')}
      >
        {/* Shockwave Ripple Pulse on Click */}
        {isLaunching && (
          <span className="absolute -inset-2 rounded-xl sm:rounded-2xl border-2 border-indigo-400 animate-ping opacity-80 pointer-events-none" />
        )}

        {/* Circular Scroll Progress SVG Ring */}
        <svg className="absolute inset-0 h-full w-full -rotate-90 p-1 pointer-events-none" viewBox="0 0 44 44">
          <circle
            cx="22"
            cy="22"
            r="19"
            className="stroke-slate-800/80"
            strokeWidth="2.5"
            fill="none"
          />
          <circle
            cx="22"
            cy="22"
            r="19"
            className="stroke-indigo-500 transition-all duration-150 ease-out"
            strokeWidth="2.5"
            strokeDasharray={119.38}
            strokeDashoffset={119.38 - (119.38 * scrollProgress) / 100}
            strokeLinecap="round"
            fill="none"
          />
        </svg>

        {/* Arrow Up Icon with Kinetic Launch Transition */}
        <div className="relative overflow-hidden w-5 h-5 flex items-center justify-center">
          <ArrowUp
            className={`h-5 w-5 text-indigo-400 group-hover:text-indigo-300 transition-all duration-300 ${
              isLaunching
                ? '-translate-y-7 opacity-0 scale-75'
                : isGliding
                ? '-translate-y-0.5 animate-bounce text-indigo-300'
                : 'group-hover:-translate-y-1'
            }`}
          />
        </div>

        {/* Floating Tooltip Pill (Desktop Only) */}
        <div className="hidden sm:flex items-center gap-1.5 absolute right-14 px-3 py-1.5 rounded-xl bg-slate-900/95 border border-slate-700/80 text-[11px] font-semibold text-slate-200 shadow-xl backdrop-blur-md opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 pointer-events-none whitespace-nowrap">
          <span>{t('backToTop') || 'Ke Atas'}</span>
          <span className="text-[10px] text-indigo-400 font-mono">
            {Math.round(scrollProgress)}%
          </span>
        </div>
      </button>
    </div>
  )
}

