import { useEffect, useState } from 'react'
import { PublicLayout } from '../../layouts/PublicLayout'
import { HeroSection } from '../../components/public/HeroSection'
import { AboutSection } from '../../components/public/AboutSection'
import { SkillsSection } from '../../components/public/SkillsSection'
import { InteractiveTerminal } from '../../components/public/InteractiveTerminal'
import { ExperienceSection } from '../../components/public/ExperienceSection'
import { CertificatesSection } from '../../components/public/CertificatesSection'
import { ContactSection } from '../../components/public/ContactSection'
import { BackToTop } from '../../components/common/BackToTop'
import { FloatingWhatsApp } from '../../components/common/FloatingWhatsApp'
import { AIChatbot } from '../../components/public/AIChatbot'
import { portfolioService } from '../../services/portfolioService'
import { initAOS, refreshAOS } from '../../lib/aos'
import {
  DEFAULT_PROFILE,
  DEFAULT_SKILLS,
  DEFAULT_EXPERIENCES,
  DEFAULT_EDUCATIONS,
  DEFAULT_CERTIFICATES,
  DEFAULT_SOCIALS,
} from '../../constants/initialData'
import type {
  Profile,
  Skill,
  Experience,
  Education,
  Certificate,
  SocialLink,
} from '../../types/database.types'

export function HomePage() {
  const [profile, setProfile] = useState<Profile>(DEFAULT_PROFILE)
  const [skills, setSkills] = useState<Skill[]>(DEFAULT_SKILLS)
  const [experiences, setExperiences] = useState<Experience[]>(DEFAULT_EXPERIENCES)
  const [educations, setEducations] = useState<Education[]>(DEFAULT_EDUCATIONS)
  const [certificates, setCertificates] = useState<Certificate[]>(DEFAULT_CERTIFICATES)
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>(DEFAULT_SOCIALS)

  useEffect(() => {
    initAOS()

    const loadData = async () => {
      try {
        const [
          profileData,
          skillsData,
          expData,
          eduData,
          certData,
          socialData,
        ] = await Promise.all([
          portfolioService.getProfile(),
          portfolioService.getSkills(),
          portfolioService.getExperiences(),
          portfolioService.getEducations(),
          portfolioService.getCertificates(),
          portfolioService.getSocialLinks(),
        ])

        setProfile(profileData)
        setSkills(skillsData)
        setExperiences(expData)
        setEducations(eduData)
        setCertificates(certData)
        setSocialLinks(socialData)
      } catch (err) {
        console.error('Failed to load portfolio data:', err)
      } finally {
        setTimeout(() => {
          refreshAOS()
        }, 100)
      }
    }

    loadData()
  }, [])

  return (
    <PublicLayout profile={profile} socialLinks={socialLinks}>
      <HeroSection profile={profile} socialLinks={socialLinks} />
      <AboutSection profile={profile} educations={educations} />
      <SkillsSection skills={skills} />
      <InteractiveTerminal />
      <ExperienceSection experiences={experiences} />
      <CertificatesSection certificates={certificates} />
      <ContactSection profile={profile} socialLinks={socialLinks} />
      <FloatingWhatsApp />
      <AIChatbot />
      <BackToTop />
    </PublicLayout>
  )
}
