import { useThemeAccent } from '../../context/ThemeAccentContext'

export function TechBackground() {
  const { currentOption } = useThemeAccent()

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
    >
      {/* 1. Cyber Grid & Dot Matrix Layer with Slow Infinite Cyber Drift (Option B) */}
      <div className="absolute inset-0 bg-tech-blueprint opacity-100" />

      {/* 2. Top Ambient Aurora Glow Blob with Breathing & Floating Animation (Option A) */}
      <div
        className="absolute -top-40 left-1/2 w-[700px] sm:w-[950px] h-[450px] sm:h-[550px] rounded-full blur-[140px] sm:blur-[180px] pointer-events-none transition-colors duration-700 animate-aurora-top"
        style={{
          backgroundColor: currentOption.colorHex,
        }}
      />

      {/* 3. Subtle Right Side Ambient Flare with Breathing Motion */}
      <div
        className="absolute top-1/2 -right-40 w-[500px] sm:w-[600px] h-[500px] sm:h-[600px] rounded-full blur-[160px] pointer-events-none transition-colors duration-700 animate-aurora-right"
        style={{
          backgroundColor: currentOption.colorHex,
        }}
      />

      {/* 4. Subtle Bottom Ambient Flare with Breathing Motion */}
      <div
        className="absolute -bottom-24 left-1/3 w-[650px] sm:w-[750px] h-[450px] sm:h-[550px] rounded-full blur-[150px] pointer-events-none transition-colors duration-700 animate-aurora-bottom"
        style={{
          backgroundColor: currentOption.colorHex,
        }}
      />
    </div>
  )
}
