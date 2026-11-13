import type { VisitType } from "@/lib/schemas/appointments"

/** Treatments offered on cyprexhealth.com, each mapped to a bookable visit. */
export const services: {
  title: string
  description: string
  visitType: VisitType
}[] = [
  {
    title: "Primary care",
    description:
      "Whole-person care for adults — checkups, chronic conditions and everyday health concerns.",
    visitType: "primary-care",
  },
  {
    title: "Medical weight loss",
    description:
      "A medically supervised plan tailored to your body, with support at every step.",
    visitType: "weight-loss",
  },
  {
    title: "Hormone replacement therapy",
    description:
      "Personalized hormone therapy to restore balance, mood and energy.",
    visitType: "hrt",
  },
  {
    title: "Testosterone replacement therapy",
    description:
      "Customized TRT plans to support energy, strength and mental clarity.",
    visitType: "trt",
  },
]
