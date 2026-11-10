import { useEffect, useState } from 'react'

// Menangkap event beforeinstallprompt agar PWA bisa di-install lewat tombol sendiri.
export default function useInstallPrompt() {
  const [promptEvent, setPromptEvent] = useState(null)
  const [installed, setInstalled] = useState(
    window.matchMedia('(display-mode: standalone)').matches,
  )

  useEffect(() => {
    const onPrompt = (e) => {
      e.preventDefault()
      setPromptEvent(e)
    }
    const onInstalled = () => {
      setInstalled(true)
      setPromptEvent(null)
    }
    window.addEventListener('beforeinstallprompt', onPrompt)
    window.addEventListener('appinstalled', onInstalled)
    return () => {
      window.removeEventListener('beforeinstallprompt', onPrompt)
      window.removeEventListener('appinstalled', onInstalled)
    }
  }, [])

  const install = async () => {
    if (!promptEvent) {
      // Fallback untuk browser tanpa beforeinstallprompt (Safari, Brave, atau mode dev).
      window.alert(
        'Untuk install: klik ikon install di address bar (Chrome/Edge/Brave), atau menu browser → "Install app" / "Add to Home Screen" (Safari: Share → Add to Home Screen).\n\nCatatan: install hanya tersedia di versi build/deploy (HTTPS), bukan npm run dev.',
      )
      return
    }
    promptEvent.prompt()
    await promptEvent.userChoice
    setPromptEvent(null)
  }

  return { canInstall: !installed, install }
}

