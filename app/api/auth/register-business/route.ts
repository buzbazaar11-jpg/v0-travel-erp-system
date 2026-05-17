import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import bcrypt from 'bcryptjs'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const body = await request.json()

    const {
      businessName,
      registrationNumber,
      phone,
      email,
      address,
      city,
      province,
      postalCode,
      adminFirstName,
      adminLastName,
      adminEmail,
      adminPhone,
      adminPassword,
      subscriptionPlan,
    } = body

    // Create company
    const { data: company, error: companyError } = await supabase
      .from('companies')
      .insert([
        {
          name: businessName,
          registration_number: registrationNumber,
          phone,
          email,
          address,
          city,
          province,
          postal_code: postalCode,
          status: 'active',
        },
      ])
      .select()
      .single()

    if (companyError) throw companyError

    // Hash password
    const hashedPassword = await bcrypt.hash(adminPassword, 10)

    // Create admin user
    const { data: user, error: userError } = await supabase
      .from('users')
      .insert([
        {
          email: adminEmail,
          full_name: `${adminFirstName} ${adminLastName}`,
          phone: adminPhone,
          password_hash: hashedPassword,
          company_id: company.id,
          role: 'admin',
        },
      ])
      .select()
      .single()

    if (userError) throw userError

    // Get subscription plan
    const { data: plan } = await supabase
      .from('subscription_plans')
      .select('*')
      .eq('name', subscriptionPlan.toUpperCase())
      .single()

    // Create subscription
    const today = new Date()
    const endDate = new Date(today.setMonth(today.getMonth() + 1))

    const { error: subError } = await supabase
      .from('company_subscriptions')
      .insert([
        {
          company_id: company.id,
          plan_id: plan?.id,
          start_date: new Date().toISOString().split('T')[0],
          end_date: endDate.toISOString().split('T')[0],
          status: 'active',
          payment_status: 'pending',
        },
      ])

    if (subError) throw subError

    return NextResponse.json({
      success: true,
      message: 'Business registered successfully',
      company,
    })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Registration failed' },
      { status: 400 }
    )
  }
}
