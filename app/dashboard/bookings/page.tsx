'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Plus, Search, Edit, Trash2, MapPin, Users, Calendar } from 'lucide-react'

interface Booking {
  id: string
  bookingRef: string
  customerName: string
  packageName: string
  destination: string
  passengers: number
  startDate: string
  endDate: string
  totalAmount: number
  status: 'Pending' | 'Confirmed' | 'Cancelled' | 'Completed'
}

const mockBookings: Booking[] = [
  {
    id: '1',
    bookingRef: 'BK-001',
    customerName: 'Ahmed Khan',
    packageName: 'Umrah 7 Days',
    destination: 'Saudi Arabia',
    passengers: 2,
    startDate: '2024-02-15',
    endDate: '2024-02-22',
    totalAmount: 250000,
    status: 'Confirmed',
  },
  {
    id: '2',
    bookingRef: 'BK-002',
    customerName: 'Fatima Ali',
    packageName: 'Dubai Tour',
    destination: 'UAE',
    passengers: 4,
    startDate: '2024-02-20',
    endDate: '2024-02-25',
    totalAmount: 195000,
    status: 'Pending',
  },
]

const statusColor = {
  'Pending': 'bg-yellow-100 text-yellow-800',
  'Confirmed': 'bg-green-100 text-green-800',
  'Cancelled': 'bg-red-100 text-red-800',
  'Completed': 'bg-blue-100 text-blue-800',
}

export default function BookingsPage() {
  const [bookings, setBookings] = useState(mockBookings)
  const [searchQuery, setSearchQuery] = useState('')

  const filtered = bookings.filter(b =>
    b.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.bookingRef.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const totalRevenue = bookings.reduce((sum, b) => sum + b.totalAmount, 0)
  const confirmedCount = bookings.filter(b => b.status === 'Confirmed').length

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Bookings Management</h1>
          <p className="text-muted-foreground">Manage customer bookings and reservations</p>
        </div>
        <Button className="gap-2"><Plus className="h-4 w-4" /> New Booking</Button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Total Bookings</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">{bookings.length}</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Confirmed</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold text-green-600">{confirmedCount}</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Revenue</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">Rs.{(totalRevenue / 100000).toFixed(1)}L</div></CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Bookings</CardTitle>
          <div className="relative mt-4">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by customer or booking ref..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filtered.map(booking => (
              <div key={booking.id} className="border rounded-lg p-4 flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">{booking.bookingRef} - {booking.customerName}</h3>
                  <div className="text-sm text-muted-foreground mt-1">{booking.packageName}</div>
                  <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {booking.destination}</span>
                    <span className="flex items-center gap-1"><Users className="h-3 w-3" /> {booking.passengers} passengers</span>
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {booking.startDate} to {booking.endDate}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">Rs.{booking.totalAmount.toLocaleString()}</div>
                  <div className={`text-xs px-2 py-1 rounded mt-1 inline-block ${statusColor[booking.status]}`}>
                    {booking.status}
                  </div>
                  <div className="flex gap-1 mt-2">
                    <Button variant="ghost" size="sm"><Edit className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="sm"><Trash2 className="h-4 w-4" /></Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
