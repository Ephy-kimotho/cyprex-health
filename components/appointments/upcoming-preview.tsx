"use client"

import Link from "next/link"

import { AppointmentCard } from "@/components/appointments/appointment-card"
import { useAppointments } from "@/components/appointments/appointments-provider"
import { sortByStart } from "@/lib/appointments"

export function UpcomingPreview({ limit = 3 }: { limit?: number }) {
  const { appointments } = useAppointments()
  const upcoming = sortByStart(
    appointments.filter((appointment) => appointment.status === "upcoming")
  ).slice(0, limit)

  return (
    <section className="flex flex-col gap-4 rounded-3xl border bg-card p-6">
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="text-3xl font-semibold">Upcoming appointments</h2>
        <Link
          href="/appointments"
          className="text-sm font-medium text-primary underline-offset-4 hover:underline"
        >
          Manage all
        </Link>
      </div>
      {upcoming.length ? (
        <div className="flex flex-col gap-3">
          {upcoming.map((appointment) => (
            <AppointmentCard key={appointment.id} appointment={appointment} />
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">
          No upcoming visits. Use &ldquo;Book a visit&rdquo; to schedule one.
        </p>
      )}
    </section>
  )
}
