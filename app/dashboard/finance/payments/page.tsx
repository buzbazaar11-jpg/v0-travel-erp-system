'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Plus, Search, Download, Eye, RefreshCw } from 'lucide-react'
import { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const PAYMENT_DATA = [
  { date: '2025-03-01', deposits: 425000, withdrawals: 150000, net: 275000 },
  { date: '2025-03-05', deposits: 2850000, withdrawals: 320000, net: 2530000 },
  { date: '2025-03-10', deposits: 425000, withdrawals: 85000, net: 340000 },
  { date: '2025-03-15', deposits: 950000, withdrawals: 420000, net: 530000 },
  { date: '2025-03-20', deposits: 1200000, withdrawals: 580000, net: 620000 },
]

const SAMPLE_PAYMENTS = [
  {
    id: 'PAY-2025-001',
    date: '2025-03-20',
    customer: 'Ahmed Hassan',
    invoiceId: 'INV-2025-0001',
    amount: 438750,
    method: 'Bank Transfer',
    reference: 'TRF-HBL-12345',
    status: 'COMPLETED',
  },
  {
    id: 'PAY-2025-002',
    date: '2025-03-18',
    customer: 'Bright Travels Ltd',
    invoiceId: 'INV-2025-0002',
    amount: 2925000,
    method: 'Bank Transfer',
    reference: 'TRF-UBL-54321',
    status: 'COMPLETED',
  },
  {
    id: 'PAY-2025-003',
    date: '2025-03-15',
    customer: 'Hassan Malik',
    invoiceId: 'INV-2025-0004',
    amount: 58500,
    method: 'Cash',
    reference: 'CASH-15032025',
    status: 'COMPLETED',
  },
  {
    id: 'PAY-2025-004',
    date: '2025-03-21',
    customer: 'Vendor Payment',
    invoiceId: 'VEN-2025-0045',
    amount: 150000,
    method: 'Check',
    reference: 'CHK-1205',
    status: 'PENDING',
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'COMPLETED':
      return 'default'
    case 'PENDING':
      return 'secondary'
    case 'FAILED':
      return 'destructive'
    default:
      return 'outline'
  }
}

const getMethodColor = (method: string) => {
  switch (method) {
    case 'Bank Transfer':
      return 'outline'
    case 'Cash':
      return 'secondary'
    case 'Check':
      return 'outline'
    default:
      return 'outline'
  }
}

export default function PaymentsPage() {
  const [payments, setPayments] = useState(SAMPLE_PAYMENTS)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch = payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.reference.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || payment.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const stats = {
    total: payments.length,
    completed: payments.filter(p => p.status === 'COMPLETED').length,
    totalAmount: payments.filter(p => p.status === 'COMPLETED').reduce((sum, p) => sum + p.amount, 0),
    pending: payments.filter(p => p.status === 'PENDING').reduce((sum, p) => sum + p.amount, 0),
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Payments</h1>
          <p className="text-muted-foreground mt-1">Track received and outgoing payments</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <RefreshCw className="w-4 h-4" />
            Reconcile
          </Button>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Record Payment
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="p-4 border-border/40">
          <p className="text-sm text-muted-foreground">Total Payments</p>
          <p className="text-2xl font-bold text-foreground mt-2">{stats.total}</p>
        </Card>
        <Card className="p-4 border-border/40">
          <p className="text-sm text-muted-foreground">Completed</p>
          <p className="text-2xl font-bold text-green-600 mt-2">{stats.completed}</p>
        </Card>
        <Card className="p-4 border-border/40">
          <p className="text-sm text-muted-foreground">Total Collected</p>
          <p className="text-2xl font-bold text-foreground mt-2">
            PKR {(stats.totalAmount / 1000000).toFixed(2)}M
          </p>
        </Card>
        <Card className="p-4 border-border/40">
          <p className="text-sm text-muted-foreground">Pending</p>
          <p className="text-2xl font-bold text-amber-600 mt-2">
            PKR {(stats.pending / 1000).toFixed(0)}K
          </p>
        </Card>
      </div>

      {/* Cash Flow Chart */}
      <Card className="p-6 border-border/40">
        <h2 className="text-lg font-semibold text-foreground mb-4">Payment Trends</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={PAYMENT_DATA}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
            <XAxis dataKey="date" stroke="rgba(0,0,0,0.5)" />
            <YAxis stroke="rgba(0,0,0,0.5)" />
            <Tooltip formatter={(value) => `PKR ${(value / 1000).toFixed(0)}K`} />
            <Legend />
            <Line type="monotone" dataKey="deposits" stroke="#10B981" name="Deposits" />
            <Line type="monotone" dataKey="withdrawals" stroke="#EF4444" name="Withdrawals" />
            <Line type="monotone" dataKey="net" stroke="#3B82F6" name="Net Flow" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Filters */}
      <Card className="p-4 border-border/40">
        <div className="flex gap-4 flex-wrap">
          <div className="flex-1 min-w-64">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search payments..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="COMPLETED">Completed</SelectItem>
              <SelectItem value="PENDING">Pending</SelectItem>
              <SelectItem value="FAILED">Failed</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>
      </Card>

      {/* Payments Table */}
      <Card className="border-border/40 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border/40 bg-muted/50">
              <tr>
                <th className="text-left px-6 py-3 text-sm font-semibold text-muted-foreground">Payment ID</th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-muted-foreground">Date</th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-muted-foreground">Customer/Vendor</th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-muted-foreground">Invoice</th>
                <th className="text-right px-6 py-3 text-sm font-semibold text-muted-foreground">Amount</th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-muted-foreground">Method</th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-muted-foreground">Reference</th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-muted-foreground">Status</th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map((payment) => (
                <tr key={payment.id} className="border-b border-border/40 hover:bg-muted/30">
                  <td className="px-6 py-4 text-sm font-bold text-primary">{payment.id}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{payment.date}</td>
                  <td className="px-6 py-4 text-sm font-medium text-foreground">{payment.customer}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{payment.invoiceId}</td>
                  <td className="px-6 py-4 text-sm font-bold text-right">
                    PKR {payment.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant={getMethodColor(payment.method)}>{payment.method}</Badge>
                  </td>
                  <td className="px-6 py-4 text-sm font-mono text-muted-foreground">{payment.reference}</td>
                  <td className="px-6 py-4">
                    <Badge variant={getStatusColor(payment.status)}>{payment.status}</Badge>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <Button variant="ghost" size="sm" className="p-1">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Bank Accounts */}
      <Card className="p-6 border-border/40">
        <h2 className="text-lg font-semibold text-foreground mb-4">Bank Accounts</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { name: 'HBL Current', balance: 'PKR 2,850,000', transactions: 24 },
            { name: 'UBL Savings', balance: 'PKR 1,200,000', transactions: 12 },
            { name: 'Easypaisa', balance: 'PKR 125,000', transactions: 8 },
          ].map((account, idx) => (
            <Card key={idx} className="p-4 border-border/40">
              <p className="font-semibold text-foreground">{account.name}</p>
              <p className="text-2xl font-bold text-primary mt-2">{account.balance}</p>
              <p className="text-xs text-muted-foreground mt-2">{account.transactions} transactions this month</p>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  )
}
