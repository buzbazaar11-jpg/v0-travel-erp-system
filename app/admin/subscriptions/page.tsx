'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { motion } from 'framer-motion'

const subscriptionData = [
  { month: 'Jan', basic: 120, medium: 80, advanced: 40, enterprise: 5 },
  { month: 'Feb', basic: 150, medium: 100, advanced: 50, enterprise: 8 },
  { month: 'Mar', basic: 180, medium: 130, advanced: 65, enterprise: 12 },
  { month: 'Apr', basic: 220, medium: 170, advanced: 85, enterprise: 18 },
]

const subscriptions = [
  { id: 1, business: 'Bright Travels', plan: 'Advanced', status: 'active', nextBilling: '2025-04-15', revenue: 35000 },
  { id: 2, business: 'Elite Tours', plan: 'Medium', status: 'active', nextBilling: '2025-04-10', revenue: 15000 },
  { id: 3, business: 'Journey Plus', plan: 'Basic', status: 'active', nextBilling: '2025-04-05', revenue: 5000 },
  { id: 4, business: 'Premium Holidays', plan: 'Enterprise', status: 'active', nextBilling: '2025-05-01', revenue: 99999 },
]

export default function AdminSubscriptionsPage() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Subscriptions Management</h1>
        <p className="text-muted-foreground">Manage all business subscriptions</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Total Active</p>
            <p className="text-3xl font-bold">415</p>
            <p className="text-xs text-green-600 mt-2">+23 this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">MRR</p>
            <p className="text-3xl font-bold">Rs 8.2M</p>
            <p className="text-xs text-green-600 mt-2">+18% growth</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Churn Rate</p>
            <p className="text-3xl font-bold">2.1%</p>
            <p className="text-xs text-red-600 mt-2">Down from 2.5%</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Avg MRR</p>
            <p className="text-3xl font-bold">Rs 19.8K</p>
            <p className="text-xs text-blue-600 mt-2">Per subscription</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Subscription Growth</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={subscriptionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="basic" stroke="#3b82f6" name="Basic" />
              <Line type="monotone" dataKey="medium" stroke="#10b981" name="Medium" />
              <Line type="monotone" dataKey="advanced" stroke="#f59e0b" name="Advanced" />
              <Line type="monotone" dataKey="enterprise" stroke="#8b5cf6" name="Enterprise" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Subscriptions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {subscriptions.map((sub) => (
              <div key={sub.id} className="flex items-center justify-between p-3 border rounded">
                <div>
                  <p className="font-medium">{sub.business}</p>
                  <p className="text-sm text-muted-foreground">Next billing: {sub.nextBilling}</p>
                </div>
                <div className="text-right">
                  <Badge>{sub.plan}</Badge>
                  <p className="text-sm font-bold mt-1">Rs {sub.revenue.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
