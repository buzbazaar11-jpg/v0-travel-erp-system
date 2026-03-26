'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Gift, Zap, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface LoyaltyTier {
  name: string
  minPoints: number
  discount: number
  benefits: string[]
}

interface LoyaltyTransaction {
  customerId: string
  customerName: string
  points: number
  type: 'Earned' | 'Redeemed'
  date: string
  balance: number
}

const tiers: LoyaltyTier[] = [
  { name: 'Silver', minPoints: 0, discount: 5, benefits: ['5% discount', 'Priority support'] },
  { name: 'Gold', minPoints: 5000, discount: 10, benefits: ['10% discount', 'Free upgrade', 'Exclusive deals'] },
  { name: 'Platinum', minPoints: 15000, discount: 15, benefits: ['15% discount', 'VIP events', 'Personal manager'] },
]

const mockTransactions: LoyaltyTransaction[] = [
  { customerId: '1', customerName: 'Ahmed Khan', points: 500, type: 'Earned', date: '2024-01-25', balance: 8500 },
  { customerId: '2', customerName: 'Fatima Ali', points: 200, type: 'Redeemed', date: '2024-01-24', balance: 2300 },
  { customerId: '3', customerName: 'Hassan Malik', points: 1000, type: 'Earned', date: '2024-01-23', balance: 12000 },
]

export default function LoyaltyPage() {
  const [transactions] = useState(mockTransactions)

  const totalPoints = transactions.reduce((s, t) => s + (t.type === 'Earned' ? t.balance : 0), 0)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Loyalty & Rewards</h1>
          <p className="text-muted-foreground">Manage customer loyalty program</p>
        </div>
        <Button className="gap-2"><Plus className="h-4 w-4" /> New Campaign</Button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm flex items-center gap-2"><Zap className="h-4 w-4" /> Total Points Issued</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">{(totalPoints / 1000).toFixed(1)}K</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Active Members</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">{transactions.length}</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm flex items-center gap-2"><Gift className="h-4 w-4" /> Redemptions</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">{transactions.filter(t => t.type === 'Redeemed').length}</div></CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tiers.map(tier => (
          <Card key={tier.name}>
            <CardHeader>
              <CardTitle className="text-lg">{tier.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{tier.minPoints}+ points • {tier.discount}% discount</p>
            </CardHeader>
            <CardContent>
              <ul className="text-sm space-y-1">
                {tier.benefits.map(benefit => (
                  <li key={benefit} className="flex items-center gap-2">
                    <Gift className="h-3 w-3" /> {benefit}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader><CardTitle>Recent Transactions</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-3">
            {transactions.map((t, idx) => (
              <div key={idx} className="border rounded-lg p-3 flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">{t.customerName}</h3>
                  <div className="text-xs text-muted-foreground">{t.date}</div>
                </div>
                <div className="text-right">
                  <Badge variant={t.type === 'Earned' ? 'default' : 'secondary'}>
                    {t.type === 'Earned' ? '+' : '-'} {t.points} pts
                  </Badge>
                  <div className="text-sm font-semibold mt-1">Balance: {t.balance}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
