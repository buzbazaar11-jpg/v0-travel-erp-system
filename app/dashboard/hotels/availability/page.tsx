'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface AvailabilitySlot {
  date: string
  hotel: string
  roomType: string
  available: number
  total: number
  price: number
}

const mockAvailability: AvailabilitySlot[] = [
  { date: '2024-02-01', hotel: 'Burj Al Arab', roomType: 'Suite', available: 2, total: 5, price: 35000 },
  { date: '2024-02-02', hotel: 'Sofitel Jeddah', roomType: 'Double', available: 10, total: 20, price: 12000 },
  { date: '2024-02-03', hotel: 'Hilton Makkah', roomType: 'Twin', available: 0, total: 10, price: 18000 },
]

export default function HotelsAvailabilityPage() {
  const [slots] = useState(mockAvailability)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Hotel Availability Calendar</h1>
        <p className="text-muted-foreground">View and manage room availability by date</p>
      </div>

      <Card>
        <CardHeader><CardTitle>Available Rooms by Date</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-3">
            {slots.map((slot, idx) => (
              <div key={idx} className="border rounded-lg p-4 flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">{slot.hotel}</h3>
                  <div className="text-sm text-muted-foreground">{slot.date} • {slot.roomType}</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-lg font-bold">{slot.available}/{slot.total}</div>
                    <div className="text-xs text-muted-foreground">Available</div>
                  </div>
                  <Badge variant={slot.available > 0 ? 'default' : 'destructive'}>
                    Rs.{slot.price}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
