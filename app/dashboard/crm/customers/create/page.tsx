'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'sonner'
import { motion } from 'framer-motion'

export default function CreateCustomer() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    customer_type: 'INDIVIDUAL',
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    phone_country_code: '+92',
    passport_number: '',
    passport_expiry: '',
    cnic_number: '',
    address: '',
    city: '',
    province: '',
    country: 'Pakistan',
    date_of_birth: '',
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
      const response = await fetch('/api/customers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error('Failed to create customer')
      
      toast.success('Customer created successfully!')
      router.push('/dashboard/crm/customers')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Error creating customer')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Add New Customer</h1>
        <p className="text-muted-foreground mt-2">Create a new customer profile</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Customer Information</CardTitle>
            <CardDescription>Fill in the customer details</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Customer Type</Label>
                  <Select value={formData.customer_type} onValueChange={(val) => handleChange('customer_type', val)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="INDIVIDUAL">Individual</SelectItem>
                      <SelectItem value="CORPORATE">Corporate</SelectItem>
                      <SelectItem value="AGENT">Agent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Date of Birth</Label>
                  <Input
                    type="date"
                    value={formData.date_of_birth}
                    onChange={(e) => handleChange('date_of_birth', e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>First Name *</Label>
                  <Input
                    placeholder="First name"
                    value={formData.first_name}
                    onChange={(e) => handleChange('first_name', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label>Last Name</Label>
                  <Input
                    placeholder="Last name"
                    value={formData.last_name}
                    onChange={(e) => handleChange('last_name', e.target.value)}
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
                  <Label>Phone *</Label>
                  <div className="flex gap-2">
                    <Input
                      className="w-20"
                      value={formData.phone_country_code}
                      onChange={(e) => handleChange('phone_country_code', e.target.value)}
                      placeholder="+92"
                    />
                    <Input
                      placeholder="3001234567"
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>CNIC Number</Label>
                  <Input
                    placeholder="12345-6789012-3"
                    value={formData.cnic_number}
                    onChange={(e) => handleChange('cnic_number', e.target.value)}
                  />
                </div>
                <div>
                  <Label>Passport Number</Label>
                  <Input
                    placeholder="AB123456"
                    value={formData.passport_number}
                    onChange={(e) => handleChange('passport_number', e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label>Passport Expiry Date</Label>
                <Input
                  type="date"
                  value={formData.passport_expiry}
                  onChange={(e) => handleChange('passport_expiry', e.target.value)}
                />
              </div>

              <div>
                <Label>Address</Label>
                <Input
                  placeholder="Full address"
                  value={formData.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>City</Label>
                  <Input
                    placeholder="City"
                    value={formData.city}
                    onChange={(e) => handleChange('city', e.target.value)}
                  />
                </div>
                <div>
                  <Label>Province</Label>
                  <Input
                    placeholder="Province"
                    value={formData.province}
                    onChange={(e) => handleChange('province', e.target.value)}
                  />
                </div>
                <div>
                  <Label>Country</Label>
                  <Input
                    placeholder="Country"
                    value={formData.country}
                    onChange={(e) => handleChange('country', e.target.value)}
                  />
                </div>
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
                  {isLoading ? 'Creating...' : 'Create Customer'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
