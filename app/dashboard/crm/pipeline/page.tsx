'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Plus, ArrowRight } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts'

const PIPELINE_STAGES = [
  {
    stage: 'LEAD',
    count: 12,
    value: 'PKR 1,200,000',
    deals: [
      { customer: 'Ahmed Hassan', value: 'PKR 150,000', probability: 30 },
      { customer: 'Fatima Khan', value: 'PKR 120,000', probability: 25 },
      { customer: 'Hassan Ali', value: 'PKR 180,000', probability: 35 },
    ],
  },
  {
    stage: 'PROPOSAL',
    count: 8,
    value: 'PKR 1,850,000',
    deals: [
      { customer: 'Zainab Ahmed', value: 'PKR 280,000', probability: 50 },
      { customer: 'Muhammad Khan', value: 'PKR 350,000', probability: 60 },
      { customer: 'Aisha Malik', value: 'PKR 420,000', probability: 55 },
    ],
  },
  {
    stage: 'NEGOTIATION',
    count: 5,
    value: 'PKR 1,450,000',
    deals: [
      { customer: 'Kareem Shah', value: 'PKR 350,000', probability: 75 },
      { customer: 'Nida Hassan', value: 'PKR 280,000', probability: 70 },
    ],
  },
  {
    stage: 'CLOSING',
    count: 3,
    value: 'PKR 950,000',
    deals: [
      { customer: 'Ali Ahmed', value: 'PKR 450,000', probability: 90 },
      { customer: 'Sara Khan', value: 'PKR 500,000', probability: 85 },
    ],
  },
]

const PIPELINE_CHART_DATA = [
  { stage: 'LEAD', deals: 12, value: 1200 },
  { stage: 'PROPOSAL', deals: 8, value: 1850 },
  { stage: 'NEGOTIATION', deals: 5, value: 1450 },
  { stage: 'CLOSING', deals: 3, value: 950 },
]

const FORECAST_DATA = [
  { month: 'Jan', forecast: 2500, actual: 2100 },
  { month: 'Feb', forecast: 2800, actual: 2450 },
  { month: 'Mar', forecast: 3200, actual: 2950 },
  { month: 'Apr', forecast: 3500, actual: 3200 },
  { month: 'May', forecast: 4000, actual: 3850 },
  { month: 'Jun', forecast: 4200, actual: null },
]

export default function SalesPipelinePage() {
  const totalValue = PIPELINE_STAGES.reduce((sum, s) => {
    return sum + parseInt(s.value.replace(/[^0-9]/g, ''))
  }, 0)

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Sales Pipeline</h1>
          <p className="text-muted-foreground mt-1">Track deals through the sales cycle</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Add Deal
        </Button>
      </div>

      {/* Pipeline Overview Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="p-4 border-border/40">
          <p className="text-sm text-muted-foreground">Total Pipeline Value</p>
          <p className="text-2xl font-bold text-foreground mt-2">
            PKR {(totalValue / 1000000).toFixed(1)}M
          </p>
        </Card>
        <Card className="p-4 border-border/40">
          <p className="text-sm text-muted-foreground">Total Deals</p>
          <p className="text-2xl font-bold text-foreground mt-2">
            {PIPELINE_STAGES.reduce((sum, s) => sum + s.count, 0)}
          </p>
        </Card>
        <Card className="p-4 border-border/40">
          <p className="text-sm text-muted-foreground">Avg Deal Size</p>
          <p className="text-2xl font-bold text-foreground mt-2">
            PKR {Math.round(totalValue / PIPELINE_STAGES.reduce((sum, s) => sum + s.count, 0) / 1000)}K
          </p>
        </Card>
        <Card className="p-4 border-border/40">
          <p className="text-sm text-muted-foreground">Win Probability</p>
          <p className="text-2xl font-bold text-foreground mt-2">45%</p>
        </Card>
      </div>

      {/* Pipeline Chart */}
      <Card className="p-6 border-border/40">
        <h2 className="text-lg font-semibold text-foreground mb-4">Pipeline Overview</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={PIPELINE_CHART_DATA}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
            <XAxis dataKey="stage" stroke="rgba(0,0,0,0.5)" />
            <YAxis yAxisId="left" stroke="rgba(0,0,0,0.5)" />
            <YAxis yAxisId="right" orientation="right" stroke="rgba(0,0,0,0.5)" />
            <Tooltip />
            <Legend />
            <Bar yAxisId="left" dataKey="deals" fill="#3B82F6" name="No. of Deals" />
            <Bar yAxisId="right" dataKey="value" fill="#10B981" name="Value (000 PKR)" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Pipeline Stages */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Pipeline by Stage</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {PIPELINE_STAGES.map((pipeline, idx) => (
            <Card key={idx} className="p-6 border-border/40 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{pipeline.stage}</p>
                  <p className="text-2xl font-bold text-foreground mt-1">{pipeline.count}</p>
                </div>
                <Badge variant="outline">{pipeline.value}</Badge>
              </div>

              <div className="space-y-3">
                {pipeline.deals.map((deal, dealIdx) => (
                  <div key={dealIdx} className="border-t border-border/40 pt-3 first:border-0 first:pt-0">
                    <p className="text-sm font-medium text-foreground">{deal.customer}</p>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-xs text-muted-foreground">{deal.value}</span>
                      <span className="text-xs font-semibold text-primary">{deal.probability}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-1.5 mt-1">
                      <div
                        className="bg-primary h-1.5 rounded-full"
                        style={{ width: `${deal.probability}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <Button variant="ghost" size="sm" className="w-full mt-4">
                View All
              </Button>
            </Card>
          ))}
        </div>
      </div>

      {/* Sales Forecast */}
      <Card className="p-6 border-border/40">
        <h2 className="text-lg font-semibold text-foreground mb-4">Revenue Forecast vs Actual</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={FORECAST_DATA}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
            <XAxis dataKey="month" stroke="rgba(0,0,0,0.5)" />
            <YAxis stroke="rgba(0,0,0,0.5)" />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="forecast"
              stroke="#3B82F6"
              strokeWidth={2}
              name="Forecast"
              connectNulls
            />
            <Line
              type="monotone"
              dataKey="actual"
              stroke="#10B981"
              strokeWidth={2}
              name="Actual"
              connectNulls
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Top Opportunities */}
      <Card className="p-6 border-border/40">
        <h2 className="text-lg font-semibold text-foreground mb-4">Top Opportunities</h2>
        <div className="space-y-4">
          {[
            { customer: 'Muhammad Khan', value: 'PKR 450,000', stage: 'CLOSING', probability: 90, days: 3 },
            { customer: 'Kareem Shah', value: 'PKR 350,000', stage: 'NEGOTIATION', probability: 75, days: 7 },
            { customer: 'Ali Ahmed', value: 'PKR 320,000', stage: 'PROPOSAL', probability: 60, days: 14 },
          ].map((opp, idx) => (
            <div key={idx} className="flex justify-between items-center pb-4 border-b border-border/40 last:border-0">
              <div>
                <p className="font-semibold text-foreground">{opp.customer}</p>
                <div className="flex gap-2 mt-1">
                  <Badge variant="outline" className="text-xs">{opp.stage}</Badge>
                  <span className="text-xs text-muted-foreground">Expected in {opp.days} days</span>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-foreground">{opp.value}</p>
                <p className="text-xs text-primary font-semibold">{opp.probability}% probability</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
