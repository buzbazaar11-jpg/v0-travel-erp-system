'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { toast } from 'sonner'
import { Save, Trash2 } from 'lucide-react'

export default function SettingsPage() {
  const [companySettings, setCompanySettings] = useState({
    name: 'My Travel Agency',
    email: 'admin@travelagency.com',
    phone: '+92 300 1234567',
    address: 'Lahore, Pakistan',
    gstNumber: 'GST-12345678',
    bankAccount: 'ACC-987654321',
  })

  const [emailSettings, setEmailSettings] = useState({
    enableEmails: true,
    enableSMS: true,
    enableWhatsApp: true,
    bookingConfirmation: true,
    paymentReminder: true,
    visaUpdates: true,
  })

  const [taxSettings, setTaxSettings] = useState({
    gstRate: 17,
    incomeTaxRate: 25,
    currency: 'PKR',
  })

  const handleSave = () => {
    toast.success('Settings saved successfully!')
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Configure your Travel ERP system</p>
      </div>

      <Tabs defaultValue="company" className="space-y-4">
        <TabsList>
          <TabsTrigger value="company">Company</TabsTrigger>
          <TabsTrigger value="communications">Communications</TabsTrigger>
          <TabsTrigger value="tax">Tax & Finance</TabsTrigger>
        </TabsList>

        {/* Company Settings */}
        <TabsContent value="company">
          <Card>
            <CardHeader>
              <CardTitle>Company Information</CardTitle>
              <CardDescription>Manage your company details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Company Name</Label>
                  <Input value={companySettings.name} onChange={(e) => setCompanySettings({...companySettings, name: e.target.value})} />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input type="email" value={companySettings.email} onChange={(e) => setCompanySettings({...companySettings, email: e.target.value})} />
                </div>
                <div>
                  <Label>Phone</Label>
                  <Input value={companySettings.phone} onChange={(e) => setCompanySettings({...companySettings, phone: e.target.value})} />
                </div>
                <div>
                  <Label>GST Number</Label>
                  <Input value={companySettings.gstNumber} onChange={(e) => setCompanySettings({...companySettings, gstNumber: e.target.value})} />
                </div>
              </div>
              <div>
                <Label>Address</Label>
                <Textarea value={companySettings.address} onChange={(e) => setCompanySettings({...companySettings, address: e.target.value})} rows={3} />
              </div>
              <div>
                <Label>Bank Account Number</Label>
                <Input value={companySettings.bankAccount} onChange={(e) => setCompanySettings({...companySettings, bankAccount: e.target.value})} />
              </div>
              <Button onClick={handleSave} className="gap-2">
                <Save className="h-4 w-4" />
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Communication Settings */}
        <TabsContent value="communications">
          <Card>
            <CardHeader>
              <CardTitle>Communication Preferences</CardTitle>
              <CardDescription>Configure notification channels</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 border rounded-lg">
                  <Label>Email Notifications</Label>
                  <Switch checked={emailSettings.enableEmails} onCheckedChange={(v) => setEmailSettings({...emailSettings, enableEmails: v})} />
                </div>
                <div className="flex justify-between items-center p-3 border rounded-lg">
                  <Label>SMS Notifications</Label>
                  <Switch checked={emailSettings.enableSMS} onCheckedChange={(v) => setEmailSettings({...emailSettings, enableSMS: v})} />
                </div>
                <div className="flex justify-between items-center p-3 border rounded-lg">
                  <Label>WhatsApp Notifications</Label>
                  <Switch checked={emailSettings.enableWhatsApp} onCheckedChange={(v) => setEmailSettings({...emailSettings, enableWhatsApp: v})} />
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-semibold mb-3">Notification Types</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label>Booking Confirmation</Label>
                    <Switch checked={emailSettings.bookingConfirmation} onCheckedChange={(v) => setEmailSettings({...emailSettings, bookingConfirmation: v})} />
                  </div>
                  <div className="flex justify-between items-center">
                    <Label>Payment Reminders</Label>
                    <Switch checked={emailSettings.paymentReminder} onCheckedChange={(v) => setEmailSettings({...emailSettings, paymentReminder: v})} />
                  </div>
                  <div className="flex justify-between items-center">
                    <Label>Visa Status Updates</Label>
                    <Switch checked={emailSettings.visaUpdates} onCheckedChange={(v) => setEmailSettings({...emailSettings, visaUpdates: v})} />
                  </div>
                </div>
              </div>

              <Button onClick={handleSave} className="gap-2">
                <Save className="h-4 w-4" />
                Save Preferences
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tax Settings */}
        <TabsContent value="tax">
          <Card>
            <CardHeader>
              <CardTitle>Tax & Financial Settings</CardTitle>
              <CardDescription>Configure tax rates and financial parameters</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>GST Rate (%)</Label>
                  <Input type="number" value={taxSettings.gstRate} onChange={(e) => setTaxSettings({...taxSettings, gstRate: parseFloat(e.target.value)})} step="0.1" />
                </div>
                <div>
                  <Label>Income Tax Rate (%)</Label>
                  <Input type="number" value={taxSettings.incomeTaxRate} onChange={(e) => setTaxSettings({...taxSettings, incomeTaxRate: parseFloat(e.target.value)})} step="0.1" />
                </div>
                <div>
                  <Label>Default Currency</Label>
                  <Input value={taxSettings.currency} onChange={(e) => setTaxSettings({...taxSettings, currency: e.target.value})} />
                </div>
              </div>
              <Button onClick={handleSave} className="gap-2">
                <Save className="h-4 w-4" />
                Save Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
