'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { motion } from 'framer-motion'

const revenueData = [
  { plan: 'Basic', revenue: 1200000, users: 240, avgMRR: 5000 },
  { plan: 'Medium', revenue: 3600000, users: 240, avgMRR: 15000 },
  { plan: 'Advanced', revenue: 2800000, users: 80, avgMRR: 35000 },
  { plan: 'Enterprise', revenue: 1500000, users: 15, avgMRR: 100000 },
]

export default function AdminReportsPage() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Reports & Analytics</h1>
        <p className="text-muted-foreground">Platform analytics and insights</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Annual Revenue</p>
            <p className="text-3xl font-bold">Rs 98.4M</p>
            <p className="text-xs text-green-600 mt-2">+45% YoY</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Total Businesses</p>
            <p className="text-3xl font-bold">5,234</p>
            <p className="text-xs text-green-600 mt-2">+230 this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Avg Retention</p>
            <p className="text-3xl font-bold">94.2%</p>
            <p className="text-xs text-green-600 mt-2">+2.1% improvement</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">NPS Score</p>
            <p className="text-3xl font-bold">72</p>
            <p className="text-xs text-green-600 mt-2">Excellent</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Revenue by Plan</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="plan" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="revenue" fill="#3b82f6" name="Revenue (Rs)" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Plan Distribution</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {revenueData.map((item) => (
              <div key={item.plan} className="flex justify-between">
                <p className="text-sm">{item.plan}</p>
                <p className="font-bold">{item.users} users</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Performing</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm font-medium">Plan: Medium</p>
              <p className="text-xs text-muted-foreground">Rs 3.6M revenue</p>
            </div>
            <div>
              <p className="text-sm font-medium">Plan: Advanced</p>
              <p className="text-xs text-muted-foreground">Rs 2.8M revenue</p>
            </div>
            <div>
              <p className="text-sm font-medium">Plan: Basic</p>
              <p className="text-xs text-muted-foreground">Rs 1.2M revenue</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Key Metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm text-muted-foreground">Avg Revenue/User</p>
              <p className="font-bold">Rs 18,800</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Churn Rate</p>
              <p className="font-bold">2.1%</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">LTV:CAC Ratio</p>
              <p className="font-bold">5.2:1</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  )
}
