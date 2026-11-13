import type { Metadata } from "next"
import Link from "next/link"

import { NextVisitCard } from "@/components/appointments/next-visit-card"
import { UpcomingPreview } from "@/components/appointments/upcoming-preview"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { getProvider } from "@/lib/appointments"
import { formatInitials } from "@/lib/format"
import { samplePatient } from "@/lib/sample-data"

export const metadata: Metadata = { title: "Dashboard" }

export default function DashboardPage() {
  const patient = samplePatient
  const fullName = `${patient.firstName} ${patient.lastName}`
  const provider = getProvider(patient.primaryProviderId)

  return (
    <>
      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <NextVisitCard firstName={patient.firstName} />
        </div>

        <section className="flex flex-col gap-4 rounded-3xl border bg-card p-6 lg:col-span-2">
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="text-3xl font-semibold">Your care at a glance</h2>
            <Link
              href="/profile"
              className="text-sm font-medium whitespace-nowrap text-primary underline-offset-4 hover:underline"
            >
              Full profile
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <Avatar className="size-12">
              <AvatarFallback className="bg-secondary font-semibold text-secondary-foreground">
                {formatInitials(fullName)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{fullName}</p>
              <p className="text-sm text-muted-foreground">
                {patient.pronouns} · age {patient.ageRange} · member since{" "}
                {patient.memberSince}
              </p>
            </div>
          </div>
          <dl className="grid gap-3 text-sm">
            <GlanceItem
              label="Primary provider"
              value={provider?.name ?? "—"}
            />
            <GlanceItem
              label="Care programs"
              value={patient.carePrograms.join(", ")}
            />
            <GlanceItem
              label="Allergies"
              value={patient.allergies.join(", ")}
            />
          </dl>
        </section>
      </div>

      <UpcomingPreview />
    </>
  )
}

function GlanceItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-muted/60 px-4 py-3">
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className="font-semibold">{value}</dd>
    </div>
  )
}
