'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Plus, Search, Filter, Download, Phone, Mail, Globe } from 'lucide-react'
import { useState } from 'react'

const SAMPLE_LEADS = [
  {
    id: 1,
    name: 'Ahmed Hassan',
    email: 'ahmed@example.com',
    phone: '+92 300 1234567',
    travelType: 'Umrah',
    destination: 'Saudi Arabia',
    budget: 'PKR 150K - 200K',
    source: 'Website',
    score: 85,
    status: 'QUALIFIED',
    assignedTo: 'Fatima Khan',
  },
  {
    id: 2,
    name: 'Zainab Ali',
    email: 'zainab@example.com',
    phone: '+92 321 9876543',
    travelType: 'Tours',
    destination: 'Dubai',
    budget: 'PKR 80K - 120K',
    source: 'Referral',
    score: 72,
    status: 'NEGOTIATING',
    assignedTo: 'Muhammad Ahmed',
  },
  {
    id: 3,
    name: 'Hassan Malik',
    email: 'hassan@example.com',
    phone: '+92 345 5555555',
    travelType: 'Hajj',
    destination: 'Saudi Arabia',
    budget: 'PKR 400K - 500K',
    source: 'Social Media',
    score: 92,
    status: 'QUALIFIED',
    assignedTo: 'Ayesha Khan',
  },
  {
    id: 4,
    name: 'Nida Hussain',
    email: 'nida@example.com',
    phone: '+92 333 1111111',
    travelType: 'Visa',
    destination: 'UK',
    budget: 'PKR 50K - 70K',
    source: 'Website',
    score: 65,
    status: 'NEW',
    assignedTo: 'Unassigned',
  },
  {
    id: 5,
    name: 'Kareem Shah',
    email: 'kareem@example.com',
    phone: '+92 312 3333333',
    travelType: 'Tours',
    destination: 'Turkey',
    budget: 'PKR 120K - 180K',
    source: 'Referral',
    score: 78,
    status: 'LOST',
    assignedTo: 'Muhammad Ahmed',
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'NEW':
      return 'outline'
    case 'QUALIFIED':
      return 'default'
    case 'NEGOTIATING':
      return 'secondary'
    case 'LOST':
      return 'destructive'
    default:
      return 'outline'
  }
}

export default function LeadsPage() {
  const [leads, setLeads] = useState(SAMPLE_LEADS)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Leads Management</h1>
          <p className="text-muted-foreground mt-1">Track and manage your sales leads</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Add New Lead
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="p-4 border-border/40">
          <p className="text-sm text-muted-foreground">Total Leads</p>
          <p className="text-2xl font-bold text-foreground mt-2">{leads.length}</p>
        </Card>
        <Card className="p-4 border-border/40">
          <p className="text-sm text-muted-foreground">Qualified</p>
          <p className="text-2xl font-bold text-foreground mt-2">{leads.filter(l => l.status === 'QUALIFIED').length}</p>
        </Card>
        <Card className="p-4 border-border/40">
          <p className="text-sm text-muted-foreground">Avg Lead Score</p>
          <p className="text-2xl font-bold text-foreground mt-2">
            {Math.round(leads.reduce((sum, l) => sum + l.score, 0) / leads.length)}
          </p>
        </Card>
        <Card className="p-4 border-border/40">
          <p className="text-sm text-muted-foreground">Conversion Rate</p>
          <p className="text-2xl font-bold text-foreground mt-2">
            {Math.round((leads.filter(l => l.status === 'QUALIFIED').length / leads.length) * 100)}%
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
                placeholder="Search by name or email..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="NEW">New</SelectItem>
              <SelectItem value="QUALIFIED">Qualified</SelectItem>
              <SelectItem value="NEGOTIATING">Negotiating</SelectItem>
              <SelectItem value="LOST">Lost</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="w-4 h-4" />
            More Filters
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>
      </Card>

      {/* Leads Table */}
      <Card className="border-border/40 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border/40 bg-muted/50">
              <tr>
                <th className="text-left px-6 py-3 text-sm font-semibold text-muted-foreground">Name</th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-muted-foreground">Contact</th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-muted-foreground">Travel Type</th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-muted-foreground">Budget</th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-muted-foreground">Score</th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-muted-foreground">Status</th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-muted-foreground">Assigned To</th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="border-b border-border/40 hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-foreground">{lead.name}</td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex flex-col gap-1">
                      <a href={`mailto:${lead.email}`} className="flex items-center gap-1 text-primary hover:underline">
                        <Mail className="w-3 h-3" />
                        {lead.email}
                      </a>
                      <a href={`tel:${lead.phone}`} className="flex items-center gap-1 text-muted-foreground hover:text-primary">
                        <Phone className="w-3 h-3" />
                        {lead.phone}
                      </a>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-foreground">{lead.travelType}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{lead.budget}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full"
                          style={{ width: `${lead.score}%` }}
                        />
                      </div>
                      <span className="text-sm font-semibold">{lead.score}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant={getStatusColor(lead.status)}>{lead.status}</Badge>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{lead.assignedTo}</td>
                  <td className="px-6 py-4 text-sm">
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Summary */}
      <Card className="p-6 border-border/40">
        <h3 className="font-semibold text-foreground mb-4">Lead Distribution by Travel Type</h3>
        <div className="grid md:grid-cols-4 gap-4">
          {['Umrah', 'Hajj', 'Tours', 'Visa'].map((type) => (
            <div key={type} className="border border-border/40 rounded-lg p-4 text-center">
              <p className="text-sm text-muted-foreground">{type}</p>
              <p className="text-2xl font-bold text-foreground mt-2">
                {leads.filter(l => l.travelType === type).length}
              </p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
