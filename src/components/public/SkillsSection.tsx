import { useState } from 'react'
import {
  Code2,
  FileCode,
  Terminal,
  Layers,
  Globe,
  Palette,
  Server,
  Zap,
  Database,
  Cpu,
  GitBranch,
  Box,
  Layout,
  Wrench,
} from 'lucide-react'
import { SectionTitle } from '../common/SectionTitle'
import { SpotlightCard } from '../common/SpotlightCard'
import { Badge } from '../ui/Badge'
import { cn } from '../../lib/utils'
import type { Skill, SkillCategory } from '../../types/database.types'
import { useLanguage } from '../../context/LanguageContext'

interface SkillsSectionProps {
  skills: Skill[]
}

export function SkillsSection({ skills }: SkillsSectionProps) {
  const { t } = useLanguage()
  const [selectedCategory, setSelectedCategory] = useState<SkillCategory | 'all'>('all')
  const [hasFiltered, setHasFiltered] = useState(false)

  const categories: { key: SkillCategory | 'all'; labelKey: string }[] = [
    { key: 'all', labelKey: 'skills.cat.all' },
    { key: 'programming', labelKey: 'skills.cat.programming' },
    { key: 'frontend', labelKey: 'skills.cat.frontend' },
    { key: 'backend', labelKey: 'skills.cat.backend' },
    { key: 'database', labelKey: 'skills.cat.database' },
    { key: 'tools', labelKey: 'skills.cat.tools' },
  ]

  const getSkillIcon = (iconName: string) => {
    switch (iconName.toLowerCase()) {
      case 'code2':
        return <Code2 className="h-5 w-5 text-indigo-400 group-hover:scale-125 group-hover:rotate-6 transition-all duration-300" />
      case 'filecode':
        return <FileCode className="h-5 w-5 text-amber-400 group-hover:scale-125 group-hover:rotate-6 transition-all duration-300" />
      case 'terminal':
        return <Terminal className="h-5 w-5 text-emerald-400 group-hover:scale-125 group-hover:rotate-6 transition-all duration-300" />
      case 'layers':
        return <Layers className="h-5 w-5 text-sky-400 group-hover:scale-125 group-hover:rotate-6 transition-all duration-300" />
      case 'globe':
        return <Globe className="h-5 w-5 text-teal-400 group-hover:scale-125 group-hover:rotate-6 transition-all duration-300" />
      case 'palette':
        return <Palette className="h-5 w-5 text-fuchsia-400 group-hover:scale-125 group-hover:rotate-6 transition-all duration-300" />
      case 'server':
        return <Server className="h-5 w-5 text-green-400 group-hover:scale-125 group-hover:rotate-6 transition-all duration-300" />
      case 'zap':
        return <Zap className="h-5 w-5 text-yellow-400 group-hover:scale-125 group-hover:rotate-6 transition-all duration-300" />
      case 'database':
        return <Database className="h-5 w-5 text-blue-400 group-hover:scale-125 group-hover:rotate-6 transition-all duration-300" />
      case 'cpu':
        return <Cpu className="h-5 w-5 text-violet-400 group-hover:scale-125 group-hover:rotate-6 transition-all duration-300" />
      case 'gitbranch':
        return <GitBranch className="h-5 w-5 text-rose-400 group-hover:scale-125 group-hover:rotate-6 transition-all duration-300" />
      case 'box':
        return <Box className="h-5 w-5 text-cyan-400 group-hover:scale-125 group-hover:rotate-6 transition-all duration-300" />
      case 'layout':
        return <Layout className="h-5 w-5 text-purple-400 group-hover:scale-125 group-hover:rotate-6 transition-all duration-300" />
      default:
        return <Wrench className="h-5 w-5 text-indigo-400 group-hover:scale-125 group-hover:rotate-6 transition-all duration-300" />
    }
  }

  const filteredSkills =
    selectedCategory === 'all'
      ? skills
      : skills.filter((skill) => skill.category === selectedCategory)

  return (
    <section id="skills" className="py-24 sm:py-32 bg-transparent border-t border-slate-800/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          badge={t('skills.badge')}
          title={t('skills.title')}
          subtitle={t('skills.subtitle')}
        />

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12" data-aos="fade-up">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.key
            return (
              <button
                key={cat.key}
                onClick={() => {
                  setSelectedCategory(cat.key)
                  setHasFiltered(true)
                }}
                className={cn(
                  'px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer active:scale-95',
                  isActive
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/35 -translate-y-0.5'
                    : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-white hover:border-slate-700'
                )}
              >
                {t(cat.labelKey)}
              </button>
            )
          })}
        </div>

        {/* Skills Cards Grid - With Cursor Spotlight Glow */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {filteredSkills.map((skill, index) => (
            <SpotlightCard
              key={`${selectedCategory}-${skill.id}`}
              data-aos={hasFiltered ? undefined : 'zoom-in'}
              data-aos-delay={hasFiltered ? undefined : index * 40}
              className={cn(
                'widget-interactive p-3.5 sm:p-5 bg-slate-900/70 border-slate-800 group cursor-default',
                hasFiltered && 'filter-enter'
              )}
              style={{ animationDelay: hasFiltered ? `${Math.min(index * 45, 270)}ms` : undefined }}
            >
              <div className="p-0 space-y-3.5">
                <div className="flex items-center justify-between">
                  <div className="h-11 w-11 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center group-hover:bg-indigo-950/60 group-hover:border-indigo-600/50 group-hover:shadow-md group-hover:shadow-indigo-500/20 transition-all duration-300">
                    {getSkillIcon(skill.icon_name)}
                  </div>
                  <Badge variant="secondary" className="capitalize text-[10px] group-hover:border-slate-600 transition-colors">
                    {skill.category}
                  </Badge>
                </div>

                <div>
                  <h4 className="font-bold text-white text-sm sm:text-base group-hover:text-indigo-400 transition-colors duration-300">
                    {skill.name}
                  </h4>
                </div>

                {skill.proficiency_level && (
                  <div className="space-y-1.5 pt-1">
                    <div className="flex justify-between text-[11px] text-slate-400 font-medium">
                      <span>Proficiency</span>
                      <span className="text-indigo-400 font-semibold group-hover:text-indigo-300 transition-colors">{skill.proficiency_level}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full group-hover:shadow-sm group-hover:shadow-indigo-500 transition-all duration-700"
                        style={{ width: `${skill.proficiency_level}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  )
}
