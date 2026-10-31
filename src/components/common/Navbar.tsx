import React, { useState, useEffect } from 'react'
import { Menu, X, FileDown, ShieldCheck, Languages, Volume2, VolumeX } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '../ui/Button'
import { PUBLIC_NAV_ITEMS } from '../../constants/navigation'
import { cn } from '../../lib/utils'
import { WhatsappIcon, InstagramIcon } from './SocialIcons'
import { useLanguage } from '../../context/LanguageContext'
import { LiveStatusBadge } from './LiveStatusBadge'
import { ALVIN_WA_URL } from '../../constants/contact'
import { ThemeAccentPicker } from './ThemeAccentPicker'
import { useSound } from '../../context/SoundContext'

interface NavbarProps {
  personalName?: string
  cvUrl?: string | null
}

export function Navbar({ personalName = 'Alvin Nugraha', cvUrl }: NavbarProps) {
  const { language, toggleLanguage, t } = useLanguage()
  const { isMuted, toggleMute } = useSound()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)

      // Active section detection
      const sections = PUBLIC_NAV_ITEMS.map((item) => item.href.substring(1))
      const scrollPosition = window.scrollY + 120

      for (const section of sections) {
        const el = document.getElementById(section)
        if (el) {
          const top = el.offsetTop
          const height = el.offsetHeight
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setIsMobileMenuOpen(false)
    const targetId = href.substring(1)
    const element = document.getElementById(targetId)
    if (element) {
      const navOffset = 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - navOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
    }
  }

  const getNavLabel = (href: string, fallback: string) => {
    const key = href.substring(1)
    const val = t(`nav.${key}`)
    return val && val !== `nav.${key}` ? val : fallback
  }

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-[#090d16]/90 backdrop-blur-xl shadow-2xl shadow-black/50 border-b border-slate-800/80 py-3'
          : 'bg-transparent py-4 sm:py-5'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2 sm:gap-4 xl:gap-6 min-w-0">
          {/* Brand Logo & Compact Live Status */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            <a
              href="#hero"
              onClick={(e) => handleNavClick(e, '#hero')}
              className="group flex items-center gap-2 sm:gap-2.5 text-lg sm:text-xl font-bold tracking-tight text-white transition-transform hover:scale-105"
            >
              <span className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white font-black shadow-lg shadow-indigo-500/25 group-hover:shadow-indigo-500/40 transition-shadow">
                {personalName.charAt(0) || 'A'}
              </span>
              <span className="tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                {personalName}
              </span>
            </a>

            {/* Desktop Live Status Clock Badge (Displayed on ultra-wide viewports) */}
            <div className="hidden 2xl:block">
              <LiveStatusBadge compact />
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1 rounded-full border border-slate-800/80 bg-slate-900/70 px-2.5 xl:px-3.5 py-1.5 shadow-xl shadow-black/30 backdrop-blur-xl mx-1.5 xl:mx-3 shrink-0">
            {PUBLIC_NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.substring(1)
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={cn(
                    'px-2.5 xl:px-3 py-1 xl:py-1.5 text-xs font-semibold rounded-full transition-all duration-300 whitespace-nowrap',
                    isActive
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/40'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  )}
                >
                  {getNavLabel(item.href, item.label)}
                </a>
              )
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-2.5 shrink-0">
            {/* Color Accent Customizer */}
            <ThemeAccentPicker align="right" />

            {/* Sound FX Mute / Unmute Button */}
            <button
              onClick={toggleMute}
              className="p-2 rounded-xl border border-slate-800 bg-slate-900/80 text-xs text-slate-300 hover:text-white hover:border-indigo-500 hover:bg-slate-800 transition-all cursor-pointer select-none"
              title={isMuted ? 'Nyalakan Efek Suara (Unmute Sound FX)' : 'Bisukan Efek Suara (Mute Sound FX)'}
              aria-label="Toggle Sound Effects"
            >
              {isMuted ? (
                <VolumeX className="h-4 w-4 text-slate-500" />
              ) : (
                <Volume2 className="h-4 w-4 text-indigo-400" />
              )}
            </button>

            {/* Language Switcher Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-slate-800 bg-slate-900/80 text-xs font-bold text-slate-300 hover:text-white hover:border-indigo-500 hover:bg-slate-800 transition-all cursor-pointer select-none"
              title="Ganti Bahasa (ID / EN)"
            >
              <Languages className="h-3.5 w-3.5 text-indigo-400" />
              <span className={language === 'id' ? 'text-indigo-400 font-extrabold' : 'text-slate-500'}>ID</span>
              <span className="text-slate-600">/</span>
              <span className={language === 'en' ? 'text-indigo-400 font-extrabold' : 'text-slate-500'}>EN</span>
            </button>

            <Link
              to="/admin/login"
              className="p-2 text-slate-400 hover:text-indigo-400 hover:bg-slate-800/80 rounded-xl transition-all"
              title={t('nav.admin')}
            >
              <ShieldCheck className="h-5 w-5" />
            </Link>

            {cvUrl && cvUrl !== '#' ? (
              <a href={cvUrl} target="_blank" rel="noopener noreferrer" className="shrink-0">
                <Button size="sm" variant="default" className="shadow-lg shadow-indigo-600/25 whitespace-nowrap px-3.5">
                  <FileDown className="h-4 w-4 mr-1.5" />
                  {t('nav.downloadCV')}
                </Button>
              </a>
            ) : (
              <a href="#contact" onClick={(e) => handleNavClick(e, '#contact')} className="shrink-0">
                <Button size="sm" variant="outline" className="whitespace-nowrap px-3.5">
                  <FileDown className="h-4 w-4 mr-1.5" />
                  {t('nav.contactMe')}
                </Button>
              </a>
            )}
          </div>

          {/* Mobile Actions & Hamburger Button */}
          <div className="flex lg:hidden items-center gap-1.5 sm:gap-2">
            <ThemeAccentPicker align="right" />

            {/* Mobile Sound FX Toggle */}
            <button
              onClick={toggleMute}
              className="p-1.5 rounded-lg border border-slate-800 bg-slate-900 text-xs text-slate-300"
              title={isMuted ? 'Nyalakan Suara' : 'Bisukan Suara'}
            >
              {isMuted ? (
                <VolumeX className="h-3.5 w-3.5 text-slate-500" />
              ) : (
                <Volume2 className="h-3.5 w-3.5 text-indigo-400" />
              )}
            </button>

            {/* Mobile Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-800 bg-slate-900 text-xs font-bold text-slate-300"
            >
              <Languages className="h-3.5 w-3.5 text-indigo-400" />
              <span className="text-[11px] text-indigo-400 font-extrabold uppercase">{language}</span>
            </button>

            <Link
              to="/admin/login"
              className="p-2 text-slate-400 hover:text-indigo-400 rounded-lg"
              title={t('nav.admin')}
            >
              <ShieldCheck className="h-5 w-5" />
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="rounded-xl border border-slate-800 bg-slate-900/90 p-2 text-slate-300 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-800/90 bg-[#090d16]/98 backdrop-blur-2xl px-5 pt-3 pb-6 shadow-2xl animate-in slide-in-from-top-4 duration-300">
          {/* Mobile Live Status Badge */}
          <div className="pb-3 mb-2 border-b border-slate-800/80">
            <LiveStatusBadge compact className="w-full justify-center" />
          </div>

          <div className="flex flex-col gap-1.5">
            {PUBLIC_NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.substring(1)
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={cn(
                    'px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center justify-between',
                    isActive
                      ? 'bg-indigo-950/80 text-indigo-300 border border-indigo-800/60 shadow-sm'
                      : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                  )}
                >
                  <span>{getNavLabel(item.href, item.label)}</span>
                  {isActive && <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />}
                </a>
              )
            })}

            {/* Mobile Fast Links for WhatsApp & Instagram */}
            <div className="grid grid-cols-2 gap-2 pt-3 mt-1 border-t border-slate-800/80">
              <a
                href={ALVIN_WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 p-2 rounded-xl bg-emerald-950/40 border border-emerald-800/50 text-emerald-400 text-xs font-semibold hover:bg-emerald-900/50 transition-colors"
              >
                <WhatsappIcon className="h-3.5 w-3.5" />
                WhatsApp
              </a>
              <a
                href="https://instagram.com/alvnngrhh"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 p-2 rounded-xl bg-pink-950/40 border border-pink-800/50 text-pink-400 text-xs font-semibold hover:bg-pink-900/50 transition-colors"
              >
                <InstagramIcon className="h-3.5 w-3.5" />
                Instagram
              </a>
            </div>

            <div className="pt-3">
              {cvUrl && cvUrl !== '#' ? (
                <a href={cvUrl} target="_blank" rel="noopener noreferrer" className="block w-full">
                  <Button variant="default" className="w-full">
                    <FileDown className="h-4 w-4 mr-2" />
                    {t('nav.downloadCV')}
                  </Button>
                </a>
              ) : (
                <a href="#contact" onClick={(e) => handleNavClick(e, '#contact')} className="block w-full">
                  <Button variant="default" className="w-full">
                    {t('nav.contactMe')}
                  </Button>
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

