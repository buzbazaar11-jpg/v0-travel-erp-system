'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Download, Eye, Trash2, Plus, Clock, CheckCircle } from 'lucide-react'

interface Document {
  id: string
  name: string
  type: string
  owner: string
  uploadDate: string
  expiryDate?: string
  status: 'Active' | 'Expiring' | 'Expired'
  category: string
}

const mockDocuments: Document[] = [
  { id: '1', name: 'Ahmed_Passport.pdf', type: 'Passport', owner: 'Ahmed Khan', uploadDate: '2024-01-15', expiryDate: '2026-05-10', status: 'Active', category: 'Passport' },
  { id: '2', name: 'Visa_Stamp_Fatima.pdf', type: 'Visa', owner: 'Fatima Ali', uploadDate: '2024-01-16', expiryDate: '2024-06-01', status: 'Expiring', category: 'Visa' },
  { id: '3', name: 'Insurance_Hassan.pdf', type: 'Insurance', owner: 'Hassan Malik', uploadDate: '2024-01-17', status: 'Active', category: 'Insurance' },
  { id: '4', name: 'Vaccination_Old.pdf', type: 'Health', owner: 'Ali Raza', uploadDate: '2023-12-01', expiryDate: '2024-01-01', status: 'Expired', category: 'Health' },
]

export default function DocumentsPage() {
  const [documents] = useState(mockDocuments)

  const expiring = documents.filter(d => d.status === 'Expiring').length
  const expired = documents.filter(d => d.status === 'Expired').length

  const statusIcon = {
    'Active': <CheckCircle className="h-4 w-4 text-green-600" />,
    'Expiring': <Clock className="h-4 w-4 text-yellow-600" />,
    'Expired': <Trash2 className="h-4 w-4 text-red-600" />,
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Document Management</h1>
          <p className="text-muted-foreground">Centralized storage for all travel documents</p>
        </div>
        <Button className="gap-2"><Plus className="h-4 w-4" /> Upload Document</Button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Total Documents</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">{documents.length}</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Expiring Soon</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold text-yellow-600">{expiring}</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Expired</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold text-red-600">{expired}</div></CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Document Library</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-3">
            {documents.map(doc => (
              <div key={doc.id} className="border rounded-lg p-4 flex justify-between items-center">
                <div className="flex-1">
                  <h3 className="font-semibold flex items-center gap-2">
                    {statusIcon[doc.status]}
                    {doc.name}
                  </h3>
                  <div className="text-sm text-muted-foreground">
                    {doc.owner} • {doc.uploadDate}
                    {doc.expiryDate && ` • Expires: ${doc.expiryDate}`}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={doc.status === 'Active' ? 'default' : doc.status === 'Expiring' ? 'secondary' : 'destructive'}>
                    {doc.status}
                  </Badge>
                  <Button variant="ghost" size="sm"><Eye className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="sm"><Download className="h-4 w-4" /></Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
