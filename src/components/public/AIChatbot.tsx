import { useState, useRef, useEffect } from 'react'
import {
  Bot,
  X,
  Send,
  Sparkles,
  RotateCcw,
  ExternalLink,
  User,
} from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'
import { ALVIN_WA_URL, ALVIN_LINKEDIN_URL } from '../../constants/contact'
import { useSound } from '../../context/SoundContext'

interface ChatMessage {
  id: string
  sender: 'ai' | 'user'
  text: string
  time: string
  actionUrl?: string
  actionLabel?: string
}

interface QuickPrompt {
  id: string
  labelId: string
  labelEn: string
  queryId: string
  queryEn: string
}

const QUICK_PROMPTS: QuickPrompt[] = [
  {
    id: 'skills',
    labelId: '🛠️ Keahlian Alvin',
    labelEn: '🛠️ Alvin’s Skills',
    queryId: 'Apa keahlian dan teknologi utama yang dikuasai Alvin?',
    queryEn: 'What are Alvin’s main skills and technologies?',
  },
  {
    id: 'education',
    labelId: '🎓 Kampus & IPK',
    labelEn: '🎓 Education & GPA',
    queryId: 'Alvin kuliah di mana dan berapa nilai IPK-nya?',
    queryEn: 'Where does Alvin study and what is his GPA?',
  },
  {
    id: 'internship',
    labelId: '💼 Ketersediaan Magang / Kerja',
    labelEn: '💼 Internship Availability',
    queryId: 'Apakah Alvin saat ini bersedia untuk magang atau tawaran kerja?',
    queryEn: 'Is Alvin available for an internship or job offer?',
  },
  {
    id: 'projects',
    labelId: '🚀 Proyek Terbaik',
    labelEn: '🚀 Top Projects',
    queryId: 'Proyek apa saja yang sudah pernah dibuat oleh Alvin?',
    queryEn: 'What projects has Alvin built so far?',
  },
  {
    id: 'contact',
    labelId: '📱 Hubungi Alvin Sekarang',
    labelEn: '📱 Contact Alvin',
    queryId: 'Bagaimana cara langsung menghubungi atau wawancara dengan Alvin?',
    queryEn: 'How can I contact or schedule an interview with Alvin?',
  },
]

