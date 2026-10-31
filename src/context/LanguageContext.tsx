import React, { createContext, useContext, useState, useEffect } from 'react'

export type Language = 'id' | 'en'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  toggleLanguage: () => void
  t: (key: string) => string
}

const translations: Record<Language, Record<string, string>> = {
  id: {
    // Nav
    'nav.hero': 'Home',
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.skills': 'Skills',
    'nav.terminal': 'Terminal',
    'nav.experience': 'Experience',
    'nav.certificates': 'Certificates',
    'nav.contact': 'Contact',
    'nav.downloadCV': 'Download CV',
    'nav.contactMe': 'Hubungi Saya',
    'nav.admin': 'Portal Admin',

    // Live Status
    'status.location': 'Bekasi, ID',
    'status.activity': 'Sedang Coding & Belajar',
    'status.available': 'Siap untuk Proyek & Magang',

    // Hero
    'hero.greeting': 'Halo, Saya',
    'hero.exploreSkills': 'Eksplorasi Keahlian',
    'hero.contactMe': 'Hubungi Saya',
    'hero.connect': 'Terhubung:',
    'hero.scrollDown': 'SCROLL KE BAWAH',
    'hero.feature1.title': 'Clean & Modular Code',
    'hero.feature1.desc': 'Struktur kode terstandarisasi, mudah dirawat, dan terintegrasi arsitektur modern.',
    'hero.feature2.title': 'Fully Responsive UI/UX',
    'hero.feature2.desc': 'Tampilan adaptif dan presisi tinggi di layar HP, tablet, laptop, dan monitor.',
    'hero.feature3.title': 'Fast & Interactive',
    'hero.feature3.desc': 'Waktu muat instan, transisi halus, animasi interaktif, dan performa web optimal.',
    'hero.stat1.label': 'Tahun Eksplorasi',
    'hero.stat2.label': 'Skill & Tools',
    'hero.stat3.label': 'Komitmen Kualitas',
    'hero.stat4.label': 'Siap Kolaborasi',

    // About
    'about.badge': 'TENTANG SAYA',
    'about.title': 'Passion, Presisi & Pemecahan Masalah',
    'about.subtitle': 'Mengenal lebih dekat latar belakang, filosofi berkarya, dan fokus keahlian saya.',
    'about.storyTitle': 'Perjalanan & Visi Pengembangan Perangkat Lunak',
    'about.storyDesc': 'Fokus utama saya adalah menjembatani desain estetis dengan fungsionalitas teknis yang tangguh. Saya senang mengeksplorasi teknologi web modern, merancang arsitektur database relasional, dan mengotomasi alur data yang efisien.',
    'about.values': 'Standar & Nilai Kerja',
    'about.education': 'Riwayat Pendidikan',
    'about.present': 'Sekarang',
    'about.gpa': 'IPK',

    // Skills
    'skills.badge': 'KEAHLIAN TEKNIS',
    'skills.title': 'Teknologi & Keahlian Teknis',
    'skills.subtitle': 'Kombinasi bahasa pemrograman, framework modern, database relasional, dan alat bantu pengembangan yang saya kuasai.',
    'skills.cat.all': 'Semua Skill',
    'skills.cat.programming': 'Bahasa Pemrograman',
    'skills.cat.frontend': 'Frontend',
    'skills.cat.backend': 'Backend',
    'skills.cat.database': 'Database',
    'skills.cat.tools': 'Tools & DevOps',

    // Experience
    'experience.badge': 'REKAM JEJAK & TIMELINE',
    'experience.title': 'Pengalaman & Rekam Jejak',
    'experience.subtitle': 'Aktivitas profesional, pengalaman magang industri, dan kepengurusan organisasi yang membentuk kepemimpinan serta keahlian teknis.',
    'experience.type.work': 'Pekerjaan',
    'experience.type.internship': 'Magang (Internship)',
    'experience.type.organization': 'Organisasi',
    'experience.present': 'Sekarang',

    // Certificates
    'certificates.badge': 'SERTIFIKASI & PENGHARGAAN',
    'certificates.title': 'Sertifikasi & Kredensial Resmi',
    'certificates.subtitle': 'Bukti kompetensi terverifikasi dari institusi teknologi global, kursus spesialisasi, dan lembaga sertifikasi.',
    'certificates.preview': 'Preview Sertifikat',
    'certificates.issued': 'Diterbitkan',
    'certificates.verified': 'Sertifikat Terverifikasi',

    // Contact
    'contact.badge': 'HUBUNGI SAYA',
    'contact.title': 'Mari Terhubung & Berdiskusi',
    'contact.subtitle': 'Tertarik berkolaborasi, mendiskusikan peluang proyek, atau sekadar bertukar sapa? Kirimkan pesan melalui formulir di bawah.',
    'contact.directInfo': 'Informasi Kontak Langsung',
    'contact.directDesc': 'Saya selalu terbuka untuk berdiskusi mengenai proyek perangkat lunak baru, peluang magang, freelance, maupun kerja sama tim.',
    'contact.copyEmail': 'Salin Email',
    'contact.emailCopied': 'Email berhasil disalin!',
    'contact.emailCopiedDesc': 'Alamat email telah disalin ke papan klip Anda.',
    'contact.channels': 'Kanal Sosial Media:',
    'contact.formTitle': 'Kirim Pesan Langsung',
    'contact.formSubtitle': 'Isi detail di bawah ini. Pesan Anda akan langsung tersimpan ke sistem kami.',
    'contact.nameLabel': 'Nama Lengkap *',
    'contact.emailLabel': 'Alamat Email *',
    'contact.subjectLabel': 'Subjek / Perihal (Opsional)',
    'contact.messageLabel': 'Pesan *',
    'contact.sendBtn': 'Kirim Pesan Sekarang',
    'contact.sendingBtn': 'Sedang Mengirim...',
    'contact.sentSuccess': 'Pesan Berhasil Terkirim!',
    'contact.sentSuccessDesc': 'Terima kasih telah menghubungi saya. Saya akan segera memberikan tanggapan melalui email Anda.',
    'contact.sendAnother': 'Kirim Pesan Lainnya',

    // Terminal
    'terminal.badge': 'INTERACTIVE DEVELOPER CLI',
    'terminal.title': 'Interactive Terminal',
    'terminal.subtitle': 'Eksplorasi profil dan keahlian saya layaknya seorang developer melalui command line interface mini.',
    'terminal.welcome': 'Selamat datang di Alvin Terminal v1.0. Ketik "help" untuk melihat daftar perintah yang tersedia.',
    'terminal.placeholder': 'Ketik perintah di sini (contoh: help, skills, bio)...',

    // Back to top
    'backToTop': 'Kembali ke Atas',
  },
  en: {
    // Nav
    'nav.hero': 'Home',
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.skills': 'Skills',
    'nav.terminal': 'Terminal',
    'nav.experience': 'Experience',
    'nav.certificates': 'Certificates',
    'nav.contact': 'Contact',
    'nav.downloadCV': 'Download CV',
    'nav.contactMe': 'Contact Me',
    'nav.admin': 'Admin Portal',

    // Live Status
    'status.location': 'Bekasi, ID',
    'status.activity': 'Currently Coding & Learning',
    'status.available': 'Available for Projects & Internship',

    // Hero
    'hero.greeting': "Hi, I'm",
    'hero.exploreSkills': 'Explore Skills',
    'hero.contactMe': 'Contact Me',
    'hero.connect': 'Connect:',
    'hero.scrollDown': 'SCROLL DOWN',
    'hero.feature1.title': 'Clean & Modular Code',
    'hero.feature1.desc': 'Standardized, maintainable code architecture integrated with modern best practices.',
    'hero.feature2.title': 'Fully Responsive UI/UX',
    'hero.feature2.desc': 'Pixel-perfect, high-precision layout adapting smoothly on mobile, tablet, and desktop.',
    'hero.feature3.title': 'Fast & Interactive',
    'hero.feature3.desc': 'Blazing fast load times, silky smooth micro-interactions, and optimal performance.',
    'hero.stat1.label': 'Years Exploration',
    'hero.stat2.label': 'Skills & Tools',
    'hero.stat3.label': 'Quality Commitment',
    'hero.stat4.label': 'Ready to Collaborate',

    // About
    'about.badge': 'ABOUT ME',
    'about.title': 'Passion, Precision & Problem Solving',
    'about.subtitle': 'Get to know more about my background, work philosophy, and core technical expertise.',
    'about.storyTitle': 'Journey & Software Development Vision',
    'about.storyDesc': 'My primary focus is bridging aesthetic design with robust technical architecture. I enjoy exploring modern web stacks, architecting relational databases, and automating scalable data workflows.',
    'about.values': 'Work Ethics & Standards',
    'about.education': 'Education History',
    'about.present': 'Present',
    'about.gpa': 'GPA',

    // Skills
    'skills.badge': 'TECHNICAL SKILLS',
    'skills.title': 'Technologies & Core Competencies',
    'skills.subtitle': 'A combination of programming languages, modern frameworks, relational databases, and developer tooling.',
    'skills.cat.all': 'All Skills',
    'skills.cat.programming': 'Languages',
    'skills.cat.frontend': 'Frontend',
    'skills.cat.backend': 'Backend',
    'skills.cat.database': 'Database',
    'skills.cat.tools': 'Tools & DevOps',

    // Experience
    'experience.badge': 'JOURNEY & TIMELINE',
    'experience.title': 'Experience & Track Record',
    'experience.subtitle': 'Professional roles, industrial internships, and organizational leadership that developed my technical leadership.',
    'experience.type.work': 'Work Experience',
    'experience.type.internship': 'Internship',
    'experience.type.organization': 'Organization',
    'experience.present': 'Present',

    // Certificates
    'certificates.badge': 'CREDENTIALS & HONORS',
    'certificates.title': 'Official Credentials & Certifications',
    'certificates.subtitle': 'Verified competencies from global technology institutions, specialized courses, and certification boards.',
    'certificates.preview': 'Preview Certificate',
    'certificates.issued': 'Issued',
    'certificates.verified': 'Verified Credential',

    // Contact
    'contact.badge': 'GET IN TOUCH',
    'contact.title': "Let's Connect & Discuss",
    'contact.subtitle': 'Interested in collaborating, discussing project opportunities, or just saying hello? Send a message below.',
    'contact.directInfo': 'Direct Contact Info',
    'contact.directDesc': 'Always open to discussing new software projects, internship opportunities, freelance inquiries, and engineering team roles.',
    'contact.copyEmail': 'Copy Email',
    'contact.emailCopied': 'Email copied!',
    'contact.emailCopiedDesc': 'The email address has been copied to your clipboard.',
    'contact.channels': 'Social Channels:',
    'contact.formTitle': 'Send a Direct Message',
    'contact.formSubtitle': 'Fill out the form below. Your message will be saved securely to our system.',
    'contact.nameLabel': 'Full Name *',
    'contact.emailLabel': 'Email Address *',
    'contact.subjectLabel': 'Subject (Optional)',
    'contact.messageLabel': 'Message *',
    'contact.sendBtn': 'Send Message Now',
    'contact.sendingBtn': 'Sending...',
    'contact.sentSuccess': 'Message Sent Successfully!',
    'contact.sentSuccessDesc': 'Thank you for reaching out. I will review your message and get back to you shortly via email.',
    'contact.sendAnother': 'Send Another Message',

    // Terminal
    'terminal.badge': 'INTERACTIVE DEVELOPER CLI',
    'terminal.title': 'Interactive Terminal',
    'terminal.subtitle': 'Explore my background and technical stack like a developer through a mini command line interface.',
    'terminal.welcome': 'Welcome to Alvin Terminal v1.0. Type "help" to view all available commands.',
    'terminal.placeholder': 'Type a command here (e.g. help, skills, bio)...',

    // Back to top
    'backToTop': 'Back to Top',
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('portfolio_lang')
      return (saved === 'en' || saved === 'id') ? saved : 'id'
    } catch {
      return 'id'
    }
  })

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    try {
      localStorage.setItem('portfolio_lang', lang)
    } catch {
      // ignore
    }
  }

  const toggleLanguage = () => {
    setLanguage(language === 'id' ? 'en' : 'id')
  }

  const t = (key: string): string => {
    return translations[language][key] || translations['id'][key] || key
  }

  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

