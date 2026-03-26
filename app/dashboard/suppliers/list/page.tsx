'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Plus, Search, Star, MapPin, Phone, Mail, Eye, Edit, AlertCircle } from 'lucide-react'
import { useState } from 'react'
import { Alert, AlertDescription } from '@/components/ui/alert'

const SAMPLE_PROVIDERS = [
  {
    id: 'SP-001',
    name: 'Al-Safwa Hotel',
    type: 'Hotel',
    category: 'Accommodation',
    city: 'Makkah',
    rating: 4.8,
    phone: '+966 12 555 0000',
    email: 'reservations@alsafwa.com.sa',
    contactPerson: 'Muhammad Ahmed',
    status: 'ACTIVE',
    activeSince: '2024-01-15',
    bookingsCount: 45,
    totalSpent: 5200000,
  },
  {
    id: 'SP-002',
    name: 'Saudia Airways',
    type: 'Airline',
    category: 'Transportation',
    city: 'Jeddah',
    rating: 4.6,
    phone: '+966 12 680 0000',
    email: 'corporate@saudia.com.sa',
    contactPerson: 'Fatima Hassan',
    status: 'ACTIVE',
    activeSince: '2024-02-20',
    bookingsCount: 32,
    totalSpent: 3200000,
  },
  {
    id: 'SP-003',
    name: 'Visa Agent Pro',
    type: 'Visa Services',
    category: 'Services',
    city: 'Karachi',
    rating: 4.9,
    phone: '+92 21 3456 7890',
    email: 'info@visaagentpro.pk',
    contactPerson: 'Hassan Khan',
    status: 'ACTIVE',
    activeSince: '2024-03-10',
    bookingsCount: 28,
    totalSpent: 450000,
  },
  {
    id: 'SP-004',
    name: 'Medina Palace Hotel',
    type: 'Hotel',
    category: 'Accommodation',
    city: 'Medina',
    rating: 4.5,
    phone: '+966 4 848 0000',
    email: 'info@medinapalace.com.sa',
    contactPerson: 'Ali Muhammad',
    status: 'INACTIVE',
    activeSince: '2023-06-15',
    bookingsCount: 12,
    totalSpent: 1450000,
  },
]

const getTypeColor = (type: string) => {
  switch (type) {
    case 'Hotel':
      return 'default'
    case 'Airline':
      return 'secondary'
    case 'Visa Services':
      return 'outline'
    default:
      return 'outline'
  }
}

