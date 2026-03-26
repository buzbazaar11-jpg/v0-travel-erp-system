'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'

export default function NewBookingPage() {
  const [step, setStep] = useState(1)
  const [bookingData, setBookingData] = useState({
    customer: '',
    package: '',
    departureDate: '',
    returnDate: '',
    passengers: '1',
  })

  const packages = [
    { id: 1, name: 'Umrah 7 Days', cost: 125000, revenue: 145000 },
    { id: 2, name: 'Hajj Package', cost: 300000, revenue: 350000 },
    { id: 3, name: 'Dubai Tours 5 Days', cost: 75000, revenue: 95000 },
    { id: 4, name: 'Turkey Tours 10 Days', cost: 85000, revenue: 120000 },
  ]

  const selectedPackage = packages.find(p => p.name === bookingData.package)
  const totalCost = selectedPackage ? selectedPackage.cost * parseInt(bookingData.passengers) : 0
  const totalRevenue = selectedPackage ? selectedPackage.revenue * parseInt(bookingData.passengers) : 0
  const profit = totalRevenue - totalCost

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Create New Booking</h1>
        <p className="text-muted-foreground mt-1">Step {step} of 4</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Step 1: Customer Selection */}
          {step === 1 && (
            <Card className="p-6 border-border/40">
              <h2 className="text-lg font-semibold text-foreground mb-6">Select Customer</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="customer">Customer</Label>
                  <Select value={bookingData.customer} onValueChange={(value) => setBookingData({...bookingData, customer: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a customer or create new" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ahmed">Ahmed Hassan</SelectItem>
                      <SelectItem value="fatima">Fatima Khan</SelectItem>
                      <SelectItem value="hassan">Hassan Malik</SelectItem>
                      <SelectItem value="zainab">Zainab Ali</SelectItem>
                      <SelectItem value="new">Create New Customer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                  <p className="text-sm text-muted-foreground">Email: customer@example.com</p>
                  <p className="text-sm text-muted-foreground">Phone: +92 300 1234567</p>
                  <p className="text-sm text-muted-foreground">Previous Bookings: 3</p>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button variant="outline" className="flex-1" disabled>
                    Back
                  </Button>
                  <Button
                    className="flex-1 gap-2"
                    onClick={() => setStep(2)}
                    disabled={!bookingData.customer}
                  >
                    Next <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* Step 2: Package Selection */}
          {step === 2 && (
            <Card className="p-6 border-border/40">
              <h2 className="text-lg font-semibold text-foreground mb-6">Select Package</h2>
              <div className="space-y-4">
                <Label>Travel Package</Label>
                <div className="grid gap-3">
                  {packages.map((pkg) => (
                    <button
                      key={pkg.id}
                      onClick={() => setBookingData({...bookingData, package: pkg.name})}
                      className={`p-4 border-2 rounded-lg text-left transition-all ${
                        bookingData.package === pkg.name
                          ? 'border-primary bg-primary/5'
                          : 'border-border/40 hover:border-border'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold text-foreground">{pkg.name}</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            Cost: PKR {pkg.cost.toLocaleString()} | Revenue: PKR {pkg.revenue.toLocaleString()}
                          </p>
                        </div>
                        <div className="text-sm font-semibold text-primary">
                          Margin: {Math.round(((pkg.revenue - pkg.cost) / pkg.cost) * 100)}%
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="flex gap-4 pt-4">
                  <Button variant="outline" className="flex-1" onClick={() => setStep(1)}>
                    Back
                  </Button>
                  <Button
                    className="flex-1 gap-2"
                    onClick={() => setStep(3)}
                    disabled={!bookingData.package}
                  >
                    Next <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* Step 3: Travel Dates & Passengers */}
          {step === 3 && (
            <Card className="p-6 border-border/40">
              <h2 className="text-lg font-semibold text-foreground mb-6">Travel Details</h2>
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="departure">Departure Date</Label>
                    <Input
                      id="departure"
                      type="date"
                      value={bookingData.departureDate}
                      onChange={(e) => setBookingData({...bookingData, departureDate: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="return">Return Date</Label>
                    <Input
                      id="return"
                      type="date"
                      value={bookingData.returnDate}
                      onChange={(e) => setBookingData({...bookingData, returnDate: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="passengers">Number of Passengers</Label>
                  <Select value={bookingData.passengers} onValueChange={(value) => setBookingData({...bookingData, passengers: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 10, 15, 20].map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                          {num} Passenger{num > 1 ? 's' : ''}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button variant="outline" className="flex-1" onClick={() => setStep(2)}>
                    Back
                  </Button>
                  <Button
                    className="flex-1 gap-2"
                    onClick={() => setStep(4)}
                    disabled={!bookingData.departureDate || !bookingData.returnDate}
                  >
                    Next <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* Step 4: Review & Confirm */}
          {step === 4 && (
            <Card className="p-6 border-border/40">
              <h2 className="text-lg font-semibold text-foreground mb-6">Review Booking</h2>
              <div className="space-y-4 mb-6">
                <div className="bg-muted/50 p-4 rounded-lg space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Customer:</span>
                    <span className="font-semibold text-foreground">{bookingData.customer}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Package:</span>
                    <span className="font-semibold text-foreground">{bookingData.package}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Travel Dates:</span>
                    <span className="font-semibold text-foreground">
                      {bookingData.departureDate} to {bookingData.returnDate}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Passengers:</span>
                    <span className="font-semibold text-foreground">{bookingData.passengers}</span>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button variant="outline" className="flex-1" onClick={() => setStep(3)}>
                    Back
                  </Button>
                  <Button className="flex-1 gap-2">
                    Create Booking
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Summary Sidebar */}
        <div className="space-y-4">
          <Card className="p-6 border-border/40 sticky top-6">
            <h3 className="font-semibold text-foreground mb-4">Booking Summary</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between pb-3 border-b border-border/40">
                <span className="text-muted-foreground">Cost per Unit:</span>
                <span className="font-semibold">PKR {selectedPackage?.cost.toLocaleString() || '—'}</span>
              </div>
              <div className="flex justify-between pb-3 border-b border-border/40">
                <span className="text-muted-foreground">Total Units:</span>
                <span className="font-semibold">{bookingData.passengers}</span>
              </div>
              <div className="flex justify-between pb-3 border-b border-border/40">
                <span className="text-muted-foreground">Total Cost:</span>
                <span className="font-semibold">PKR {totalCost.toLocaleString()}</span>
              </div>
              <div className="flex justify-between pb-3 border-b border-border/40">
                <span className="text-muted-foreground">Total Revenue:</span>
                <span className="font-semibold text-primary">PKR {totalRevenue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between pt-3 bg-green-50 p-3 rounded">
                <span className="font-semibold text-foreground">Total Profit:</span>
                <span className="font-bold text-green-600">PKR {profit.toLocaleString()}</span>
              </div>
            </div>
          </Card>

          {/* Progress */}
          <Card className="p-4 border-border/40">
            <h4 className="text-sm font-semibold text-foreground mb-3">Progress</h4>
            <div className="space-y-2">
              {[1, 2, 3, 4].map((s) => (
                <button
                  key={s}
                  onClick={() => s <= step && setStep(s)}
                  className={`w-full p-2 rounded text-sm font-medium transition-all ${
                    s === step
                      ? 'bg-primary text-primary-foreground'
                      : s < step
                        ? 'bg-primary/20 text-primary cursor-pointer'
                        : 'bg-muted text-muted-foreground'
                  }`}
                >
                  Step {s}
                </button>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
