// Multi-Tenant Database Access Control
import { createClient } from '@/lib/supabase/server';

export async function getCompanyId() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) throw new Error('Not authenticated');
  
  const { data: userData } = await supabase
    .from('users')
    .select('company_id')
    .eq('id', user.id)
    .single();
  
  return userData?.company_id;
}

// Get all bookings for current company only
export async function getCompanyBookings(filters?: any) {
  const supabase = await createClient();
  const companyId = await getCompanyId();
  
  let query = supabase
    .from('bookings')
    .select('*')
    .eq('company_id', companyId);
  
  if (filters?.status) {
    query = query.eq('status', filters.status);
  }
  if (filters?.customerId) {
    query = query.eq('customer_id', filters.customerId);
  }
  
  const { data, error } = await query;
  if (error) throw error;
  return data;
}

// Get all customers for current company only
export async function getCompanyCustomers() {
  const supabase = await createClient();
  const companyId = await getCompanyId();
  
  const { data, error } = await supabase
    .from('customers')
    .select('*')
    .eq('company_id', companyId)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
}

// Create booking in current company
export async function createCompanyBooking(bookingData: any) {
  const supabase = await createClient();
  const companyId = await getCompanyId();
  
  const { data, error } = await supabase
    .from('bookings')
    .insert([{
      ...bookingData,
      company_id: companyId,
    }])
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

// Get all invoices for current company
export async function getCompanyInvoices() {
  const supabase = await createClient();
  const companyId = await getCompanyId();
  
  const { data, error } = await supabase
    .from('invoices')
    .select('*')
    .eq('company_id', companyId)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
}

// Get all tours for current company
export async function getCompanyTours() {
  const supabase = await createClient();
  const companyId = await getCompanyId();
  
  const { data, error } = await supabase
    .from('travel_packages')
    .select('*')
    .eq('company_id', companyId);
  
  if (error) throw error;
  return data;
}

// Get company subscription details
export async function getCompanySubscription() {
  const supabase = await createClient();
  const companyId = await getCompanyId();
  
  const { data, error } = await supabase
    .from('company_subscriptions')
    .select('*, subscription_plans(*)')
    .eq('company_id', companyId)
    .eq('status', 'active')
    .order('start_date', { ascending: false })
    .limit(1)
    .single();
  
  if (error && error.code !== 'PGRST116') throw error;
  return data;
}

// Check if company has feature access
export async function hasFeatureAccess(feature: string) {
  const subscription = await getCompanySubscription();
  
  if (!subscription) return false;
  
  const features = subscription.subscription_plans?.features || [];
  return features.includes(feature);
}

// Get company details
export async function getCompanyDetails() {
  const supabase = await createClient();
  const companyId = await getCompanyId();
  
  const { data, error } = await supabase
    .from('companies')
    .select('*')
    .eq('id', companyId)
    .single();
  
  if (error) throw error;
  return data;
}

// Get all company users
export async function getCompanyUsers() {
  const supabase = await createClient();
  const companyId = await getCompanyId();
  
  const { data, error } = await supabase
    .from('company_users')
    .select('*')
    .eq('company_id', companyId);
  
  if (error) throw error;
  return data;
}

// Get dashboard statistics for company
export async function getCompanyStats() {
  const supabase = await createClient();
  const companyId = await getCompanyId();
  
  const [bookings, customers, invoices, revenue] = await Promise.all([
    supabase.from('bookings').select('id', { count: 'exact' }).eq('company_id', companyId),
    supabase.from('customers').select('id', { count: 'exact' }).eq('company_id', companyId),
    supabase.from('invoices').select('total_amount').eq('company_id', companyId),
    supabase.from('invoices').select('paid_amount').eq('company_id', companyId),
  ]);
  
  const totalRevenue = (invoices.data || []).reduce((sum: number, inv: any) => sum + (inv.total_amount || 0), 0);
  const totalPaid = (revenue.data || []).reduce((sum: number, inv: any) => sum + (inv.paid_amount || 0), 0);
  
  return {
    totalBookings: bookings.count || 0,
    totalCustomers: customers.count || 0,
    totalRevenue,
    totalPaid,
    pendingRevenue: totalRevenue - totalPaid,
  };
}

// Real-time subscription to company data
export function subscribeToCompanyData(table: string, callback: any) {
  const supabase = createClient();
  
  supabase
    .channel(`company_${table}`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: table,
      },
      callback
    )
    .subscribe();
}
