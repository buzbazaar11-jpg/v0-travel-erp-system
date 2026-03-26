'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { 
  Home, BarChart3, Users, Plane, Hotel, MapPin, DollarSign, 
  FileText, Settings, Bell, Gift, LogOut, Menu, Package
} from 'lucide-react'

interface NavItem {
  title: string
  href: string
  icon: React.ReactNode
  badge?: number
}

const navItems: NavItem[] = [
  { title: 'Dashboard', href: '/dashboard', icon: <Home className="h-4 w-4" /> },
  { title: 'Bookings', href: '/dashboard/bookings', icon: <Package className="h-4 w-4" /> },
  { title: 'Tours', href: '/dashboard/tours/list', icon: <MapPin className="h-4 w-4" /> },
  { title: 'Visa', href: '/dashboard/visa/applications', icon: <FileText className="h-4 w-4" /> },
  { title: 'Hotels', href: '/dashboard/hotels/inventory', icon: <Hotel className="h-4 w-4" /> },
  { title: 'Flights', href: '/dashboard/flights', icon: <Plane className="h-4 w-4" /> },
  { title: 'Transport', href: '/dashboard/transportation', icon: <BarChart3 className="h-4 w-4" /> },
  { title: 'Finance', href: '/dashboard/finance/invoicing', icon: <DollarSign className="h-4 w-4" /> },
  { title: 'Reports', href: '/dashboard/reports', icon: <BarChart3 className="h-4 w-4" /> },
  { title: 'Loyalty', href: '/dashboard/loyalty', icon: <Gift className="h-4 w-4" /> },
  { title: 'Documents', href: '/dashboard/documents', icon: <FileText className="h-4 w-4" /> },
  { title: 'Settings', href: '/dashboard/settings', icon: <Settings className="h-4 w-4" /> },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden md:flex w-64 bg-card border-r border-border/40 flex-col">
      <div className="p-6 border-b border-border/40">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Travel ERP
        </h1>
      </div>

      <nav className="flex-1 overflow-auto px-3 py-4 space-y-1">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <Button
              variant={pathname === item.href ? 'default' : 'ghost'}
              className={cn(
                'w-full justify-start gap-2',
                pathname === item.href && 'bg-primary text-primary-foreground'
              )}
            >
              {item.icon}
              <span className="flex-1 text-left">{item.title}</span>
              {item.badge && (
                <span className="bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                  {item.badge}
                </span>
              )}
            </Button>
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-border/40 space-y-2">
        <Button variant="outline" className="w-full justify-start gap-2">
          <Bell className="h-4 w-4" />
          Notifications
          <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-2">3</span>
        </Button>
        <Button variant="outline" className="w-full justify-start gap-2">
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </aside>
  )
}
