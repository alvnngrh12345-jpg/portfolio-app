import { useState } from 'react'
import { Mail, Phone, MapPin, Send, CheckCircle2, Copy, Check } from 'lucide-react'
import { SectionTitle } from '../common/SectionTitle'
import { Input } from '../ui/Input'
import { Textarea } from '../ui/Textarea'
import { Button } from '../ui/Button'
import { useToast } from '../ui/Toast'
import { portfolioService } from '../../services/portfolioService'
import { LinkedinIcon, WhatsappIcon, InstagramIcon } from '../common/SocialIcons'
import type { Profile, SocialLink } from '../../types/database.types'
import { useLanguage } from '../../context/LanguageContext'
import { ALVIN_WA_URL, ALVIN_LINKEDIN_URL } from '../../constants/contact'

interface ContactSectionProps {
  profile: Profile
  socialLinks: SocialLink[]
}

export function ContactSection({ profile, socialLinks: _socialLinks }: ContactSectionProps) {
  const { t } = useLanguage()
  const { success, error } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSent, setIsSent] = useState(false)
  const [hasCopied, setHasCopied] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const errors: Record<string, string> = {}
    if (!formData.name.trim()) errors.name = 'Nama lengkap wajib diisi'
    if (!formData.email.trim()) {
      errors.email = 'Alamat email wajib diisi'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Format email tidak valid'
    }
    if (!formData.message.trim()) {
      errors.message = 'Pesan tidak boleh kosong'
    } else if (formData.message.trim().length < 10) {
      errors.message = 'Pesan minimal 10 karakter'
    }
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleCopyEmail = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    const emailToCopy = profile.email || 'alvinnugraha92@gmail.com'
    navigator.clipboard.writeText(emailToCopy)
    setHasCopied(true)
    success(t('contact.emailCopied'), t('contact.emailCopiedDesc'))
    setTimeout(() => setHasCopied(false), 2000)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setIsSubmitting(true)
    try {
      await portfolioService.sendMessage(
        formData.name,
        formData.email,
        formData.message,
        formData.subject
      )
      setIsSent(true)
      success(t('contact.sentSuccess'), t('contact.sentSuccessDesc'))
      setFormData({ name: '', email: '', subject: '', message: '' })
      setFormErrors({})
    } catch (err: any) {
      console.error('Send message error:', err)
      error('Gagal Mengirim', err.message || 'Terjadi kesalahan saat mengirim pesan.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-24 sm:py-32 bg-transparent border-t border-slate-800/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          badge={t('contact.badge')}
          title={t('contact.title')}
          subtitle={t('contact.subtitle')}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Contact Info */}
          <div className="lg:col-span-5 space-y-8" data-aos="fade-right">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white">
                {t('contact.directInfo')}
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed font-light">
                {t('contact.directDesc')}
              </p>
            </div>

            {/* Contact Widgets with Interactive Hover Lift & 1-Click Copy */}
            <div className="space-y-4" data-aos="fade-up" data-aos-delay="100">
              {profile.email && (
                <div className="widget-interactive group flex items-center justify-between p-4 rounded-2xl bg-slate-900/70 border border-slate-800/80 shadow-md backdrop-blur-md">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-indigo-950/80 border border-indigo-700/50 flex items-center justify-center text-indigo-400 shrink-0 group-hover:scale-110 group-hover:bg-indigo-900/60 group-hover:border-indigo-500 transition-all duration-300">
                      <Mail className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Email</p>
                      <a href={`mailto:${profile.email}`} className="text-sm font-bold text-white group-hover:text-indigo-400 transition-colors">
                        {profile.email}
                      </a>
                    </div>
                  </div>

                  {/* 1-Click Copy Email Button */}
                  <button
                    onClick={handleCopyEmail}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-700/80 bg-slate-800/80 text-xs font-semibold text-slate-300 hover:text-white hover:border-indigo-500 hover:bg-indigo-950/50 hover:shadow-md hover:shadow-indigo-500/20 active:scale-95 transition-all cursor-pointer"
                    title={t('contact.copyEmail')}
                  >
                    {hasCopied ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-400" />
                        <span className="text-emerald-400 font-bold">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5 text-indigo-400" />
                        <span>{t('contact.copyEmail')}</span>
                      </>
                    )}
                  </button>
                </div>
              )}

              {profile.phone && (
                <div className="widget-interactive group flex items-center gap-4 p-4 rounded-2xl bg-slate-900/70 border border-slate-800/80 shadow-md backdrop-blur-md cursor-pointer">
                  <div className="h-12 w-12 rounded-xl bg-emerald-950/80 border border-emerald-700/50 flex items-center justify-center text-emerald-400 shrink-0 group-hover:scale-110 group-hover:bg-emerald-900/60 group-hover:border-emerald-500 transition-all duration-300">
                    <Phone className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">WhatsApp / Telepon</p>
                    <a href={ALVIN_WA_URL} target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">
                      {profile.phone}
                    </a>
                  </div>
                </div>
              )}

              {profile.location && (
                <div className="widget-interactive group flex items-center gap-4 p-4 rounded-2xl bg-slate-900/70 border border-slate-800/80 shadow-md backdrop-blur-md cursor-default">
                  <div className="h-12 w-12 rounded-xl bg-purple-950/80 border border-purple-700/50 flex items-center justify-center text-purple-400 shrink-0 group-hover:scale-110 group-hover:bg-purple-900/60 group-hover:border-purple-500 transition-all duration-300">
                    <MapPin className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Lokasi</p>
                    <p className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors">{profile.location}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Links */}
            <div className="pt-2" data-aos="fade-up" data-aos-delay="200">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                {t('contact.channels')}
              </p>
              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                <a
                  href={ALVIN_LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white hover:border-indigo-500/60 hover:bg-slate-800 hover:-translate-y-1 hover:shadow-lg hover:shadow-indigo-500/20 transition-all duration-300"
                >
                  <LinkedinIcon className="h-4 w-4 group-hover:rotate-12 transition-transform duration-300" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href={ALVIN_WA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white hover:border-emerald-500/60 hover:bg-slate-800 hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-500/20 transition-all duration-300"
                >
                  <WhatsappIcon className="h-4 w-4 group-hover:rotate-12 transition-transform duration-300" />
                  <span>WhatsApp</span>
                </a>
                <a
                  href="https://instagram.com/alvnngrhh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white hover:border-pink-500/60 hover:bg-slate-800 hover:-translate-y-1 hover:shadow-lg hover:shadow-pink-500/20 transition-all duration-300"
                >
                  <InstagramIcon className="h-4 w-4 group-hover:rotate-12 transition-transform duration-300" />
                  <span>Instagram</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form Widget */}
          <div className="lg:col-span-7" data-aos="fade-left" data-aos-delay="150">
            <div className="rounded-2xl sm:rounded-3xl border border-slate-800/80 bg-slate-900/80 p-5 sm:p-8 md:p-10 shadow-2xl backdrop-blur-xl hover:border-slate-700/90 transition-all duration-300">
              {isSent ? (
                <div className="text-center py-12 space-y-4 animate-in fade-in zoom-in-95 duration-300">
                  <div className="mx-auto h-16 w-16 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-400 flex items-center justify-center animate-bounce">
                    <CheckCircle2 className="h-10 w-10" />
                  </div>
                  <h4 className="text-2xl font-bold text-white">{t('contact.sentSuccess')}</h4>
                  <p className="text-sm text-slate-400 max-w-md mx-auto leading-relaxed font-light">
                    {t('contact.sentSuccessDesc')}
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => setIsSent(false)}
                    className="mt-4 hover:scale-105 transition-transform duration-300"
                  >
                    {t('contact.sendAnother')}
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h4 className="text-xl font-bold text-white mb-1">
                    {t('contact.formTitle')}
                  </h4>
                  <p className="text-xs text-slate-400 mb-6 font-light">
                    {t('contact.formSubtitle')}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label={t('contact.nameLabel')}
                      placeholder="e.g. Budi Santoso"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      error={formErrors.name}
                    />
                    <Input
                      label={t('contact.emailLabel')}
                      type="email"
                      placeholder="e.g. budi@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      error={formErrors.email}
                    />
                  </div>

                  <Input
                    label={t('contact.subjectLabel')}
                    placeholder="e.g. Web App Project Collaboration"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  />

                  <Textarea
                    label={t('contact.messageLabel')}
                    rows={5}
                    placeholder="Type your message, project brief, or questions here..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    error={formErrors.message}
                  />

                  <Button
                    type="submit"
                    size="lg"
                    isLoading={isSubmitting}
                    className="w-full sm:w-auto px-8 cursor-pointer shadow-xl shadow-indigo-600/30 hover:scale-105 active:scale-95 transition-all duration-300"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    {isSubmitting ? t('contact.sendingBtn') : t('contact.sendBtn')}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

