import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { ProfileForm } from "@/components/profile/profile-form"
import { DashboardHeader } from "@/components/dashboard/header"
import { DashboardShell } from "@/components/dashboard/shell"

export default async function ProfilePage() {
  const supabase = createServerComponentClient({ cookies }, {
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  })
  
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect('/auth/signin')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', session.user.id)
    .single()

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Profile"
        text="Manage your account settings and preferences."
      />
      <div className="grid gap-10">
        <ProfileForm user={session.user} profile={profile} />
      </div>
    </DashboardShell>
  )
} 