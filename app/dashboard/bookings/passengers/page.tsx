'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Plus, Search, FileText, Download, Eye, Edit, AlertCircle } from 'lucide-react'
import { useState } from 'react'
import { Alert, AlertDescription } from '@/components/ui/alert'

const SAMPLE_PASSENGERS = [
  {
    id: 'PS-001',
    bookingId: 'BK-2025-001',
    firstName: 'Ahmed',
    lastName: 'Hassan',
    dateOfBirth: '1985-03-15',
    gender: 'M',
    passport: 'AB1234567',
    passportExpiry: '2028-06-20',
    cnic: '12345-6789012-3',
    visaStatus: 'APPROVED',
    medicalConditions: 'None',
  },
  {
    id: 'PS-002',
    bookingId: 'BK-2025-001',
    firstName: 'Fatima',
    lastName: 'Hassan',
    dateOfBirth: '1988-07-22',
    gender: 'F',
    passport: 'AB7654321',
    passportExpiry: '2027-09-15',
    cnic: '98765-4321098-7',
    visaStatus: 'APPROVED',
    medicalConditions: 'Diabetes - on medication',
  },
  {
    id: 'PS-003',
    bookingId: 'BK-2025-002',
    firstName: 'Muhammad',
    lastName: 'Khan',
    dateOfBirth: '1980-01-10',
    gender: 'M',
    passport: 'CD2468135',
    passportExpiry: '2029-12-10',
    cnic: '11111-1111111-1',
    visaStatus: 'PENDING',
    medicalConditions: 'None',
  },
  {
    id: 'PS-004',
    bookingId: 'BK-2025-002',
    firstName: 'Ayesha',
    lastName: 'Khan',
    dateOfBirth: '1982-05-20',
    gender: 'F',
    passport: 'CD1357924',
    passportExpiry: '2025-08-15',
    cnic: '22222-2222222-2',
    visaStatus: 'EXPIRED',
    medicalConditions: 'High Blood Pressure',
  },
]

const getVisaStatusColor = (status: string) => {
  switch (status) {
    case 'APPROVED':
      return 'default'
    case 'PENDING':
      return 'secondary'
    case 'REJECTED':
      return 'destructive'
    case 'EXPIRED':
      return 'destructive'
    case 'COLLECTED':
      return 'default'
    default:
      return 'outline'
  }
}

