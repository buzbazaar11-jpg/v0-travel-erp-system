'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'
import { motion } from 'framer-motion'

export default function RegisterBusinessPage() {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  
  const [formData, setFormData] = useState({
    businessName: '',
    registrationNumber: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    province: '',
    postalCode: '',
    adminFirstName: '',
    adminLastName: '',
    adminEmail: '',
    adminPhone: '',
    adminPassword: '',
    subscriptionPlan: 'basic',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/auth/register-business', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()
      if (!response.ok) throw new Error(data.error)

      toast.success('Business registered! Redirecting...')
      router.push('/auth/login')
    } catch (error: any) {
      toast.error(error.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted p-6 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl"
      >
        <Card className="border-border/50 shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl">Register Your Business</CardTitle>
            <CardDescription>Step {step} of 3 - Complete your travel business profile</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Step 1: Business Info */}
              {step === 1 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Business Name *</Label>
                      <Input
                        value={formData.businessName}
                        onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                        placeholder="Your Travel Agency"
                        required
                      />
                    </div>
                    <div>
                      <Label>Registration Number *</Label>
                      <Input
                        value={formData.registrationNumber}
                        onChange={(e) => setFormData({ ...formData, registrationNumber: e.target.value })}
                        placeholder="REG123456"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Email *</Label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="business@example.com"
                        required
                      />
                    </div>
                    <div>
                      <Label>Phone *</Label>
                      <Input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+92 300 1234567"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Address *</Label>
                    <Input
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="Street address"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label>City *</Label>
                      <Input
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        placeholder="Karachi"
                        required
                      />
                    </div>
                    <div>
                      <Label>Province *</Label>
                      <Input
                        value={formData.province}
                        onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                        placeholder="Sindh"
                        required
                      />
                    </div>
                    <div>
                      <Label>Postal Code *</Label>
                      <Input
                        value={formData.postalCode}
                        onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                        placeholder="75000"
                        required
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Admin Info */}
              {step === 2 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>First Name *</Label>
                      <Input
                        value={formData.adminFirstName}
                        onChange={(e) => setFormData({ ...formData, adminFirstName: e.target.value })}
                        placeholder="Ahmed"
                        required
                      />
                    </div>
                    <div>
                      <Label>Last Name *</Label>
                      <Input
                        value={formData.adminLastName}
                        onChange={(e) => setFormData({ ...formData, adminLastName: e.target.value })}
                        placeholder="Hassan"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Email *</Label>
                    <Input
                      type="email"
                      value={formData.adminEmail}
                      onChange={(e) => setFormData({ ...formData, adminEmail: e.target.value })}
                      placeholder="admin@yourcompany.com"
                      required
                    />
                  </div>

                  <div>
                    <Label>Phone *</Label>
                    <Input
                      type="tel"
                      value={formData.adminPhone}
                      onChange={(e) => setFormData({ ...formData, adminPhone: e.target.value })}
                      placeholder="+92 300 9876543"
                      required
                    />
                  </div>

                  <div>
                    <Label>Password *</Label>
                    <Input
                      type="password"
                      value={formData.adminPassword}
                      onChange={(e) => setFormData({ ...formData, adminPassword: e.target.value })}
                      placeholder="At least 8 characters"
                      required
                    />
                  </div>
                </motion.div>
              )}

              {/* Step 3: Plan Selection */}
              {step === 3 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                  <Label>Select Subscription Plan *</Label>
                  <Select value={formData.subscriptionPlan} onValueChange={(value) => setFormData({ ...formData, subscriptionPlan: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basic">Basic - PKR 5,000/month (Bookings & CRM)</SelectItem>
                      <SelectItem value="medium">Medium - PKR 15,000/month (+ Invoicing & Finance)</SelectItem>
                      <SelectItem value="advanced">Advanced - PKR 30,000/month (All + Analytics)</SelectItem>
                      <SelectItem value="enterprise">Enterprise - Custom (Everything)</SelectItem>
                    </SelectContent>
                  </Select>

                  <div className="bg-blue-50 p-4 rounded">
                    <p className="text-sm font-semibold mb-2">Plan Features:</p>
                    {formData.subscriptionPlan === 'basic' && (
                      <ul className="text-sm space-y-1">
                        <li>✓ 5 Team Members</li>
                        <li>✓ Unlimited Bookings</li>
                        <li>✓ CRM & Lead Management</li>
                        <li>✓ Basic Dashboard</li>
                      </ul>
                    )}
                    {formData.subscriptionPlan === 'medium' && (
                      <ul className="text-sm space-y-1">
                        <li>✓ 25 Team Members</li>
                        <li>✓ Unlimited Everything</li>
                        <li>✓ Invoicing & Payments</li>
                        <li>✓ Finance Module</li>
                      </ul>
                    )}
                    {formData.subscriptionPlan === 'advanced' && (
                      <ul className="text-sm space-y-1">
                        <li>✓ 100 Team Members</li>
                        <li>✓ All Features</li>
                        <li>✓ Advanced Analytics</li>
                        <li>✓ AI Features</li>
                      </ul>
                    )}
                    {formData.subscriptionPlan === 'enterprise' && (
                      <ul className="text-sm space-y-1">
                        <li>✓ Unlimited Everything</li>
                        <li>✓ All Features</li>
                        <li>✓ Priority Support</li>
                        <li>✓ Custom Integration</li>
                      </ul>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(step - 1)}
                  disabled={step === 1}
                >
                  Previous
                </Button>

                {step < 3 ? (
                  <Button type="button" onClick={() => setStep(step + 1)}>
                    Next
                  </Button>
                ) : (
                  <Button type="submit" disabled={loading}>
                    {loading ? 'Registering...' : 'Register Business'}
                  </Button>
                )}
              </div>

              <div className="text-center text-sm text-muted-foreground">
                Already have a business account? <Link href="/auth/login" className="text-primary hover:underline">Sign in</Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
