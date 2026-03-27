'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'sonner'
import { motion } from 'framer-motion'

export default function CreateLead() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    travel_type: 'Tours',
    destination: '',
    budget_min: 0,
    budget_max: 0,
    source: 'Website',
    notes: '',
  })

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.first_name || !formData.email || !formData.phone) {
      toast.error('Please fill required fields')
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          status: 'NEW',
          lead_score: 0,
        }),
      })

      if (!response.ok) throw new Error('Failed to create lead')
      
      toast.success('Lead created successfully!')
      router.push('/dashboard/crm/leads')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Error creating lead')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Add New Lead</h1>
        <p className="text-muted-foreground mt-2">Create a new lead for your sales pipeline</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Lead Information</CardTitle>
            <CardDescription>Fill in the lead details</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Title</Label>
                  <Input
                    placeholder="Mr./Ms./Dr."
                    value={formData.title}
                    onChange={(e) => handleChange('title', e.target.value)}
                  />
                </div>
                <div>
                  <Label>First Name *</Label>
                  <Input
                    placeholder="First name"
                    value={formData.first_name}
                    onChange={(e) => handleChange('first_name', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Last Name</Label>
                  <Input
                    placeholder="Last name"
                    value={formData.last_name}
                    onChange={(e) => handleChange('last_name', e.target.value)}
                  />
                </div>
                <div>
                  <Label>Phone *</Label>
                  <Input
                    placeholder="+92 300 1234567"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Email *</Label>
                  <Input
                    type="email"
                    placeholder="email@example.com"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label>Travel Type</Label>
                  <Select value={formData.travel_type} onValueChange={(val) => handleChange('travel_type', val)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Umrah">Umrah</SelectItem>
                      <SelectItem value="Hajj">Hajj</SelectItem>
                      <SelectItem value="Tours">Tours</SelectItem>
                      <SelectItem value="Visa">Visa Service</SelectItem>
                      <SelectItem value="Flights">Flights</SelectItem>
                      <SelectItem value="Hotels">Hotels</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Destination</Label>
                  <Input
                    placeholder="e.g., Saudi Arabia"
                    value={formData.destination}
                    onChange={(e) => handleChange('destination', e.target.value)}
                  />
                </div>
                <div>
                  <Label>Source</Label>
                  <Select value={formData.source} onValueChange={(val) => handleChange('source', val)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Website">Website</SelectItem>
                      <SelectItem value="Referral">Referral</SelectItem>
                      <SelectItem value="Social Media">Social Media</SelectItem>
                      <SelectItem value="Email">Email</SelectItem>
                      <SelectItem value="Phone">Phone</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Budget Min (PKR)</Label>
                  <Input
                    type="number"
                    value={formData.budget_min}
                    onChange={(e) => handleChange('budget_min', parseFloat(e.target.value))}
                  />
                </div>
                <div>
                  <Label>Budget Max (PKR)</Label>
                  <Input
                    type="number"
                    value={formData.budget_max}
                    onChange={(e) => handleChange('budget_max', parseFloat(e.target.value))}
                  />
                </div>
              </div>

              <div>
                <Label>Notes</Label>
                <Textarea
                  placeholder="Additional notes about this lead"
                  value={formData.notes}
                  onChange={(e) => handleChange('notes', e.target.value)}
                  rows={4}
                />
              </div>

              <div className="flex gap-3 justify-end">
                <Button
                  variant="outline"
                  onClick={() => router.back()}
                  type="button"
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? 'Creating...' : 'Create Lead'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
