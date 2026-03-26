'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Plus, Search, Filter, Edit, Trash2, MapPin, Users, Clock, DollarSign } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import Link from 'next/link'
import { toast } from 'sonner'

interface Tour {
  id: string
  name: string
  packageType: string
  destination: string
  duration: number
  basePrice: number
  sellPrice: number
  maxParticipants: number
  currentParticipants: number
  isActive: boolean
  createdAt: string
}

const mockTours: Tour[] = [
  {
    id: '1',
    name: 'Classic Dubai & Abu Dhabi',
    packageType: 'Tours',
    destination: 'UAE',
    duration: 5,
    basePrice: 45000,
    sellPrice: 65000,
    maxParticipants: 30,
    currentParticipants: 12,
    isActive: true,
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    name: 'Hajj Group Management',
    packageType: 'Hajj',
    destination: 'Saudi Arabia',
    duration: 14,
    basePrice: 250000,
    sellPrice: 350000,
    maxParticipants: 50,
    currentParticipants: 45,
    isActive: true,
    createdAt: '2024-01-10',
  },
  {
    id: '3',
    name: 'Umrah Premium Package',
    packageType: 'Umrah',
    destination: 'Saudi Arabia',
    duration: 10,
    basePrice: 85000,
    sellPrice: 120000,
    maxParticipants: 40,
    currentParticipants: 38,
    isActive: true,
    createdAt: '2024-01-08',
  },
]

export default function ToursPage() {
  const [tours, setTours] = useState<Tour[]>(mockTours)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState<string>('all')
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const filteredTours = useMemo(() => {
    return tours.filter(tour => {
      const matchesSearch = tour.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           tour.destination.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesType = filterType === 'all' || tour.packageType === filterType
      return matchesSearch && matchesType
    })
  }, [tours, searchQuery, filterType])

  const handleDelete = (id: string) => {
    setTours(tours.filter(t => t.id !== id))
    setDeleteId(null)
    toast.success('Tour deleted successfully')
  }

  const handleDuplicate = (tour: Tour) => {
    const newTour = {
      ...tour,
      id: Math.random().toString(),
      name: `${tour.name} (Copy)`,
      currentParticipants: 0,
    }
    setTours([newTour, ...tours])
    toast.success('Tour duplicated successfully')
  }

  const totalRevenue = filteredTours.reduce((sum, tour) => 
    sum + (tour.sellPrice * tour.currentParticipants), 0
  )
  
  const totalProfit = filteredTours.reduce((sum, tour) => 
    sum + ((tour.sellPrice - tour.basePrice) * tour.currentParticipants), 0
  )

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  }

  return (
    <div className="space-y-6">
      <motion.div initial="hidden" animate="visible" variants={containerVariants}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Tours & Packages</h1>
            <p className="text-muted-foreground mt-1">Manage your travel packages and tours</p>
          </div>
          <Link href="/dashboard/tours/create">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              New Tour
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Total Tours</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{filteredTours.length}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {filteredTours.filter(t => t.isActive).length} active
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {filteredTours.reduce((sum, t) => sum + t.currentParticipants, 0)}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {filteredTours.reduce((sum, t) => sum + (t.maxParticipants - t.currentParticipants), 0)} available seats
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Profit Margin</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  Rs. {(totalProfit / 100000).toFixed(1)}L
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {totalRevenue > 0 ? ((totalProfit / totalRevenue) * 100).toFixed(1) : 0}% margin
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>

      <motion.div initial="hidden" animate="visible" variants={containerVariants} className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Tours List</CardTitle>
            <CardDescription>View and manage all your tours and packages</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search tours or destinations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="md:w-40">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Tours">Tours</SelectItem>
                  <SelectItem value="Umrah">Umrah</SelectItem>
                  <SelectItem value="Hajj">Hajj</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              {filteredTours.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No tours found</p>
                </div>
              ) : (
                filteredTours.map((tour, idx) => (
                  <motion.div
                    key={tour.id}
                    variants={itemVariants}
                    className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-lg">{tour.name}</h3>
                          <Badge variant={tour.isActive ? 'default' : 'secondary'}>
                            {tour.packageType}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <MapPin className="h-4 w-4" />
                            {tour.destination}
                          </div>
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            {tour.duration} days
                          </div>
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Users className="h-4 w-4" />
                            {tour.currentParticipants}/{tour.maxParticipants}
                          </div>
                          <div className="flex items-center gap-1 text-green-600 font-semibold">
                            <DollarSign className="h-4 w-4" />
                            Rs. {(tour.sellPrice / 1000).toFixed(0)}K
                          </div>
                        </div>
                        <div className="mt-2 w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full transition-all"
                            style={{ width: `${(tour.currentParticipants / tour.maxParticipants) * 100}%` }}
                          />
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Link href={`/dashboard/tours/edit/${tour.id}`}>
                          <Button size="sm" variant="outline" className="gap-2">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDuplicate(tour)}
                        >
                          Copy
                        </Button>
                        <Dialog open={deleteId === tour.id} onOpenChange={(open) => !open && setDeleteId(null)}>
                          <DialogTrigger asChild>
                            <Button
                              size="sm"
                              variant="destructive"
                              className="gap-2"
                              onClick={() => setDeleteId(tour.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Delete Tour</DialogTitle>
                              <DialogDescription>
                                Are you sure you want to delete "{tour.name}"? This action cannot be undone.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="flex gap-3 justify-end">
                              <Button variant="outline" onClick={() => setDeleteId(null)}>
                                Cancel
                              </Button>
                              <Button
                                variant="destructive"
                                onClick={() => handleDelete(tour.id)}
                              >
                                Delete
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
