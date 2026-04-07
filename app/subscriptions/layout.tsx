import { ReactNode } from 'react'

interface SubscriptionsLayoutProps {
  children: ReactNode
}

export default function SubscriptionsLayout({ children }: SubscriptionsLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="border-b bg-white">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold">Travel ERP - Subscription Plans</h1>
          <p className="text-muted-foreground">Choose the perfect plan for your business</p>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-6 py-12">
        {children}
      </div>
    </div>
  )
}
