'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Plus, Search, FileText, CheckCircle, Clock, AlertCircle } from 'lucide-react'
import Link from 'next/link'

interface VisaApplication {
  id: string
  passengerName: string
  visaType: string
  country: string
  status: 'Applied' | 'Processing' | 'Approved' | 'Rejected' | 'Collected'
  applicationDate: string
  approvalDate?: string
  documents: number
}

const mockVisas: VisaApplication[] = [
  { id: '1', passengerName: 'Ahmed Khan', visaType: 'Umrah', country: 'Saudi Arabia', status: 'Approved', applicationDate: '2024-01-20', approvalDate: '2024-01-25', documents: 4 },
  { id: '2', passengerName: 'Fatima Ali', visaType: 'Tourist', country: 'UAE', status: 'Processing', applicationDate: '2024-01-22', documents: 3 },
  { id: '3', passengerName: 'Hassan Malik', visaType: 'Hajj', country: 'Saudi Arabia', status: 'Applied', applicationDate: '2024-01-23', documents: 5 },
]

const statusConfig = {
  'Applied': { bg: 'bg-blue-100', text: 'text-blue-800', icon: '📝' },
  'Processing': { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: '⏳' },
  'Approved': { bg: 'bg-green-100', text: 'text-green-800', icon: '✅' },
  'Rejected': { bg: 'bg-red-100', text: 'text-red-800', icon: '❌' },
  'Collected': { bg: 'bg-purple-100', text: 'text-purple-800', icon: '📦' },
}

export default function VisaApplicationsPage() {
  const [visas, setVisas] = useState(mockVisas)
  const [searchQuery, setSearchQuery] = useState('')

  const filtered = visas.filter(v => 
    v.passengerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    v.visaType.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const statusCounts = {
    Applied: visas.filter(v => v.status === 'Applied').length,
    Processing: visas.filter(v => v.status === 'Processing').length,
    Approved: visas.filter(v => v.status === 'Approved').length,
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Visa Applications</h1>
          <p className="text-muted-foreground">Track and manage visa applications</p>
        </div>
        <Link href="/dashboard/visa/apply">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            New Application
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Pending Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statusCounts.Applied}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Processing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statusCounts.Processing}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Approved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{statusCounts.Approved}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Applications</CardTitle>
          <div className="relative mt-4">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or visa type..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filtered.map(visa => (
              <motion.div key={visa.id} className="border rounded-lg p-4 flex justify-between items-center hover:bg-muted/50" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="flex-1">
                  <h3 className="font-semibold">{visa.passengerName}</h3>
                  <div className="text-sm text-muted-foreground mt-1">
                    {visa.visaType} • {visa.country} • Applied: {visa.applicationDate}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">{visa.documents} documents uploaded</div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className={`${statusConfig[visa.status].bg} ${statusConfig[visa.status].text}`}>
                    {statusConfig[visa.status].icon} {visa.status}
                  </Badge>
                  <Link href={`/dashboard/visa/applications/${visa.id}`}>
                    <Button variant="outline" size="sm">View</Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
