"use client"

import { CalendarX } from "lucide-react"

import { AppointmentCard } from "@/components/appointments/appointment-card"
import { useAppointments } from "@/components/appointments/appointments-provider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { sortByStart } from "@/lib/appointments"

export function AppointmentsList() {
  const { appointments } = useAppointments()
  const upcoming = sortByStart(
    appointments.filter((appointment) => appointment.status === "upcoming")
  )
  const past = sortByStart(
    appointments.filter((appointment) => appointment.status !== "upcoming")
  ).reverse()

  return (
    <Tabs defaultValue="upcoming" className="gap-4">
      <TabsList className="h-11! rounded-full p-1">
        <TabsTrigger value="upcoming" className="rounded-full px-4">
          Upcoming ({upcoming.length})
        </TabsTrigger>
        <TabsTrigger value="past" className="rounded-full px-4">
          Past &amp; cancelled ({past.length})
        </TabsTrigger>
      </TabsList>
      <TabsContent value="upcoming" className="flex flex-col gap-3">
        {upcoming.length ? (
          upcoming.map((appointment) => (
            <AppointmentCard key={appointment.id} appointment={appointment} />
          ))
        ) : (
          <EmptyState message="No upcoming visits. Book one when you're ready." />
        )}
      </TabsContent>
      <TabsContent value="past" className="flex flex-col gap-3">
        {past.length ? (
          past.map((appointment) => (
            <AppointmentCard key={appointment.id} appointment={appointment} />
          ))
        ) : (
          <EmptyState message="No past or cancelled visits yet." />
        )}
      </TabsContent>
    </Tabs>
  )
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed p-10 text-center text-muted-foreground">
      <CalendarX aria-hidden className="size-6" />
      <p>{message}</p>
    </div>
  )
}
