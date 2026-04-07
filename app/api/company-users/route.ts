import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const mockUsers = [
      {
        id: '1',
        email: 'user1@company.com',
        full_name: 'Ahmed Hassan',
        phone_number: '03001234567',
        designation: 'Manager',
        role: 'manager',
        is_active: true,
        created_at: new Date().toISOString(),
      },
      {
        id: '2',
        email: 'user2@company.com',
        full_name: 'Fatima Khan',
        phone_number: '03009876543',
        designation: 'Agent',
        role: 'user',
        is_active: true,
        created_at: new Date().toISOString(),
      },
    ]
    return NextResponse.json(mockUsers)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const newUser = {
      id: Math.random().toString(36).substr(2, 9),
      ...body,
      created_at: new Date().toISOString(),
      is_active: true,
    }
    return NextResponse.json(newUser, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 })
  }
}
