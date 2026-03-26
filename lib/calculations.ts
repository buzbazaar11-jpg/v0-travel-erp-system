export async function generateInvoiceNumber(companyId: string): Promise<string> {
  const date = new Date()
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const random = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, '0')
  return `INV-${year}-${month}-${random}`
}

export function calculateGST(amount: number, gstRate: number = 17): number {
  return amount * (gstRate / 100)
}

export function calculateProfit(sellPrice: number, costPrice: number): number {
  return sellPrice - costPrice
}

export function calculateProfitMargin(
  sellPrice: number,
  costPrice: number
): number {
  if (costPrice === 0) return 0
  return ((sellPrice - costPrice) / costPrice) * 100
}

export function formatCurrency(amount: number, currency: string = 'PKR'): string {
  return new Intl.NumberFormat('en-PK', {
    style: 'currency',
    currency: currency === 'PKR' ? 'PKR' : currency,
  }).format(amount)
}

export function calculateOccupancyRate(
  currentParticipants: number,
  maxParticipants: number
): number {
  if (maxParticipants === 0) return 0
  return (currentParticipants / maxParticipants) * 100
}

export function isDocumentExpiring(expiryDate: string, days: number = 30): boolean {
  const expiry = new Date(expiryDate)
  const today = new Date()
  const thirtyDaysFromNow = new Date(today.getTime() + days * 24 * 60 * 60 * 1000)
  return expiry < thirtyDaysFromNow
}

export function getBookingStatus(status: string): {
  color: string
  label: string
} {
  const statusMap: Record<string, { color: string; label: string }> = {
    'Pending': { color: 'bg-yellow-100 text-yellow-800', label: 'Pending' },
    'Confirmed': { color: 'bg-green-100 text-green-800', label: 'Confirmed' },
    'Cancelled': { color: 'bg-red-100 text-red-800', label: 'Cancelled' },
    'Completed': { color: 'bg-blue-100 text-blue-800', label: 'Completed' },
  }
  return statusMap[status] || statusMap['Pending']
}

export function calculateLoyaltyPoints(amount: number): number {
  // 1 point per 100 PKR
  return Math.floor(amount / 100)
}

export function getLoyaltyTier(points: number): string {
  if (points >= 15000) return 'Platinum'
  if (points >= 5000) return 'Gold'
  if (points >= 0) return 'Silver'
  return 'Unknown'
}
