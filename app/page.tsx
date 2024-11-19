import { PricingPlans } from "@/components/pricing/pricing-plans"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Simplify Your Receipt Management
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                Upload receipts via Telegram, we&apos;ll organize them and send reports to your accountant automatically.
              </p>
            </div>
          </div>
        </section>
        <PricingPlans />
      </main>
    </div>
  )
}
