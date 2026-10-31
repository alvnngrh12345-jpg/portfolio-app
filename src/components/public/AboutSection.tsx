import { useState } from 'react'
import { GraduationCap, MapPin, Mail, Sparkles, CheckCircle, Copy, Check } from 'lucide-react'
import { SectionTitle } from '../common/SectionTitle'
import { AnimatedCounter } from '../common/AnimatedCounter'
import { SpotlightCard } from '../common/SpotlightCard'
import type { Profile, Education } from '../../types/database.types'
import alvinPhoto from '../../assets/images/WhatsApp Image 2026-10-31 at 11.58.42.jpeg'
import { useToast } from '../ui/Toast'
import { useLanguage } from '../../context/LanguageContext'

interface AboutSectionProps {
  profile: Profile
  educations: Education[]
}

export function AboutSection({ profile, educations }: AboutSectionProps) {
  const { t } = useLanguage()
  const { success } = useToast()
  const [hasCopied, setHasCopied] = useState(false)

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const emailToCopy = profile.email || 'alvinnugraha92@gmail.com'
    navigator.clipboard.writeText(emailToCopy)
    setHasCopied(true)
    success(t('contact.emailCopied'), t('contact.emailCopiedDesc'))
    setTimeout(() => setHasCopied(false), 2000)
  }

  const highlights = [
    'Clean Architecture & Modular Code',
    'Responsive & Accessible UI/UX',
    'Database Modeling & API Integration',
    'Modern State Management & Performance',
  ]

  return (
    <section id="about" className="py-24 sm:py-32 bg-transparent border-t border-slate-800/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          badge={t('about.badge')}
          title={t('about.title')}
          subtitle={t('about.subtitle')}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Visual Card / Quick Info */}
          <div className="lg:col-span-5 space-y-6" data-aos="fade-right">
            <div className="widget-interactive relative rounded-3xl overflow-hidden border border-indigo-500/30 hover:border-indigo-500/70 bg-slate-900/60 shadow-2xl backdrop-blur-md group transition-all duration-500">
              {/* Corner accents */}
              <div className="absolute top-2.5 left-2.5 w-3 h-3 border-t-2 border-l-2 border-indigo-400 z-20" />
              <div className="absolute top-2.5 right-2.5 w-3 h-3 border-t-2 border-r-2 border-indigo-400 z-20" />

              <div className="overflow-hidden h-64 sm:h-80 bg-slate-900 relative">
                <img
                  src={
                    profile.avatar_url && !profile.avatar_url.includes('images.unsplash.com')
                      ? profile.avatar_url
                      : alvinPhoto
                  }
                  alt={profile.full_name}
                  style={{ objectPosition: 'center 28%' }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out filter contrast-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
              </div>
              <div className="p-5 sm:p-6 bg-slate-900/90 space-y-3 sm:space-y-4">
                <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors duration-300">
                  {profile.full_name && !profile.full_name.includes('Alex Pratama')
                    ? profile.full_name
                    : 'Alvin Nugraha'}
                </h3>
                <p className="text-sm text-indigo-400 font-semibold">{profile.title}</p>

                <div className="pt-2 space-y-2.5 text-xs text-slate-400 border-t border-slate-800">
                  {profile.location && (
                    <div className="flex items-center gap-2 group-hover:text-slate-300 transition-colors">
                      <MapPin className="h-4 w-4 text-slate-500 shrink-0" />
                      <span>{profile.location}</span>
                    </div>
                  )}
                  {profile.email && (
                    <div className="flex items-center justify-between gap-2 group-hover:text-slate-300 transition-colors">
                      <div className="flex items-center gap-2 truncate">
                        <Mail className="h-4 w-4 text-slate-500 shrink-0" />
                        <span className="truncate">{profile.email}</span>
                      </div>
                      <button
                        onClick={handleCopyEmail}
                        className="flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-800 border border-slate-700 text-[10px] font-semibold text-slate-300 hover:text-white hover:border-indigo-500 hover:bg-indigo-950/40 transition-colors cursor-pointer shrink-0"
                        title={t('contact.copyEmail')}
                      >
                        {hasCopied ? (
                          <>
                            <Check className="h-3 w-3 text-emerald-400" />
                            <span className="text-emerald-400">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3 w-3 text-indigo-400" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Metrics Widgets with Spotlight Cursor Glow & Counter */}
            <div className="grid grid-cols-2 gap-4" data-aos="fade-up" data-aos-delay="200">
              <SpotlightCard className="widget-interactive p-5 text-center cursor-default">
                <div className="space-y-1">
                  <p className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent hover:scale-110 transition-transform duration-300 inline-block">
                    <AnimatedCounter target={3} suffix="+" />
                  </p>
                  <p className="text-xs font-medium text-slate-400">{t('hero.stat1.label')}</p>
                </div>
              </SpotlightCard>
              <SpotlightCard className="widget-interactive p-5 text-center cursor-default">
                <div className="space-y-1">
                  <p className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent hover:scale-110 transition-transform duration-300 inline-block">
                    <AnimatedCounter target={100} suffix="%" />
                  </p>
                  <p className="text-xs font-medium text-slate-400">{t('hero.stat3.label')}</p>
                </div>
              </SpotlightCard>
            </div>
          </div>

          {/* Right Column: Detailed Story & Education */}
          <div className="lg:col-span-7 space-y-8" data-aos="fade-left">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white">
                {t('about.storyTitle')}
              </h3>
              <p className="text-base text-slate-300 leading-relaxed font-light">
                {profile.about_narrative || profile.bio}
              </p>
              <p className="text-base text-slate-400 leading-relaxed font-light">
                {t('about.storyDesc')}
              </p>
            </div>

            {/* What I Value Widgets */}
            <div className="space-y-3 pt-2" data-aos="fade-up" data-aos-delay="150">
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-indigo-400" />
                {t('about.values')}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {highlights.map((item, idx) => (
                  <div
                    key={idx}
                    data-aos="zoom-in"
                    data-aos-delay={idx * 80}
                    className="flex items-center gap-2.5 text-sm text-slate-300 font-medium p-3 rounded-xl bg-slate-900/40 border border-slate-800/70 hover:border-indigo-500/50 hover:bg-slate-900/80 hover:translate-x-1 transition-all duration-300 cursor-default group"
                  >
                    <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0 group-hover:scale-125 transition-transform duration-300" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Riwayat Pendidikan Card Widgets */}
            <div className="space-y-4 pt-4 border-t border-slate-800" data-aos="fade-up" data-aos-delay="200">
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
                <GraduationCap className="h-4 w-4 text-indigo-400" />
                {t('about.education')}
              </h4>

              <div className="space-y-4">
                {educations.map((edu, idx) => (
                  <SpotlightCard
                    key={edu.id}
                    data-aos="fade-up"
                    data-aos-delay={idx * 100}
                    className="widget-interactive p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
                  >
                    <div className="space-y-0.5">
                      <h5 className="font-bold text-white text-base group-hover:text-indigo-400 transition-colors duration-300">
                        {edu.institution}
                      </h5>
                      <p className="text-sm text-slate-300 font-medium">
                        {edu.degree} — {edu.field_of_study}
                      </p>
                      {edu.gpa && (
                        <p className="text-xs text-indigo-400 font-semibold mt-1">
                          {t('about.gpa')}: {edu.gpa}
                        </p>
                      )}
                    </div>
                    <div className="text-xs font-semibold px-3.5 py-1.5 bg-slate-800/90 rounded-full border border-slate-700 text-slate-300 shrink-0 w-fit group-hover:border-indigo-500/50 group-hover:text-white transition-all duration-300">
                      {edu.start_date.substring(0, 4)} — {edu.is_current ? t('about.present') : edu.end_date?.substring(0, 4)}
                    </div>
                  </SpotlightCard>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
