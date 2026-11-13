"use client"

import * as React from "react"

import { sampleAppointments } from "@/lib/sample-data"
import type { Appointment, BookingInput } from "@/lib/schemas/appointments"

type AppointmentsContextValue = {
  appointments: Appointment[]
  book: (input: BookingInput) => void
  reschedule: (id: string, input: BookingInput) => void
  cancel: (id: string) => void
}

const AppointmentsContext =
  React.createContext<AppointmentsContextValue | null>(null)

/**
 * Holds appointments in memory until the API exists. Swap the internals for
 * react-query queries/mutations later and keep the hook's shape.
 */
export function AppointmentsProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [appointments, setAppointments] =
    React.useState<Appointment[]>(sampleAppointments)

  const value = React.useMemo<AppointmentsContextValue>(
    () => ({
      appointments,
      book: (input) =>
        setAppointments((current) => [
          ...current,
          { ...input, id: crypto.randomUUID(), status: "upcoming" },
        ]),
      reschedule: (id, input) =>
        setAppointments((current) =>
          current.map((appointment) =>
            appointment.id === id ? { ...appointment, ...input } : appointment
          )
        ),
      cancel: (id) =>
        setAppointments((current) =>
          current.map((appointment) =>
            appointment.id === id
              ? { ...appointment, status: "cancelled" }
              : appointment
          )
        ),
    }),
    [appointments]
  )

  return (
    <AppointmentsContext.Provider value={value}>
      {children}
    </AppointmentsContext.Provider>
  )
}

export function useAppointments() {
  const context = React.useContext(AppointmentsContext)
  if (!context) {
    throw new Error("useAppointments must be used inside AppointmentsProvider")
  }
  return context
}
