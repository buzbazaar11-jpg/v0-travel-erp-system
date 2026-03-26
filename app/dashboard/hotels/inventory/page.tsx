'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Plus, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'

interface HotelInventory {
  id: string
  name: string
  city: string
  roomType: string
  totalRooms: number
  availableRooms: number
  costPerNight: number
  sellPricePerNight: number
}

const mockHotels: HotelInventory[] = [
  { id: '1', name: 'Burj Al Arab', city: 'Dubai', roomType: 'Suite', totalRooms: 5, availableRooms: 2, costPerNight: 25000, sellPricePerNight: 35000 },
  { id: '2', name: 'Sofitel Jeddah', city: 'Jeddah', roomType: 'Double', totalRooms: 20, availableRooms: 15, costPerNight: 8000, sellPricePerNight: 12000 },
  { id: '3', name: 'Hilton Makkah', city: 'Makkah', roomType: 'Twin', totalRooms: 10, availableRooms: 3, costPerNight: 12000, sellPricePerNight: 18000 },
]

export default function HotelsInventoryPage() {
  const [hotels, setHotels] = useState(mockHotels)
  const [searchQuery, setSearchQuery] = useState('')

  const filtered = hotels.filter(h => 
    h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    h.city.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const totalAvailable = hotels.reduce((sum, h) => sum + h.availableRooms, 0)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Hotel Inventory</h1>
          <p className="text-muted-foreground">Manage hotel contracts and availability</p>
        </div>
        <Button className="gap-2"><Plus className="h-4 w-4" /> Add Hotel</Button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Total Hotels</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">{hotels.length}</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Available Rooms</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">{totalAvailable}</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Occupancy Rate</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold text-blue-600">
            {((1 - totalAvailable / hotels.reduce((s, h) => s + h.totalRooms, 0)) * 100).toFixed(0)}%
          </div></CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Hotel List</CardTitle>
          <div className="relative mt-4">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search hotels..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filtered.map(hotel => (
              <div key={hotel.id} className="border rounded-lg p-4 flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">{hotel.name}</h3>
                  <div className="text-sm text-muted-foreground">{hotel.city} • {hotel.roomType} Rooms</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {hotel.availableRooms}/{hotel.totalRooms} available • Cost: Rs.{hotel.costPerNight}/night
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-green-600">Rs.{hotel.sellPricePerNight}/night</div>
                  <div className="text-xs text-muted-foreground">Margin: Rs.{hotel.sellPricePerNight - hotel.costPerNight}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
