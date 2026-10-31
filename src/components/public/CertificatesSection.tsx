import { useState } from 'react'
import { Award, Calendar, Eye } from 'lucide-react'
import { SectionTitle } from '../common/SectionTitle'
import { CardContent } from '../ui/Card'
import { SpotlightCard } from '../common/SpotlightCard'
import { Modal } from '../ui/Modal'
import { formatDate } from '../../lib/utils'
import type { Certificate } from '../../types/database.types'
import { useLanguage } from '../../context/LanguageContext'

interface CertificatesSectionProps {
  certificates: Certificate[]
}

export function CertificatesSection({ certificates }: CertificatesSectionProps) {
  const { t } = useLanguage()
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null)

  return (
    <section id="certificates" className="py-24 sm:py-32 bg-transparent border-t border-slate-800/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          badge={t('certificates.badge')}
          title={t('certificates.title')}
          subtitle={t('certificates.subtitle')}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
          {certificates.map((cert, index) => (
            <SpotlightCard
              key={cert.id}
              data-aos="zoom-in-up"
              data-aos-delay={index * 100}
              className="widget-interactive group overflow-hidden rounded-2xl flex flex-col justify-between"
            >
              <div>
                {/* Certificate Thumbnail Preview */}
                <div
                  onClick={() => setSelectedCert(cert)}
                  className="relative aspect-4/3 w-full overflow-hidden bg-slate-950 cursor-pointer"
                >
                  <img
                    src={cert.image_url}
                    alt={cert.title}
                    className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 backdrop-blur-xs transition-all duration-300 flex items-center justify-center">
                    <span className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl bg-slate-900/90 text-xs font-semibold text-white shadow-2xl border border-slate-700 hover:scale-105 transition-transform duration-200">
                      <Eye className="h-4 w-4 text-indigo-400" />
                      {t('certificates.preview')}
                    </span>
                  </div>
                </div>

                {/* Information */}
                <CardContent className="p-4 sm:p-6 space-y-3">
                  <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
                    <Award className="h-4 w-4 shrink-0 group-hover:rotate-12 transition-transform duration-300" />
                    <span>{cert.issuer}</span>
                  </div>

                  <h3
                    onClick={() => setSelectedCert(cert)}
                    className="text-base sm:text-lg font-bold text-white group-hover:text-indigo-400 transition-colors duration-300 cursor-pointer line-clamp-2"
                  >
                    {cert.title}
                  </h3>

                  <div className="flex items-center gap-2 text-xs text-slate-400 pt-1">
                    <Calendar className="h-3.5 w-3.5 text-slate-500" />
                    <span>{t('certificates.issued')}: {formatDate(cert.issue_date)}</span>
                  </div>
                </CardContent>
              </div>

              {/* Footer Info */}
              <div className="p-4 sm:p-6 pt-0 border-t border-slate-800/80 mt-2 flex items-center justify-between text-[11px]">
                {cert.credential_id ? (
                  <span className="font-mono text-slate-500 truncate max-w-[140px]">
                    ID: {cert.credential_id}
                  </span>
                ) : (
                  <span className="font-mono text-slate-500">{t('certificates.verified')}</span>
                )}
                <span className="font-medium text-emerald-400 flex items-center gap-1.5 shrink-0">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  {t('certificates.verified')}
                </span>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>

      {/* Modal Preview Certificate Image */}
      <Modal
        isOpen={Boolean(selectedCert)}
        onClose={() => setSelectedCert(null)}
        maxWidth="xl"
        title={selectedCert?.title}
        description={selectedCert?.issuer}
      >
        {selectedCert && (
          <div className="space-y-4">
            <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl">
              <img
                src={selectedCert.image_url}
                alt={selectedCert.title}
                className="w-full h-auto object-contain max-h-[75vh] mx-auto"
              />
            </div>
          </div>
        )}
      </Modal>
    </section>
  )
}
