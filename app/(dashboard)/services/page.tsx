import type { Metadata } from "next"

import { Highlight } from "@/components/brand/highlight"
import { PageHeader } from "@/components/layout/page-header"
import { ServiceCard } from "@/components/services/service-card"
import { services } from "@/lib/services"

export const metadata: Metadata = { title: "Services" }

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title={
          <>
            Treatments that <Highlight>actually work</Highlight>
          </>
        }
        description="Choose a service to book a visit. Every service is available by telehealth or in person."
      />
      <div className="grid gap-4 sm:grid-cols-2">
        {services.map((service) => (
          <ServiceCard key={service.visitType} {...service} />
        ))}
      </div>
    </>
  )
}
