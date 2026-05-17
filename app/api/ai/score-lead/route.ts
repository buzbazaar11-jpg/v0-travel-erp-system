import { NextRequest, NextResponse } from 'next/server'
import { scoreLeadWithAI } from '@/lib/ai-services'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const score = await scoreLeadWithAI(body)
    return NextResponse.json({ score })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}
