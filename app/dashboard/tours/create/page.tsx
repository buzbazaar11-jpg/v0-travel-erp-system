'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Plus, X } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'

export default function CreateTourPage() {
  const router = useRouter()
  const [activeStep, setActiveStep] = useState(0)
  const [formData, setFormData] = useState({
    name: '',
    type: 'Tours',
    destination: '',
    duration: '',
    basePrice: '',
    sellPrice: '',
    maxParticipants: '',
    inclusions: [''],
    exclusions: [''],
    description: '',
  })

  const steps = ['Basic Info', 'Pricing & Capacity', 'Inclusions & Details']

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleArrayChange = (field: 'inclusions' | 'exclusions', index: number, value: string) => {
    const newArray = [...formData[field]]
    newArray[index] = value
    setFormData(prev => ({ ...prev, [field]: newArray }))
  }

  const addArrayItem = (field: 'inclusions' | 'exclusions') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }))
  }

  const removeArrayItem = (field: 'inclusions' | 'exclusions', index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name || !formData.destination || !formData.duration) {
      toast.error('Please fill all required fields')
      return
    }

    toast.success('Tour created successfully!')
    setTimeout(() => router.push('/dashboard/tours/list'), 1000)
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  }

  return (
    <motion.div
      className="space-y-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="flex items-center gap-3">
        <Link href="/dashboard/tours/list">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Create New Tour</h1>
          <p className="text-muted-foreground">Set up a new tour package for your customers</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Tour Details</CardTitle>
            <CardDescription>Configure your tour package step by step</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Tabs value={activeStep.toString()} onValueChange={(v) => setActiveStep(parseInt(v))}>
              <TabsList className="grid w-full grid-cols-3">
                {steps.map((step, idx) => (
                  <TabsTrigger key={idx} value={idx.toString()}>
                    {step}
                  </TabsTrigger>
                ))}
              </TabsList>

              {/* Step 1: Basic Info */}
              <TabsContent value="0" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Tour Name *</Label>
                  <Input
                    id="name"
                    placeholder="e.g., Classic Dubai & Abu Dhabi"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="type">Package Type *</Label>
                    <Select value={formData.type} onValueChange={(v) => handleInputChange('type', v)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Tours">Tours</SelectItem>
                        <SelectItem value="Umrah">Umrah</SelectItem>
                        <SelectItem value="Hajj">Hajj</SelectItem>
                        <SelectItem value="Visa">Visa Service</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="destination">Destination *</Label>
                    <Input
                      id="destination"
                      placeholder="e.g., UAE"
                      value={formData.destination}
                      onChange={(e) => handleInputChange('destination', e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duration">Duration (Days) *</Label>
                  <Input
                    id="duration"
                    type="number"
                    placeholder="e.g., 5"
                    value={formData.duration}
                    onChange={(e) => handleInputChange('duration', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your tour package..."
                    rows={4}
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                  />
                </div>
              </TabsContent>

              {/* Step 2: Pricing & Capacity */}
              <TabsContent value="1" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="basePrice">Base Cost (Rs.) *</Label>
                    <Input
                      id="basePrice"
                      type="number"
                      placeholder="50000"
                      value={formData.basePrice}
                      onChange={(e) => handleInputChange('basePrice', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sellPrice">Selling Price (Rs.) *</Label>
                    <Input
                      id="sellPrice"
                      type="number"
                      placeholder="75000"
                      value={formData.sellPrice}
                      onChange={(e) => handleInputChange('sellPrice', e.target.value)}
                    />
                  </div>
                </div>

                {formData.basePrice && formData.sellPrice && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-green-900">Profit Margin per Booking:</span>
                      <span className="text-lg font-bold text-green-700">
                        Rs. {(parseInt(formData.sellPrice) - parseInt(formData.basePrice)).toLocaleString()}
                        ({(((parseInt(formData.sellPrice) - parseInt(formData.basePrice)) / parseInt(formData.basePrice)) * 100).toFixed(1)}%)
                      </span>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="maxParticipants">Max Participants *</Label>
                  <Input
                    id="maxParticipants"
                    type="number"
                    placeholder="30"
                    value={formData.maxParticipants}
                    onChange={(e) => handleInputChange('maxParticipants', e.target.value)}
                  />
                </div>
              </TabsContent>

              {/* Step 3: Inclusions & Details */}
              <TabsContent value="2" className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <Label>What's Included</Label>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => addArrayItem('inclusions')}
                        className="gap-2"
                      >
                        <Plus className="h-4 w-4" />
                        Add Item
                      </Button>
                    </div>
                    {formData.inclusions.map((item, idx) => (
                      <div key={idx} className="flex gap-2 mb-2">
                        <Input
                          placeholder="e.g., 5-star hotel accommodation"
                          value={item}
                          onChange={(e) => handleArrayChange('inclusions', idx, e.target.value)}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeArrayItem('inclusions', idx)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <Label>What's Excluded</Label>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => addArrayItem('exclusions')}
                        className="gap-2"
                      >
                        <Plus className="h-4 w-4" />
                        Add Item
                      </Button>
                    </div>
                    {formData.exclusions.map((item, idx) => (
                      <div key={idx} className="flex gap-2 mb-2">
                        <Input
                          placeholder="e.g., Meals not mentioned in itinerary"
                          value={item}
                          onChange={(e) => handleArrayChange('exclusions', idx, e.target.value)}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeArrayItem('exclusions', idx)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex justify-between pt-6 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                disabled={activeStep === 0}
              >
                Previous
              </Button>
              <div className="flex gap-3">
                {activeStep < steps.length - 1 && (
                  <Button
                    type="button"
                    onClick={() => setActiveStep(activeStep + 1)}
                  >
                    Next
                  </Button>
                )}
                {activeStep === steps.length - 1 && (
                  <Button type="submit">Create Tour</Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </form>
    </motion.div>
  )
}
