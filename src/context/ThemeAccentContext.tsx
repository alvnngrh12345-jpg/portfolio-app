import React, { createContext, useContext, useEffect, useState } from 'react'

export type ThemeAccent = 'indigo' | 'emerald' | 'cyan' | 'rose' | 'amber'

export interface AccentOption {
  id: ThemeAccent
  name: string
  label: string
  colorHex: string
  badgeClass: string
  ringClass: string
  gradientClass: string
}

export const ACCENT_OPTIONS: AccentOption[] = [
  {
    id: 'indigo',
    name: 'Indigo Cyber',
    label: 'Default Cyberpunk Indigo',
    colorHex: '#6366f1',
    badgeClass: 'bg-indigo-500',
    ringClass: 'ring-indigo-500',
    gradientClass: 'from-indigo-600 to-purple-600',
  },
  {
    id: 'emerald',
    name: 'Emerald Neon',
    label: 'Hacker / Matrix Green',
    colorHex: '#10b981',
    badgeClass: 'bg-emerald-500',
    ringClass: 'ring-emerald-500',
    gradientClass: 'from-emerald-500 to-teal-600',
  },
  {
    id: 'cyan',
    name: 'Electric Cyan',
    label: 'Tech Modern Blue',
    colorHex: '#06b6d4',
    badgeClass: 'bg-cyan-500',
    ringClass: 'ring-cyan-500',
    gradientClass: 'from-cyan-500 to-blue-600',
  },
  {
    id: 'rose',
    name: 'Rose Punk',
    label: 'Futuristic Neon Pink',
    colorHex: '#f43f5e',
    badgeClass: 'bg-rose-500',
    ringClass: 'ring-rose-500',
    gradientClass: 'from-rose-500 to-pink-600',
  },
  {
    id: 'amber',
    name: 'Amber Sunset',
    label: 'Warm Golden Glow',
    colorHex: '#f59e0b',
    badgeClass: 'bg-amber-500',
    ringClass: 'ring-amber-500',
    gradientClass: 'from-amber-500 to-orange-600',
  },
]

interface ThemeAccentContextType {
  accent: ThemeAccent
  setAccent: (accent: ThemeAccent) => void
  currentOption: AccentOption
}

const ThemeAccentContext = createContext<ThemeAccentContextType | undefined>(undefined)

const STORAGE_KEY = 'alvin_theme_accent'

export function ThemeAccentProvider({ children }: { children: React.ReactNode }) {
  const [accent, setAccentState] = useState<ThemeAccent>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY) as ThemeAccent
      if (saved && ACCENT_OPTIONS.some((o) => o.id === saved)) {
        return saved
      }
    }
    return 'indigo'
  })

  const setAccent = (newAccent: ThemeAccent) => {
    setAccentState(newAccent)
    try {
      localStorage.setItem(STORAGE_KEY, newAccent)
    } catch {
      // ignore
    }
  }

  useEffect(() => {
    const root = document.documentElement
    root.setAttribute('data-accent', accent)
  }, [accent])

  const currentOption = ACCENT_OPTIONS.find((o) => o.id === accent) || ACCENT_OPTIONS[0]

  return (
    <ThemeAccentContext.Provider value={{ accent, setAccent, currentOption }}>
      {children}
    </ThemeAccentContext.Provider>
  )
}

export function useThemeAccent() {
  const context = useContext(ThemeAccentContext)
  if (!context) {
    throw new Error('useThemeAccent must be used within a ThemeAccentProvider')
  }
  return context
}

