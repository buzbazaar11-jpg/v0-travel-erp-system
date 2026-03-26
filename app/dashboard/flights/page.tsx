'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Plane, Plus } from 'lucide-react'

interface Flight {
  id: string
  airline: string
  flightNumber: string
  route: string
  departure: string
  arrival: string
  totalSeats: number
  bookedSeats: number
  economyPrice: number
  businessPrice: number
}

const mockFlights: Flight[] = [
  { id: '1', airline: 'PIA', flightNumber: 'PK101', route: 'Lahore - Dubai', departure: '08:00', arrival: '11:30', totalSeats: 180, bookedSeats: 145, economyPrice: 25000, businessPrice: 50000 },
  { id: '2', airline: 'Emirates', flightNumber: 'EK501', route: 'Karachi - Dubai', departure: '14:00', arrival: '16:45', totalSeats: 250, bookedSeats: 200, economyPrice: 28000, businessPrice: 60000 },
]

export default function FlightsPage() {
  const [flights] = useState(mockFlights)

  const totalBookings = flights.reduce((s, f) => s + f.bookedSeats, 0)
  const availableSeats = flights.reduce((s, f) => s + (f.totalSeats - f.bookedSeats), 0)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Flights Management</h1>
          <p className="text-muted-foreground">Manage flight bookings and allocations</p>
        </div>
        <Button className="gap-2"><Plus className="h-4 w-4" /> Add Flight</Button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Total Flights</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">{flights.length}</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Booked Seats</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">{totalBookings}</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Available Seats</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold text-blue-600">{availableSeats}</div></CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Flight List</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-3">
            {flights.map(flight => (
              <div key={flight.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold flex items-center gap-2">
                      <Plane className="h-4 w-4" />
                      {flight.airline} {flight.flightNumber}
                    </h3>
                    <div className="text-sm text-muted-foreground">{flight.route}</div>
                  </div>
                  <Badge>{flight.departure} - {flight.arrival}</Badge>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="text-muted-foreground">Occupancy</div>
                    <div className="font-semibold">{flight.bookedSeats}/{flight.totalSeats} ({((flight.bookedSeats/flight.totalSeats)*100).toFixed(0)}%)</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Economy</div>
                    <div className="font-semibold">Rs.{flight.economyPrice.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Business</div>
                    <div className="font-semibold">Rs.{flight.businessPrice.toLocaleString()}</div>
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