export default function ServiceProvidersPage() {
  const [providers, setProviders] = useState(SAMPLE_PROVIDERS)
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')

  const filteredProviders = providers.filter((provider) => {
    const matchesSearch = provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      provider.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      provider.contactPerson.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === 'all' || provider.type === typeFilter
    const matchesStatus = statusFilter === 'all' || provider.status === statusFilter
    return matchesSearch && matchesType && matchesStatus
  })

  const stats = {
    total: providers.length,
    active: providers.filter(p => p.status === 'ACTIVE').length,
    hotels: providers.filter(p => p.type === 'Hotel').length,
    totalSpent: providers.reduce((sum, p) => sum + p.totalSpent, 0),
  }

  const inactiveProviders = providers.filter(p => p.status === 'INACTIVE')

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Service Providers & Suppliers</h1>
          <p className="text-muted-foreground mt-1">Manage hotels, airlines, and service partners</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Add Provider
        </Button>
      </div>

      {/* Alerts */}
      {inactiveProviders.length > 0 && (
        <Alert className="border-amber-200 bg-amber-50">
          <AlertCircle className="h-4 w-4 text-amber-600" />
          <AlertDescription className="text-amber-800">
            {inactiveProviders.length} provider(s) marked as inactive. Review and update status if needed.
          </AlertDescription>
        </Alert>
      )}

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="p-4 border-border/40">
          <p className="text-sm text-muted-foreground">Total Providers</p>
          <p className="text-2xl font-bold text-foreground mt-2">{stats.total}</p>
        </Card>
        <Card className="p-4 border-border/40">
          <p className="text-sm text-muted-foreground">Active</p>
          <p className="text-2xl font-bold text-green-600 mt-2">{stats.active}</p>
        </Card>
        <Card className="p-4 border-border/40">
          <p className="text-sm text-muted-foreground">Hotels</p>
          <p className="text-2xl font-bold text-primary mt-2">{stats.hotels}</p>
        </Card>
        <Card className="p-4 border-border/40">
          <p className="text-sm text-muted-foreground">Total Spent</p>
          <p className="text-2xl font-bold text-foreground mt-2">
            PKR {(stats.totalSpent / 1000000).toFixed(1)}M
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
                placeholder="Search providers..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Provider Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="Hotel">Hotels</SelectItem>
              <SelectItem value="Airline">Airlines</SelectItem>
              <SelectItem value="Visa Services">Visa Services</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="ACTIVE">Active</SelectItem>
              <SelectItem value="INACTIVE">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Providers Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProviders.map((provider) => (
          <Card key={provider.id} className="p-6 border-border/40 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-bold text-foreground">{provider.name}</h3>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <span className="text-sm font-semibold text-foreground">{provider.rating}</span>
                </div>
              </div>
              <Badge variant={provider.status === 'ACTIVE' ? 'default' : 'outline'}>
                {provider.status}
              </Badge>
            </div>

            <div className="space-y-2 mb-4">
              <Badge variant={getTypeColor(provider.type)}>{provider.type}</Badge>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-3 h-3" />
                {provider.city}
              </div>
            </div>

            <div className="space-y-2 text-sm border-t border-border/40 pt-3 mb-4">
              <div>
                <p className="text-xs text-muted-foreground">Contact Person</p>
                <p className="font-medium text-foreground">{provider.contactPerson}</p>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="w-3 h-3" />
                <span className="text-xs">{provider.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="w-3 h-3" />
                <span className="text-xs">{provider.email}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-center text-sm border-t border-border/40 pt-3 mb-4">
              <div>
                <p className="text-xs text-muted-foreground">Bookings</p>
                <p className="font-bold text-foreground">{provider.bookingsCount}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Total</p>
                <p className="font-bold text-primary">
                  PKR {(provider.totalSpent / 1000).toFixed(0)}K
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1 gap-2">
                <Eye className="w-4 h-4" />
                View
              </Button>
              <Button variant="outline" size="sm" className="flex-1 gap-2">
                <Edit className="w-4 h-4" />
                Edit
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Top Providers by Spending */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="p-6 border-border/40">
          <h3 className="font-semibold text-foreground mb-4">Top Providers by Spending</h3>
          <div className="space-y-3">
            {providers
              .sort((a, b) => b.totalSpent - a.totalSpent)
              .slice(0, 4)
              .map((provider, idx) => (
                <div key={idx} className="flex justify-between items-center pb-3 border-b border-border/40 last:border-0">
                  <div>
                    <p className="font-medium text-foreground">{provider.name}</p>
                    <p className="text-xs text-muted-foreground">{provider.type}</p>
                  </div>
                  <p className="font-bold text-foreground">
                    PKR {(provider.totalSpent / 1000000).toFixed(1)}M
                  </p>
                </div>
              ))}
          </div>
        </Card>

        <Card className="p-6 border-border/40">
          <h3 className="font-semibold text-foreground mb-4">Providers by Type</h3>
          <div className="space-y-3">
            {[
              { type: 'Hotels', count: stats.hotels, total: 6650000 },
              { type: 'Airlines', count: 1, total: 3200000 },
              { type: 'Visa Services', count: 1, total: 450000 },
              { type: 'Transportation', count: 1, total: 850000 },
            ].map((item, idx) => (
              <div key={idx} className="flex justify-between items-center pb-3 border-b border-border/40 last:border-0">
                <div>
                  <p className="font-medium text-foreground">{item.type}</p>
                  <p className="text-xs text-muted-foreground">{item.count} provider(s)</p>
                </div>
                <p className="font-bold">PKR {(item.total / 1000000).toFixed(1)}M</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
