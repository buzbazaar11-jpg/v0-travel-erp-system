import { ReactNode } from 'react'
import { redirect } from 'next/navigation'

interface AdminLayoutProps {
  children: ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  // Check if user is admin
  const isAdmin = true // This would be checked from session/auth

  if (!isAdmin) {
    redirect('/auth/login')
  }

  return (
    <div className="flex flex-col">
      <div className="bg-slate-800 text-white p-4 mb-6">
        <h1 className="text-2xl font-bold">Admin Panel</h1>
        <p className="text-slate-300 text-sm">System Administration & Management</p>
      </div>
      <div className="px-6">
        {children}
      </div>
    </div>
  )
}
