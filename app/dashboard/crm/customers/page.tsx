'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Plus, Search, Filter, Download, Mail, Phone, MapPin, Edit, Trash2 } from 'lucide-react'
import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import Link from 'next/link'

interface Customer {
  id: string
  first_name: string
  last_name: string
  email: string
  phone: string
  city: string
  customer_type: string
  is_active: boolean
}

const getTierColor = (type: string) => {
  switch (type) {
    case 'CORPORATE':
      return 'default'
    case 'AGENT':
      return 'secondary'
    case 'INDIVIDUAL':
      return 'outline'
    default:
      return 'outline'
  }
}

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<Partial<Customer>>({})
  const [isEditOpen, setIsEditOpen] = useState(false)

  useEffect(() => {
    fetchCustomers()
    // Auto-refresh every 5 seconds
    const interval = setInterval(fetchCustomers, 5000)
    return () => clearInterval(interval)
  }, [])

  const fetchCustomers = async () => {
    try {
      const res = await fetch('/api/customers')
      if (!res.ok) throw new Error('Failed to fetch')
      const data = await res.json()
      setCustomers(Array.isArray(data) ? data : [])
    } catch (error) {
      toast.error('Failed to load customers')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this customer?')) return
    try {
      const res = await fetch(`/api/customers/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Failed to delete')
      toast.success('Customer deleted')
      fetchCustomers()
    } catch (error) {
      toast.error('Failed to delete customer')
    }
  }

  const handleEdit = (customer: Customer) => {
    setEditingId(customer.id)
    setEditForm(customer)
    setIsEditOpen(true)
  }

  const handleSaveEdit = async () => {
    if (!editingId) return
    try {
      const res = await fetch(`/api/customers/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm),
      })
      if (!res.ok) throw new Error('Failed to update')
      toast.success('Customer updated')
      setIsEditOpen(false)
      fetchCustomers()
    } catch (error) {
      toast.error('Failed to update customer')
    }
  }

  const filteredCustomers = customers.filter((customer) =>
    `${customer.first_name} ${customer.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Customers</h1>
          <p className="text-muted-foreground mt-1">Manage your customer database</p>
        </div>
        <Link href="/dashboard/crm/customers/create">
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Add New Customer
          </Button>
        </Link>
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
            {customers.filter(c => c.customer_type === 'CORPORATE').length}
          </p>
        </Card>
        <Card className="p-4 border-border/40">
          <p className="text-sm text-muted-foreground">Travel Agents</p>
          <p className="text-2xl font-bold text-foreground mt-2">
            {customers.filter(c => c.customer_type === 'AGENT').length}
          </p>
        </Card>
        <Card className="p-4 border-border/40">
          <p className="text-sm text-muted-foreground">Active Customers</p>
          <p className="text-2xl font-bold text-foreground mt-2">
            {customers.filter(c => c.is_active).length}
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
        {loading ? (
          <div className="p-6 text-center">Loading customers...</div>
        ) : filteredCustomers.length === 0 ? (
          <div className="p-6 text-center text-muted-foreground">No customers found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-border/40 bg-muted/50">
                <tr>
                  <th className="text-left px-6 py-3 text-sm font-semibold text-muted-foreground">Name</th>
                  <th className="text-left px-6 py-3 text-sm font-semibold text-muted-foreground">Contact</th>
                  <th className="text-left px-6 py-3 text-sm font-semibold text-muted-foreground">Location</th>
                  <th className="text-left px-6 py-3 text-sm font-semibold text-muted-foreground">Type</th>
                  <th className="text-left px-6 py-3 text-sm font-semibold text-muted-foreground">Status</th>
                  <th className="text-left px-6 py-3 text-sm font-semibold text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="border-b border-border/40 hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-foreground">{customer.first_name} {customer.last_name}</td>
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
                    <td className="px-6 py-4">
                      <Badge variant={getTierColor(customer.customer_type)}>{customer.customer_type}</Badge>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={customer.is_active ? 'default' : 'destructive'}>
                        {customer.is_active ? 'Active' : 'Inactive'}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex gap-1">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm" onClick={() => handleEdit(customer)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Edit Customer</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-3">
                              <div>
                                <label className="text-sm font-medium">First Name</label>
                                <Input value={editForm.first_name || ''} onChange={(e) => setEditForm({...editForm, first_name: e.target.value})} />
                              </div>
                              <div>
                                <label className="text-sm font-medium">Last Name</label>
                                <Input value={editForm.last_name || ''} onChange={(e) => setEditForm({...editForm, last_name: e.target.value})} />
                              </div>
                              <div>
                                <label className="text-sm font-medium">Email</label>
                                <Input value={editForm.email || ''} onChange={(e) => setEditForm({...editForm, email: e.target.value})} />
                              </div>
                              <div>
                                <label className="text-sm font-medium">Phone</label>
                                <Input value={editForm.phone || ''} onChange={(e) => setEditForm({...editForm, phone: e.target.value})} />
                              </div>
                              <Button onClick={handleSaveEdit} className="w-full">Save Changes</Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button variant="ghost" size="sm" className="text-destructive" onClick={() => handleDelete(customer.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  )
}

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
