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
import { ChevronRight, Loader2 } from 'lucide-react'

export default function CreateBooking() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState(1)
  
  const [formData, setFormData] = useState({
    customer_id: '',
    package_id: '',
    departure_date: '',
    return_date: '',
    number_of_passengers: 1,
    total_cost: 0,
    total_revenue: 0,
    gst_amount: 0,
  })

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const calculateGST = () => {
    const gst = formData.total_cost * 0.17
    const revenue = formData.total_cost + gst
    setFormData(prev => ({
      ...prev,
      gst_amount: gst,
      total_revenue: revenue,
    }))
  }

  const handleSubmit = async () => {
    if (step < 3) {
      setStep(step + 1)
      return
    }

    if (!formData.customer_id || !formData.package_id || !formData.departure_date) {
      toast.error('Please fill all required fields')
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error('Failed to create booking')
      
      const data = await response.json()
      toast.success('Booking created successfully!')
      router.push(`/dashboard/bookings/${data[0].id}`)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Error creating booking')
    } finally {
      setIsLoading(false)
    }
  }

  const steps = [
    { number: 1, title: 'Select Customer' },
    { number: 2, title: 'Choose Package' },
    { number: 3, title: 'Set Dates & Cost' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Create New Booking</h1>
        <p className="text-muted-foreground mt-2">Add a new booking for a customer</p>
      </div>

      {/* Progress Steps */}
      <div className="flex justify-between items-center">
        {steps.map((s, idx) => (
          <div key={s.number} className="flex items-center flex-1">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                step >= s.number ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'
              }`}
            >
              {s.number}
            </motion.div>
            {idx < steps.length - 1 && (
              <div className={`flex-1 h-1 mx-2 ${step > s.number ? 'bg-primary' : 'bg-muted'}`} />
            )}
          </div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        key={step}
      >
        <Card>
          <CardHeader>
            <CardTitle>{steps[step - 1].title}</CardTitle>
            <CardDescription>Step {step} of {steps.length}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {step === 1 && (
              <div className="space-y-4">
                <Label>Customer Name</Label>
                <Input
                  placeholder="Select or enter customer"
                  value={formData.customer_id}
                  onChange={(e) => handleInputChange('customer_id', e.target.value)}
                />
                <p className="text-sm text-muted-foreground">Enter customer ID or select from list</p>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <Label>Tour Package</Label>
                <Select value={formData.package_id} onValueChange={(val) => handleInputChange('package_id', val)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select package" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pkg1">Umrah Gold 5 Days</SelectItem>
                    <SelectItem value="pkg2">Hajj Premium 10 Days</SelectItem>
                    <SelectItem value="pkg3">Dubai Tour 7 Days</SelectItem>
                    <SelectItem value="pkg4">Thailand Tour 5 Days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Departure Date</Label>
                    <Input
                      type="date"
                      value={formData.departure_date}
                      onChange={(e) => handleInputChange('departure_date', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Return Date</Label>
                    <Input
                      type="date"
                      value={formData.return_date}
                      onChange={(e) => handleInputChange('return_date', e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Number of Passengers</Label>
                    <Input
                      type="number"
                      min="1"
                      value={formData.number_of_passengers}
                      onChange={(e) => handleInputChange('number_of_passengers', parseInt(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label>Total Cost (PKR)</Label>
                    <Input
                      type="number"
                      value={formData.total_cost}
                      onChange={(e) => handleInputChange('total_cost', parseFloat(e.target.value))}
                      onBlur={calculateGST}
                    />
                  </div>
                </div>

                <div className="bg-muted p-4 rounded-lg space-y-2">
                  <p className="text-sm"><strong>GST (17%):</strong> PKR {formData.gst_amount.toFixed(2)}</p>
                  <p className="text-sm"><strong>Total Revenue:</strong> PKR {formData.total_revenue.toFixed(2)}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      <div className="flex gap-3 justify-between">
        <Button
          variant="outline"
          onClick={() => step > 1 && setStep(step - 1)}
          disabled={step === 1}
        >
          Back
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={isLoading}
          className="gap-2"
        >
          {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ChevronRight className="w-4 h-4" />}
          {step === 3 ? 'Create Booking' : 'Next'}
        </Button>
      </div>
    </div>
  )
}
