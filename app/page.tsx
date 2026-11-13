import Link from "next/link"
import { CalendarCheck, Clock, Video } from "lucide-react"

import { Highlight } from "@/components/brand/highlight"
import { Logo } from "@/components/brand/logo"
import { SiteFooter } from "@/components/layout/site-footer"
import { TopBar } from "@/components/layout/top-bar"
import { Button } from "@/components/ui/button"
import { services } from "@/lib/services"

const steps = [
  {
    icon: CalendarCheck,
    title: "Pick a service",
    text: "Choose the care you need.",
  },
  { icon: Clock, title: "Choose a time", text: "See open slots and pick one." },
  {
    icon: Video,
    title: "Meet your provider",
    text: "By telehealth or in person.",
  },
]

export default function HomePage() {
  return (
    <div className="flex min-h-svh flex-col">
      <TopBar />
      <header className="border-b bg-background">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <Logo />
          <Button asChild variant="outline" className="rounded-full">
            <Link href="/login">Log in</Link>
          </Button>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-16 px-4 py-14 sm:px-6">
        <section className="flex flex-col items-start gap-6">
          <p className="text-sm font-semibold tracking-[0.2em] text-gold uppercase">
            Your Health. Your Journey. Our Priority.
          </p>
          <h1 className="max-w-3xl text-5xl leading-tight font-semibold sm:text-6xl">
            Book your visit with <Highlight>Cyprex Health</Highlight>
          </h1>
          <p className="max-w-xl text-lg text-muted-foreground">
            Schedule telehealth or in-person appointments, and manage your
            upcoming visits in one place.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" className="h-11 rounded-full px-6">
              <Link href="/signup">Get started</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-11 rounded-full px-6"
            >
              <Link href="/login">I have an account</Link>
            </Button>
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-3">
          {steps.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="flex flex-col gap-2 rounded-2xl border bg-card p-6"
            >
              <Icon aria-hidden className="size-6 text-primary" />
              <h2 className="text-2xl font-semibold">{title}</h2>
              <p className="text-sm text-muted-foreground">{text}</p>
            </div>
          ))}
        </section>

        <section className="flex flex-col gap-6">
          <h2 className="text-4xl font-semibold">
            Treatments that <Highlight>actually work</Highlight>
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <div
                key={service.visitType}
                className="flex flex-col gap-2 rounded-2xl border bg-card p-6"
              >
                <h3 className="text-2xl font-semibold">{service.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