export function AIChatbot() {
  const { language } = useLanguage()
  const { playAiSend, playAiReceive, playClick } = useSound()
  const isId = language === 'id'

  const [isOpen, setIsOpen] = useState(false)
  const [unreadBadge, setUnreadBadge] = useState(true)
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)

  const initialGreeting: ChatMessage = {
    id: 'init-msg',
    sender: 'ai',
    text: isId
      ? 'Halo! 👋 Saya **Tanya Alvin AI**, asisten cerdas portofolio Alvin Nugraha. Ada yang bisa saya bantu tentang keahlian, riwayat pendidikan, atau ketersediaan magang Alvin?'
      : "Hello! 👋 I'm **Ask Alvin AI**, Alvin Nugraha's portfolio assistant. How can I help you regarding Alvin's skills, education, or internship availability?",
    time: getLocalTimeString(),
  }

  const [messages, setMessages] = useState<ChatMessage[]>([initialGreeting])

  function getLocalTimeString() {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  // Scroll to bottom smoothly when new message or typing starts
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isTyping, isOpen])

  const handleOpen = () => {
    playClick()
    setIsOpen(true)
    setUnreadBadge(false)
  }

  const handleReset = () => {
    playClick()
    setMessages([
      {
        id: Date.now().toString(),
        sender: 'ai',
        text: isId
          ? 'Riwayat obrolan telah dibersihkan. Silakan pilih topik di bawah atau ketik pertanyaan Anda!'
          : 'Chat history has been cleared. Pick a topic below or type your question!',
        time: getLocalTimeString(),
      },
    ])
  }

  const generateAnswer = (query: string): { text: string; actionUrl?: string; actionLabel?: string } => {
    const q = query.toLowerCase()

    // LinkedIn Profile
    if (q.includes('linkedin')) {
      return {
        text: isId
          ? 'Anda dapat terhubung dengan akun LinkedIn profesional Alvin (**Alvin ngrh**). Silakan klik tombol di bawah untuk membuka profilnya!'
          : 'You can connect with Alvin on his professional LinkedIn account (**Alvin ngrh**). Click the button below to view his profile!',
        actionUrl: ALVIN_LINKEDIN_URL,
        actionLabel: isId ? 'Buka Profil LinkedIn 💼' : 'View LinkedIn Profile 💼',
      }
    }

    // 1. WhatsApp / Contact / Wawancara / Interview
    if (
      q.includes('kontak') ||
      q.includes('hubungi') ||
      q.includes('contact') ||
      q.includes('wa') ||
      q.includes('whatsapp') ||
      q.includes('interview') ||
      q.includes('wawancara') ||
      q.includes('email') ||
      q.includes('nomor')
    ) {
      return {
        text: isId
          ? 'Anda dapat menghubungi Alvin secara langsung melalui **WhatsApp** di `087716701824` atau via email di `alvin.nugraha.dev@gmail.com`. Alvin sangat responsif dan siap berdiskusi!'
          : 'You can contact Alvin directly on **WhatsApp** at `087716701824` or via email at `alvin.nugraha.dev@gmail.com`. Alvin is highly responsive and ready to connect!',
        actionUrl: ALVIN_WA_URL,
        actionLabel: isId ? 'Kirim Pesan WhatsApp 🚀' : 'Chat on WhatsApp 🚀',
      }
    }

    // 2. Education / Kampus / Kuliah / IPK / University
    if (
      q.includes('kuliah') ||
      q.includes('kampus') ||
      q.includes('universitas') ||
      q.includes('ipk') ||
      q.includes('gpa') ||
      q.includes('pendidikan') ||
      q.includes('study') ||
      q.includes('education') ||
      q.includes('jurusan')
    ) {
      return {
        text: isId
          ? '🎓 Alvin sedang menempuh studi **S1 Sistem Informasi** di **Universitas Pelita Bangsa** dengan indeks prestasi kumulatif (**IPK**) memukau yaitu **3.82 / 4.00**. Alvin juga merupakan penerima Beasiswa Prestasi Akademik.'
          : '🎓 Alvin is currently pursuing a Bachelor’s degree in **Information Systems** at **Pelita Bangsa University** with an outstanding **GPA of 3.82 / 4.00**, and is a recipient of an Academic Merit Scholarship.',
        actionUrl: '#experience',
        actionLabel: isId ? 'Lihat Riwayat Pendidikan 📜' : 'View Education History 📜',
      }
    }

    // 3. Skills / Tech Stack / Bahasa Pemrograman / Framework
    if (
      q.includes('skill') ||
      q.includes('keahlian') ||
      q.includes('teknologi') ||
      q.includes('tech') ||
      q.includes('stack') ||
      q.includes('bahasa') ||
      q.includes('react') ||
      q.includes('typescript') ||
      q.includes('node')
    ) {
      return {
        text: isId
          ? '🛠️ **Tech Stack & Keahlian Utama Alvin:**\n\n' +
            '• **Frontend:** React.js, TypeScript, Tailwind CSS, Vite, HTML5/CSS3\n' +
            '• **Backend & DB:** Node.js, Express, Supabase, PostgreSQL, REST APIs\n' +
            '• **Tools & Workflow:** Git, GitHub, Postman, Vercel, Responsive UI/UX Design.'
          : '🛠️ **Alvin’s Core Tech Stack & Skills:**\n\n' +
            '• **Frontend:** React.js, TypeScript, Tailwind CSS, Vite, HTML5/CSS3\n' +
            '• **Backend & DB:** Node.js, Express, Supabase, PostgreSQL, REST APIs\n' +
            '• **Tools & Workflow:** Git, GitHub, Postman, Vercel, Responsive UI/UX Design.',
        actionUrl: '#skills',
        actionLabel: isId ? 'Lihat Semua Skill 💻' : 'Browse All Skills 💻',
      }
    }

    // 4. Internship / Availability / Magang / Freelance / Rekrutmen
    if (
      q.includes('magang') ||
      q.includes('intern') ||
      q.includes('kerja') ||
      q.includes('hire') ||
      q.includes('freelance') ||
      q.includes('available') ||
      q.includes('ketersediaan') ||
      q.includes('rekrut')
    ) {
      return {
        text: isId
          ? '✅ **Status: Tersedia (Available)!**\nAlvin sangat terbuka dan antusias untuk posisi **Magang (Internship)**, **Junior Web Developer**, maupun proyek freelance. Siap berkontribusi secara on-site di area Jabodetabek atau secara remote.'
          : '✅ **Status: Available!**\nAlvin is actively open and enthusiastic for **Internship opportunities**, **Junior Web Developer** positions, and freelance projects. Ready for on-site (Greater Jakarta) or remote work.',
        actionUrl: ALVIN_WA_URL,
        actionLabel: isId ? 'Ajak Wawancara via WA 💼' : 'Schedule Interview on WA 💼',
      }
    }

    // 5. Projects / Karya / Portofolio
    if (
      q.includes('proyek') ||
      q.includes('project') ||
      q.includes('karya') ||
      q.includes('portfolio') ||
      q.includes('buat')
    ) {
      return {
        text: isId
          ? '🚀 Alvin telah membangun beberapa proyek web mutakhir, seperti:\n\n' +
            '1. **Modern Developer Portfolio App** (Full-Stack React + Vite + Supabase + Tailwind)\n' +
            '2. **Sistem E-Commerce & Kasir (POS)** dengan dashboard analitik dan manajemen inventaris\n' +
            '3. **Aplikasi Manajemen Tugas Real-time** dengan otentikasi aman.'
          : '🚀 Alvin has built several modern web applications, including:\n\n' +
            '1. **Modern Developer Portfolio App** (Full-Stack React + Vite + Supabase + Tailwind)\n' +
            '2. **E-Commerce & Point of Sale (POS)** system with analytics dashboard\n' +
            '3. **Real-time Task Management App** with secure authentication.',
        actionUrl: '#projects',
        actionLabel: isId ? 'Jelajahi Portofolio Proyek 📁' : 'Explore Portfolio Projects 📁',
      }
    }

    // 6. CV / Resume / Sertifikat
    if (q.includes('cv') || q.includes('resume') || q.includes('sertifikat') || q.includes('certificate')) {
      return {
        text: isId
          ? '📄 Alvin memiliki Curriculum Vitae (CV) terstruktur rapi beserta sertifikasi keahlian terverifikasi di Dicoding, HackerRank, dan lembaga kredibel lainnya.'
          : '📄 Alvin maintains an up-to-date Curriculum Vitae (CV) along with verified certifications from Dicoding, HackerRank, and accredited academies.',
        actionUrl: '#certificates',
        actionLabel: isId ? 'Lihat Sertifikat 🏆' : 'View Certificates 🏆',
      }
    }

    // 7. Lokasi / Domisili / Location
    if (q.includes('lokasi') || q.includes('domisili') || q.includes('tinggal') || q.includes('dimana') || q.includes('location')) {
      return {
        text: isId
          ? '📍 Alvin berdomisili di **Bekasi / Cikarang, Jawa Barat, Indonesia**. Terbuka untuk relokasi atau bekerja secara hybrid/remote.'
          : '📍 Alvin is based in **Bekasi / Cikarang, West Java, Indonesia**. Open to hybrid, on-site, or remote work arrangements.',
        actionUrl: ALVIN_WA_URL,
        actionLabel: isId ? 'Tanya Alvin di WA 💬' : 'Ask Alvin on WA 💬',
      }
    }

    // Default Fallback
    return {
      text: isId
        ? `Terima kasih pertanyaannya! Alvin adalah mahasiswa Sistem Informasi & Web Developer berbakat dengan IPK 3.82. Untuk pertanyaan spesifik mengenai "${query}", Anda dapat langsung mengobrol dengan Alvin secara pribadi!`
        : `Thank you for your question! Alvin is a passionate Information Systems student & Web Developer with a 3.82 GPA. For detailed inquiries regarding "${query}", feel free to chat with Alvin directly!`,
      actionUrl: ALVIN_WA_URL,
      actionLabel: isId ? 'Hubungi Alvin di WhatsApp 💬' : 'Connect on WhatsApp 💬',
    }
  }

  const handleSendMessage = (textToSend?: string) => {
    const raw = textToSend !== undefined ? textToSend : inputValue
    if (!raw.trim()) return

    playAiSend()

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: raw.trim(),
      time: getLocalTimeString(),
    }

    setMessages((prev) => [...prev, userMessage])
    if (textToSend === undefined) {
      setInputValue('')
    }
    setIsTyping(true)

    // Simulate natural AI thinking delay (550ms - 800ms)
    setTimeout(() => {
      const response = generateAnswer(raw.trim())
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: response.text,
        time: getLocalTimeString(),
        actionUrl: response.actionUrl,
        actionLabel: response.actionLabel,
      }
      setMessages((prev) => [...prev, aiMessage])
      setIsTyping(false)
      playAiReceive()
    }, 650)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Floating Trigger Button (Bottom Right, slightly to the left of Back to Top or neat stack) */}
      <div className="fixed bottom-4 right-17 sm:bottom-6 sm:right-22 z-40">
        <button
          type="button"
          onClick={() => (isOpen ? setIsOpen(false) : handleOpen())}
          className="relative group flex items-center gap-2.5 px-3.5 py-3 rounded-full bg-slate-900/90 hover:bg-slate-800 border border-indigo-500/40 hover:border-indigo-400 text-white shadow-xl shadow-indigo-950/60 backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
          aria-label="Tanya Alvin AI Chatbot"
        >
          {/* Animated Glow Halo */}
          <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 opacity-40 blur-sm group-hover:opacity-75 transition-opacity" />

          {/* Button Content */}
          <span className="relative flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 text-white shadow-md">
              <Bot className="h-4.5 w-4.5 animate-pulse" />
            </span>
            <span className="hidden md:inline-block text-xs font-bold text-white tracking-wide">
              {isId ? 'Tanya Alvin AI' : 'Ask Alvin AI'}
            </span>
            <Sparkles className="h-3.5 w-3.5 text-indigo-300 hidden md:inline-block" />
          </span>

          {/* Unread notification ping */}
          {unreadBadge && (
            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-slate-950" />
            </span>
          )}
        </button>
      </div>

      {/* Chat Dialog Window */}
      {isOpen && (
        <div
          ref={chatContainerRef}
          className="fixed bottom-20 right-4 sm:right-6 w-[calc(100vw-2rem)] sm:w-[410px] h-[540px] max-h-[82vh] rounded-3xl bg-[#090d16]/95 border border-slate-800 backdrop-blur-2xl shadow-2xl shadow-black/90 z-50 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3.5 border-b border-slate-800/80 bg-slate-900/60">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-600/30">
                  <Bot className="h-5 w-5" />
                </div>
                {/* Active Online Indicator */}
                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-500 border-2 border-slate-900" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-1.5 leading-tight">
                  <span>{isId ? 'Tanya Alvin AI' : 'Ask Alvin AI'}</span>
                  <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    Portfolio Bot
                  </span>
                </h3>
                <p className="text-[11px] text-emerald-400 font-medium leading-tight flex items-center gap-1 mt-0.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {isId ? 'Online & Siap Menjawab' : 'Online & Ready'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleReset}
                className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors cursor-pointer"
                title={isId ? 'Bersihkan Chat' : 'Clear Chat'}
              >
                <RotateCcw className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => {
                  playClick()
                  setIsOpen(false)
                }}
                className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors cursor-pointer"
                title={isId ? 'Tutup Obrolan' : 'Close Chat'}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 scrollbar-thin">
            {messages.map((msg) => {
              const isAi = msg.sender === 'ai'
              return (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2.5 ${isAi ? 'justify-start' : 'justify-end'}`}
                >
                  {isAi && (
                    <div className="flex-shrink-0 w-7 h-7 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-sm mt-0.5">
                      <Bot className="h-3.5 w-3.5" />
                    </div>
                  )}

                  <div className={`max-w-[82%] space-y-1.5 ${isAi ? 'items-start' : 'items-end'}`}>
                    <div
                      className={`p-3.5 rounded-2xl text-xs leading-relaxed whitespace-pre-wrap break-words ${
                        isAi
                          ? 'bg-slate-900/90 text-slate-200 border border-slate-800 rounded-tl-sm shadow-sm'
                          : 'bg-indigo-600 text-white rounded-tr-sm shadow-md shadow-indigo-600/30'
                      }`}
                    >
                      {msg.text}

                      {/* Interactive CTA button inside message */}
                      {msg.actionUrl && (
                        <div className="mt-2.5 pt-2 border-t border-slate-700/60">
                          <a
                            href={msg.actionUrl}
                            target={msg.actionUrl.startsWith('http') ? '_blank' : '_self'}
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 hover:text-white border border-indigo-500/40 text-[11px] font-bold transition-all"
                          >
                            <span>{msg.actionLabel || (isId ? 'Buka Link' : 'Open Link')}</span>
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </div>
                      )}
                    </div>

                    <p
                      className={`text-[10px] text-slate-500 px-1 ${
                        isAi ? 'text-left' : 'text-right'
                      }`}
                    >
                      {msg.time}
                    </p>
                  </div>

                  {!isAi && (
                    <div className="flex-shrink-0 w-7 h-7 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 mt-0.5">
                      <User className="h-3.5 w-3.5" />
                    </div>
                  )}
                </div>
              )
            })}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-start gap-2.5">
                <div className="flex-shrink-0 w-7 h-7 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-sm mt-0.5">
                  <Bot className="h-3.5 w-3.5" />
                </div>
                <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800 rounded-tl-sm flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce" />
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce"
                    style={{ animationDelay: '150ms' }}
                  />
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce"
                    style={{ animationDelay: '300ms' }}
                  />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Chips Bar */}
          <div className="px-3.5 py-2 border-t border-slate-800/60 bg-slate-950/40">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5 flex items-center gap-1">
              <Sparkles className="h-3 w-3 text-indigo-400" />
              <span>{isId ? 'Pertanyaan Populer' : 'Quick Questions'}</span>
            </p>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
              {QUICK_PROMPTS.map((qp) => (
                <button
                  key={qp.id}
                  type="button"
                  onClick={() => {
                    playClick()
                    handleSendMessage(isId ? qp.queryId : qp.queryEn)
                  }}
                  className="flex-shrink-0 px-2.5 py-1 rounded-full bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-indigo-500/50 text-[11px] font-medium text-slate-300 hover:text-white transition-all cursor-pointer whitespace-nowrap"
                >
                  {isId ? qp.labelId : qp.labelEn}
                </button>
              ))}
            </div>
          </div>

          {/* Message Input Box */}
          <div className="p-3 border-t border-slate-800/80 bg-slate-900/60">
            <div className="flex items-center gap-2 rounded-2xl bg-slate-950/80 border border-slate-800 focus-within:border-indigo-500/70 focus-within:ring-1 focus-within:ring-indigo-500/50 px-3 py-1.5 transition-all">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={
                  isId
                    ? 'Ketik pertanyaan untuk Alvin AI...'
                    : 'Ask anything about Alvin...'
                }
                className="flex-1 bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none py-1.5"
              />
              <button
                type="button"
                onClick={() => handleSendMessage()}
                disabled={!inputValue.trim()}
                className={`p-2 rounded-xl transition-all cursor-pointer ${
                  inputValue.trim()
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/40 hover:bg-indigo-500'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed opacity-50'
                }`}
                aria-label="Kirim Pesan"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
