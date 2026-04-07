'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, X } from 'lucide-react'
import { toast } from 'sonner'
import { motion } from 'framer-motion'

const plans = [
  {
    id: 'basic',
    name: 'Basic',
    price: 5000,
    duration: 'monthly',
    description: 'Perfect for startups',
    features: [
      'Up to 3 users',
      'Basic booking management',
      'Simple invoicing',
      'Customer database',
      'Email support',
    ],
    limitations: [
      'Limited to 100 bookings/month',
      'No advanced reporting',
      'No custom branding',
    ],
  },
  {
    id: 'medium',
    name: 'Medium',
    price: 15000,
    duration: 'monthly',
    description: 'For growing businesses',
    features: [
      'Up to 10 users',
      'Advanced booking management',
      'Full invoicing with GST',
      'CRM and lead management',
      'Priority email support',
      'Advanced reports',
    ],
    limitations: [
      'Limited to 1000 bookings/month',
      'Basic custom branding',
    ],
  },
  {
    id: 'advanced',
    name: 'Advanced',
    price: 35000,
    duration: 'monthly',
    description: 'For established companies',
    features: [
      'Up to 25 users',
      'All booking features',
      'Full accounting system',
      'Advanced CRM',
      'Phone + email support',
      'Custom reports',
      'API access',
      'Visa tracking',
      'Hotel inventory',
    ],
    limitations: [],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 99999,
    duration: 'monthly',
    description: 'For large organizations',
    features: [
      'Unlimited users',
      'All features included',
      'Dedicated account manager',
      'Custom development',
      '24/7 phone support',
      'Advanced analytics',
      'Multi-branch support',
      'Custom branding',
      'API & webhooks',
      'White-label option',
    ],
    limitations: [],
  },
]

export default function SubscriptionPlansPage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSelectPlan = async (planId: string) => {
    setLoading(true)
    try {
      const response = await fetch('/api/subscriptions/upgrade', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planId }),
      })
      
      if (response.ok) {
        toast.success('Plan selected! Processing payment...')
        setTimeout(() => {
          window.location.href = '/dashboard'
        }, 2000)
      }
    } catch (error) {
      toast.error('Failed to select plan')
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl font-bold">Choose Your Plan</h1>
        <p className="text-xl text-muted-foreground">Start with a plan that fits your needs. Upgrade anytime.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className={`relative flex flex-col h-full ${plan.id === 'advanced' ? 'ring-2 ring-blue-500' : ''}`}>
              {plan.id === 'advanced' && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2">Popular</Badge>
              )}
              <CardHeader>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
              </CardHeader>
              <CardContent className="flex-1 space-y-6">
                <div>
                  <span className="text-4xl font-bold">Rs {plan.price.toLocaleString()}</span>
                  <span className="text-muted-foreground">/{plan.duration}</span>
                </div>

                <div className="space-y-3">
                  <p className="font-semibold text-sm">What's included:</p>
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {plan.limitations.length > 0 && (
                  <div className="space-y-2 pt-4 border-t">
                    <p className="font-semibold text-sm text-muted-foreground">Limitations:</p>
                    {plan.limitations.map((limitation) => (
                      <div key={limitation} className="flex gap-2">
                        <X className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">{limitation}</span>
                      </div>
                    ))}
                  </div>
                )}

                <Button
                  onClick={() => handleSelectPlan(plan.id)}
                  disabled={loading}
                  className={`w-full mt-4 ${plan.id === 'advanced' ? '' : 'variant-outline'}`}
                >
                  {loading ? 'Processing...' : 'Choose Plan'}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <p className="text-center text-sm">
            All plans include 14-day free trial. No credit card required. Cancel anytime.
          </p>
        </CardContent>
      </Card>
    </motion.div>
  )
}
