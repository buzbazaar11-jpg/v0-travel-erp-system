'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Plus, Search, Edit, Trash2, MapPin, Users, Calendar } from 'lucide-react'
import { toast } from 'sonner'
import Link from 'next/link'

interface Booking {
  id: string
  booking_reference_number: string
  customer_name: string
  package_name: string
  destination: string
  number_of_passengers: number
  departure_date: string
  return_date: string
  total_cost: number
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED'
}

const statusColor: Record<string, string> = {
  'PENDING': 'bg-yellow-100 text-yellow-800',
  'CONFIRMED': 'bg-green-100 text-green-800',
  'CANCELLED': 'bg-red-100 text-red-800',
  'COMPLETED': 'bg-blue-100 text-blue-800',
}

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<Partial<Booking>>({})
  const [isEditOpen, setIsEditOpen] = useState(false)

  useEffect(() => {
    fetchBookings()
    // Auto-refresh every 5 seconds
    const interval = setInterval(fetchBookings, 5000)
    return () => clearInterval(interval)
  }, [])

  const fetchBookings = async () => {
    try {
      const res = await fetch('/api/bookings')
      if (!res.ok) throw new Error('Failed to fetch')
      const data = await res.json()
      setBookings(Array.isArray(data) ? data : [])
    } catch (error) {
      toast.error('Failed to load bookings')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this booking?')) return
    try {
      const res = await fetch(`/api/bookings/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Failed to delete')
      toast.success('Booking deleted')
      fetchBookings()
    } catch (error) {
      toast.error('Failed to delete booking')
    }
  }

  const handleEdit = (booking: Booking) => {
    setEditingId(booking.id)
    setEditForm(booking)
    setIsEditOpen(true)
  }

  const handleSaveEdit = async () => {
    if (!editingId) return
    try {
      const res = await fetch(`/api/bookings/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm),
      })
      if (!res.ok) throw new Error('Failed to update')
      toast.success('Booking updated')
      setIsEditOpen(false)
      fetchBookings()
    } catch (error) {
      toast.error('Failed to update booking')
    }
  }

  const filtered = bookings.filter(b =>
    b.customer_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.booking_reference_number?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const totalRevenue = bookings.reduce((sum, b) => sum + (b.total_cost || 0), 0)
  const confirmedCount = bookings.filter(b => b.status === 'CONFIRMED').length

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Bookings Management</h1>
          <p className="text-muted-foreground">Manage customer bookings and reservations</p>
        </div>
        <Link href="/dashboard/bookings/create">
          <Button className="gap-2"><Plus className="h-4 w-4" /> New Booking</Button>
        </Link>
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
          {loading ? (
            <div className="text-center py-8">Loading bookings...</div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">No bookings found</div>
          ) : (
            <div className="space-y-3">
              {filtered.map(booking => (
                <div key={booking.id} className="border rounded-lg p-4 flex justify-between items-center hover:bg-muted/50 transition">
                  <div>
                    <h3 className="font-semibold">{booking.booking_reference_number} - {booking.customer_name}</h3>
                    <div className="text-sm text-muted-foreground mt-1">{booking.package_name}</div>
                    <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {booking.destination}</span>
                      <span className="flex items-center gap-1"><Users className="h-3 w-3" /> {booking.number_of_passengers} passengers</span>
                      <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {booking.departure_date}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">Rs.{booking.total_cost?.toLocaleString()}</div>
                    <div className={`text-xs px-2 py-1 rounded mt-1 inline-block ${statusColor[booking.status] || 'bg-gray-100'}`}>
                      {booking.status}
                    </div>
                    <div className="flex gap-1 mt-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm" onClick={() => handleEdit(booking)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Edit Booking</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-3">
                            <div>
                              <Label>Customer Name</Label>
                              <Input value={editForm.customer_name || ''} onChange={(e) => setEditForm({...editForm, customer_name: e.target.value})} />
                            </div>
                            <div>
                              <Label>Status</Label>
                              <select value={editForm.status || 'PENDING'} onChange={(e) => setEditForm({...editForm, status: e.target.value as any})} className="w-full border rounded px-2 py-1">
                                <option>PENDING</option>
                                <option>CONFIRMED</option>
                                <option>CANCELLED</option>
                                <option>COMPLETED</option>
                              </select>
                            </div>
                            <div>
                              <Label>Total Cost</Label>
                              <Input type="number" value={editForm.total_cost || 0} onChange={(e) => setEditForm({...editForm, total_cost: parseFloat(e.target.value)})} />
                            </div>
                            <Button onClick={handleSaveEdit} className="w-full">Save Changes</Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button variant="ghost" size="sm" className="text-destructive" onClick={() => handleDelete(booking.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
