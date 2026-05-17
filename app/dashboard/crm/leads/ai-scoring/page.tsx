'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Zap, Loader, TrendingUp } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

export default function AILeadScoringPage() {
  const [leads, setLeads] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [leadData, setLeadData] = useState({
    name: '',
    budget: 0,
    source: 'website',
    previousBookings: 0,
    travelType: 'leisure',
  })

  const scoreLead = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/ai/score-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadData),
      })
      const { score } = await response.json()
      setLeads([...leads, { ...leadData, score, id: Date.now() }])
      setLeadData({ name: '', budget: 0, source: 'website', previousBookings: 0, travelType: 'leisure' })
      toast.success(`Lead scored: ${score}/100`)
    } catch (error) {
      toast.error('Failed to score lead')
    } finally {
      setLoading(false)
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'bg-green-100 text-green-800'
    if (score >= 60) return 'bg-yellow-100 text-yellow-800'
    if (score >= 40) return 'bg-orange-100 text-orange-800'
    return 'bg-red-100 text-red-800'
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Zap className="w-8 h-8 text-yellow-500" />
          AI Lead Scoring
        </h1>
        <p className="text-muted-foreground">AI-powered lead qualification</p>
      </div>

      <Card className="p-6 space-y-4">
        <h2 className="text-xl font-semibold">Score a Lead</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Lead Name</Label>
            <Input value={leadData.name} onChange={(e) => setLeadData({...leadData, name: e.target.value})} placeholder="Enter name" />
          </div>
          <div>
            <Label>Budget (PKR)</Label>
            <Input type="number" value={leadData.budget} onChange={(e) => setLeadData({...leadData, budget: parseFloat(e.target.value)})} placeholder="0" />
          </div>
          <div>
            <Label>Lead Source</Label>
            <Select value={leadData.source} onValueChange={(v) => setLeadData({...leadData, source: v})}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="website">Website</SelectItem>
                <SelectItem value="social_media">Social Media</SelectItem>
                <SelectItem value="referral">Referral</SelectItem>
                <SelectItem value="phone">Phone</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Travel Type</Label>
            <Select value={leadData.travelType} onValueChange={(v) => setLeadData({...leadData, travelType: v})}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="leisure">Leisure</SelectItem>
                <SelectItem value="business">Business</SelectItem>
                <SelectItem value="family">Family</SelectItem>
                <SelectItem value="adventure">Adventure</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Previous Bookings</Label>
            <Input type="number" value={leadData.previousBookings} onChange={(e) => setLeadData({...leadData, previousBookings: parseInt(e.target.value)})} placeholder="0" />
          </div>
        </div>
        <Button onClick={scoreLead} disabled={loading} className="w-full gap-2">
          {loading ? <Loader className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
          Score This Lead
        </Button>
      </Card>

      {leads.length > 0 && (
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Scored Leads
          </h2>
          <div className="space-y-3">
            {leads.map((lead) => (
              <div key={lead.id} className="flex items-center justify-between p-3 bg-muted rounded">
                <div>
                  <p className="font-semibold">{lead.name}</p>
                  <p className="text-sm text-muted-foreground">Budget: PKR {lead.budget.toLocaleString()}</p>
                </div>
                <div className={`px-4 py-2 rounded font-bold ${getScoreColor(lead.score)}`}>
                  {lead.score}%
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  )
}
