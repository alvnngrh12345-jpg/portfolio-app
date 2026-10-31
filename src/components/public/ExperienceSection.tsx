import { Briefcase, Building, Users, Calendar, MapPin } from 'lucide-react'
import { SectionTitle } from '../common/SectionTitle'
import { Badge } from '../ui/Badge'
import { SpotlightCard } from '../common/SpotlightCard'
import { formatDate } from '../../lib/utils'
import type { Experience } from '../../types/database.types'
import { useLanguage } from '../../context/LanguageContext'

interface ExperienceSectionProps {
  experiences: Experience[]
}

export function ExperienceSection({ experiences }: ExperienceSectionProps) {
  const { t } = useLanguage()

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'work':
        return <Badge variant="default">{t('experience.type.work')}</Badge>
      case 'internship':
        return <Badge variant="success">{t('experience.type.internship')}</Badge>
      case 'organization':
        return <Badge variant="warning">{t('experience.type.organization')}</Badge>
      default:
        return <Badge variant="secondary">{type}</Badge>
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'work':
        return <Briefcase className="h-4 w-4 text-indigo-400 group-hover:scale-125 transition-transform duration-300" />
      case 'internship':
        return <Building className="h-4 w-4 text-emerald-400 group-hover:scale-125 transition-transform duration-300" />
      case 'organization':
        return <Users className="h-4 w-4 text-amber-400 group-hover:scale-125 transition-transform duration-300" />
      default:
        return <Briefcase className="h-4 w-4 text-slate-400 group-hover:scale-125 transition-transform duration-300" />
    }
  }

  return (
    <section id="experience" className="py-24 sm:py-32 bg-transparent border-t border-slate-800/60 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          badge={t('experience.badge')}
          title={t('experience.title')}
          subtitle={t('experience.subtitle')}
        />

        {/* Vertical Timeline Track */}
        <div className="relative border-l-2 border-slate-800 ml-3.5 sm:ml-32 space-y-8 sm:space-y-12">
          {experiences.map((item, index) => (
            <div
              key={item.id}
              data-aos="fade-right"
              data-aos-delay={index * 100}
              className="relative pl-5 sm:pl-8 group"
            >
              {/* Timeline Bullet Node with Hover Pulse */}
              <div className="absolute -left-[18px] top-1.5 flex h-8 w-8 items-center justify-center rounded-full border-4 border-[#090d16] bg-slate-900 shadow-md group-hover:scale-130 group-hover:border-indigo-600/60 group-hover:bg-indigo-950/80 group-hover:shadow-lg group-hover:shadow-indigo-500/30 transition-all duration-300">
                {getTypeIcon(item.type)}
              </div>

              {/* Date Column for Tablets & Desktops */}
              <div className="sm:absolute sm:-left-36 sm:top-2 sm:w-28 sm:text-right hidden sm:block">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300 group-hover:text-indigo-400 transition-colors duration-300">
                  {formatDate(item.start_date)}
                </span>
                <p className="text-[11px] text-slate-500 font-medium">
                  {item.is_current ? 'Present' : formatDate(item.end_date)}
                </p>
              </div>

              {/* Card Container Widget with Spotlight Cursor Glow */}
              <SpotlightCard className="widget-interactive p-4 sm:p-6 shadow-xl space-y-3 cursor-default">
                {/* Mobile Date Header */}
                <div className="sm:hidden flex items-center gap-1.5 text-xs font-semibold text-indigo-400 pb-1">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>
                    {formatDate(item.start_date)} — {item.is_current ? 'Present' : formatDate(item.end_date)}
                  </span>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-indigo-400 transition-colors duration-300">
                      {item.role}
                    </h3>
                    <p className="text-xs sm:text-sm font-semibold text-slate-300">
                      {item.institution}
                    </p>
                  </div>
                  <div>{getTypeBadge(item.type)}</div>
                </div>

                {item.location && (
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <MapPin className="h-3.5 w-3.5 text-slate-500" />
                    <span>{item.location}</span>
                  </div>
                )}

                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed pt-1 font-light">
                  {item.description}
                </p>
              </SpotlightCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
