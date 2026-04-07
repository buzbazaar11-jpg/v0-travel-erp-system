'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { motion } from 'framer-motion'

const allUsers = [
  { id: 1, name: 'Ahmed Hassan', email: 'ahmed@brightravels.com', business: 'Bright Travels', role: 'admin', status: 'active' },
  { id: 2, name: 'Fatima Khan', email: 'fatima@elitetours.com', business: 'Elite Tours', role: 'manager', status: 'active' },
  { id: 3, name: 'Hassan Ali', email: 'hassan@journeyplus.com', business: 'Journey Plus', role: 'user', status: 'active' },
  { id: 4, name: 'Zainab Malik', email: 'zainab@premiumholidays.com', business: 'Premium Holidays', role: 'admin', status: 'active' },
]

export default function AdminUsersPage() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">All Users</h1>
        <p className="text-muted-foreground">Manage users across all businesses</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Total Users</p>
            <p className="text-3xl font-bold">18,942</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Active Today</p>
            <p className="text-3xl font-bold">12,324</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Admins</p>
            <p className="text-3xl font-bold">5,234</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">New This Month</p>
            <p className="text-3xl font-bold">1,234</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>User Directory</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Business</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.business}</TableCell>
                  <TableCell><Badge variant="outline">{user.role}</Badge></TableCell>
                  <TableCell><Badge className="bg-green-100 text-green-800">{user.status}</Badge></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </motion.div>
  )
}
