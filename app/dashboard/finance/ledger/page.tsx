'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search, Download, Plus, Filter } from 'lucide-react'
import { useState } from 'react'

const LEDGER_ENTRIES = [
  {
    date: '2025-03-20',
    account: 'Bank - HBL',
    reference: 'BK-2025-001',
    description: 'Booking Payment Received',
    debit: 425000,
    credit: 0,
    balance: 3275000,
  },
  {
    date: '2025-03-20',
    account: 'Revenue - Bookings',
    reference: 'BK-2025-001',
    description: 'Umrah Package Revenue',
    debit: 0,
    credit: 425000,
    balance: 425000,
  },
  {
    date: '2025-03-19',
    account: 'Expense - Hotels',
    reference: 'INV-ALF-2025-001',
    description: 'Al-Safwa Hotel - Makkah',
    debit: 125000,
    credit: 0,
    balance: 125000,
  },
  {
    date: '2025-03-19',
    account: 'Accounts Payable',
    reference: 'INV-ALF-2025-001',
    description: 'Vendor Invoice - Al-Safwa',
    debit: 0,
    credit: 125000,
    balance: 125000,
  },
  {
    date: '2025-03-18',
    account: 'Expense - Visa Services',
    reference: 'VIS-2025-0234',
    description: 'UK Visa Service Processing',
    debit: 45000,
    credit: 0,
    balance: 45000,
  },
  {
    date: '2025-03-18',
    account: 'Accounts Payable',
    reference: 'VIS-2025-0234',
    description: 'Visa Agent Payment',
    debit: 0,
    credit: 45000,
    balance: 45000,
  },
]

const ACCOUNT_BALANCES = [
  { code: '1010', account: 'Cash in Hand', type: 'Asset', debit: 450000, credit: 0, balance: 450000 },
  { code: '1020', account: 'Bank - HBL', type: 'Asset', debit: 3275000, credit: 0, balance: 3275000 },
  { code: '1030', account: 'Bank - UBL', type: 'Asset', debit: 1850000, credit: 0, balance: 1850000 },
  { code: '1050', account: 'Accounts Receivable', type: 'Asset', debit: 385000, credit: 0, balance: 385000 },
  { code: '2010', account: 'Accounts Payable', type: 'Liability', debit: 0, credit: 520000, balance: -520000 },
  { code: '3010', account: 'Owner Capital', type: 'Equity', debit: 0, credit: 5000000, balance: -5000000 },
  { code: '4010', account: 'Revenue - Bookings', type: 'Revenue', debit: 0, credit: 18750000, balance: -18750000 },
  { code: '5010', account: 'Expense - Hotels', type: 'Expense', debit: 5200000, credit: 0, balance: 5200000 },
]

