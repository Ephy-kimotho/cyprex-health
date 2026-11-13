import { CalendarCheck, ShieldCheck, Video } from "lucide-react"

import { Logo } from "@/components/brand/logo"
import { SiteFooter } from "@/components/layout/site-footer"
import { TopBar } from "@/components/layout/top-bar"

const highlights = [
  { icon: CalendarCheck, text: "Book, reschedule or cancel in a few clicks" },
  { icon: Video, text: "Telehealth or in-person visits" },
  { icon: ShieldCheck, text: "Your information stays private" },
]

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-svh flex-col">
      <TopBar />
      <header className="border-b bg-background">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <Logo />
          <a
            href="https://cyprexhealth.com"
            className="text-sm text-muted-foreground hover:text-foreground hover:underline"
          >
            <span className="hidden sm:inline">Back to </span>
            cyprexhealth.com
          </a>
        </div>
      </header>

      <main className="mx-auto grid w-full max-w-5xl flex-1 items-start gap-6 px-4 py-10 sm:px-6 md:grid-cols-2">
        <section className="flex flex-col gap-5 rounded-3xl bg-brand-deep p-8 text-brand-deep-foreground">
          <p className="text-xs font-semibold tracking-[0.2em] text-gold uppercase">
            Patient portal
          </p>
          <h1 className="text-5xl leading-tight font-semibold text-brand-deep-foreground">
            Welcome. We&apos;re glad you&apos;re here.
          </h1>
          <p className="text-white/80">
            Care that feels personal — from a provider who listens and leads
            with heart.
          </p>
          <ul className="flex flex-col gap-3">
            {highlights.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-3 text-sm">
                <Icon aria-hidden className="size-4 text-gold" />
                {text}
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-3xl border bg-card p-8 text-card-foreground">
          {children}
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