const isPassportExpiringSoon = (date: string) => {
  const expiry = new Date(date)
  const today = new Date()
  const daysLeft = Math.floor((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
  return daysLeft < 180
}

export default function PassengersPage() {
  const [passengers, setPassengers] = useState(SAMPLE_PASSENGERS)
  const [searchTerm, setSearchTerm] = useState('')
  const [visaFilter, setVisaFilter] = useState('all')

  const filteredPassengers = passengers.filter((passenger) => {
    const matchesSearch = passenger.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      passenger.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      passenger.passport.toLowerCase().includes(searchTerm.toLowerCase()) ||
      passenger.bookingId.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesVisa = visaFilter === 'all' || passenger.visaStatus === visaFilter
    return matchesSearch && matchesVisa
  })

  const expiringPassports = passengers.filter(p => isPassportExpiringSoon(p.passportExpiry))
  const stats = {
    total: passengers.length,
    withApprovedVisa: passengers.filter(p => p.visaStatus === 'APPROVED').length,
    pendingVisa: passengers.filter(p => p.visaStatus === 'PENDING').length,
    expiringPassports: expiringPassports.length,
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Passengers Management</h1>
          <p className="text-muted-foreground mt-1">Track passenger details, visas, and documents</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Add Passenger
        </Button>
      </div>

      {/* Alerts */}
      {expiringPassports.length > 0 && (
        <Alert className="border-amber-200 bg-amber-50">
          <AlertCircle className="h-4 w-4 text-amber-600" />
          <AlertDescription className="text-amber-800">
            {expiringPassports.length} passenger(s) have passports expiring within 6 months. Please update documents.
          </AlertDescription>
        </Alert>
      )}

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="p-4 border-border/40">
          <p className="text-sm text-muted-foreground">Total Passengers</p>
          <p className="text-2xl font-bold text-foreground mt-2">{stats.total}</p>
        </Card>
        <Card className="p-4 border-border/40">
          <p className="text-sm text-muted-foreground">Visa Approved</p>
          <p className="text-2xl font-bold text-green-600 mt-2">{stats.withApprovedVisa}</p>
        </Card>
        <Card className="p-4 border-border/40">
          <p className="text-sm text-muted-foreground">Visa Pending</p>
          <p className="text-2xl font-bold text-amber-600 mt-2">{stats.pendingVisa}</p>
        </Card>
        <Card className="p-4 border-border/40">
          <p className="text-sm text-muted-foreground">Passports Expiring</p>
          <p className="text-2xl font-bold text-red-600 mt-2">{stats.expiringPassports}</p>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4 border-border/40">
        <div className="flex gap-4 flex-wrap">
          <div className="flex-1 min-w-64">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, passport, or booking..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <Select value={visaFilter} onValueChange={setVisaFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Visa Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="PENDING">Pending</SelectItem>
              <SelectItem value="APPROVED">Approved</SelectItem>
              <SelectItem value="REJECTED">Rejected</SelectItem>
              <SelectItem value="COLLECTED">Collected</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>
      </Card>

      {/* Passengers Table */}
      <Card className="border-border/40 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border/40 bg-muted/50">
              <tr>
                <th className="text-left px-6 py-3 text-sm font-semibold text-muted-foreground">Name</th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-muted-foreground">Booking</th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-muted-foreground">DOB</th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-muted-foreground">Passport</th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-muted-foreground">Passport Expiry</th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-muted-foreground">Visa Status</th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-muted-foreground">Medical Info</th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPassengers.map((passenger) => (
                <tr key={passenger.id} className="border-b border-border/40 hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-foreground">
                    {passenger.firstName} {passenger.lastName}
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-primary">{passenger.bookingId}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{passenger.dateOfBirth}</td>
                  <td className="px-6 py-4 text-sm font-mono text-foreground">{passenger.passport}</td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex items-center gap-2">
                      <span className={isPassportExpiringSoon(passenger.passportExpiry) ? 'text-red-600 font-semibold' : 'text-foreground'}>
                        {passenger.passportExpiry}
                      </span>
                      {isPassportExpiringSoon(passenger.passportExpiry) && (
                        <AlertCircle className="w-4 h-4 text-red-600" />
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant={getVisaStatusColor(passenger.visaStatus)}>
                      {passenger.visaStatus}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {passenger.medicalConditions !== 'None' && (
                      <Badge variant="outline" className="text-amber-700 border-amber-200">
                        {passenger.medicalConditions}
                      </Badge>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" className="p-1" title="View">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="p-1" title="Edit">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="p-1" title="Documents">
                        <FileText className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Document Summary */}
      <Card className="p-6 border-border/40">
        <h3 className="font-semibold text-foreground mb-4">Document Checklist</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-foreground mb-3">Required Documents</h4>
            <ul className="space-y-2">
              {[
                { item: 'Passport', collected: true },
                { item: 'Visa Copy', collected: true },
                { item: 'CNIC', collected: true },
                { item: 'Travel Insurance', collected: false },
              ].map((doc, idx) => (
                <li key={idx} className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={doc.collected} readOnly className="w-4 h-4" />
                  <span className={doc.collected ? 'text-foreground' : 'text-muted-foreground line-through'}>
                    {doc.item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-3">Visa Application Status</h4>
            <div className="space-y-2">
              {[
                { status: 'Submitted', count: 8, color: 'bg-blue-100 text-blue-800' },
                { status: 'Under Review', count: 3, color: 'bg-amber-100 text-amber-800' },
                { status: 'Approved', count: 18, color: 'bg-green-100 text-green-800' },
                { status: 'Rejected', count: 1, color: 'bg-red-100 text-red-800' },
              ].map((item, idx) => (
                <div key={idx} className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">{item.status}</span>
                  <Badge className={item.color}>{item.count}</Badge>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
