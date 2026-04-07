import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const mockBusinesses = [
      {
        id: '1',
        name: 'Bright Travels',
        email: 'admin@brightravels.com',
        phone: '03001234567',
        subscription_plan: 'Advanced',
        status: 'active',
        monthly_revenue: 250000,
        created_at: '2025-01-15',
      },
      {
        id: '2',
        name: 'Elite Tours',
        email: 'admin@elitetours.com',
        phone: '03009876543',
        subscription_plan: 'Medium',
        status: 'active',
        monthly_revenue: 120000,
        created_at: '2025-02-10',
      },
      {
        id: '3',
        name: 'Journey Plus',
        email: 'admin@journeyplus.com',
        phone: '03115555555',
        subscription_plan: 'Basic',
        status: 'active',
        monthly_revenue: 45000,
        created_at: '2025-03-01',
      },
    ]
    return NextResponse.json(mockBusinesses)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch businesses' }, { status: 500 })
  }
}
