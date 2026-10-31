import { useState, useRef, useEffect } from 'react'
import { Terminal as TerminalIcon, Sparkles, CornerDownLeft, Trash2 } from 'lucide-react'
import { SectionTitle } from '../common/SectionTitle'
import { SpotlightCard } from '../common/SpotlightCard'
import { useLanguage } from '../../context/LanguageContext'
import { ALVIN_WA_URL, ALVIN_LINKEDIN_URL } from '../../constants/contact'
import { useSound } from '../../context/SoundContext'

interface CommandHistory {
  command: string
  output: string | React.ReactNode
}

export function InteractiveTerminal() {
  const { t, language } = useLanguage()
  const { playKeyStroke, playTerminalExec, playClick } = useSound()
  const [inputVal, setInputVal] = useState('')
  const [history, setHistory] = useState<CommandHistory[]>([
    {
      command: 'welcome',
      output: (
        <div className="space-y-1 text-slate-300">
          <p className="text-emerald-400 font-bold">
            Alvin OS v1.0.4 (x86_64-pc-portfolio)
          </p>
          <p className="text-slate-400">
            {language === 'id'
              ? 'Selamat datang di Interactive Terminal Alvin Nugraha! Ketik "help" atau klik tombol perintah di bawah.'
              : 'Welcome to Alvin Nugraha\'s Interactive Terminal! Type "help" or click the quick command buttons below.'}
          </p>
        </div>
      ),
    },
  ])

  const terminalBodyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Only scroll the terminal inner content, NOT the whole browser window
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight
    }
  }, [history])

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase()
    if (!trimmed) return

    playTerminalExec()
    let output: string | React.ReactNode = ''

    switch (trimmed) {
      case 'help':
        output = (
          <div className="space-y-1.5 text-xs">
            <p className="text-indigo-400 font-bold">
              {language === 'id' ? 'DAFTAR PERINTAH YANG TERSEDIA:' : 'AVAILABLE COMMANDS:'}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-slate-300">
              <div><span className="text-emerald-400 font-bold">bio</span> - {language === 'id' ? 'Tentang diri Alvin & spesialisasi' : 'About Alvin & specialization'}</div>
              <div><span className="text-emerald-400 font-bold">skills</span> - {language === 'id' ? 'Daftar teknologi & toolstack' : 'Technical stack & competencies'}</div>
              <div><span className="text-emerald-400 font-bold">education</span> - {language === 'id' ? 'Riwayat kampus & IPK' : 'Academic history & GPA'}</div>
              <div><span className="text-emerald-400 font-bold">experience</span> - {language === 'id' ? 'Pengalaman magang & organisasi' : 'Work & organization experience'}</div>
              <div><span className="text-emerald-400 font-bold">contact</span> - {language === 'id' ? 'Informasi email & WhatsApp' : 'Email, WhatsApp & social info'}</div>
              <div><span className="text-emerald-400 font-bold">date</span> - {language === 'id' ? 'Waktu & tanggal lokal WIB' : 'Local WIB date & time'}</div>
              <div><span className="text-emerald-400 font-bold">clear</span> - {language === 'id' ? 'Membersihkan layar terminal' : 'Clear terminal output'}</div>
              <div><span className="text-emerald-400 font-bold">sudo</span> - {language === 'id' ? 'Akses administrator' : 'Superuser privilege check'}</div>
            </div>
          </div>
        )
        break

      case 'bio':
      case 'about':
        output = (
          <div className="space-y-1 text-slate-300">
            <p className="font-bold text-white">Alvin Nugraha — Full-Stack Developer & Informatics Student</p>
            <p className="text-slate-400">
              {language === 'id'
                ? 'Mahasiswa Sistem Informasi yang berfokus menjembatani kebutuhan bisnis dengan arsitektur teknologi terukur. Mahir dalam React, TypeScript, Node.js, perancangan database relasional, dan otomatisasi proses.'
                : 'Information Systems student specializing in bridging operational business needs with scalable technology. Proficient in React, TypeScript, Node.js, relational database architecture, and API integration.'}
            </p>
          </div>
        )
        break

      case 'skills':
        output = (
          <div className="space-y-1.5 text-xs text-slate-300">
            <p><span className="text-indigo-400 font-bold">• Languages:</span> TypeScript, JavaScript, SQL, Python, PHP, HTML5, CSS3</p>
            <p><span className="text-purple-400 font-bold">• Frontend:</span> React.js, Tailwind CSS, Vite, Redux, Responsive UI/UX</p>
            <p><span className="text-emerald-400 font-bold">• Backend:</span> Node.js, Express, REST APIs, Supabase, PostgreSQL, MySQL</p>
            <p><span className="text-amber-400 font-bold">• Tools & DevOps:</span> Git, GitHub, Docker, Postman, Linux CLI, Vercel</p>
          </div>
        )
        break

      case 'education':
        output = (
          <div className="space-y-1 text-xs text-slate-300">
            <p className="font-bold text-white">Universitas / Perguruan Tinggi</p>
            <p className="text-indigo-400">S1 Sistem Informasi (GPA: 3.82 / 4.00)</p>
            <p className="text-slate-400">{language === 'id' ? 'Aktif dalam proyek riset rekayasa perangkat lunak dan arsitektur database.' : 'Active in software engineering research and database architecture.'}</p>
          </div>
        )
        break

      case 'experience':
        output = (
          <div className="space-y-1.5 text-xs text-slate-300">
            <p><span className="text-emerald-400 font-bold">[Internship]</span> Web Developer Intern — Membangun fitur dashboard internal & optimasi query.</p>
            <p><span className="text-indigo-400 font-bold">[Organization]</span> Divisi Litbang IT — Mengoordinasi pelatihan pemrograman & workshop web.</p>
          </div>
        )
        break

      case 'contact':
        output = (
          <div className="space-y-1 text-xs text-slate-300">
            <p><span className="text-slate-400">Email:</span> <span className="text-indigo-300">alvinnugraha92@gmail.com</span></p>
            <p><span className="text-slate-400">WhatsApp:</span> <a href={ALVIN_WA_URL} target="_blank" rel="noopener noreferrer" className="text-emerald-400 underline">+62 877-1670-1824</a></p>
            <p><span className="text-slate-400">LinkedIn:</span> <a href={ALVIN_LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">Alvin ngrh</a></p>
            <p><span className="text-slate-400">Instagram:</span> <a href="https://instagram.com/alvnngrhh" target="_blank" rel="noopener noreferrer" className="text-pink-400 underline">@alvnngrhh</a></p>
            <p><span className="text-slate-400">Lokasi:</span> Bekasi, Jawa Barat, Indonesia</p>
          </div>
        )
        break

      case 'date':
        output = (
          <p className="text-xs text-amber-300 font-mono">
            {new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })} WIB
          </p>
        )
        break

      case 'sudo':
        output = (
          <p className="text-xs text-rose-400 font-mono font-semibold">
            guest is not in the sudoers file. This incident will be reported to Alvin! 🚨
          </p>
        )
        break

      case 'clear':
        setHistory([])
        setInputVal('')
        return

      default:
        output = (
          <p className="text-xs text-rose-400">
            zsh: command not found: <span className="font-bold">{trimmed}</span>. Type <span className="text-emerald-400 font-bold underline cursor-pointer" onClick={() => handleCommand('help')}>"help"</span> to view valid commands.
          </p>
        )
        break
    }

    setHistory((prev) => [...prev, { command: cmd, output }])
    setInputVal('')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleCommand(inputVal)
  }

  const quickCommands = ['help', 'skills', 'bio', 'contact', 'date', 'clear']

  return (
    <section id="terminal" className="py-20 sm:py-28 bg-transparent border-t border-slate-800/60 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          badge={t('terminal.badge')}
          title={t('terminal.title')}
          subtitle={t('terminal.subtitle')}
        />

        {/* Terminal Window Frame with Cursor Spotlight Glow */}
        <SpotlightCard
          data-aos="zoom-in"
          className="widget-interactive rounded-2xl sm:rounded-3xl border border-slate-800/90 bg-[#070b13]/95 shadow-2xl overflow-hidden backdrop-blur-xl"
        >
          {/* Terminal Title Bar */}
          <div className="flex items-center justify-between px-4 sm:px-5 py-3 border-b border-slate-800 bg-slate-900/80 select-none">
            {/* macOS Window Control Dots */}
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-rose-500/80 inline-block" />
              <span className="h-3 w-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="h-3 w-3 rounded-full bg-emerald-500/80 inline-block" />
            </div>

            {/* Window Title */}
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400 font-semibold">
              <TerminalIcon className="h-3.5 w-3.5 text-indigo-400" />
              <span>alvin@portfolio: ~ (zsh)</span>
            </div>

            {/* Clear Button */}
            <button
              type="button"
              onClick={() => {
                playClick()
                setHistory([])
              }}
              className="text-slate-500 hover:text-slate-300 p-1 transition-colors cursor-pointer"
              title="Clear terminal"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Quick Command Pills */}
          <div className="px-4 sm:px-6 pt-3 pb-2 flex flex-wrap items-center gap-1.5 border-b border-slate-800/50 bg-slate-950/40">
            <span className="text-[11px] font-mono text-slate-500 mr-1 flex items-center gap-1">
              <Sparkles className="h-3 w-3 text-indigo-400" />
              Quick:
            </span>
            {quickCommands.map((cmd) => (
              <button
                key={cmd}
                type="button"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  handleCommand(cmd)
                }}
                className="px-2.5 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-300 hover:text-white hover:border-indigo-500/60 hover:bg-indigo-950/40 active:scale-95 transition-all cursor-pointer select-none"
              >
                ${cmd}
              </button>
            ))}
          </div>

          {/* Terminal Screen Body */}
          <div
            ref={terminalBodyRef}
            className="p-4 sm:p-6 font-mono text-xs sm:text-sm max-h-[360px] overflow-y-auto space-y-3.5 scroll-smooth"
          >
            {history.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center gap-2 text-slate-400">
                  <span className="text-emerald-400 font-bold">guest@alvin:~$</span>
                  <span className="text-white font-semibold">{item.command}</span>
                </div>
                <div className="pl-4 border-l border-slate-800/80 text-slate-300">
                  {item.output}
                </div>
              </div>
            ))}
          </div>

          {/* Terminal Command Input Form */}
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 px-4 sm:px-6 py-3 border-t border-slate-800 bg-slate-950/80"
          >
            <span className="text-emerald-400 font-mono font-bold text-xs sm:text-sm shrink-0">
              guest@alvin:~$
            </span>
            <input
              type="text"
              value={inputVal}
              onChange={(e) => {
                setInputVal(e.target.value)
                playKeyStroke()
              }}
              placeholder={t('terminal.placeholder')}
              className="flex-1 bg-transparent text-xs sm:text-sm font-mono text-white placeholder-slate-600 focus:outline-hidden"
              autoComplete="off"
              spellCheck="false"
            />
            <button
              type="submit"
              className="p-1.5 rounded-lg bg-indigo-600/80 text-white hover:bg-indigo-500 transition-colors cursor-pointer"
              aria-label="Execute command"
            >
              <CornerDownLeft className="h-3.5 w-3.5" />
            </button>
          </form>
        </SpotlightCard>
      </div>
    </section>
  )
}

