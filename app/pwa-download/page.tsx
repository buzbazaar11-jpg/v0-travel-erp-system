'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Download, Smartphone, Monitor, Zap, Lock, Radio } from 'lucide-react'
import { toast } from 'sonner'
import { motion } from 'framer-motion'

export default function PWADownloadPage() {
  const handleDownloadApp = () => {
    // Check if PWA is installable
    if ((window as any).deferredPrompt) {
      (window as any).deferredPrompt.prompt()
      toast.success('Installation started!')
    } else {
      toast.info('Follow your browser\'s install prompts')
    }
  }

  const features = [
    { icon: Smartphone, title: 'Install on Mobile', desc: 'Add to your home screen' },
    { icon: Monitor, title: 'Desktop App', desc: 'Run like native application' },
    { icon: Zap, title: 'Fast Performance', desc: 'Lightning-quick load times' },
    { icon: Radio, title: 'Offline Access', desc: 'Works without internet' },
    { icon: Lock, title: 'Secure', desc: 'All data encrypted' },
    { icon: Download, title: 'Auto Updates', desc: 'Always latest version' },
  ]

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8 p-6 max-w-6xl mx-auto">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Install Travel ERP</h1>
        <p className="text-xl text-muted-foreground">
          Use our app like a native application on your phone or desktop
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Smartphone className="w-5 h-5" />
              Mobile App
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-semibold">iOS & Android</h3>
              <p className="text-sm text-muted-foreground">
                Install on your iPhone, iPad, or Android phone. Access all features offline.
              </p>
            </div>
            <ol className="text-sm space-y-2 list-decimal list-inside">
              <li>Open Travel ERP in your browser</li>
              <li>Tap the share/menu button</li>
              <li>Tap "Add to Home Screen"</li>
              <li>Launch from your home screen</li>
            </ol>
            <Button className="w-full" onClick={handleDownloadApp}>
              <Download className="w-4 h-4 mr-2" />
              Install App
            </Button>
          </CardContent>
        </Card>

        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Monitor className="w-5 h-5" />
              Desktop App
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-semibold">Windows, Mac & Linux</h3>
              <p className="text-sm text-muted-foreground">
                Install as a desktop app. Works like Microsoft Office or Chrome.
              </p>
            </div>
            <ol className="text-sm space-y-2 list-decimal list-inside">
              <li>Click the install button in your browser</li>
              <li>Or right-click and select "Install"</li>
              <li>Find in your applications menu</li>
              <li>Launch anytime with one click</li>
            </ol>
            <Button className="w-full" onClick={handleDownloadApp}>
              <Download className="w-4 h-4 mr-2" />
              Install for Desktop
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {features.map((feature, index) => {
          const Icon = feature.icon
          return (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardContent className="pt-6">
                  <Icon className="w-8 h-8 mb-3 text-blue-500" />
                  <h3 className="font-semibold mb-1">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle>Offline Support</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p>When you don&apos;t have internet connection:</p>
          <ul className="space-y-2 text-sm list-disc list-inside">
            <li>View all previously loaded data</li>
            <li>Create new bookings and records locally</li>
            <li>All changes sync when online</li>
            <li>View cached invoices and reports</li>
            <li>No data is lost</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="bg-green-50 border-green-200">
        <CardHeader>
          <CardTitle>Storage Information</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm">
            The app uses your device&apos;s local storage to cache data. On mobile: ~50MB, On Desktop: ~100MB. 
            All data is encrypted and syncs to our servers when online.
          </p>
        </CardContent>
      </Card>
    </motion.div>
  )
}
