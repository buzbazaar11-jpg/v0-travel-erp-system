export const apiClient = {
  // Bookings
  createBooking: async (data: any) => {
    const res = await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create booking');
    return res.json();
  },
  
  fetchBookings: async () => {
    const res = await fetch('/api/bookings');
    if (!res.ok) throw new Error('Failed to fetch bookings');
    return res.json();
  },
  
  updateBooking: async (id: string, data: any) => {
    const res = await fetch(`/api/bookings/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update booking');
    return res.json();
  },
  
  deleteBooking: async (id: string) => {
    const res = await fetch(`/api/bookings/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete booking');
    return res.json();
  },

  // Customers
  createCustomer: async (data: any) => {
    const res = await fetch('/api/customers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create customer');
    return res.json();
  },
  
  fetchCustomers: async () => {
    const res = await fetch('/api/customers');
    if (!res.ok) throw new Error('Failed to fetch customers');
    return res.json();
  },
  
  updateCustomer: async (id: string, data: any) => {
    const res = await fetch(`/api/customers/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update customer');
    return res.json();
  },
  
  deleteCustomer: async (id: string) => {
    const res = await fetch(`/api/customers/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete customer');
    return res.json();
  },

  // Invoices
  createInvoice: async (data: any) => {
    const res = await fetch('/api/invoices', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create invoice');
    return res.json();
  },
  
  fetchInvoices: async () => {
    const res = await fetch('/api/invoices');
    if (!res.ok) throw new Error('Failed to fetch invoices');
    return res.json();
  },
  
  updateInvoice: async (id: string, data: any) => {
    const res = await fetch(`/api/invoices/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update invoice');
    return res.json();
  },
  
  deleteInvoice: async (id: string) => {
    const res = await fetch(`/api/invoices/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete invoice');
    return res.json();
  },

  // Leads
  createLead: async (data: any) => {
    const res = await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create lead');
    return res.json();
  },
  
  fetchLeads: async () => {
    const res = await fetch('/api/leads');
    if (!res.ok) throw new Error('Failed to fetch leads');
    return res.json();
  },
  
  updateLead: async (id: string, data: any) => {
    const res = await fetch(`/api/leads/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update lead');
    return res.json();
  },
  
  deleteLead: async (id: string) => {
    const res = await fetch(`/api/leads/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete lead');
    return res.json();
  },

  // Tours
  createTour: async (data: any) => {
    const res = await fetch('/api/tours', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create tour');
    return res.json();
  },
  
  fetchTours: async () => {
    const res = await fetch('/api/tours');
    if (!res.ok) throw new Error('Failed to fetch tours');
    return res.json();
  },
  
  updateTour: async (id: string, data: any) => {
    const res = await fetch(`/api/tours/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update tour');
    return res.json();
  },
  
  deleteTour: async (id: string) => {
    const res = await fetch(`/api/tours/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete tour');
    return res.json();
  },

  // Payments
  createPayment: async (data: any) => {
    const res = await fetch('/api/payments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create payment');
    return res.json();
  },
  
  fetchPayments: async () => {
    const res = await fetch('/api/payments');
    if (!res.ok) throw new Error('Failed to fetch payments');
    return res.json();
  },
  
  updatePayment: async (id: string, data: any) => {
    const res = await fetch(`/api/payments/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update payment');
    return res.json();
  },
  
  deletePayment: async (id: string) => {
    const res = await fetch(`/api/payments/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete payment');
    return res.json();
  },

  // Visa
  createVisa: async (data: any) => {
    const res = await fetch('/api/visa', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create visa application');
    return res.json();
  },
  
  fetchVisas: async () => {
    const res = await fetch('/api/visa');
    if (!res.ok) throw new Error('Failed to fetch visa applications');
    return res.json();
  },
  
  updateVisa: async (id: string, data: any) => {
    const res = await fetch(`/api/visa/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update visa');
    return res.json();
  },
  
  deleteVisa: async (id: string) => {
    const res = await fetch(`/api/visa/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete visa');
    return res.json();
  },

  // Hotels
  createHotel: async (data: any) => {
    const res = await fetch('/api/hotels', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create hotel');
    return res.json();
  },
  
  fetchHotels: async () => {
    const res = await fetch('/api/hotels');
    if (!res.ok) throw new Error('Failed to fetch hotels');
    return res.json();
  },
  
  updateHotel: async (id: string, data: any) => {
    const res = await fetch(`/api/hotels/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update hotel');
    return res.json();
  },
  
  deleteHotel: async (id: string) => {
    const res = await fetch(`/api/hotels/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete hotel');
    return res.json();
  },
}
