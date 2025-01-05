'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'

export function InstallPWA() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [showInstall, setShowInstall] = useState(false)

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setShowInstall(true)
    }

    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice

    if (outcome === 'accepted') {
      setDeferredPrompt(null)
      setShowInstall(false)
    }
  }

  if (!showInstall) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 p-4 bg-white rounded-lg shadow-lg border border-gray-200">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="font-semibold">Install App</h3>
          <p className="text-sm text-gray-500">Add to your home screen for quick access</p>
        </div>
        <Button onClick={handleInstall}>Install</Button>
      </div>
    </div>
  )
} 