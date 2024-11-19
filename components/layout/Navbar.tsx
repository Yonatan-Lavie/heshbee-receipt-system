'use client'

import { Button } from "@/components/ui/button"
import { SignInButton } from "@/components/auth/SignInButton"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import type { User } from "@supabase/auth-helpers-nextjs"

export function Navbar() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createClientComponentClient()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
    }

    getUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      router.refresh()
    })

    return () => subscription.unsubscribe()
  }, [supabase, router])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  return (
    <nav className="border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            {/* Add your logo or site name here */}
            <h1 className="text-xl font-bold">HashBee</h1>
          </div>
          
          <div className="flex items-center gap-4">
            {loading ? (
              <Button variant="ghost" disabled>Loading...</Button>
            ) : user ? (
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-700">
                  {user.email}
                </span>
                <Button 
                  variant="outline"
                  onClick={handleSignOut}
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <SignInButton />
            )}
          </div>
        </div>
      </div>
    </nav>
  )
} 