'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowUpRight, ArrowDownRight, TrendingUp, Users, BookOpen, DollarSign } from 'lucide-react'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

const DASHBOARD_DATA = {
  kpis: [
    { label: 'Total Revenue', value: 'PKR 2.45M', change: '+12.5%', trend: 'up' },
    { label: 'Active Bookings', value: '156', change: '+8.2%', trend: 'up' },
    { label: 'Total Customers', value: '1,324', change: '+5.1%', trend: 'up' },
    { label: 'Pending Payments', value: 'PKR 385K', change: '-3.2%', trend: 'down' },
  ],
  revenueData: [
    { month: 'Jan', revenue: 185000, profit: 45000 },
    { month: 'Feb', revenue: 245000, profit: 62000 },
    { month: 'Mar', revenue: 198000, profit: 48000 },
    { month: 'Apr', revenue: 285000, profit: 72000 },
    { month: 'May', revenue: 325000, profit: 85000 },
    { month: 'Jun', revenue: 245000, profit: 62000 },
  ],
  bookingsByType: [
    { name: 'Umrah', value: 45 },
    { name: 'Hajj', value: 28 },
    { name: 'Tours', value: 35 },
    { name: 'Visa', value: 22 },
    { name: 'Other', value: 26 },
  ],
  recentBookings: [
    { id: 'BK-001', customer: 'Ahmed Hassan', package: 'Umrah 7 Days', amount: 'PKR 125,000', status: 'Confirmed' },
    { id: 'BK-002', customer: 'Fatima Khan', package: 'Tours Dubai', amount: 'PKR 95,000', status: 'Pending' },
    { id: 'BK-003', customer: 'Muhammad Ali', package: 'Hajj Package', amount: 'PKR 450,000', status: 'Confirmed' },
    { id: 'BK-004', customer: 'Ayesha Malik', package: 'Visa Services', amount: 'PKR 15,000', status: 'Processing' },
  ],
}

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6']

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Welcome Back</h1>
          <p className="text-muted-foreground mt-1">Here&apos;s your business performance overview</p>
        </div>
        <Button>Generate Report</Button>
      </div>

      {/* KPI Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {DASHBOARD_DATA.kpis.map((kpi, idx) => (
          <Card key={idx} className="p-6 border-border/40">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <p className="text-sm font-medium text-muted-foreground">{kpi.label}</p>
                <h3 className="text-2xl font-bold text-foreground mt-2">{kpi.value}</h3>
              </div>
              <div className={`flex items-center gap-1 ${kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {kpi.trend === 'up' ? (
                  <ArrowUpRight className="w-4 h-4" />
                ) : (
                  <ArrowDownRight className="w-4 h-4" />
                )}
                <span className="text-xs font-semibold">{kpi.change}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <Card className="lg:col-span-2 p-6 border-border/40">
          <h2 className="text-lg font-semibold text-foreground mb-4">Revenue & Profit Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={DASHBOARD_DATA.revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
              <XAxis dataKey="month" stroke="rgba(0,0,0,0.5)" />
              <YAxis stroke="rgba(0,0,0,0.5)" />
              <Tooltip />
              <Legend />
              <Bar dataKey="revenue" fill="#3B82F6" name="Revenue" />
              <Bar dataKey="profit" fill="#10B981" name="Profit" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Bookings by Type */}
        <Card className="p-6 border-border/40">
          <h2 className="text-lg font-semibold text-foreground mb-4">Bookings by Type</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={DASHBOARD_DATA.bookingsByType}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={2}
                dataKey="value"
              >
                {DASHBOARD_DATA.bookingsByType.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {DASHBOARD_DATA.bookingsByType.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[idx] }} />
                  {item.name}
                </span>
                <span className="font-semibold">{item.value}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Recent Bookings */}
      <Card className="border-border/40">
        <div className="p-6 border-b border-border/40">
          <h2 className="text-lg font-semibold text-foreground">Recent Bookings</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border/40 bg-muted/50">
              <tr>
                <th className="text-left px-6 py-3 text-sm font-semibold text-muted-foreground">Booking ID</th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-muted-foreground">Customer</th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-muted-foreground">Package</th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-muted-foreground">Amount</th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {DASHBOARD_DATA.recentBookings.map((booking, idx) => (
                <tr key={idx} className="border-b border-border/40 hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-foreground">{booking.id}</td>
                  <td className="px-6 py-4 text-sm text-foreground">{booking.customer}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{booking.package}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-foreground">{booking.amount}</td>
                  <td className="px-6 py-4 text-sm">
                    <Badge
                      variant={
                        booking.status === 'Confirmed'
                          ? 'default'
                          : booking.status === 'Pending'
                            ? 'secondary'
                            : 'outline'
                      }
                    >
                      {booking.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* GST Summary */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6 border-border/40">
          <h2 className="text-lg font-semibold text-foreground mb-4">GST Summary (This Month)</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center pb-3 border-b border-border/40">
              <span className="text-sm text-muted-foreground">Taxable Revenue</span>
              <span className="font-semibold">PKR 1,850,000</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-border/40">
              <span className="text-sm text-muted-foreground">GST Charged (17%)</span>
              <span className="font-semibold text-red-600">PKR 314,500</span>
            </div>
            <div className="flex justify-between items-center pt-3 bg-muted/50 p-3 rounded">
              <span className="text-sm font-semibold text-foreground">GST Due to FBR</span>
              <span className="text-lg font-bold text-foreground">PKR 314,500</span>
            </div>
          </div>
        </Card>

        <Card className="p-6 border-border/40">
          <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
          <div className="space-y-2">
            <Button className="w-full" variant="outline" size="sm">
              Create New Booking
            </Button>
            <Button className="w-full" variant="outline" size="sm">
              Generate Invoice
            </Button>
            <Button className="w-full" variant="outline" size="sm">
              View Reports
            </Button>
            <Button className="w-full" variant="outline" size="sm">
              Manage Customers
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
