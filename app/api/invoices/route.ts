import { createClient } from "@/lib/supabase/server"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const { data, error } = await supabase
      .from("invoices")
      .select("*, customers(*), bookings(*)")
      .order("created_at", { ascending: false })

    if (error) throw error
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const body = await request.json()
    const subtotal = body.subtotal || 0
    const gst = subtotal * 0.17
    const total = subtotal + gst - (body.discount || 0)
    
    const { data, error } = await supabase
      .from("invoices")
      .insert([{
        customer_id: body.customer_id,
        booking_id: body.booking_id,
        invoice_number: `INV-${Date.now()}`,
        invoice_date: new Date().toISOString().split('T')[0],
        due_date: body.due_date,
        subtotal,
        gst_amount: gst,
        discount_amount: body.discount || 0,
        total_amount: total,
        status: "ISSUED",
        created_by: user.id,
      }])
      .select()

    if (error) throw error
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}
