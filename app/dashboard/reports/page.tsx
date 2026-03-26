'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { Download, Filter } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const revenueData = [
  { month: 'Jan', revenue: 145000, cost: 95000, profit: 50000 },
  { month: 'Feb', revenue: 198000, cost: 120000, profit: 78000 },
  { month: 'Mar', revenue: 186000, cost: 110000, profit: 76000 },
  { month: 'Apr', revenue: 220000, cost: 135000, profit: 85000 },
  { month: 'May', revenue: 245000, cost: 150000, profit: 95000 },
  { month: 'Jun', revenue: 267000, cost: 165000, profit: 102000 },
]

const bookingData = [
  { name: 'Tours', value: 45 },
  { name: 'Umrah', value: 35 },
  { name: 'Hajj', value: 15 },
  { name: 'Visa', value: 5 },
]

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444']

export default function ReportsPage() {
  const [reportType, setReportType] = useState('financial')

  const totalRevenue = revenueData.reduce((s, d) => s + d.revenue, 0)
  const totalCost = revenueData.reduce((s, d) => s + d.cost, 0)
  const totalProfit = revenueData.reduce((s, d) => s + d.profit, 0)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Reports & Analytics</h1>
          <p className="text-muted-foreground">Track business performance and metrics</p>
        </div>
        <div className="flex gap-2">
          <Select value={reportType} onValueChange={setReportType}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="financial">Financial Report</SelectItem>
              <SelectItem value="bookings">Booking Report</SelectItem>
              <SelectItem value="customers">Customer Report</SelectItem>
            </SelectContent>
          </Select>
          <Button className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">Rs.{(totalRevenue / 100000).toFixed(2)}L</div>
            <p className="text-xs text-muted-foreground mt-1">6 months</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Total Cost</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">Rs.{(totalCost / 100000).toFixed(2)}L</div>
            <p className="text-xs text-muted-foreground mt-1">6 months</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Net Profit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">Rs.{(totalProfit / 100000).toFixed(2)}L</div>
            <p className="text-xs text-muted-foreground mt-1">Margin: {((totalProfit / totalRevenue) * 100).toFixed(1)}%</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Revenue vs Cost Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#3b82f6" name="Revenue" strokeWidth={2} />
              <Line type="monotone" dataKey="cost" stroke="#ef4444" name="Cost" strokeWidth={2} />
              <Line type="monotone" dataKey="profit" stroke="#10b981" name="Profit" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Profit</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="profit" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Booking Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={bookingData} cx="50%" cy="50%" labelLine={false} label={({ name, value }) => `${name}: ${value}`} outerRadius={80} fill="#8884d8" dataKey="value">
                  {bookingData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
