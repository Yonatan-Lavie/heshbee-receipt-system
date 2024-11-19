'use client'

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"

const plans = [
  {
    id: 'trial',
    name: 'Trial Plan',
    description: 'Perfect for testing our service',
    price: 'Free',
    duration: '30 days',
    features: [
      'Upload up to 50 receipts',
      'Basic dashboard access',
      'Monthly report',
    ],
  },
  {
    id: 'pro',
    name: 'Pro Plan',
    description: 'For growing businesses',
    price: '$9.99',
    duration: 'per month',
    features: [
      'Unlimited receipts',
      'Advanced dashboard',
      'Priority support',
      'Custom report scheduling',
    ],
  },
]

export function PricingPlans() {
  const router = useRouter()
  const supabase = createClientComponentClient()

  const handlePlanSelect = async (planId: string) => {
    const { data: { session } } = await supabase.auth.getSession()
    
    if (!session) {
      // Store selected plan in URL params for after auth
      router.push(`/auth/signin?plan=${planId}`)
      return
    }

    router.push(`/payment?plan=${planId}`)
  }

  return (
    <section className="w-full py-12">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {plans.map((plan) => (
            <Card key={plan.id} className="flex flex-col">
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="text-3xl font-bold">{plan.price}</div>
                <p className="text-sm text-gray-500">{plan.duration}</p>
                <ul className="mt-4 space-y-2">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <CheckIcon className="mr-2 h-4 w-4" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  onClick={() => handlePlanSelect(plan.id)}
                >
                  Get Started
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
} 