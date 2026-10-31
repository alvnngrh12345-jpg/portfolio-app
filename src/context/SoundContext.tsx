import React, { createContext, useContext, useState } from 'react'
import { soundFx } from '../lib/soundFx'

interface SoundContextType {
  isMuted: boolean
  toggleMute: () => void
  playClick: () => void
  playKeyStroke: () => void
  playThemeChange: () => void
  playAiSend: () => void
  playAiReceive: () => void
  playTerminalExec: () => void
  playScrollTop: () => void
}

const SoundContext = createContext<SoundContextType | undefined>(undefined)

const STORAGE_KEY = 'alvin_sound_muted'

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [isMuted, setIsMuted] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved !== null) {
        return saved === 'true'
      }
    }
    // Default to unmuted so futuristic sounds are immediately active
    return false
  })

  const toggleMute = () => {
    setIsMuted((prev) => {
      const next = !prev
      try {
        localStorage.setItem(STORAGE_KEY, String(next))
      } catch {
        // ignore
      }
      // If unmuting, play a small confirmation chirp
      if (!next) {
        soundFx.toggleMute(true)
      } else {
        soundFx.toggleMute(false)
      }
      return next
    })
  }

  const playClick = () => {
    if (isMuted) return
    soundFx.click()
  }

  const playKeyStroke = () => {
    if (isMuted) return
    soundFx.keyStroke()
  }

  const playThemeChange = () => {
    if (isMuted) return
    soundFx.themeChange()
  }

  const playAiSend = () => {
    if (isMuted) return
    soundFx.aiSend()
  }

  const playAiReceive = () => {
    if (isMuted) return
    soundFx.aiReceive()
  }

  const playTerminalExec = () => {
    if (isMuted) return
    soundFx.terminalExec()
  }

  const playScrollTop = () => {
    if (isMuted) return
    soundFx.scrollTopLaunch()
  }

  return (
    <SoundContext.Provider
      value={{
        isMuted,
        toggleMute,
        playClick,
        playKeyStroke,
        playThemeChange,
        playAiSend,
        playAiReceive,
        playTerminalExec,
        playScrollTop,
      }}
    >
      {children}
    </SoundContext.Provider>
  )
}

export function useSound() {
  const context = useContext(SoundContext)
  if (!context) {
    throw new Error('useSound must be used within a SoundProvider')
  }
  return context
}
