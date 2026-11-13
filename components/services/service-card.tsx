import { BookVisitButton } from "@/components/appointments/book-visit-button"
import type { VisitType } from "@/lib/schemas/appointments"

export function ServiceCard({
  title,
  description,
  visitType,
}: {
  title: string
  description: string
  visitType: VisitType
}) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border bg-card p-6">
      <h3 className="text-2xl font-semibold">{title}</h3>
      <p className="flex-1 text-sm text-muted-foreground">{description}</p>
      <BookVisitButton
        variant="outline"
        defaultVisitType={visitType}
        className="self-start"
      >
        Book this visit
      </BookVisitButton>
    </div>
  )
}
