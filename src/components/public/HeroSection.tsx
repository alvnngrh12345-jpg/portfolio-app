import { useState } from 'react'
import { Sparkles, Mail, Eye, ChevronDown, Code2, Smartphone, Zap } from 'lucide-react'
import { Button } from '../ui/Button'
import { Badge } from '../ui/Badge'
import { GithubIcon, LinkedinIcon, WhatsappIcon, InstagramIcon } from '../common/SocialIcons'
import type { Profile, SocialLink } from '../../types/database.types'
import alvinPhoto from '../../assets/images/WhatsApp Image 2026-10-31 at 11.58.42.jpeg'
import { ProfileCardTheme } from './ProfileCardTheme'
import { refreshAOS } from '../../lib/aos'
import { useLanguage } from '../../context/LanguageContext'
import { LiveStatusBadge } from '../common/LiveStatusBadge'
import { ALVIN_WA_URL, ALVIN_LINKEDIN_URL } from '../../constants/contact'
import { AnimatedCounter } from '../common/AnimatedCounter'
import { SpotlightCard } from '../common/SpotlightCard'

interface HeroSectionProps {
  profile: Profile
  socialLinks: SocialLink[]
}

export function HeroSection({ profile, socialLinks }: HeroSectionProps) {
  const { t } = useLanguage()
  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'github':
        return <GithubIcon className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
      case 'linkedin':
        return <LinkedinIcon className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
      case 'whatsapp':
        return <WhatsappIcon className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
      case 'instagram':
        return <InstagramIcon className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
      default:
        return <Mail className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
    }
  }

  const [isScrollingDown, setIsScrollingDown] = useState(false)

  const smoothScrollTo = (targetId: string) => {
    const el = document.getElementById(targetId)
    if (!el) return

    setIsScrollingDown(true)

    const navOffset = 70
    const targetPosition = el.getBoundingClientRect().top + window.pageYOffset - navOffset
    const startPosition = window.pageYOffset
    const distance = targetPosition - startPosition
    const duration = 900 // ms for an ultra-smooth gliding transition
    let start: number | null = null

    // Cubic ease-in-out easing for natural cinematic momentum
    const easeInOutCubic = (t: number) =>
      t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1

    const step = (timestamp: number) => {
      if (!start) start = timestamp
      const progress = Math.min((timestamp - start) / duration, 1)
      const ease = easeInOutCubic(progress)
      window.scrollTo(0, startPosition + distance * ease)

      if (progress < 1) {
        window.requestAnimationFrame(step)
      } else {
        setTimeout(() => {
          setIsScrollingDown(false)
          refreshAOS()
        }, 150)
      }
    }

    window.requestAnimationFrame(step)
  }

  const scrollTo = (targetId: string) => {
    smoothScrollTo(targetId)
  }

  return (
    <section
      id="hero"
      className="relative min-h-[95vh] flex flex-col justify-center pt-28 sm:pt-36 pb-16 sm:pb-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Main Grid: Hero Info & Profile Avatar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6 text-center lg:text-left" data-aos="fade-up" data-aos-duration="800">
            {/* Live Clock & Activity Status Bar */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
              <LiveStatusBadge />
              <Badge
                variant="default"
                className="px-3 py-1.5 text-[11px] font-semibold tracking-wider bg-indigo-950/80 border-indigo-700/60 text-indigo-300 shadow-md group cursor-default"
              >
                <Sparkles className="h-3 w-3 mr-1 text-indigo-400 inline" />
                {t('status.available')}
              </Badge>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.15]">
              {t('hero.greeting')}{' '}
              <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent hover:brightness-110 transition-all duration-300 inline-block">
                {profile.full_name && !profile.full_name.includes('Alex Pratama')
                  ? profile.full_name
                  : 'Alvin Nugraha'}
              </span>
            </h1>

            {/* Profession / Role */}
            <p className="text-base sm:text-2xl font-semibold text-slate-300 tracking-tight">
              {profile.title}
            </p>

            {/* Bio / Narrative */}
            <p className="text-xs sm:text-base md:text-lg text-slate-400 max-w-2xl leading-relaxed font-light mx-auto lg:mx-0">
              {profile.headline}
            </p>

            {/* Call To Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 w-full">
              <Button
                size="lg"
                onClick={() => scrollTo('skills')}
                className="w-full sm:w-auto shadow-xl shadow-indigo-600/30 group cursor-pointer hover:shadow-indigo-500/50 hover:scale-105 active:scale-95 transition-all duration-300"
              >
                <Eye className="h-4 w-4 mr-2 group-hover:scale-125 transition-transform duration-300" />
                {t('hero.exploreSkills')}
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollTo('contact')}
                className="w-full sm:w-auto cursor-pointer hover:scale-105 active:scale-95 transition-all duration-300"
              >
                <Mail className="h-4 w-4 mr-2" />
                {t('hero.contactMe')}
              </Button>
            </div>

            {/* Social Media Links Widgets */}
            <div className="pt-3 sm:pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-2.5 sm:gap-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 mr-1 sm:mr-2">
                {t('hero.connect')}
              </span>
              {socialLinks
                .filter((social) => social.platform.toLowerCase() !== 'github')
                .map((social) => {
                  let targetUrl = social.url
                  const p = social.platform.toLowerCase()
                  if (p === 'whatsapp') targetUrl = ALVIN_WA_URL
                  if (p === 'instagram') targetUrl = 'https://instagram.com/alvnngrhh'
                  if (p === 'linkedin') targetUrl = ALVIN_LINKEDIN_URL

                return (
                  <a
                    key={social.id}
                    href={targetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-2xl border border-slate-800 bg-slate-900/80 text-slate-400 hover:text-white hover:border-indigo-500 hover:bg-indigo-950/50 hover:shadow-lg hover:shadow-indigo-500/25 hover:-translate-y-1.5 transition-all duration-300 cursor-pointer"
                    aria-label={social.platform}
                  >
                    {getSocialIcon(social.platform)}
                  </a>
                )
              })}
            </div>
          </div>

          {/* Right Profile Picture Column */}
          <div
            className="lg:col-span-5 flex justify-center w-full"
            data-aos="fade-left"
            data-aos-duration="900"
            data-aos-delay="200"
          >
            <ProfileCardTheme
              photoUrl={
                profile.avatar_url && !profile.avatar_url.includes('images.unsplash.com')
                  ? profile.avatar_url
                  : alvinPhoto
              }
              fullName={
                profile.full_name && !profile.full_name.includes('Alex Pratama')
                  ? profile.full_name
                  : 'Alvin Nugraha'
              }
              title={profile.title}
              location={profile.location || 'Bekasi, Indonesia'}
            />
          </div>
        </div>

        {/* 3 Modern Feature Cards - With Cursor Spotlight Glow */}
        <div className="mt-14 sm:mt-20 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6" data-aos="fade-up" data-aos-delay="300">
          <SpotlightCard className="widget-interactive p-5 sm:p-6 group flex items-start gap-4">
            <div className="h-11 w-11 rounded-xl bg-indigo-950/80 border border-indigo-700/60 flex items-center justify-center text-indigo-400 shrink-0 group-hover:scale-110 group-hover:bg-indigo-900/80 transition-all duration-300">
              <Code2 className="h-5 w-5" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-white text-sm sm:text-base group-hover:text-indigo-400 transition-colors">
                {t('hero.feature1.title')}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {t('hero.feature1.desc')}
              </p>
            </div>
          </SpotlightCard>

          <SpotlightCard className="widget-interactive p-5 sm:p-6 group flex items-start gap-4">
            <div className="h-11 w-11 rounded-xl bg-purple-950/80 border border-purple-700/60 flex items-center justify-center text-purple-400 shrink-0 group-hover:scale-110 group-hover:bg-purple-900/80 transition-all duration-300">
              <Smartphone className="h-5 w-5" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-white text-sm sm:text-base group-hover:text-purple-400 transition-colors">
                {t('hero.feature2.title')}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {t('hero.feature2.desc')}
              </p>
            </div>
          </SpotlightCard>

          <SpotlightCard className="widget-interactive p-5 sm:p-6 group flex items-start gap-4">
            <div className="h-11 w-11 rounded-xl bg-emerald-950/80 border border-emerald-700/60 flex items-center justify-center text-emerald-400 shrink-0 group-hover:scale-110 group-hover:bg-emerald-900/80 transition-all duration-300">
              <Zap className="h-5 w-5" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-white text-sm sm:text-base group-hover:text-emerald-400 transition-colors">
                {t('hero.feature3.title')}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {t('hero.feature3.desc')}
              </p>
            </div>
          </SpotlightCard>
        </div>

        {/* 4 Stats Highlights Row - With Animated Counter & Spotlight Glow */}
        <div className="mt-6 sm:mt-8 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4" data-aos="fade-up" data-aos-delay="350">
          <SpotlightCard className="widget-interactive p-4 sm:p-5 text-center space-y-1">
            <p className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              <AnimatedCounter target={3} suffix="+" />
            </p>
            <p className="text-[11px] sm:text-xs font-semibold text-slate-400">{t('hero.stat1.label')}</p>
          </SpotlightCard>

          <SpotlightCard className="widget-interactive p-4 sm:p-5 text-center space-y-1">
            <p className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              <AnimatedCounter target={15} suffix="+" />
            </p>
            <p className="text-[11px] sm:text-xs font-semibold text-slate-400">{t('hero.stat2.label')}</p>
          </SpotlightCard>

          <SpotlightCard className="widget-interactive p-4 sm:p-5 text-center space-y-1">
            <p className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              <AnimatedCounter target={100} suffix="%" />
            </p>
            <p className="text-[11px] sm:text-xs font-semibold text-slate-400">{t('hero.stat3.label')}</p>
          </SpotlightCard>

          <SpotlightCard className="widget-interactive p-4 sm:p-5 text-center space-y-1">
            <p className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-amber-400 to-rose-400 bg-clip-text text-transparent">
              <AnimatedCounter target={24} suffix="/7" />
            </p>
            <p className="text-[11px] sm:text-xs font-semibold text-slate-400">{t('hero.stat4.label')}</p>
          </SpotlightCard>
        </div>

        {/* Scroll Down Indicator with Cinematic Transition */}
        <div className="mt-14 sm:mt-20 flex justify-center" data-aos="fade-up" data-aos-delay="400">
          <button
            onClick={() => smoothScrollTo('about')}
            className="group relative flex flex-col items-center gap-2 p-3 rounded-2xl hover:bg-slate-900/60 active:scale-95 transition-all duration-300 cursor-pointer select-none"
            aria-label="Scroll down to About section"
          >
            {/* Ambient Pulse Ripple when Touched */}
            {isScrollingDown && (
              <span className="absolute inset-0 rounded-2xl bg-indigo-500/25 blur-md animate-ping pointer-events-none" />
            )}

            {/* Glowing Text Pill */}
            <div className="flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-slate-900/80 border border-slate-800 text-[11px] font-bold tracking-widest text-slate-400 group-hover:text-indigo-300 group-hover:border-indigo-500/50 group-hover:shadow-[0_0_20px_-3px_rgba(99,102,241,0.5)] transition-all duration-300">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-indigo-500" />
              </span>
              {t('hero.scrollDown')}
            </div>

            {/* Futuristic Animated Mouse / Scroll Pill */}
            <div className="relative w-5 h-8 rounded-full border-2 border-slate-600/80 group-hover:border-indigo-400 flex justify-center p-1 transition-colors duration-300 shadow-lg shadow-black/40">
              <div className="w-1 h-2 rounded-full bg-indigo-400 animate-bounce group-hover:bg-indigo-300" />
            </div>

            {/* Cascading Chevrons Down */}
            <div className="flex flex-col items-center -space-y-1 text-slate-500 group-hover:text-indigo-400 transition-colors">
              <ChevronDown className="h-3.5 w-3.5 group-hover:translate-y-1 transition-transform duration-300" />
            </div>
          </button>
        </div>
      </div>
    </section>
  )
}
