import { createClient } from "@/lib/supabase/server"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { data, error } = await supabase
      .from("bookings")
      .select("*, customers(*), travel_packages(*)")
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
    
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    
    const { data, error } = await supabase
      .from("bookings")
      .insert([
        {
          customer_id: body.customer_id,
          package_id: body.package_id,
          booking_reference_number: `BK-${Date.now()}`,
          booking_date: new Date().toISOString().split('T')[0],
          departure_date: body.departure_date,
          return_date: body.return_date,
          number_of_passengers: body.number_of_passengers,
          total_cost: body.total_cost,
          total_revenue: body.total_revenue,
          gst_amount: body.gst_amount,
          status: "CONFIRMED",
          payment_status: "PENDING",
          assigned_to: user.id,
        }
      ])
      .select()

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}
