import { useState, useEffect } from 'react'
import { Clock, MapPin } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'

interface LiveStatusBadgeProps {
  compact?: boolean
  className?: string
}

export function LiveStatusBadge({ compact = false, className = '' }: LiveStatusBadgeProps) {
  const { t } = useLanguage()
  const [timeStr, setTimeStr] = useState('')

  useEffect(() => {
    const updateTime = () => {
      // Calculate WIB (UTC+7)
      const now = new Date()
      const formatter = new Intl.DateTimeFormat('id-ID', {
        timeZone: 'Asia/Jakarta',
        hour: '2-digit',
        minute: '2-digit',
        second: compact ? undefined : '2-digit',
        hour12: false,
      })
      setTimeStr(formatter.format(now) + ' WIB')
    }

    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [compact])

  if (compact) {
    return (
      <div
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/90 border border-slate-800 text-[11px] font-medium text-slate-300 shadow-sm ${className}`}
        title="Waktu Lokal (WIB / GMT+7)"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
        <Clock className="h-3 w-3 text-indigo-400" />
        <span>{timeStr}</span>
      </div>
    )
  }

  return (
    <div
      className={`inline-flex flex-wrap items-center gap-2 sm:gap-2.5 px-3 sm:px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-slate-800/90 text-xs text-slate-300 shadow-lg backdrop-blur-md ${className}`}
    >
      {/* Live Pulsing Dot */}
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
      </span>

      {/* Location */}
      <div className="flex items-center gap-1 font-semibold text-white">
        <MapPin className="h-3.5 w-3.5 text-indigo-400" />
        <span>{t('status.location')}</span>
      </div>

      <span className="text-slate-600 hidden xs:inline">•</span>

      {/* Live Time */}
      <div className="flex items-center gap-1 font-mono text-[11px] text-indigo-300 font-bold">
        <Clock className="h-3 w-3 text-indigo-400" />
        <span>{timeStr}</span>
      </div>

      <span className="text-slate-600 hidden sm:inline">•</span>

      {/* Activity Status */}
      <span className="text-emerald-400 font-medium text-[11px] hidden sm:inline">
        {t('status.activity')}
      </span>
    </div>
  )
}

