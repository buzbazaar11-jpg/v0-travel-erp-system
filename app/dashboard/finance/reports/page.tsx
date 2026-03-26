'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Plus, FileText, Download, Eye } from 'lucide-react'

const REPORT_TEMPLATES = [
  {
    id: 1,
    name: 'Income Statement',
    type: 'Financial',
    description: 'Monthly revenue, expenses, and profit summary',
    frequency: 'Monthly',
    lastGenerated: '2025-03-20',
  },
  {
    id: 2,
    name: 'Balance Sheet',
    type: 'Financial',
    description: 'Assets, liabilities, and equity statement',
    frequency: 'Monthly',
    lastGenerated: '2025-03-20',
  },
  {
    id: 3,
    name: 'Trial Balance',
    type: 'Accounting',
    description: 'All account balances for reconciliation',
    frequency: 'Daily',
    lastGenerated: '2025-03-21',
  },
  {
    id: 4,
    name: 'GST Report',
    type: 'Tax',
    description: 'GST collected and payable to FBR',
    frequency: 'Monthly',
    lastGenerated: '2025-03-15',
  },
  {
    id: 5,
    name: 'Sales Analysis',
    type: 'Operational',
    description: 'Revenue by package type and customer',
    frequency: 'Weekly',
    lastGenerated: '2025-03-21',
  },
  {
    id: 6,
    name: 'Expense Analysis',
    type: 'Operational',
    description: 'Expenses by vendor and category',
    frequency: 'Weekly',
    lastGenerated: '2025-03-21',
  },
]

const getTypeColor = (type: string) => {
  switch (type) {
    case 'Financial':
      return 'default'
    case 'Accounting':
      return 'secondary'
    case 'Tax':
      return 'destructive'
    case 'Operational':
      return 'outline'
    default:
      return 'outline'
  }
}

export default function ReportsPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Financial Reports</h1>
          <p className="text-muted-foreground mt-1">Generate and manage financial reports</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Create Report
        </Button>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: 'Income Statement', icon: '📊' },
          { title: 'Balance Sheet', icon: '💰' },
          { title: 'Trial Balance', icon: '📋' },
          { title: 'GST Report', icon: '🏛️' },
        ].map((action, idx) => (
          <Button key={idx} variant="outline" className="h-24 flex flex-col items-center justify-center gap-2">
            <span className="text-2xl">{action.icon}</span>
            <span className="text-sm">{action.title}</span>
          </Button>
        ))}
      </div>

      {/* Report Templates */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Available Reports</h2>
        <div className="grid gap-4">
          {REPORT_TEMPLATES.map((report) => (
            <Card key={report.id} className="p-6 border-border/40 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <FileText className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold text-foreground">{report.name}</h3>
                    <Badge variant={getTypeColor(report.type)}>{report.type}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{report.description}</p>
                  <p className="text-xs text-muted-foreground">
                    Frequency: {report.frequency} | Last Generated: {report.lastGenerated}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Eye className="w-4 h-4" />
                    View
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Download className="w-4 h-4" />
                    Export
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Scheduled Reports */}
      <Card className="p-6 border-border/40">
        <h2 className="text-lg font-semibold text-foreground mb-4">Scheduled Reports</h2>
        <div className="space-y-3">
          {[
            { report: 'Income Statement', schedule: 'Every 1st of month', recipient: 'admin@company.com' },
            { report: 'Trial Balance', schedule: 'Daily at 6 PM', recipient: 'finance@company.com' },
            { report: 'GST Report', schedule: 'Every 15th of month', recipient: 'tax@company.com' },
          ].map((item, idx) => (
            <div key={idx} className="flex justify-between items-center pb-3 border-b border-border/40 last:border-0">
              <div>
                <p className="font-medium text-foreground">{item.report}</p>
                <p className="text-xs text-muted-foreground">{item.schedule} → {item.recipient}</p>
              </div>
              <Button variant="outline" size="sm">Edit</Button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
