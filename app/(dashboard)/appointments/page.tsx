import type { Metadata } from "next"

import { AppointmentsList } from "@/components/appointments/appointments-list"
import { BookVisitButton } from "@/components/appointments/book-visit-button"
import { PageHeader } from "@/components/layout/page-header"

export const metadata: Metadata = { title: "Appointments" }

export default function AppointmentsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Appointments"
        title="Your visits"
        description="Book, reschedule or cancel telehealth and in-person visits."
        action={<BookVisitButton />}
      />
      <AppointmentsList />
    </>
  )
}
