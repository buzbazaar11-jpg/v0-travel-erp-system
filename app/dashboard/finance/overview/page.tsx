'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { TrendingUp, TrendingDown, DollarSign, ArrowUpRight, ArrowDownRight } from 'lucide-react'

const REVENUE_DATA = [
  { month: 'Jan', revenue: 2100000, expenses: 1200000, profit: 900000 },
  { month: 'Feb', revenue: 2450000, expenses: 1350000, profit: 1100000 },
  { month: 'Mar', revenue: 2950000, expenses: 1500000, profit: 1450000 },
  { month: 'Apr', revenue: 3200000, expenses: 1650000, profit: 1550000 },
  { month: 'May', revenue: 3850000, expenses: 1800000, profit: 2050000 },
  { month: 'Jun', revenue: 4200000, expenses: 1900000, profit: 2300000 },
]

const EXPENSE_BREAKDOWN = [
  { name: 'Hotels', value: 1200000 },
  { name: 'Airlines', value: 800000 },
  { name: 'Visa Services', value: 400000 },
  { name: 'Transportation', value: 300000 },
  { name: 'Other', value: 200000 },
]

const ACCOUNT_SUMMARY = [
  { name: 'Cash in Hand', balance: 'PKR 450,000', type: 'Asset' },
  { name: 'Bank Account', balance: 'PKR 2,850,000', type: 'Asset' },
  { name: 'Accounts Receivable', balance: 'PKR 385,000', type: 'Asset' },
  { name: 'Accounts Payable', balance: 'PKR 520,000', type: 'Liability' },
]

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6']

