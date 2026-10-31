import { Badge } from '../ui/Badge'
import { cn } from '../../lib/utils'

export interface SectionTitleProps {
  badge?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  className?: string
  aosAnimation?: string | false
}

export function SectionTitle({
  badge,
  title,
  subtitle,
  align = 'center',
  className,
  aosAnimation = 'fade-up-subtle',
}: SectionTitleProps) {
  const animType = aosAnimation ? 'fade-up-subtle' : undefined

  return (
    <div
      className={cn(
        'mb-12 md:mb-16 space-y-3',
        align === 'center' ? 'text-center max-w-2xl mx-auto' : 'text-left max-w-xl',
        className
      )}
    >
      {badge && (
        <div data-aos={animType} data-aos-delay="0" className="stagger-1 inline-block">
          <Badge variant="default" className="px-3.5 py-1 text-xs font-semibold uppercase tracking-wider">
            {badge}
          </Badge>
        </div>
      )}
      <h2
        data-aos={animType}
        data-aos-delay="100"
        className="stagger-2 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight"
      >
        {title}
      </h2>
      {subtitle && (
        <p
          data-aos={animType}
          data-aos-delay="200"
          className="stagger-3 text-base sm:text-lg text-slate-400 leading-relaxed font-normal"
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
