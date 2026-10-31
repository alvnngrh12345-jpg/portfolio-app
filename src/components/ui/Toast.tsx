import * as React from 'react'
import { CheckCircle2, AlertCircle, X, Info } from 'lucide-react'
import { cn } from '../../lib/utils'

export type ToastType = 'success' | 'error' | 'info'

export interface ToastItem {
  id: string
  type: ToastType
  title: string
  message?: string
}

interface ToastContextType {
  toast: (item: Omit<ToastItem, 'id'>) => void
  success: (title: string, message?: string) => void
  error: (title: string, message?: string) => void
  info: (title: string, message?: string) => void
}

const ToastContext = React.createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastItem[]>([])

  const removeToast = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const toast = React.useCallback(
    ({ type, title, message }: Omit<ToastItem, 'id'>) => {
      const id = Math.random().toString(36).substring(2, 9)
      setToasts((prev) => [...prev, { id, type, title, message }])
      setTimeout(() => {
        removeToast(id)
      }, 4000)
    },
    [removeToast]
  )

  const success = React.useCallback(
    (title: string, message?: string) => toast({ type: 'success', title, message }),
    [toast]
  )

  const error = React.useCallback(
    (title: string, message?: string) => toast({ type: 'error', title, message }),
    [toast]
  )

  const info = React.useCallback(
    (title: string, message?: string) => toast({ type: 'info', title, message }),
    [toast]
  )

  return (
    <ToastContext.Provider value={{ toast, success, error, info }}>
      {children}
      {/* Toast Render Container */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none p-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={cn(
              'pointer-events-auto flex items-start gap-3 rounded-2xl border p-4 shadow-2xl backdrop-blur-xl transition-all duration-300 animate-in slide-in-from-bottom-5',
              t.type === 'success' && 'border-emerald-800/80 bg-slate-900/95 text-slate-100',
              t.type === 'error' && 'border-rose-800/80 bg-slate-900/95 text-slate-100',
              t.type === 'info' && 'border-indigo-800/80 bg-slate-900/95 text-slate-100'
            )}
          >
            {t.type === 'success' && (
              <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
            )}
            {t.type === 'error' && (
              <AlertCircle className="h-5 w-5 text-rose-400 shrink-0 mt-0.5" />
            )}
            {t.type === 'info' && (
              <Info className="h-5 w-5 text-indigo-400 shrink-0 mt-0.5" />
            )}
            <div className="flex-1 space-y-0.5">
              <h4 className="text-sm font-semibold text-white">{t.title}</h4>
              {t.message && <p className="text-xs text-slate-400">{t.message}</p>}
            </div>
            <button
              onClick={() => removeToast(t.id)}
              className="text-slate-400 hover:text-white p-1 rounded-md transition-colors cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export const useToast = () => {
  const context = React.useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}
