'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Copy, Check, Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

interface DemoAccount {
  label: string
  email: string
  password: string
  phone: string
  role: string
}

const demoAccounts: DemoAccount[] = [
  {
    label: 'Admin Account',
    email: 'admin@eagent.com',
    password: 'Mezu@1107',
    phone: '03142678230',
    role: 'Full System Access',
  },
]

export default function DemoCredentialsPage() {
  const [showPasswords, setShowPasswords] = useState<Record<string, boolean>>({})
  const [copiedField, setCopiedField] = useState<string | null>(null)

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text)
    setCopiedField(field)
    toast.success('Copied to clipboard')
    setTimeout(() => setCopiedField(null), 2000)
  }

  const togglePasswordVisibility = (field: string) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }))
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, staggerChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted p-6 md:p-10">
      <motion.div
        className="max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2">Demo Access Credentials</h1>
          <p className="text-muted-foreground">
            Use the following credentials to test the Travel & Tours ERP system
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="mb-8">
          <Card className="border-border/50 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5">
              <CardTitle>System Information</CardTitle>
              <CardDescription>Important details for getting started</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Application URL</label>
                  <div className="flex gap-2">
                    <Input
                      value="https://travel-erp.vercel.app"
                      readOnly
                      className="bg-muted"
                    />
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        copyToClipboard('https://travel-erp.vercel.app', 'url')
                      }
                    >
                      {copiedField === 'url' ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Database</label>
                  <div className="flex gap-2">
                    <Input value="Supabase PostgreSQL" readOnly className="bg-muted" />
                    <Button size="sm" variant="outline" disabled>
                      <Check className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-6">
          <h2 className="text-2xl font-bold">Demo Accounts</h2>
          {demoAccounts.map((account, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="mb-6"
            >
              <Card className="border-border/50 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="bg-gradient-to-r from-blue-500/10 to-blue-600/5">
                  <CardTitle>{account.label}</CardTitle>
                  <CardDescription>Role: {account.role}</CardDescription>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    {/* Email */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email Address</label>
                      <div className="flex gap-2">
                        <Input value={account.email} readOnly className="bg-muted" />
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            copyToClipboard(account.email, `email-${idx}`)
                          }
                        >
                          {copiedField === `email-${idx}` ? (
                            <Check className="h-4 w-4" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Phone Number</label>
                      <div className="flex gap-2">
                        <Input value={account.phone} readOnly className="bg-muted" />
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            copyToClipboard(account.phone, `phone-${idx}`)
                          }
                        >
                          {copiedField === `phone-${idx}` ? (
                            <Check className="h-4 w-4" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Password */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Password</label>
                    <div className="flex gap-2">
                      <Input
                        type={showPasswords[`password-${idx}`] ? 'text' : 'password'}
                        value={account.password}
                        readOnly
                        className="bg-muted"
                      />
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => togglePasswordVisibility(`password-${idx}`)}
                      >
                        {showPasswords[`password-${idx}`] ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          copyToClipboard(account.password, `password-copy-${idx}`)
                        }
                      >
                        {copiedField === `password-copy-${idx}` ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  {/* Quick Copy All */}
                  <div className="pt-2">
                    <Button
                      variant="secondary"
                      className="w-full"
                      onClick={() => {
                        const allData = `Email: ${account.email}\nPassword: ${account.password}\nPhone: ${account.phone}`
                        copyToClipboard(allData, `all-${idx}`)
                      }}
                    >
                      {copiedField === `all-${idx}` ? (
                        <>
                          <Check className="h-4 w-4 mr-2" /> All Copied
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4 mr-2" /> Copy All
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Tips and Guidelines */}
        <motion.div variants={itemVariants} className="mt-8">
          <Card className="border-amber-200 bg-amber-50 dark:bg-amber-950">
            <CardHeader>
              <CardTitle className="text-amber-900 dark:text-amber-100">
                Quick Start Guide
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-amber-900 dark:text-amber-100">
              <ul className="list-disc pl-5 space-y-2">
                <li>Click the Login button below to access the system</li>
                <li>Use the admin account to explore all features</li>
                <li>All demo data is pre-populated in the system</li>
                <li>Feel free to create, edit, or delete demo records</li>
                <li>For production, change all default credentials</li>
                <li>Ensure your Supabase database is set up correctly</li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex gap-4 mt-8 justify-center flex-wrap"
        >
          <Link href="/auth/login">
            <Button size="lg" className="min-w-44">
              Go to Login
            </Button>
          </Link>
          <Link href="/auth/sign-up">
            <Button size="lg" variant="outline" className="min-w-44">
              Create New Account
            </Button>
          </Link>
          <Link href="/">
            <Button size="lg" variant="ghost" className="min-w-44">
              Back to Home
            </Button>
          </Link>
        </motion.div>

        {/* Footer */}
        <motion.div
          variants={itemVariants}
          className="mt-12 text-center text-sm text-muted-foreground"
        >
          <p>
            This is a demo/development environment. Do not use real or sensitive data.
          </p>
          <p className="mt-2">
            For security concerns or issues, please contact the development team.
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}