export default function FinanceOverviewPage() {
  const totalRevenue = 18750000
  const totalExpenses = 8350000
  const netProfit = totalRevenue - totalExpenses
  const profitMargin = ((netProfit / totalRevenue) * 100).toFixed(1)

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Finance Overview</h1>
          <p className="text-muted-foreground mt-1">Year-to-date financial performance</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Export Report</Button>
          <Button>Generate Invoice</Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6 border-border/40">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
              <h3 className="text-2xl font-bold text-foreground mt-2">
                PKR {(totalRevenue / 1000000).toFixed(1)}M
              </h3>
            </div>
            <TrendingUp className="w-6 h-6 text-green-600" />
          </div>
          <div className="flex items-center gap-1 text-green-600">
            <ArrowUpRight className="w-4 h-4" />
            <span className="text-xs font-semibold">+12.5% vs last month</span>
          </div>
        </Card>

        <Card className="p-6 border-border/40">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Expenses</p>
              <h3 className="text-2xl font-bold text-foreground mt-2">
                PKR {(totalExpenses / 1000000).toFixed(1)}M
              </h3>
            </div>
            <TrendingDown className="w-6 h-6 text-red-600" />
          </div>
          <div className="flex items-center gap-1 text-red-600">
            <ArrowDownRight className="w-4 h-4" />
            <span className="text-xs font-semibold">-2.3% vs last month</span>
          </div>
        </Card>

        <Card className="p-6 border-border/40">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Net Profit</p>
              <h3 className="text-2xl font-bold text-green-600 mt-2">
                PKR {(netProfit / 1000000).toFixed(1)}M
              </h3>
            </div>
            <DollarSign className="w-6 h-6 text-primary" />
          </div>
          <div className="flex items-center gap-1 text-green-600">
            <ArrowUpRight className="w-4 h-4" />
            <span className="text-xs font-semibold">{profitMargin}% profit margin</span>
          </div>
        </Card>

        <Card className="p-6 border-border/40">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Cash Flow</p>
              <h3 className="text-2xl font-bold text-foreground mt-2">
                PKR {((totalRevenue - totalExpenses) * 0.8 / 1000000).toFixed(1)}M
              </h3>
            </div>
            <TrendingUp className="w-6 h-6 text-primary" />
          </div>
          <p className="text-xs text-muted-foreground mt-2">After receivables</p>
        </Card>
      </div>

      {/* Revenue vs Expenses Chart */}
      <Card className="p-6 border-border/40">
        <h2 className="text-lg font-semibold text-foreground mb-4">Revenue vs Expenses (YTD)</h2>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={REVENUE_DATA}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
            <XAxis dataKey="month" stroke="rgba(0,0,0,0.5)" />
            <YAxis stroke="rgba(0,0,0,0.5)" />
            <Tooltip
              formatter={(value) => `PKR ${(value / 1000000).toFixed(1)}M`}
              contentStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', border: 'none' }}
            />
            <Legend />
            <Bar dataKey="revenue" fill="#10B981" name="Revenue" />
            <Bar dataKey="expenses" fill="#EF4444" name="Expenses" />
            <Bar dataKey="profit" fill="#3B82F6" name="Profit" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Expense Breakdown */}
        <Card className="p-6 border-border/40">
          <h2 className="text-lg font-semibold text-foreground mb-4">Expense Breakdown</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={EXPENSE_BREAKDOWN}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={2}
                dataKey="value"
              >
                {EXPENSE_BREAKDOWN.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `PKR ${(value / 1000000).toFixed(2)}M`} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {EXPENSE_BREAKDOWN.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[idx] }} />
                  {item.name}
                </span>
                <span className="font-semibold">PKR {(item.value / 1000000).toFixed(2)}M</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Account Summary */}
        <Card className="p-6 border-border/40">
          <h2 className="text-lg font-semibold text-foreground mb-4">Chart of Accounts Summary</h2>
          <div className="space-y-4">
            {ACCOUNT_SUMMARY.map((account, idx) => (
              <div key={idx} className="pb-4 border-b border-border/40 last:border-0">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-foreground">{account.name}</p>
                    <Badge variant="outline" className="mt-1">
                      {account.type}
                    </Badge>
                  </div>
                  <p className="font-bold text-foreground">{account.balance}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* GST & Tax Summary */}
      <Card className="p-6 border-border/40">
        <h2 className="text-lg font-semibold text-foreground mb-4">GST & Tax Summary (Current Month)</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Taxable Sales</p>
            <p className="text-2xl font-bold text-foreground">PKR 4,200,000</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">GST Collected (17%)</p>
            <p className="text-2xl font-bold text-red-600">PKR 714,000</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">GST Due to FBR</p>
            <p className="text-2xl font-bold text-orange-600">PKR 714,000</p>
            <p className="text-xs text-muted-foreground mt-2">Due: 15th of next month</p>
          </div>
        </div>
      </Card>

      {/* Recent Transactions */}
      <Card className="border-border/40 overflow-hidden">
        <div className="p-6 border-b border-border/40">
          <h2 className="text-lg font-semibold text-foreground">Recent Transactions</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border/40 bg-muted/50">
              <tr>
                <th className="text-left px-6 py-3 text-sm font-semibold text-muted-foreground">Date</th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-muted-foreground">Description</th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-muted-foreground">Category</th>
                <th className="text-right px-6 py-3 text-sm font-semibold text-muted-foreground">Amount</th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-muted-foreground">Type</th>
              </tr>
            </thead>
            <tbody>
              {[
                { date: '2025-03-20', desc: 'Booking BK-2025-001 Payment', cat: 'Revenue', amount: 425000, type: 'Income' },
                { date: '2025-03-19', desc: 'Hotel Al-Safwa - Makkah', cat: 'Expenses', amount: 125000, type: 'Expense' },
                { date: '2025-03-18', desc: 'Visa Services Processing', cat: 'Expenses', amount: 45000, type: 'Expense' },
                { date: '2025-03-17', desc: 'Booking BK-2025-002 Payment', cat: 'Revenue', amount: 2600000, type: 'Income' },
                { date: '2025-03-16', desc: 'Flight Booking - Saudia', cat: 'Expenses', amount: 320000, type: 'Expense' },
              ].map((txn, idx) => (
                <tr key={idx} className="border-b border-border/40 hover:bg-muted/30">
                  <td className="px-6 py-4 text-sm text-muted-foreground">{txn.date}</td>
                  <td className="px-6 py-4 text-sm font-medium text-foreground">{txn.desc}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{txn.cat}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-right text-foreground">
                    PKR {txn.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <Badge variant={txn.type === 'Income' ? 'default' : 'destructive'}>
                      {txn.type}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
