import { parse } from "date-fns"

import {
  visitModes,
  visitTypes,
  type Appointment,
  type VisitMode,
  type VisitType,
} from "@/lib/schemas/appointments"
import { providers } from "@/lib/sample-data"

/** Bookable start times, every 30 minutes from 9:00 to 16:30. */
export const timeSlots = Array.from({ length: 16 }, (_, index) => {
  const minutes = 9 * 60 + index * 30
  const hours = String(Math.floor(minutes / 60)).padStart(2, "0")
  return `${hours}:${String(minutes % 60).padStart(2, "0")}`
})

export function getAppointmentStart(appointment: Appointment) {
  return parse(appointment.time, "HH:mm", appointment.date)
}

export function sortByStart(appointments: Appointment[]) {
  return [...appointments].sort(
    (a, b) =>
      getAppointmentStart(a).getTime() - getAppointmentStart(b).getTime()
  )
}

export function getVisitTypeLabel(value: VisitType) {
  return visitTypes.find((type) => type.value === value)?.label ?? value
}

export function getVisitModeLabel(value: VisitMode) {
  return visitModes.find((mode) => mode.value === value)?.label ?? value
}

export function getProvider(providerId: string) {
  return providers.find((provider) => provider.id === providerId)
}
