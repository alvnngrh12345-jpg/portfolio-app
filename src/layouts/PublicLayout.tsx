import React from 'react'
import { Navbar } from '../components/common/Navbar'
import { Footer } from '../components/common/Footer'
import type { Profile, SocialLink } from '../types/database.types'

interface PublicLayoutProps {
  profile?: Profile | null
  socialLinks?: SocialLink[]
  children: React.ReactNode
}

export function PublicLayout({ profile, socialLinks = [], children }: PublicLayoutProps) {
  const safeName =
    profile?.full_name && !profile.full_name.includes('Alex Pratama')
      ? profile.full_name
      : 'Alvin Nugraha'

  return (
    <div className="min-h-screen flex flex-col text-slate-100 selection:bg-indigo-500 selection:text-white transition-colors duration-300 relative overflow-x-hidden">
      <Navbar personalName={safeName} cvUrl={profile?.cv_url} />
      <main className="flex-1 relative z-10">{children}</main>
      <Footer
        personalName={safeName}
        headline={profile?.headline || 'Full-Stack Developer & Software Engineer.'}
        socialLinks={socialLinks}
      />
    </div>
  )
}
