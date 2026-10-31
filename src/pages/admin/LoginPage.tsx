import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { Eye, EyeOff, Lock, Mail, ArrowLeft, Shield } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'
import { useToast } from '../../components/ui/Toast'
import { isSupabaseConfigured } from '../../lib/supabase'

export function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { signIn, isAuthenticated } = useAuth()
  const { error: toastError, success: toastSuccess } = useToast()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const from = (location.state as any)?.from?.pathname || '/admin'

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true })
    }
  }, [isAuthenticated, navigate, from])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage(null)

    if (!email.trim()) {
      setErrorMessage('Silakan masukkan alamat email')
      return
    }
    if (!password.trim()) {
      setErrorMessage('Silakan masukkan kata sandi')
      return
    }

    setIsLoading(true)
    try {
      const { error } = await signIn(email, password)
      if (error) {
        setErrorMessage(error.message || 'Email atau kata sandi tidak valid')
        toastError('Login Gagal', error.message)
      } else {
        toastSuccess('Selamat Datang!', 'Autentikasi admin berhasil.')
        navigate(from, { replace: true })
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Terjadi kesalahan sistem saat login')
      toastError('Kesalahan', err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#090d16]/75 px-4 py-12 relative overflow-hidden text-slate-100">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Back to Website Pill */}
      <Link
        to="/"
        className="absolute top-6 left-6 inline-flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-900/80 border border-slate-800 px-4 py-2 rounded-xl backdrop-blur-md shadow-lg transition-all hover:-translate-y-0.5 z-20"
      >
        <ArrowLeft className="h-4 w-4" />
        Kembali ke Portfolio
      </Link>

      <div className="w-full max-w-md space-y-6 relative z-10">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white shadow-xl shadow-indigo-600/40">
            <Shield className="h-7 w-7" />
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-white">
            Admin Portal
          </h1>
          <p className="text-xs text-slate-400 font-light">
            Login terotentikasi untuk mengelola konten portfolio dinamis.
          </p>
          {!isSupabaseConfigured() && (
            <div className="p-3 bg-amber-950/60 border border-amber-800/80 rounded-xl text-[11px] text-amber-300 text-left">
              <strong>Info Pengembang:</strong> Mode demo aktif: Anda dapat login menggunakan email apapun dan password minimal 6 karakter.
            </div>
          )}
        </div>

        {/* Login Card */}
        <div className="rounded-3xl border border-slate-800/80 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            {errorMessage && (
              <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-800/80 text-xs font-medium text-rose-300 animate-in fade-in">
                {errorMessage}
              </div>
            )}

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                Email Admin
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Mail className="h-4 w-4" />
                </div>
                <Input
                  type="email"
                  placeholder="admin@example.com"
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                Kata Sandi
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Lock className="h-4 w-4" />
                </div>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="pl-10 pr-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              size="lg"
              isLoading={isLoading}
              className="w-full mt-2 cursor-pointer shadow-xl shadow-indigo-600/30"
            >
              Masuk ke Dashboard
            </Button>
          </form>
        </div>

        <p className="text-center text-xs text-slate-500">
          Dilindungi oleh Supabase Row Level Security & Encryption
        </p>
      </div>
    </div>
  )
}
