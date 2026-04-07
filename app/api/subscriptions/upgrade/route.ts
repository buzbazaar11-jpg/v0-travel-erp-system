import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    return NextResponse.json({
      success: true,
      message: 'Plan upgrade initiated',
      planId: body.planId,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to upgrade plan' }, { status: 500 })
  }
}
