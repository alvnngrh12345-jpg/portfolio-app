import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ToastProvider } from './components/ui/Toast'
import { LanguageProvider } from './context/LanguageContext'
import { ThemeAccentProvider } from './context/ThemeAccentContext'
import { SoundProvider } from './context/SoundContext'
import { AppRoutes } from './routes/AppRoutes'
import { TechBackground } from './components/common/TechBackground'

export function App() {
  return (
    <BrowserRouter>
      <SoundProvider>
        <ThemeAccentProvider>
          <LanguageProvider>
            <AuthProvider>
              <ToastProvider>
                <div className="relative min-h-screen bg-[#090d16] text-slate-100 selection:bg-indigo-500 selection:text-white transition-colors duration-300">
                  {/* Global Cyber Grid & Dot Matrix Ambient Background across all pages */}
                  <TechBackground />
                  <div className="relative z-10">
                    <AppRoutes />
                  </div>
                </div>
              </ToastProvider>
            </AuthProvider>
          </LanguageProvider>
        </ThemeAccentProvider>
      </SoundProvider>
    </BrowserRouter>
  )
}

export default App
