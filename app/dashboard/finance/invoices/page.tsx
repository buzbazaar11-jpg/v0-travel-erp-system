'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Plus, Search, Download, Eye, Send, Trash2 } from 'lucide-react'
import { useState } from 'react'

const SAMPLE_INVOICES = [
  {
    id: 'INV-2025-0001',
    customer: 'Ahmed Hassan',
    bookingId: 'BK-2025-001',
    date: '2025-03-15',
    dueDate: '2025-03-22',
    subtotal: 375000,
    gst: 63750,
    total: 438750,
    paid: 438750,
    status: 'PAID',
  },
  {
    id: 'INV-2025-0002',
    customer: 'Bright Travels Ltd',
    bookingId: 'BK-2025-002',
    date: '2025-03-10',
    dueDate: '2025-04-10',
    subtotal: 5000000,
    gst: 850000,
    total: 5850000,
    paid: 2925000,
    status: 'PARTIAL',
  },
  {
    id: 'INV-2025-0003',
    customer: 'Zainab Ali',
    bookingId: 'BK-2025-003',
    date: '2025-03-18',
    dueDate: '2025-03-25',
    subtotal: 85000,
    gst: 14450,
    total: 99450,
    paid: 0,
    status: 'PENDING',
  },
  {
    id: 'INV-2025-0004',
    customer: 'Hassan Malik',
    bookingId: 'BK-2025-004',
    date: '2025-03-12',
    dueDate: '2025-04-12',
    subtotal: 50000,
    gst: 8500,
    total: 58500,
    paid: 58500,
    status: 'PAID',
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'PAID':
      return 'default'
    case 'PARTIAL':
      return 'secondary'
    case 'PENDING':
      return 'outline'
    case 'OVERDUE':
      return 'destructive'
    default:
      return 'outline'
  }
}

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState(SAMPLE_INVOICES)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch = invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.bookingId.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const stats = {
    total: invoices.length,
    pending: invoices.filter(i => i.status === 'PENDING').length,
    totalAmount: invoices.reduce((sum, i) => sum + i.total, 0),
    totalCollected: invoices.reduce((sum, i) => sum + i.paid, 0),
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Invoices</h1>
          <p className="text-muted-foreground mt-1">Manage customer invoices and billing</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Create Invoice
        </Button>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="p-4 border-border/40">
          <p className="text-sm text-muted-foreground">Total Invoices</p>
          <p className="text-2xl font-bold text-foreground mt-2">{stats.total}</p>
        </Card>
        <Card className="p-4 border-border/40">
          <p className="text-sm text-muted-foreground">Pending</p>
          <p className="text-2xl font-bold text-amber-600 mt-2">{stats.pending}</p>
        </Card>
        <Card className="p-4 border-border/40">
          <p className="text-sm text-muted-foreground">Total Invoiced</p>
          <p className="text-2xl font-bold text-foreground mt-2">
            PKR {(stats.totalAmount / 1000000).toFixed(2)}M
          </p>
        </Card>
        <Card className="p-4 border-border/40">
          <p className="text-sm text-muted-foreground">Collected</p>
          <p className="text-2xl font-bold text-green-600 mt-2">
            PKR {(stats.totalCollected / 1000000).toFixed(2)}M
          </p>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4 border-border/40">
        <div className="flex gap-4 flex-wrap">
          <div className="flex-1 min-w-64">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search invoices..."
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
              <SelectItem value="PAID">Paid</SelectItem>
              <SelectItem value="PARTIAL">Partial</SelectItem>
              <SelectItem value="PENDING">Pending</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>
      </Card>

      {/* Invoices Table */}
      <Card className="border-border/40 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border/40 bg-muted/50">
              <tr>
                <th className="text-left px-6 py-3 text-sm font-semibold text-muted-foreground">Invoice #</th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-muted-foreground">Customer</th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-muted-foreground">Booking ID</th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-muted-foreground">Invoice Date</th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-muted-foreground">Due Date</th>
                <th className="text-right px-6 py-3 text-sm font-semibold text-muted-foreground">Amount</th>
                <th className="text-right px-6 py-3 text-sm font-semibold text-muted-foreground">Paid</th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-muted-foreground">Status</th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredInvoices.map((invoice) => (
                <tr key={invoice.id} className="border-b border-border/40 hover:bg-muted/30">
                  <td className="px-6 py-4 text-sm font-bold text-primary">{invoice.id}</td>
                  <td className="px-6 py-4 text-sm font-medium text-foreground">{invoice.customer}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{invoice.bookingId}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{invoice.date}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{invoice.dueDate}</td>
                  <td className="px-6 py-4 text-sm font-bold text-right">
                    PKR {invoice.total.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-right">
                    PKR {invoice.paid.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant={getStatusColor(invoice.status)}>{invoice.status}</Badge>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" className="p-1" title="View">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="p-1" title="Send">
                        <Send className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="p-1 text-destructive" title="Delete">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Collection Summary */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6 border-border/40">
          <h3 className="font-semibold text-foreground mb-4">Collection Status</h3>
          <div className="space-y-3">
            {[
              { status: 'Fully Paid', count: 2, amount: 497250 },
              { status: 'Partially Paid', count: 1, amount: 2925000 },
              { status: 'Not Yet Paid', count: 1, amount: 99450 },
            ].map((item, idx) => (
              <div key={idx} className="flex justify-between items-center pb-3 border-b border-border/40 last:border-0">
                <div>
                  <p className="font-medium text-foreground">{item.status}</p>
                  <p className="text-xs text-muted-foreground">{item.count} invoice(s)</p>
                </div>
                <p className="font-bold text-foreground">PKR {item.amount.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 border-border/40">
          <h3 className="font-semibold text-foreground mb-4">Outstanding Amount</h3>
          <div className="bg-red-50 p-4 rounded-lg mb-4">
            <p className="text-sm text-red-700 mb-1">Total Outstanding</p>
            <p className="text-3xl font-bold text-red-700">
              PKR {(stats.totalAmount - stats.totalCollected).toLocaleString()}
            </p>
          </div>
          <Button className="w-full">Send Payment Reminders</Button>
        </Card>
      </div>
    </div>
  )
}
