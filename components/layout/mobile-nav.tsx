'use client'

import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="md:hidden bg-card border-b border-border/40">
      <div className="flex justify-between items-center p-4">
        <h1 className="text-xl font-bold">Travel ERP</h1>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {isOpen && (
        <nav className="flex flex-col gap-2 p-4 border-t border-border/40">
          <Link href="/dashboard"><Button variant="ghost" className="w-full justify-start">Dashboard</Button></Link>
          <Link href="/dashboard/bookings"><Button variant="ghost" className="w-full justify-start">Bookings</Button></Link>
          <Link href="/dashboard/tours/list"><Button variant="ghost" className="w-full justify-start">Tours</Button></Link>
          <Link href="/dashboard/visa/applications"><Button variant="ghost" className="w-full justify-start">Visa</Button></Link>
          <Link href="/dashboard/finance/invoicing"><Button variant="ghost" className="w-full justify-start">Finance</Button></Link>
          <Link href="/dashboard/reports"><Button variant="ghost" className="w-full justify-start">Reports</Button></Link>
          <Link href="/dashboard/settings"><Button variant="ghost" className="w-full justify-start">Settings</Button></Link>
        </nav>
      )}
    </div>
  )
}
