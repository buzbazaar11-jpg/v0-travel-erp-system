import { createClient } from "@/lib/supabase/server"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const { data, error } = await supabase
      .from("travel_packages")
      .select("*")
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
    
    const { data, error } = await supabase
      .from("travel_packages")
      .insert([{
        name: body.name,
        package_type: body.package_type,
        description: body.description,
        duration_days: body.duration_days,
        destination_country: body.destination_country,
        destination_city: body.destination_city,
        base_price: body.base_price,
        sell_price: body.sell_price,
        profit_margin: ((body.sell_price - body.base_price) / body.base_price * 100),
        availability_from: body.availability_from,
        availability_to: body.availability_to,
        max_participants: body.max_participants,
        is_active: true,
      }])
      .select()

    if (error) throw error
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}
