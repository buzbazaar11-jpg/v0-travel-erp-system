import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Booking Service
export const bookingService = {
  async create(booking: any) {
    const { data, error } = await supabase
      .from('bookings')
      .insert([booking])
    if (error) throw error
    return data
  },

  async list() {
    const { data, error } = await supabase.from('bookings').select()
    if (error) throw error
    return data
  },

  async update(id: string, updates: any) {
    const { data, error } = await supabase
      .from('bookings')
      .update(updates)
      .eq('id', id)
    if (error) throw error
    return data
  },

  async delete(id: string) {
    const { error } = await supabase.from('bookings').delete().eq('id', id)
    if (error) throw error
  }
}

// Invoice Service
export const invoiceService = {
  async create(invoice: any) {
    const { data, error } = await supabase
      .from('invoices')
      .insert([invoice])
    if (error) throw error
    return data
  },

  async list(filters?: any) {
    let query = supabase.from('invoices').select()
    if (filters?.status) {
      query = query.eq('status', filters.status)
    }
    const { data, error } = await query
    if (error) throw error
    return data
  },

  async updateStatus(id: string, status: string) {
    const { data, error } = await supabase
      .from('invoices')
      .update({ status })
      .eq('id', id)
    if (error) throw error
    return data
  }
}

// Tour Service
export const tourService = {
  async create(tour: any) {
    const { data, error } = await supabase
      .from('tours')
      .insert([tour])
    if (error) throw error
    return data
  },

  async list() {
    const { data, error } = await supabase.from('tours').select()
    if (error) throw error
    return data
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('tours')
      .select()
      .eq('id', id)
      .single()
    if (error) throw error
    return data
  }
}

// Ledger Service
export const ledgerService = {
  async recordEntry(entry: any) {
    const { data, error } = await supabase
      .from('ledger_entries')
      .insert([entry])
    if (error) throw error
    return data
  },

  async getTrialBalance(companyId: string) {
    const { data, error } = await supabase
      .from('chart_of_accounts')
      .select()
      .eq('company_id', companyId)
    if (error) throw error
    return data
  }
}
