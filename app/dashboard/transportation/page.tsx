'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Plus } from 'lucide-react'

interface TransportBooking {
  id: string
  vehicleType: string
  route: string
  date: string
  passengers: number
  costPerPerson: number
  totalCost: number
  status: 'Pending' | 'Confirmed' | 'Completed'
}

const mockTransport: TransportBooking[] = [
  { id: '1', vehicleType: 'Coach', route: 'Lahore - Islamabad', date: '2024-02-05', passengers: 40, costPerPerson: 2500, totalCost: 100000, status: 'Confirmed' },
  { id: '2', vehicleType: 'Van', route: 'Jeddah - Makkah', date: '2024-02-06', passengers: 15, costPerPerson: 5000, totalCost: 75000, status: 'Pending' },
  { id: '3', vehicleType: 'Bus', route: 'Dubai Airport - Hotel', date: '2024-02-07', passengers: 50, costPerPerson: 3000, totalCost: 150000, status: 'Completed' },
]

const statusColor = { 'Pending': 'secondary', 'Confirmed': 'default', 'Completed': 'outline' }

export default function TransportationPage() {
  const [bookings, setBookings] = useState(mockTransport)

  const totalRevenue = bookings.reduce((sum, b) => sum + (b.totalCost * 1.3), 0)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Transportation</h1>
          <p className="text-muted-foreground">Manage vehicle bookings and logistics</p>
        </div>
        <Button className="gap-2"><Plus className="h-4 w-4" /> Book Vehicle</Button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Total Bookings</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">{bookings.length}</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Total Passengers</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">{bookings.reduce((s, b) => s + b.passengers, 0)}</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Revenue</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold text-green-600">Rs.{(totalRevenue / 100000).toFixed(1)}L</div></CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Recent Bookings</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-3">
            {bookings.map(booking => (
              <div key={booking.id} className="border rounded-lg p-4 flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">{booking.vehicleType}</h3>
                  <div className="text-sm text-muted-foreground">{booking.route} • {booking.date}</div>
                  <div className="text-xs text-muted-foreground">{booking.passengers} passengers</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">Rs.{booking.totalCost.toLocaleString()}</div>
                  <Badge variant={statusColor[booking.status] as any}>{booking.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
