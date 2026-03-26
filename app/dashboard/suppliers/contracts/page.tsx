'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Plus, Search, FileText, AlertCircle, TrendingUp } from 'lucide-react'
import { useState } from 'react'
import { Alert, AlertDescription } from '@/components/ui/alert'

const SAMPLE_CONTRACTS = [
  {
    id: 'CNT-001',
    vendor: 'Al-Safwa Hotel',
    type: 'Accommodation',
    startDate: '2024-01-15',
    endDate: '2025-12-31',
    value: 5200000,
    discount: 12,
    terms: 'Net 30 Days',
    status: 'ACTIVE',
    daysLeft: 285,
  },
  {
    id: 'CNT-002',
    vendor: 'Saudia Airways',
    type: 'Transportation',
    startDate: '2024-02-20',
    endDate: '2025-02-19',
    value: 3200000,
    discount: 8,
    terms: 'Net 15 Days',
    status: 'EXPIRING',
    daysLeft: 45,
  },
  {
    id: 'CNT-003',
    vendor: 'Visa Agent Pro',
    type: 'Services',
    startDate: '2024-03-10',
    endDate: '2026-03-09',
    value: 450000,
    discount: 15,
    terms: 'Per Transaction',
    status: 'ACTIVE',
    daysLeft: 715,
  },
  {
    id: 'CNT-004',
    vendor: 'Medina Palace Hotel',
    type: 'Accommodation',
    startDate: '2023-06-15',
    endDate: '2025-06-14',
    value: 1450000,
    discount: 10,
    terms: 'Net 45 Days',
    status: 'ACTIVE',
    daysLeft: 441,
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'ACTIVE':
      return 'default'
    case 'EXPIRING':
      return 'secondary'
    case 'EXPIRED':
      return 'destructive'
    default:
      return 'outline'
  }
}

export default function ContractsPage() {
  const [contracts, setContracts] = useState(SAMPLE_CONTRACTS)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const filteredContracts = contracts.filter((contract) => {
    const matchesSearch = contract.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contract.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || contract.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const stats = {
    total: contracts.length,
    active: contracts.filter(c => c.status === 'ACTIVE').length,
    expiring: contracts.filter(c => c.status === 'EXPIRING').length,
    totalValue: contracts.reduce((sum, c) => sum + c.value, 0),
  }

  const expiringContracts = contracts.filter(c => c.status === 'EXPIRING')

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Vendor Contracts</h1>
          <p className="text-muted-foreground mt-1">Manage and track service provider contracts</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          New Contract
        </Button>
      </div>

      {/* Alerts */}
      {expiringContracts.length > 0 && (
        <Alert className="border-red-200 bg-red-50">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            {expiringContracts.length} contract(s) expiring within 90 days. Please renew or renegotiate terms.
          </AlertDescription>
        </Alert>
      )}

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="p-4 border-border/40">
          <p className="text-sm text-muted-foreground">Total Contracts</p>
          <p className="text-2xl font-bold text-foreground mt-2">{stats.total}</p>
        </Card>
        <Card className="p-4 border-border/40">
          <p className="text-sm text-muted-foreground">Active</p>
          <p className="text-2xl font-bold text-green-600 mt-2">{stats.active}</p>
        </Card>
        <Card className="p-4 border-border/40">
          <p className="text-sm text-muted-foreground">Expiring Soon</p>
          <p className="text-2xl font-bold text-red-600 mt-2">{stats.expiring}</p>
        </Card>
        <Card className="p-4 border-border/40">
          <p className="text-sm text-muted-foreground">Total Value</p>
          <p className="text-2xl font-bold text-foreground mt-2">
            PKR {(stats.totalValue / 1000000).toFixed(1)}M
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
                placeholder="Search contracts..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="ACTIVE">Active</SelectItem>
              <SelectItem value="EXPIRING">Expiring Soon</SelectItem>
              <SelectItem value="EXPIRED">Expired</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Contracts Table */}
      <Card className="border-border/40 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border/40 bg-muted/50">
              <tr>
                <th className="text-left px-6 py-3 text-sm font-semibold text-muted-foreground">Contract ID</th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-muted-foreground">Vendor</th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-muted-foreground">Type</th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-muted-foreground">Start Date</th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-muted-foreground">End Date</th>
                <th className="text-right px-6 py-3 text-sm font-semibold text-muted-foreground">Value</th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-muted-foreground">Discount</th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredContracts.map((contract) => (
                <tr key={contract.id} className="border-b border-border/40 hover:bg-muted/30">
                  <td className="px-6 py-4 text-sm font-bold text-primary">{contract.id}</td>
                  <td className="px-6 py-4 text-sm font-medium text-foreground">{contract.vendor}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{contract.type}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{contract.startDate}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{contract.endDate}</td>
                  <td className="px-6 py-4 text-sm font-bold text-right">
                    PKR {contract.value.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-green-600">{contract.discount}%</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Badge variant={getStatusColor(contract.status)}>{contract.status}</Badge>
                      {contract.daysLeft < 100 && (
                        <span className="text-xs text-muted-foreground">{contract.daysLeft} days left</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Contract Analytics */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="p-6 border-border/40">
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Discount Summary
          </h3>
          <div className="space-y-3">
            {contracts
              .sort((a, b) => b.discount - a.discount)
              .map((contract, idx) => (
                <div key={idx} className="flex justify-between items-center pb-3 border-b border-border/40 last:border-0">
                  <div>
                    <p className="font-medium text-foreground">{contract.vendor}</p>
                    <p className="text-xs text-muted-foreground">{contract.type}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">{contract.discount}%</p>
                    <p className="text-xs text-muted-foreground">
                      PKR {Math.round((contract.value * contract.discount) / 100).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </Card>

        <Card className="p-6 border-border/40">
          <h3 className="font-semibold text-foreground mb-4">Contract Terms</h3>
          <div className="space-y-3">
            {contracts.slice(0, 4).map((contract, idx) => (
              <div key={idx} className="pb-3 border-b border-border/40 last:border-0">
                <div className="flex justify-between items-start mb-1">
                  <p className="font-medium text-foreground text-sm">{contract.vendor}</p>
                  <Badge variant="outline" className="text-xs">{contract.terms}</Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  {contract.startDate} to {contract.endDate}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Documents & Attachments */}
      <Card className="p-6 border-border/40">
        <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Contract Documents
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { doc: 'Master Agreement', vendor: 'Al-Safwa Hotel', date: '2024-01-15' },
            { doc: 'Service Level Agreement', vendor: 'Saudia Airways', date: '2024-02-20' },
            { doc: 'Pricing Schedule', vendor: 'Visa Agent Pro', date: '2024-03-10' },
            { doc: 'Terms & Conditions', vendor: 'Medina Palace', date: '2023-06-15' },
          ].map((item, idx) => (
            <Button key={idx} variant="outline" className="h-24 flex flex-col items-center justify-center gap-2">
              <FileText className="w-5 h-5" />
              <span className="text-xs text-center">{item.doc}</span>
            </Button>
          ))}
        </div>
      </Card>
    </div>
  )
}