export default function LedgerPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [accountFilter, setAccountFilter] = useState('all')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')

  const filteredEntries = LEDGER_ENTRIES.filter((entry) => {
    const matchesSearch = entry.account.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.reference.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch
  })

  const totalDebit = filteredEntries.reduce((sum, e) => sum + e.debit, 0)
  const totalCredit = filteredEntries.reduce((sum, e) => sum + e.credit, 0)

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">General Ledger</h1>
          <p className="text-muted-foreground mt-1">View and manage all journal entries</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            New Entry
          </Button>
        </div>
      </div>

      {/* Account Balances Summary */}
      <Card className="p-6 border-border/40">
        <h2 className="text-lg font-semibold text-foreground mb-4">Account Balances (Trial Balance)</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border/40 bg-muted/50">
              <tr>
                <th className="text-left px-4 py-3 text-sm font-semibold text-muted-foreground">Account Code</th>
                <th className="text-left px-4 py-3 text-sm font-semibold text-muted-foreground">Account Name</th>
                <th className="text-left px-4 py-3 text-sm font-semibold text-muted-foreground">Type</th>
                <th className="text-right px-4 py-3 text-sm font-semibold text-muted-foreground">Debit</th>
                <th className="text-right px-4 py-3 text-sm font-semibold text-muted-foreground">Credit</th>
                <th className="text-right px-4 py-3 text-sm font-semibold text-muted-foreground">Balance</th>
              </tr>
            </thead>
            <tbody>
              {ACCOUNT_BALANCES.map((account, idx) => (
                <tr key={idx} className="border-b border-border/40 hover:bg-muted/30">
                  <td className="px-4 py-4 text-sm font-mono text-primary">{account.code}</td>
                  <td className="px-4 py-4 text-sm font-medium text-foreground">{account.account}</td>
                  <td className="px-4 py-4 text-sm">
                    <Badge variant="outline">{account.type}</Badge>
                  </td>
                  <td className="px-4 py-4 text-sm text-right font-semibold">
                    {account.debit > 0 ? `PKR ${account.debit.toLocaleString()}` : '—'}
                  </td>
                  <td className="px-4 py-4 text-sm text-right font-semibold">
                    {account.credit > 0 ? `PKR ${account.credit.toLocaleString()}` : '—'}
                  </td>
                  <td className="px-4 py-4 text-sm text-right font-bold">
                    PKR {account.balance.toLocaleString()}
                  </td>
                </tr>
              ))}
              <tr className="border-t-2 border-border/40 bg-muted/50 font-bold">
                <td colSpan={3} className="px-4 py-4 text-sm">TOTALS</td>
                <td className="px-4 py-4 text-sm text-right">
                  PKR {ACCOUNT_BALANCES.reduce((sum, a) => sum + a.debit, 0).toLocaleString()}
                </td>
                <td className="px-4 py-4 text-sm text-right">
                  PKR {ACCOUNT_BALANCES.reduce((sum, a) => sum + a.credit, 0).toLocaleString()}
                </td>
                <td className="px-4 py-4 text-sm text-right">
                  PKR {ACCOUNT_BALANCES.reduce((sum, a) => sum + a.balance, 0).toLocaleString()}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>

      {/* Filters */}
      <Card className="p-4 border-border/40">
        <div className="flex gap-4 flex-wrap">
          <div className="flex-1 min-w-64">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by account, description, or reference..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <Input
            type="date"
            placeholder="From"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            className="w-40"
          />
          <Input
            type="date"
            placeholder="To"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            className="w-40"
          />
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="w-4 h-4" />
            More Filters
          </Button>
        </div>
      </Card>

      {/* Ledger Entries */}
      <Card className="border-border/40 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border/40 bg-muted/50">
              <tr>
                <th className="text-left px-6 py-3 text-sm font-semibold text-muted-foreground">Date</th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-muted-foreground">Account</th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-muted-foreground">Reference</th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-muted-foreground">Description</th>
                <th className="text-right px-6 py-3 text-sm font-semibold text-muted-foreground">Debit</th>
                <th className="text-right px-6 py-3 text-sm font-semibold text-muted-foreground">Credit</th>
                <th className="text-right px-6 py-3 text-sm font-semibold text-muted-foreground">Balance</th>
              </tr>
            </thead>
            <tbody>
              {filteredEntries.map((entry, idx) => (
                <tr key={idx} className="border-b border-border/40 hover:bg-muted/30">
                  <td className="px-6 py-4 text-sm text-muted-foreground font-medium">{entry.date}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-foreground">{entry.account}</td>
                  <td className="px-6 py-4 text-sm font-mono text-primary">{entry.reference}</td>
                  <td className="px-6 py-4 text-sm text-foreground">{entry.description}</td>
                  <td className="px-6 py-4 text-sm text-right font-semibold">
                    {entry.debit > 0 ? `PKR ${entry.debit.toLocaleString()}` : '—'}
                  </td>
                  <td className="px-6 py-4 text-sm text-right font-semibold">
                    {entry.credit > 0 ? `PKR ${entry.credit.toLocaleString()}` : '—'}
                  </td>
                  <td className="px-6 py-4 text-sm text-right font-bold">
                    PKR {entry.balance.toLocaleString()}
                  </td>
                </tr>
              ))}
              <tr className="border-t-2 border-border/40 bg-muted/50 font-bold">
                <td colSpan={4} className="px-6 py-4 text-sm">TOTALS</td>
                <td className="px-6 py-4 text-sm text-right">PKR {totalDebit.toLocaleString()}</td>
                <td className="px-6 py-4 text-sm text-right">PKR {totalCredit.toLocaleString()}</td>
                <td className="px-6 py-4 text-sm text-right">
                  PKR {(totalDebit - totalCredit).toLocaleString()}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>

      {/* Reconciliation Status */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6 border-border/40">
          <h3 className="font-semibold text-foreground mb-4">Ledger Status</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Journal Entries</span>
              <span className="font-bold">48</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-border/40">
              <span className="text-sm text-muted-foreground">Total Postings</span>
              <span className="font-bold">96</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Reconciliation</span>
              <Badge className="bg-green-100 text-green-800">Balanced</Badge>
            </div>
          </div>
        </Card>

        <Card className="p-6 border-border/40">
          <h3 className="font-semibold text-foreground mb-4">Quick Stats</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Total Assets</span>
              <span className="font-bold text-foreground">PKR 5,860,000</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-border/40">
              <span className="text-sm text-muted-foreground">Total Liabilities</span>
              <span className="font-bold text-foreground">PKR 520,000</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Net Worth</span>
              <span className="font-bold text-green-600">PKR 5,340,000</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
