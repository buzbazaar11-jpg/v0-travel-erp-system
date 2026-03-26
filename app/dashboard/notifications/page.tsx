'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Bell, Trash2, CheckCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface Notification {
  id: string
  title: string
  message: string
  type: 'Alert' | 'Reminder' | 'Update' | 'System'
  read: boolean
  createdAt: string
}

const mockNotifications: Notification[] = [
  { id: '1', title: 'Visa Approved', message: 'Ahmed Khan\'s visa has been approved', type: 'Update', read: false, createdAt: '2024-01-25 14:30' },
  { id: '2', title: 'Payment Reminder', message: 'Invoice #INV-001 payment due tomorrow', type: 'Reminder', read: false, createdAt: '2024-01-25 10:15' },
  { id: '3', title: 'Document Expiring', message: 'Fatima Ali\'s passport expires in 30 days', type: 'Alert', read: true, createdAt: '2024-01-24 09:00' },
  { id: '4', title: 'Booking Confirmed', message: 'New booking for Dubai Tour confirmed', type: 'System', read: true, createdAt: '2024-01-23 16:45' },
]

const typeColor = {
  'Alert': 'destructive',
  'Reminder': 'secondary',
  'Update': 'default',
  'System': 'outline',
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications)

  const unread = notifications.filter(n => !n.read).length

  const handleDelete = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id))
  }

  const handleMarkAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ))
  }

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })))
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Notifications</h1>
          <p className="text-muted-foreground">
            {unread > 0 ? `${unread} unread notification${unread > 1 ? 's' : ''}` : 'All caught up'}
          </p>
        </div>
        {unread > 0 && (
          <Button variant="outline" onClick={handleMarkAllAsRead}>
            Mark All as Read
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4">
        <AnimatePresence>
          {notifications.map((notification, idx) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ delay: idx * 0.05 }}
            >
              <Card className={notification.read ? 'opacity-60' : 'border-primary'}>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{notification.title}</h3>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-primary rounded-full" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>
                      <div className="text-xs text-muted-foreground">{notification.createdAt}</div>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant={typeColor[notification.type] as any}>
                        {notification.type}
                      </Badge>
                      {!notification.read && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleMarkAsRead(notification.id)}
                        >
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(notification.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>

        {notifications.length === 0 && (
          <Card>
            <CardContent className="pt-6 text-center py-12">
              <Bell className="h-12 w-12 mx-auto text-muted-foreground mb-4 opacity-50" />
              <p className="text-muted-foreground">No notifications yet</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
