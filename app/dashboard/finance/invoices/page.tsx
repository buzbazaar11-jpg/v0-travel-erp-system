'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Plus, Search, Download, Eye, Send, Trash2, Edit2 } from 'lucide-react'
import { useState, useEffect } from 'react'
import { toast } from 'sonner'

interface Invoice {
  id: string
  invoice_number: string
  customer_name: string
  bookingId: string
  invoice_date: string
  due_date: string
  subtotal: number
  gst: number
  total: number
  paid: number
  status: string
}

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
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [isOpen, setIsOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    customer_name: '',
    bookingId: '',
    invoice_date: new Date().toISOString().split('T')[0],
    due_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    subtotal: 0,
    gst_rate: 17,
    discount: 0,
  })

  useEffect(() => {
    fetchInvoices()
  }, [])

  const fetchInvoices = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/invoices')
      const data = await response.json()
      setInvoices(data || [])
    } catch (error) {
      toast.error('Failed to load invoices')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const gst = (formData.subtotal * formData.gst_rate) / 100
    const total = formData.subtotal + gst - formData.discount

    try {
      if (editingId) {
        await fetch(`/api/invoices/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...formData, gst, total }),
        })
        toast.success('Invoice updated')
      } else {
        await fetch('/api/invoices', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...formData, gst, total }),
        })
        toast.success('Invoice created')
      }
      fetchInvoices()
      setIsOpen(false)
      resetForm()
    } catch (error) {
      toast.error('Error saving invoice')
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm('Delete this invoice?')) {
      try {
        await fetch(`/api/invoices/${id}`, { method: 'DELETE' })
        toast.success('Invoice deleted')
        fetchInvoices()
      } catch (error) {
        toast.error('Failed to delete')
      }
    }
  }

  const handleEdit = (invoice: Invoice) => {
    setFormData({
      customer_name: invoice.customer_name,
      bookingId: invoice.bookingId,
      invoice_date: invoice.invoice_date,
      due_date: invoice.due_date,
      subtotal: invoice.subtotal,
      gst_rate: 17,
      discount: invoice.subtotal + invoice.gst - invoice.total,
    })
    setEditingId(invoice.id)
    setIsOpen(true)
  }

  const resetForm = () => {
    setFormData({
      customer_name: '',
      bookingId: '',
      invoice_date: new Date().toISOString().split('T')[0],
      due_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      subtotal: 0,
      gst_rate: 17,
      discount: 0,
    })
    setEditingId(null)
  }

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch = invoice.invoice_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2" onClick={resetForm}>
              <Plus className="w-4 h-4" />
              Create Invoice
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{editingId ? 'Edit Invoice' : 'Create Invoice'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label>Customer Name</Label>
                <Input value={formData.customer_name} onChange={(e) => setFormData({...formData, customer_name: e.target.value})} placeholder="Enter customer name" required />
              </div>
              <div>
                <Label>Booking ID</Label>
                <Input value={formData.bookingId} onChange={(e) => setFormData({...formData, bookingId: e.target.value})} placeholder="BK-2025-001" required />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label>Invoice Date</Label>
                  <Input type="date" value={formData.invoice_date} onChange={(e) => setFormData({...formData, invoice_date: e.target.value})} required />
                </div>
                <div>
                  <Label>Due Date</Label>
                  <Input type="date" value={formData.due_date} onChange={(e) => setFormData({...formData, due_date: e.target.value})} required />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label>Subtotal (Rs)</Label>
                  <Input type="number" value={formData.subtotal} onChange={(e) => setFormData({...formData, subtotal: parseFloat(e.target.value) || 0})} required />
                </div>
                <div>
                  <Label>Discount (Rs)</Label>
                  <Input type="number" value={formData.discount} onChange={(e) => setFormData({...formData, discount: parseFloat(e.target.value) || 0})} />
                </div>
              </div>
              <div className="bg-blue-50 p-3 rounded">
                <p className="text-sm">GST (17%): Rs {((formData.subtotal * 17) / 100).toLocaleString()}</p>
                <p className="text-sm font-bold">Total: Rs {(formData.subtotal + (formData.subtotal * 17) / 100 - formData.discount).toLocaleString()}</p>
              </div>
              <Button type="submit" className="w-full">{editingId ? 'Update Invoice' : 'Create Invoice'}</Button>
            </form>
          </DialogContent>
        </Dialog>
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
                  <td className="px-6 py-4 text-sm font-bold text-primary">{invoice.invoice_number}</td>
                  <td className="px-6 py-4 text-sm font-medium text-foreground">{invoice.customer_name}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{invoice.bookingId}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{invoice.invoice_date}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{invoice.due_date}</td>
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
                      <Button variant="ghost" size="sm" className="p-1" onClick={() => handleEdit(invoice)} title="Edit">
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="p-1 text-destructive" onClick={() => handleDelete(invoice.id)} title="Delete">
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
