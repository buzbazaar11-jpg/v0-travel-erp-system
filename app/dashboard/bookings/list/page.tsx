'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Plus, Search, Filter, Download, Eye, Edit, Trash2, Calendar } from 'lucide-react'
import { useState } from 'react'

const SAMPLE_BOOKINGS = [
  {
    id: 'BK-2025-001',
    customer: 'Ahmed Hassan',
    package: 'Umrah 7 Days',
    dates: '2025-04-15 to 2025-04-22',
    passengers: 2,
    totalCost: 'PKR 375,000',
    revenue: 'PKR 425,000',
    profit: 'PKR 50,000',
    status: 'CONFIRMED',
    paymentStatus: 'PAID',
    createdDate: '2025-03-10',
  },
  {
    id: 'BK-2025-002',
    customer: 'Bright Travels Ltd',
    package: 'Hajj Package',
    dates: '2025-08-01 to 2025-09-15',
    passengers: 15,
    totalCost: 'PKR 4,500,000',
    revenue: 'PKR 5,200,000',
    profit: 'PKR 700,000',
    status: 'CONFIRMED',
    paymentStatus: 'PARTIAL',
    createdDate: '2025-03-05',
  },
  {
    id: 'BK-2025-003',
    customer: 'Zainab Ali',
    package: 'Dubai Tours 5 Days',
    dates: '2025-05-20 to 2025-05-25',
    passengers: 1,
    totalCost: 'PKR 75,000',
    revenue: 'PKR 95,000',
    profit: 'PKR 20,000',
    status: 'DRAFT',
    paymentStatus: 'PENDING',
    createdDate: '2025-03-15',
  },
  {
    id: 'BK-2025-004',
    customer: 'Hassan Malik',
    package: 'Visa Services - UK',
    dates: '2025-04-01 to 2025-04-30',
    passengers: 3,
    totalCost: 'PKR 45,000',
    revenue: 'PKR 60,000',
    profit: 'PKR 15,000',
    status: 'CONFIRMED',
    paymentStatus: 'PAID',
    createdDate: '2025-03-12',
  },
  {
    id: 'BK-2025-005',
    customer: 'Fatima Khan',
    package: 'Tours Turkey 10 Days',
    dates: '2025-06-10 to 2025-06-20',
    passengers: 4,
    totalCost: 'PKR 320,000',
    revenue: 'PKR 380,000',
    profit: 'PKR 60,000',
    status: 'CANCELLED',
    paymentStatus: 'REFUNDED',
    createdDate: '2025-03-08',
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'CONFIRMED':
      return 'default'
    case 'DRAFT':
      return 'secondary'
    case 'CANCELLED':
      return 'destructive'
    default:
      return 'outline'
  }
}

const getPaymentStatusColor = (status: string) => {
  switch (status) {
    case 'PAID':
      return 'default'
    case 'PARTIAL':
      return 'secondary'
    case 'PENDING':
      return 'outline'
    case 'REFUNDED':
      return 'destructive'
    default:
      return 'outline'
  }
}

