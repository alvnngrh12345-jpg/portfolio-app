import { Mail, Heart } from 'lucide-react'
import { PUBLIC_NAV_ITEMS } from '../../constants/navigation'
import type { SocialLink } from '../../types/database.types'
import { GithubIcon, LinkedinIcon, WhatsappIcon, InstagramIcon } from './SocialIcons'
import { ALVIN_WA_URL, ALVIN_LINKEDIN_URL } from '../../constants/contact'

interface FooterProps {
  personalName?: string
  headline?: string
  socialLinks?: SocialLink[]
}

export function Footer({
  personalName = 'Alvin Nugraha',
  headline = 'Building thoughtful digital products and scalable web applications.',
  socialLinks = [],
}: FooterProps) {
  const currentYear = new Date().getFullYear()

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'github':
        return <GithubIcon className="h-4 w-4" />
      case 'linkedin':
        return <LinkedinIcon className="h-4 w-4" />
      case 'whatsapp':
        return <WhatsappIcon className="h-4 w-4" />
      case 'instagram':
        return <InstagramIcon className="h-4 w-4" />
      default:
        return <Mail className="h-4 w-4" />
    }
  }

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
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

  return (
    <footer className="border-t border-slate-800/60 bg-transparent relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <a
              href="#hero"
              onClick={(e) => handleScrollTo(e, '#hero')}
              className="inline-flex items-center gap-2.5 text-xl font-bold tracking-tight text-white hover:opacity-90 transition-opacity"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white font-bold shadow-md shadow-indigo-600/30">
                {personalName.charAt(0)}
              </span>
              <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                {personalName}
              </span>
            </a>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              {headline}
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-2.5 pt-2">
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
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-800 bg-slate-900/80 text-slate-400 hover:text-white hover:border-indigo-500/60 hover:bg-indigo-950/40 hover:-translate-y-1 transition-all shadow-sm cursor-pointer"
                    aria-label={social.platform}
                  >
                    {getSocialIcon(social.platform)}
                  </a>
                )
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Navigasi
            </h4>
            <ul className="space-y-2.5">
              {PUBLIC_NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(e) => handleScrollTo(e, item.href)}
                    className="text-sm text-slate-400 hover:text-indigo-400 transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Contact info */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Hubungi Langsung
            </h4>
            <p className="text-sm text-slate-400 mb-3 leading-relaxed">
              Terbuka untuk peluang freelance, magang, dan kolaborasi proyek web modern.
            </p>
            <a
              href="#contact"
              onClick={(e) => handleScrollTo(e, '#contact')}
              className="inline-flex text-sm font-semibold text-indigo-400 hover:text-indigo-300 underline underline-offset-4 transition-colors"
            >
              Kirim Pesan &rarr;
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {currentYear} {personalName}. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with React, TypeScript, Tailwind CSS & Supabase
            <Heart className="h-3.5 w-3.5 text-rose-500 fill-rose-500 inline ml-1" />
          </p>
        </div>
      </div>
    </footer>
  )
}
