'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Plus, Search, Filter, Download, Mail, Phone, MapPin } from 'lucide-react'
import { useState } from 'react'

const SAMPLE_CUSTOMERS = [
  {
    id: 1,
    name: 'Ahmed Hassan',
    email: 'ahmed@example.com',
    phone: '+92 300 1234567',
    type: 'INDIVIDUAL',
    city: 'Karachi',
    totalBookings: 3,
    lifetime: 'PKR 875,000',
    loyaltyTier: 'Gold',
    lastBooking: '2025-02-15',
  },
  {
    id: 2,
    name: 'Bright Travels Ltd',
    email: 'info@brightravels.com',
    phone: '+92 21 1234567',
    type: 'CORPORATE',
    city: 'Lahore',
    totalBookings: 15,
    lifetime: 'PKR 5,240,000',
    loyaltyTier: 'Platinum',
    lastBooking: '2025-03-10',
  },
  {
    id: 3,
    name: 'Zainab Ali',
    email: 'zainab@example.com',
    phone: '+92 321 9876543',
    type: 'INDIVIDUAL',
    city: 'Islamabad',
    totalBookings: 2,
    lifetime: 'PKR 425,000',
    loyaltyTier: 'Silver',
    lastBooking: '2024-12-20',
  },
  {
    id: 4,
    name: 'Hassan Malik',
    email: 'hassan@example.com',
    phone: '+92 345 5555555',
    type: 'AGENT',
    city: 'Rawalpindi',
    totalBookings: 28,
    lifetime: 'PKR 12,580,000',
    loyaltyTier: 'Platinum',
    lastBooking: '2025-03-18',
  },
]

const getTierColor = (tier: string) => {
  switch (tier) {
    case 'Platinum':
      return 'default'
    case 'Gold':
      return 'secondary'
    case 'Silver':
      return 'outline'
    default:
      return 'outline'
  }
}

export default function CustomersPage() {
  const [customers, setCustomers] = useState(SAMPLE_CUSTOMERS)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Customers</h1>
          <p className="text-muted-foreground mt-1">Manage your customer database</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Add New Customer
        </Button>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="p-4 border-border/40">
          <p className="text-sm text-muted-foreground">Total Customers</p>
          <p className="text-2xl font-bold text-foreground mt-2">{customers.length}</p>
        </Card>
        <Card className="p-4 border-border/40">
          <p className="text-sm text-muted-foreground">Corporate Clients</p>
          <p className="text-2xl font-bold text-foreground mt-2">
            {customers.filter(c => c.type === 'CORPORATE').length}
          </p>
        </Card>
        <Card className="p-4 border-border/40">
          <p className="text-sm text-muted-foreground">Travel Agents</p>
          <p className="text-2xl font-bold text-foreground mt-2">
            {customers.filter(c => c.type === 'AGENT').length}
          </p>
        </Card>
        <Card className="p-4 border-border/40">
          <p className="text-sm text-muted-foreground">Total Lifetime Value</p>
          <p className="text-2xl font-bold text-foreground mt-2">
            PKR {(customers.reduce((sum, c) => {
              const amount = parseInt(c.lifetime.replace(/[^0-9]/g, ''))
              return sum + amount
            }, 0) / 1000000).toFixed(1)}M
          </p>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4 border-border/40">
        <div className="flex gap-4 flex-wrap">
          <div className="flex-1 min-w-64">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or email..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="w-4 h-4" />
            Filters
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>
      </Card>

      {/* Customers Table */}
      <Card className="border-border/40 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border/40 bg-muted/50">
              <tr>
                <th className="text-left px-6 py-3 text-sm font-semibold text-muted-foreground">Name</th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-muted-foreground">Contact</th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-muted-foreground">Location</th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-muted-foreground">Type</th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-muted-foreground">Bookings</th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-muted-foreground">Lifetime Value</th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-muted-foreground">Tier</th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-muted-foreground">Last Booking</th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="border-b border-border/40 hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-foreground">{customer.name}</td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex flex-col gap-1">
                      <a href={`mailto:${customer.email}`} className="flex items-center gap-1 text-primary hover:underline">
                        <Mail className="w-3 h-3" />
                        {customer.email}
                      </a>
                      <a href={`tel:${customer.phone}`} className="flex items-center gap-1 text-muted-foreground text-xs">
                        <Phone className="w-3 h-3" />
                        {customer.phone}
                      </a>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <MapPin className="w-3 h-3" />
                      {customer.city}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <Badge variant="outline">{customer.type}</Badge>
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-foreground">{customer.totalBookings}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-foreground">{customer.lifetime}</td>
                  <td className="px-6 py-4">
                    <Badge variant={getTierColor(customer.loyaltyTier)}>{customer.loyaltyTier}</Badge>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{customer.lastBooking}</td>
                  <td className="px-6 py-4 text-sm">
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Top Customers */}
      <Card className="p-6 border-border/40">
        <h3 className="font-semibold text-foreground mb-4">Top Customers by Lifetime Value</h3>
        <div className="space-y-4">
          {customers
            .sort((a, b) => {
              const aVal = parseInt(a.lifetime.replace(/[^0-9]/g, ''))
              const bVal = parseInt(b.lifetime.replace(/[^0-9]/g, ''))
              return bVal - aVal
            })
            .slice(0, 3)
            .map((customer, idx) => (
              <div key={customer.id} className="flex justify-between items-center pb-4 border-b border-border/40 last:border-0">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold">
                    {idx + 1}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{customer.name}</p>
                    <p className="text-sm text-muted-foreground">{customer.totalBookings} bookings</p>
                  </div>
                </div>
                <p className="font-bold text-foreground">{customer.lifetime}</p>
              </div>
            ))}
        </div>
      </Card>
    </div>
  )
}
