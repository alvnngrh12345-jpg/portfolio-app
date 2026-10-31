import { useState, useRef, useEffect } from 'react'
import { Palette, Check } from 'lucide-react'
import { useThemeAccent, ACCENT_OPTIONS } from '../../context/ThemeAccentContext'
import { useSound } from '../../context/SoundContext'

interface ThemeAccentPickerProps {
  align?: 'left' | 'right'
}

export function ThemeAccentPicker({ align = 'right' }: ThemeAccentPickerProps) {
  const { accent, setAccent, currentOption } = useThemeAccent()
  const { playClick, playThemeChange } = useSound()
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <button
        type="button"
        onClick={() => {
          playClick()
          setIsOpen(!isOpen)
        }}
        className="group flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-slate-800 bg-slate-900/80 text-xs font-semibold text-slate-300 hover:text-white hover:border-indigo-500/60 hover:bg-slate-800 transition-all cursor-pointer select-none"
        title="Ganti Tema Aksen Warna (Theme Accent)"
        aria-label="Theme Accent Customizer"
        aria-expanded={isOpen}
      >
        <Palette className="h-3.5 w-3.5 text-indigo-400 group-hover:rotate-45 transition-transform duration-300" />
        <span
          className="inline-block w-2.5 h-2.5 rounded-full ring-2 ring-slate-800 shadow-sm"
          style={{ backgroundColor: currentOption.colorHex }}
        />
        <span className="hidden 2xl:inline text-[11px] text-slate-400 font-medium">
          {currentOption.name.split(' ')[0]}
        </span>
      </button>

      {isOpen && (
        <div
          className={`absolute ${
            align === 'right' ? 'right-0' : 'left-0'
          } mt-2 w-56 rounded-2xl border border-slate-800 bg-[#0c1220]/95 backdrop-blur-xl p-2 shadow-2xl shadow-black/80 z-50 animate-in fade-in zoom-in-95 duration-150`}
        >
          <div className="px-2.5 py-2 border-b border-slate-800/80 mb-1">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
              <span>Tema Aksen Warna</span>
              <span className="text-[10px] text-slate-500 lowercase font-normal">5 varian</span>
            </p>
          </div>

          <div className="space-y-1">
            {ACCENT_OPTIONS.map((opt) => {
              const isSelected = opt.id === accent
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => {
                    playThemeChange()
                    setAccent(opt.id)
                    setIsOpen(false)
                  }}
                  className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-slate-800/90 text-white border border-slate-700/80 shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-slate-850/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`w-3.5 h-3.5 rounded-full shadow-sm ring-2 ${
                        isSelected ? 'ring-white/40 scale-110' : 'ring-transparent'
                      } transition-transform`}
                      style={{ backgroundColor: opt.colorHex }}
                    />
                    <div className="text-left">
                      <p className="text-xs font-bold leading-tight">{opt.name}</p>
                      <p className="text-[10px] text-slate-500 font-normal leading-tight">
                        {opt.label}
                      </p>
                    </div>
                  </div>

                  {isSelected && <Check className="h-4 w-4 text-white" />}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
