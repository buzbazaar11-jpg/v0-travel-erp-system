import { z } from 'zod'

// Booking Schema
export const bookingSchema = z.object({
  customerName: z.string().min(1, 'Customer name required'),
  email: z.string().email('Valid email required'),
  phone: z.string().min(10, 'Valid phone required'),
  packageId: z.string().uuid('Valid package required'),
  passengers: z.number().min(1, 'At least 1 passenger'),
  totalAmount: z.number().positive('Amount must be positive'),
})

// Invoice Schema
export const invoiceSchema = z.object({
  bookingId: z.string().uuid('Valid booking required'),
  amount: z.number().positive('Amount must be positive'),
  gstAmount: z.number().nonnegative(),
  dueDate: z.string().refine(d => !isNaN(Date.parse(d)), 'Valid date required'),
})

// Tour Schema
export const tourSchema = z.object({
  name: z.string().min(1, 'Tour name required'),
  destination: z.string().min(1, 'Destination required'),
  duration: z.number().min(1, 'Duration must be at least 1 day'),
  basePrice: z.number().positive('Base price must be positive'),
  sellPrice: z.number().positive('Sell price must be positive'),
  maxParticipants: z.number().min(1, 'Max participants required'),
})

// Ledger Entry Schema
export const ledgerSchema = z.object({
  accountId: z.string().uuid('Valid account required'),
  debit: z.number().nonnegative().default(0),
  credit: z.number().nonnegative().default(0),
  description: z.string().min(1, 'Description required'),
  referenceNumber: z.string().optional(),
})

// User Schema
export const userSchema = z.object({
  email: z.string().email('Valid email required'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  firstName: z.string().min(1, 'First name required'),
  lastName: z.string().min(1, 'Last name required'),
})

export type Booking = z.infer<typeof bookingSchema>
export type Invoice = z.infer<typeof invoiceSchema>
export type Tour = z.infer<typeof tourSchema>
export type LedgerEntry = z.infer<typeof ledgerSchema>
export type User = z.infer<typeof userSchema>