export default function BookingsListPage() {
  const [bookings, setBookings] = useState(SAMPLE_BOOKINGS)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [paymentFilter, setPaymentFilter] = useState('all')

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch = booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.package.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter
    const matchesPayment = paymentFilter === 'all' || booking.paymentStatus === paymentFilter
    return matchesSearch && matchesStatus && matchesPayment
  })

  const stats = {
    total: bookings.length,
    confirmed: bookings.filter(b => b.status === 'CONFIRMED').length,
    totalRevenue: bookings.reduce((sum, b) => sum + parseInt(b.revenue.replace(/[^0-9]/g, '')), 0),
    totalProfit: bookings.reduce((sum, b) => sum + parseInt(b.profit.replace(/[^0-9]/g, '')), 0),
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Bookings Management</h1>
          <p className="text-muted-foreground mt-1">Manage all travel bookings and reservations</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Create New Booking
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="p-4 border-border/40">
          <p className="text-sm text-muted-foreground">Total Bookings</p>
          <p className="text-2xl font-bold text-foreground mt-2">{stats.total}</p>
        </Card>
        <Card className="p-4 border-border/40">
          <p className="text-sm text-muted-foreground">Confirmed</p>
          <p className="text-2xl font-bold text-foreground mt-2">{stats.confirmed}</p>
        </Card>
        <Card className="p-4 border-border/40">
          <p className="text-sm text-muted-foreground">Total Revenue</p>
          <p className="text-2xl font-bold text-foreground mt-2">
            PKR {(stats.totalRevenue / 1000000).toFixed(1)}M
          </p>
        </Card>
        <Card className="p-4 border-border/40">
          <p className="text-sm text-muted-foreground">Total Profit</p>
          <p className="text-2xl font-bold text-green-600 mt-2">
            PKR {(stats.totalProfit / 1000000).toFixed(2)}M
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
                placeholder="Search bookings..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Booking Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="DRAFT">Draft</SelectItem>
              <SelectItem value="CONFIRMED">Confirmed</SelectItem>
              <SelectItem value="CANCELLED">Cancelled</SelectItem>
            </SelectContent>
          </Select>
          <Select value={paymentFilter} onValueChange={setPaymentFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Payment Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Payments</SelectItem>
              <SelectItem value="PAID">Paid</SelectItem>
              <SelectItem value="PARTIAL">Partial</SelectItem>
              <SelectItem value="PENDING">Pending</SelectItem>
              <SelectItem value="REFUNDED">Refunded</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>
      </Card>

      {/* Bookings Table */}
      <Card className="border-border/40 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border/40 bg-muted/50">
              <tr>
                <th className="text-left px-6 py-3 text-sm font-semibold text-muted-foreground">Booking ID</th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-muted-foreground">Customer</th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-muted-foreground">Package</th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-muted-foreground">Travel Dates</th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-muted-foreground">Passengers</th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-muted-foreground">Revenue</th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-muted-foreground">Status</th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-muted-foreground">Payment</th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((booking) => (
                <tr key={booking.id} className="border-b border-border/40 hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4 text-sm font-bold text-primary">{booking.id}</td>
                  <td className="px-6 py-4 text-sm font-medium text-foreground">{booking.customer}</td>
                  <td className="px-6 py-4 text-sm text-foreground">{booking.package}</td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      {booking.dates}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-foreground">{booking.passengers}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-foreground">{booking.revenue}</td>
                  <td className="px-6 py-4">
                    <Badge variant={getStatusColor(booking.status)}>{booking.status}</Badge>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant={getPaymentStatusColor(booking.paymentStatus)}>
                      {booking.paymentStatus}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" className="p-1" title="View">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="p-1" title="Edit">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="p-1 text-destructive" title="Delete">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Profit Margin Analysis */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6 border-border/40">
          <h3 className="font-semibold text-foreground mb-4">Profit by Package Type</h3>
          <div className="space-y-3">
            {[
              { package: 'Umrah Packages', profit: 'PKR 450K', margin: '12%' },
              { package: 'Hajj Package', profit: 'PKR 1.2M', margin: '18%' },
              { package: 'Tours', profit: 'PKR 380K', margin: '15%' },
              { package: 'Visa Services', profit: 'PKR 45K', margin: '35%' },
            ].map((item, idx) => (
              <div key={idx} className="flex justify-between items-center pb-3 border-b border-border/40 last:border-0">
                <span className="text-sm text-foreground">{item.package}</span>
                <div className="text-right">
                  <p className="font-semibold text-foreground">{item.profit}</p>
                  <p className="text-xs text-green-600">{item.margin} margin</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 border-border/40">
          <h3 className="font-semibold text-foreground mb-4">Upcoming Departures</h3>
          <div className="space-y-3">
            {[
              { booking: 'BK-2025-001', package: 'Umrah 7 Days', departure: '2 days' },
              { booking: 'BK-2025-002', package: 'Hajj Package', departure: '135 days' },
              { booking: 'BK-2025-003', package: 'Dubai Tours', departure: '55 days' },
              { booking: 'BK-2025-004', package: 'Visa Services', departure: '17 days' },
            ].map((item, idx) => (
              <div key={idx} className="flex justify-between items-center pb-3 border-b border-border/40 last:border-0">
                <div>
                  <p className="font-semibold text-foreground text-sm">{item.booking}</p>
                  <p className="text-xs text-muted-foreground">{item.package}</p>
                </div>
                <Badge variant="outline">{item.departure}</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
