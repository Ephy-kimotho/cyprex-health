import type { Metadata } from "next"
import { ClipboardList, Target } from "lucide-react"

import { PageHeader } from "@/components/layout/page-header"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { getProvider } from "@/lib/appointments"
import { formatInitials } from "@/lib/format"
import { samplePatient } from "@/lib/sample-data"

export const metadata: Metadata = { title: "Profile" }

export default function ProfilePage() {
  const patient = samplePatient
  const fullName = `${patient.firstName} ${patient.lastName}`
  const provider = getProvider(patient.primaryProviderId)

  return (
    <>
      <PageHeader
        eyebrow="Profile"
        title="About you"
        description="To update your details, contact the office. Online editing is coming soon."
      />

      <div className="grid gap-6 lg:grid-cols-5">
        <section className="flex flex-col gap-5 rounded-3xl border bg-card p-6 lg:col-span-2">
          <div className="flex items-center gap-4">
            <Avatar className="size-16">
              <AvatarFallback className="bg-secondary text-lg font-semibold text-secondary-foreground">
                {formatInitials(fullName)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-3xl font-semibold">{fullName}</h2>
              <p className="text-sm text-muted-foreground">
                {patient.pronouns}
              </p>
            </div>
          </div>
          <dl className="divide-y text-sm">
            <ProfileRow label="Age range" value={patient.ageRange} />
            <ProfileRow label="Member since" value={patient.memberSince} />
            <ProfileRow
              label="Care programs"
              value={patient.carePrograms.join(", ")}
            />
            <ProfileRow
              label="Primary provider"
              value={provider?.name ?? "—"}
            />
          </dl>
        </section>

        <div className="flex flex-col gap-6 lg:col-span-3">
          <section className="flex flex-col gap-3 rounded-3xl border bg-card p-6">
            <h2 className="text-3xl font-semibold">Medical history</h2>
            <ul className="flex flex-col gap-2">
              {patient.history.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 rounded-xl bg-muted/60 px-4 py-3"
                >
                  <ClipboardList aria-hidden className="size-4 text-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <div className="grid gap-6 sm:grid-cols-2">
            <section className="flex flex-col gap-3 rounded-3xl border bg-card p-6">
              <h2 className="text-3xl font-semibold">Allergies</h2>
              <div className="flex flex-wrap gap-2">
                {patient.allergies.map((allergy) => (
                  <Badge key={allergy} variant="secondary">
                    {allergy}
                  </Badge>
                ))}
              </div>
            </section>
            <section className="flex flex-col gap-3 rounded-3xl border bg-card p-6">
              <h2 className="text-3xl font-semibold">Goals</h2>
              <ul className="flex flex-col gap-2 text-sm">
                {patient.goals.map((goal) => (
                  <li key={goal} className="flex items-center gap-2">
                    <Target aria-hidden className="size-4 text-gold" />
                    {goal}
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </div>
    </>
  )
}

function ProfileRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 py-3">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="text-right font-semibold">{value}</dd>
    </div>
  )
}
