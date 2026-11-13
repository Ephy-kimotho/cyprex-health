import { z } from "zod"

export const visitTypes = [
  { value: "primary-care", label: "Primary care visit" },
  { value: "follow-up", label: "Follow-up visit" },
  { value: "weight-loss", label: "Medical weight loss consult" },
  { value: "hrt", label: "Hormone replacement therapy consult" },
  { value: "trt", label: "Testosterone replacement therapy consult" },
] as const

export type VisitType = (typeof visitTypes)[number]["value"]

export const visitModes = [
  { value: "telehealth", label: "Telehealth" },
  { value: "in-person", label: "In person" },
] as const

export type VisitMode = (typeof visitModes)[number]["value"]

const visitTypeValues = visitTypes.map((type) => type.value) as [
  VisitType,
  ...VisitType[],
]
const visitModeValues = visitModes.map((mode) => mode.value) as [
  VisitMode,
  ...VisitMode[],
]

export const bookingSchema = z.object({
  providerId: z.string().min(1, "Choose a provider"),
  visitType: z.enum(visitTypeValues, { error: "Choose a visit type" }),
  mode: z.enum(visitModeValues, { error: "Choose telehealth or in person" }),
  date: z.date({ error: "Choose a date" }),
  time: z
    .string({ error: "Choose a time" })
    .regex(/^\d{2}:\d{2}$/, "Choose a time"),
})

export type BookingInput = z.infer<typeof bookingSchema>

export type AppointmentStatus = "upcoming" | "completed" | "cancelled"

export type Appointment = BookingInput & {
  id: string
  status: AppointmentStatus
}
