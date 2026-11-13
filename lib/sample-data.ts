/**
 * Placeholder data until the API exists. Patient details are deliberately
 * fake (see CLAUDE.md "Patient data"). Replace with react-query hooks.
 */
import { addDays, startOfDay } from "date-fns"

import type { Appointment } from "@/lib/schemas/appointments"

export const providers = [
  {
    id: "cyprine-manduku",
    name: "Cyprine Manduku",
    role: "Adult-gerontology care",
  },
]

export const samplePatient = {
  firstName: "Jane",
  lastName: "Sample",
  pronouns: "she/her",
  ageRange: "35–44",
  memberSince: "2025",
  primaryProviderId: "cyprine-manduku",
  carePrograms: ["Medical weight loss"],
  history: ["Sample condition A", "Sample condition B"],
  allergies: ["Sample allergy"],
  goals: ["Walk 7,500 steps daily", "Sleep 7+ hours"],
}

const today = startOfDay(new Date())

export const sampleAppointments: Appointment[] = [
  {
    id: "apt-1",
    providerId: "cyprine-manduku",
    visitType: "follow-up",
    mode: "telehealth",
    date: addDays(today, 8),
    time: "14:00",
    status: "upcoming",
  },
  {
    id: "apt-2",
    providerId: "cyprine-manduku",
    visitType: "weight-loss",
    mode: "in-person",
    date: addDays(today, -28),
    time: "10:30",
    status: "completed",
  },
]
