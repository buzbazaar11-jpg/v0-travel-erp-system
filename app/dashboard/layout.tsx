'use client'

import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/client'
import { useRouter, usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import {
  LayoutDashboard,
  BarChart3,
  Users,
  Calendar,
  CreditCard,
  FileText,
  Settings,
  LogOut,
  Menu,
  ChevronDown,
  Briefcase,
  Globe,
  MapPin,
  Plane,
  Hotel,
  Stamp,
  Truck,
  Gift,
  Bell,
  HelpCircle,
} from 'lucide-react'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'

interface SidebarItem {
  icon: React.ReactNode
  label: string
  href?: string
  submenu?: { label: string; href: string }[]
}

const SIDEBAR_ITEMS: SidebarItem[] = [
  { icon: <LayoutDashboard className="w-4 h-4" />, label: 'Dashboard', href: '/dashboard' },
  {
    icon: <Users className="w-4 h-4" />,
    label: 'CRM',
    submenu: [
      { label: 'Leads', href: '/dashboard/crm/leads' },
      { label: 'Customers', href: '/dashboard/crm/customers' },
      { label: 'Sales Pipeline', href: '/dashboard/crm/pipeline' },
    ],
  },
  {
    icon: <Briefcase className="w-4 h-4" />,
    label: 'Bookings',
    submenu: [
      { label: 'All Bookings', href: '/dashboard/bookings/list' },
      { label: 'New Booking', href: '/dashboard/bookings/new' },
      { label: 'Passengers', href: '/dashboard/bookings/passengers' },
    ],
  },
  {
    icon: <Globe className="w-4 h-4" />,
    label: 'Travel Services',
    submenu: [
      { label: 'Umrah Packages', href: '/dashboard/services/umrah' },
      { label: 'Hajj Packages', href: '/dashboard/services/hajj' },
      { label: 'Tours', href: '/dashboard/services/tours' },
      { label: 'Visa Services', href: '/dashboard/services/visa' },
    ],
  },
  {
    icon: <Hotel className="w-4 h-4" />,
    label: 'Suppliers',
    submenu: [
      { label: 'Hotels', href: '/dashboard/suppliers/hotels' },
      { label: 'Airlines', href: '/dashboard/suppliers/airlines' },
      { label: 'Transportation', href: '/dashboard/suppliers/transport' },
      { label: 'Visa Agents', href: '/dashboard/suppliers/visa-agents' },
    ],
  },
  {
    icon: <BarChart3 className="w-4 h-4" />,
    label: 'Finance',
    submenu: [
      { label: 'Dashboard', href: '/dashboard/finance/overview' },
      { label: 'Invoices', href: '/dashboard/finance/invoices' },
      { label: 'Payments', href: '/dashboard/finance/payments' },
      { label: 'Expenses', href: '/dashboard/finance/expenses' },
      { label: 'Ledger', href: '/dashboard/finance/ledger' },
      { label: 'Reports', href: '/dashboard/finance/reports' },
    ],
  },
  {
    icon: <CreditCard className="w-4 h-4" />,
    label: 'Payments',
    submenu: [
      { label: 'Payment Links', href: '/dashboard/payments/links' },
      { label: 'Transaction History', href: '/dashboard/payments/history' },
      { label: 'Bank Accounts', href: '/dashboard/payments/accounts' },
    ],
  },
  {
    icon: <FileText className="w-4 h-4" />,
    label: 'Documents',
    submenu: [
      { label: 'Manage Documents', href: '/dashboard/documents/list' },
      { label: 'Document Templates', href: '/dashboard/documents/templates' },
      { label: 'Expiry Alerts', href: '/dashboard/documents/expiry' },
    ],
  },
  {
    icon: <Calendar className="w-4 h-4" />,
    label: 'Calendar',
    href: '/dashboard/calendar',
  },
  {
    icon: <Gift className="w-4 h-4" />,
    label: 'Loyalty Program',
    href: '/dashboard/loyalty',
  },
  {
    icon: <Bell className="w-4 h-4" />,
    label: 'Notifications',
    href: '/dashboard/notifications',
  },
  {
    icon: <Settings className="w-4 h-4" />,
    label: 'Settings',
    submenu: [
      { label: 'Company', href: '/dashboard/settings/company' },
      { label: 'Branches', href: '/dashboard/settings/branches' },
      { label: 'Users & Roles', href: '/dashboard/settings/users' },
      { label: 'Preferences', href: '/dashboard/settings/preferences' },
    ],
  },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [user, setUser] = useState<any>(null)
  const [isOpen, setIsOpen] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user }, error } = await supabase.auth.getUser()
      if (error || !user) {
        router.push('/auth/login')
      } else {
        setUser(user)
      }
    }
    checkAuth()
  }, [router, supabase])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/auth/login')
  }

  return (
    <SidebarProvider defaultOpen={isOpen} onOpenChange={setIsOpen}>
      <div className="flex h-screen w-full">
        <Sidebar className="border-r border-border/40">
          <SidebarHeader className="border-b border-border/40 px-6 py-4">
            <div className="text-xl font-bold text-foreground">TravelERP</div>
            <p className="text-xs text-muted-foreground mt-1">Travel & Tours Management</p>
          </SidebarHeader>
          <SidebarContent className="flex flex-col h-full overflow-hidden">
            <SidebarMenu className="flex-1 overflow-y-auto">
              {SIDEBAR_ITEMS.map((item, idx) => (
                <div key={idx}>
                  {item.submenu ? (
                    <Collapsible defaultOpen={pathname.includes(item.label.toLowerCase())}>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton className="w-full cursor-pointer">
                          {item.icon}
                          <span className="flex-1 text-left">{item.label}</span>
                          <ChevronDown className="w-4 h-4 transition-transform" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="pl-2">
                        <SidebarMenuSub>
                          {item.submenu.map((subitem, subidx) => (
                            <SidebarMenuSubItem key={subidx}>
                              <SidebarMenuSubButton
                                asChild
                                isActive={pathname === subitem.href}
                                className="text-xs"
                              >
                                <a href={subitem.href}>{subitem.label}</a>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild isActive={pathname === item.href}>
                        <a href={item.href}>{item.icon}</a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )}
                </div>
              ))}
            </SidebarMenu>

            {/* Sidebar Footer */}
            <div className="border-t border-border/40 p-4 space-y-2">
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start text-xs"
                onClick={handleLogout}
              >
                <LogOut className="w-3 h-3 mr-2" />
                Logout
              </Button>
            </div>
          </SidebarContent>
        </Sidebar>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top Bar */}
          <div className="border-b border-border/40 bg-background/95 backdrop-blur px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <h1 className="text-lg font-semibold text-foreground">Dashboard</h1>
            </div>
            {user && (
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">{user.email}</span>
              </div>
            )}
          </div>

          {/* Page Content */}
          <div className="flex-1 overflow-y-auto bg-muted/30">
            {children}
          </div>
        </div>
      </div>
    </SidebarProvider>
  )
}
