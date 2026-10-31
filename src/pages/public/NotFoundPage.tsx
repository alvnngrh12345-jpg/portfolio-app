import { Link } from 'react-router-dom'
import { Home, ArrowLeft } from 'lucide-react'
import { Button } from '../../components/ui/Button'

export function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#090d16]/75 text-slate-100 px-4 text-center relative z-10">
      <div className="max-w-md space-y-6">
        <h1 className="text-7xl font-black bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">404</h1>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-white">Halaman Tidak Ditemukan</h2>
          <p className="text-sm text-slate-400 font-light">
            Halaman yang Anda tuju mungkin telah dipindahkan atau tautan tidak valid.
          </p>
        </div>
        <div className="flex justify-center gap-3">
          <Link to="/">
            <Button>
              <Home className="h-4 w-4 mr-2" />
              Kembali ke Beranda
            </Button>
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border border-slate-800 bg-slate-900/80 text-slate-300 hover:bg-slate-800 hover:text-white transition-all cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali
          </button>
        </div>
      </div>
    </div>
  )
}
