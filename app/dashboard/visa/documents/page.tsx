'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { AlertCircle, Upload, FileCheck, Trash2 } from 'lucide-react'

interface VisaDocument {
  id: string
  name: string
  type: string
  uploadDate: string
  expiryDate?: string
  status: 'Verified' | 'Pending' | 'Expired'
}

const mockDocuments: VisaDocument[] = [
  { id: '1', name: 'Passport', type: 'PDF', uploadDate: '2024-01-15', expiryDate: '2026-05-10', status: 'Verified' },
  { id: '2', name: 'Visa_Application_Form', type: 'PDF', uploadDate: '2024-01-16', status: 'Verified' },
  { id: '3', name: 'Bank_Statement', type: 'PDF', uploadDate: '2024-01-17', status: 'Pending' },
  { id: '4', name: 'Vaccination_Certificate', type: 'PDF', uploadDate: '2024-01-18', expiryDate: '2024-02-01', status: 'Expired' },
]

export default function VisaDocumentsPage() {
  const [documents, setDocuments] = useState(mockDocuments)

  const handleDelete = (id: string) => {
    setDocuments(documents.filter(d => d.id !== id))
  }

  const expiringSoon = documents.filter(d => d.expiryDate && new Date(d.expiryDate) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000))
  const expired = documents.filter(d => d.status === 'Expired')

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Visa Documents</h1>
        <p className="text-muted-foreground">Manage all visa-related documents</p>
      </div>

      {expiringSoon.length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex gap-3">
          <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-yellow-900">Documents Expiring Soon</h3>
            <p className="text-sm text-yellow-800">{expiringSoon.length} document(s) will expire within 30 days</p>
          </div>
        </div>
      )}

      {expired.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex gap-3">
          <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-red-900">Expired Documents</h3>
            <p className="text-sm text-red-800">{expired.length} document(s) have expired. Action required.</p>
          </div>
        </div>
      )}

      <Card>
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle>All Documents</CardTitle>
          <Button className="gap-2">
            <Upload className="h-4 w-4" />
            Upload Document
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {documents.map(doc => (
              <div key={doc.id} className="border rounded-lg p-4 flex justify-between items-center">
                <div className="flex-1">
                  <h3 className="font-semibold">{doc.name}</h3>
                  <div className="text-sm text-muted-foreground">
                    {doc.type} • Uploaded: {doc.uploadDate}
                    {doc.expiryDate && ` • Expires: ${doc.expiryDate}`}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={doc.status === 'Verified' ? 'default' : doc.status === 'Pending' ? 'secondary' : 'destructive'}>
                    {doc.status === 'Verified' && <FileCheck className="h-3 w-3 mr-1" />}
                    {doc.status}
                  </Badge>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(doc.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
