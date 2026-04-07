'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Plus, Edit, Trash2, Search } from 'lucide-react'
import { toast } from 'sonner'
import { motion } from 'framer-motion'

interface Business {
  id: string
  name: string
  email: string
  phone: string
  subscription_plan: string
  status: string
  created_at: string
  monthly_revenue: number
}

export default function AdminBusinessesPage() {
  const [businesses, setBusinesses] = useState<Business[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    fetchBusinesses()
  }, [])

  const fetchBusinesses = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/admin/businesses')
      const data = await response.json()
      setBusinesses(data || [])
    } catch (error) {
      toast.error('Failed to load businesses')
    } finally {
      setLoading(false)
    }
  }

  const filteredBusinesses = businesses.filter(b =>
    b.name.toLowerCase().includes(search.toLowerCase()) ||
    b.email.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">All Businesses</h1>
          <p className="text-muted-foreground">Manage all companies using the platform</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex gap-4 items-center">
            <Input
              placeholder="Search businesses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1"
              prefix={<Search className="w-4 h-4" />}
            />
            <Button onClick={fetchBusinesses}>Refresh</Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Business Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Monthly Revenue</TableHead>
                <TableHead>Joined</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBusinesses.map((business) => (
                <TableRow key={business.id}>
                  <TableCell className="font-medium">{business.name}</TableCell>
                  <TableCell>{business.email}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{business.subscription_plan}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={business.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                      {business.status}
                    </Badge>
                  </TableCell>
                  <TableCell>Rs {business.monthly_revenue.toLocaleString()}</TableCell>
                  <TableCell>{new Date(business.created_at).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </motion.div>
  )
}
