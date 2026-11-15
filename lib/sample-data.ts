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
  // Placeholder entries to size the provider list until the API supplies it.
  { id: "provider-sample-a", name: "Alex Sample", role: "Family medicine" },
  { id: "provider-sample-b", name: "Blake Sample", role: "Internal medicine" },
  { id: "provider-sample-c", name: "Casey Sample", role: "Women's health" },
  { id: "provider-sample-d", name: "Drew Sample", role: "Men's health" },
  { id: "provider-sample-e", name: "Emery Sample", role: "Weight management" },
  { id: "provider-sample-f", name: "Finley Sample", role: "Primary care" },
  { id: "provider-sample-g", name: "Gray Sample", role: "Hormone therapy" },
  { id: "provider-sample-h", name: "Harper Sample", role: "Family medicine" },
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
    date: addDays(today, 8),
    time: "14:00",
    status: "upcoming",
  },
  {
    id: "apt-2",
    providerId: "cyprine-manduku",
    visitType: "weight-loss",
    date: addDays(today, -28),
    time: "10:30",
    status: "completed",
  },
]
