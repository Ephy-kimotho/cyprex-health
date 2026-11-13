"use client"

import { Sprout } from "lucide-react"

import { BookVisitButton } from "@/components/appointments/book-visit-button"
import { useAppointments } from "@/components/appointments/appointments-provider"
import {
  getProvider,
  getVisitModeLabel,
  getVisitTypeLabel,
  sortByStart,
} from "@/lib/appointments"
import { formatLongDate, formatTime } from "@/lib/format"

export function NextVisitCard({ firstName }: { firstName: string }) {
  const { appointments } = useAppointments()
  const next = sortByStart(
    appointments.filter((appointment) => appointment.status === "upcoming")
  )[0]
  const provider = next && getProvider(next.providerId)

  return (
    <section className="relative flex flex-col gap-6 overflow-hidden rounded-3xl bg-brand-deep p-6 text-brand-deep-foreground sm:p-8">
      <Sprout
        aria-hidden
        strokeWidth={1}
        className="pointer-events-none absolute -top-6 -right-6 size-48 text-white/10"
      />
      <div className="flex flex-col gap-1">
        <p className="text-sm font-semibold tracking-[0.2em] text-gold uppercase">
          Welcome back
        </p>
        <h1 className="text-5xl font-semibold text-brand-deep-foreground">
          {firstName}
        </h1>
        <p className="font-heading text-xl text-white/80 italic">
          Your Health. Your Journey. Our Priority.
        </p>
      </div>

      <div className="rounded-2xl border border-white/15 bg-white/10 p-5">
        <p className="text-xs font-semibold tracking-[0.2em] text-gold uppercase">
          Next visit
        </p>
        {next ? (
          <>
            <p className="mt-1 font-heading text-2xl font-semibold text-balance sm:text-3xl">
              {formatLongDate(next.date)}
            </p>
            <p className="text-white/85">
              {formatTime(next.time)} · {getVisitTypeLabel(next.visitType)}
              {provider && ` with ${provider.name}`}
            </p>
            <p className="mt-1 text-sm text-white/70">
              {getVisitModeLabel(next.mode)}
            </p>
          </>
        ) : (
          <p className="mt-1 text-white/85">You have no upcoming visits.</p>
        )}
      </div>

      <BookVisitButton variant="gold" className="self-start" />
    </section>
  )
}
