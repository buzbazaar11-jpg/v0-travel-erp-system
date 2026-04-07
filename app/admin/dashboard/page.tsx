'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Users, Building2, CreditCard, TrendingUp, Activity, AlertCircle } from 'lucide-react'
import { motion } from 'framer-motion'

const stats = [
  { label: 'Total Businesses', value: '5,234', icon: Building2, color: 'bg-blue-100' },
  { label: 'Active Subscriptions', value: '4,123', icon: CreditCard, color: 'bg-green-100' },
  { label: 'Total Users', value: '18,942', icon: Users, color: 'bg-purple-100' },
  { label: 'Monthly Revenue', value: 'Rs 12.5M', icon: TrendingUp, color: 'bg-yellow-100' },
]

const chartData = [
  { month: 'Jan', businesses: 1200, revenue: 2400 },
  { month: 'Feb', businesses: 1500, revenue: 3200 },
  { month: 'Mar', businesses: 1800, revenue: 4100 },
  { month: 'Apr', businesses: 2100, revenue: 5200 },
  { month: 'May', businesses: 2500, revenue: 6800 },
  { month: 'Jun', businesses: 3200, revenue: 8100 },
]

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000)
  }, [])

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">System overview and analytics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="text-2xl font-bold mt-2">{stat.value}</p>
                    </div>
                    <div className={`${stat.color} p-3 rounded-lg`}>
                      <Icon className="w-6 h-6 text-gray-700" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Business Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="businesses" stroke="#3b82f6" name="New Businesses" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="revenue" fill="#10b981" name="Monthly Revenue" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-yellow-500" />
            System Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <p className="text-sm">• 23 expired subscriptions need renewal</p>
            <p className="text-sm">• 5 support tickets pending response</p>
            <p className="text-sm">• Server capacity at 78%</p>
            <p className="text-sm">• 12 failed payment attempts today</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
