'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Plus, Search, Eye } from 'lucide-react'

interface Invoice {
  id: string
  invoiceNo: string
  customer: string
  amount: number
  gst: number
  total: number
  dueDate: string
  status: 'Draft' | 'Sent' | 'Paid' | 'Overdue'
  bookingRef: string
}

const mockInvoices: Invoice[] = [
  { id: '1', invoiceNo: 'INV-001', customer: 'Ahmed Khan', amount: 65000, gst: 11050, total: 76050, dueDate: '2024-02-10', status: 'Paid', bookingRef: 'BK-001' },
  { id: '2', invoiceNo: 'INV-002', customer: 'Fatima Ali', amount: 45000, gst: 7650, total: 52650, dueDate: '2024-02-15', status: 'Sent', bookingRef: 'BK-002' },
  { id: '3', invoiceNo: 'INV-003', customer: 'Hassan Malik', amount: 120000, gst: 20400, total: 140400, dueDate: '2024-02-05', status: 'Overdue', bookingRef: 'BK-003' },
]

const statusColor = { 'Draft': 'secondary', 'Sent': 'default', 'Paid': 'outline', 'Overdue': 'destructive' }

export default function FinanceInvoicingPage() {
  const [invoices, setInvoices] = useState(mockInvoices)
  const [searchQuery, setSearchQuery] = useState('')

  const filtered = invoices.filter(i => 
    i.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    i.invoiceNo.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const totalRevenue = invoices.reduce((s, i) => s + i.total, 0)
  const paidAmount = invoices.filter(i => i.status === 'Paid').reduce((s, i) => s + i.total, 0)
  const pendingAmount = invoices.filter(i => i.status !== 'Paid').reduce((s, i) => s + i.total, 0)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Finance & Invoicing</h1>
          <p className="text-muted-foreground">Manage invoices and payments</p>
        </div>
        <Button className="gap-2"><Plus className="h-4 w-4" /> Create Invoice</Button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Total Revenue</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold text-blue-600">Rs.{(totalRevenue / 100000).toFixed(1)}L</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Paid Amount</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold text-green-600">Rs.{(paidAmount / 100000).toFixed(1)}L</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Pending Payment</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold text-red-600">Rs.{(pendingAmount / 100000).toFixed(1)}L</div></CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Invoices</CardTitle>
          <div className="relative mt-4">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search invoices..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filtered.map(invoice => (
              <div key={invoice.id} className="border rounded-lg p-4 flex justify-between items-center">
                <div className="flex-1">
                  <h3 className="font-semibold">{invoice.invoiceNo}</h3>
                  <div className="text-sm text-muted-foreground">{invoice.customer} • {invoice.bookingRef}</div>
                  <div className="text-xs text-muted-foreground">Due: {invoice.dueDate}</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">Rs.{invoice.total.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">GST: Rs.{invoice.gst.toLocaleString()}</div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <Badge variant={statusColor[invoice.status] as any}>{invoice.status}</Badge>
                  <Button variant="ghost" size="sm"><Eye className="h-4 w-4" /></Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
