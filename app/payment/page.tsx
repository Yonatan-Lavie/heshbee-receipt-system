import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { PaymentForm } from "@/components/payment/payment-form"

export default async function PaymentPage(
  props: {
    searchParams: Promise<{ plan: string }>
  }
) {
  const searchParams = await props.searchParams;
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect('/auth/signin')
  }

  if (!searchParams.plan) {
    redirect('/')
  }

  return (
    <div className="container max-w-lg mx-auto py-12">
      <PaymentForm plan={searchParams.plan} user={session.user} />
    </div>
  )
} 