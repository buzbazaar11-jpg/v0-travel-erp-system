import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ArrowRight, Briefcase, BarChart3, Users, CreditCard, FileText, Zap } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted">
      {/* Navigation */}
      <nav className="border-b border-border/40 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-foreground">TravelERP</div>
          <div className="flex gap-4">
            <Link href="/auth/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/auth/sign-up">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-5xl sm:text-6xl font-bold text-foreground mb-6 text-balance">
          Enterprise Resource Planning for Travel & Tours
        </h1>
        <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto text-balance">
          Complete business management solution for travel agencies, tour operators, and visa consultants. Built for Pakistan's travel industry.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/auth/sign-up">
            <Button size="lg" className="gap-2">
              Get Started <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <Link href="/auth/login">
            <Button size="lg" variant="outline">
              Sign In
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Comprehensive Features</h2>
          <p className="text-muted-foreground">Everything you need to manage your travel business efficiently</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="p-6 border-border/40 hover:border-border/80 transition-colors">
            <Briefcase className="w-8 h-8 text-primary mb-4" />
            <h3 className="font-semibold text-lg mb-2">Booking Management</h3>
            <p className="text-sm text-muted-foreground">
              Manage tours, Umrah packages, Hajj, visa services, and all travel bookings in one place.
            </p>
          </Card>

          <Card className="p-6 border-border/40 hover:border-border/80 transition-colors">
            <BarChart3 className="w-8 h-8 text-primary mb-4" />
            <h3 className="font-semibold text-lg mb-2">Financial Management</h3>
            <p className="text-sm text-muted-foreground">
              Double-entry ledger system with GST/FBR compliance and comprehensive reporting.
            </p>
          </Card>

          <Card className="p-6 border-border/40 hover:border-border/80 transition-colors">
            <Users className="w-8 h-8 text-primary mb-4" />
            <h3 className="font-semibold text-lg mb-2">CRM System</h3>
            <p className="text-sm text-muted-foreground">
              Lead management, customer profiles, sales pipeline, and AI-powered lead scoring.
            </p>
          </Card>

          <Card className="p-6 border-border/40 hover:border-border/80 transition-colors">
            <CreditCard className="w-8 h-8 text-primary mb-4" />
            <h3 className="font-semibold text-lg mb-2">Payments & Invoicing</h3>
            <p className="text-sm text-muted-foreground">
              Professional invoicing, payment tracking, and multiple payment gateway integration.
            </p>
          </Card>

          <Card className="p-6 border-border/40 hover:border-border/80 transition-colors">
            <FileText className="w-8 h-8 text-primary mb-4" />
            <h3 className="font-semibold text-lg mb-2">Document Management</h3>
            <p className="text-sm text-muted-foreground">
              Store and manage documents with expiry alerts and verification status tracking.
            </p>
          </Card>

          <Card className="p-6 border-border/40 hover:border-border/80 transition-colors">
            <Zap className="w-8 h-8 text-primary mb-4" />
            <h3 className="font-semibold text-lg mb-2">WhatsApp Integration</h3>
            <p className="text-sm text-muted-foreground">
              Direct WhatsApp Business API integration for instant customer communication.
            </p>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <Card className="p-12 border-border/40 bg-muted/50">
          <h2 className="text-3xl font-bold text-foreground mb-4">Ready to Transform Your Travel Business?</h2>
          <p className="text-muted-foreground mb-8">
            Join travel agencies and tour operators across Pakistan using TravelERP to streamline operations and boost profits.
          </p>
          <Link href="/auth/sign-up">
            <Button size="lg">Start Your Free Trial</Button>
          </Link>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-muted/30 py-8 mt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2026 TravelERP. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
