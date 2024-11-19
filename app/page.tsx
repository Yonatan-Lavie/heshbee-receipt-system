import { Navbar } from "@/components/layout/Navbar"

export default function Home() {
  return (
    <main>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-center">
          Welcome to Your App
        </h1>
        {/* Add your home page content here */}
      </div>
    </main>
  )
}
