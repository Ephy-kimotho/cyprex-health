"use client"

import * as React from "react"
import { CalendarPlus } from "lucide-react"

import { BookingDialog } from "@/components/appointments/booking-dialog"
import { Button } from "@/components/ui/button"
import type { VisitType } from "@/lib/schemas/appointments"
import { cn } from "@/lib/utils"

export function BookVisitButton({
  defaultVisitType,
  variant = "default",
  className,
  children = "Book a visit",
}: {
  defaultVisitType?: VisitType
  variant?: "default" | "gold" | "outline"
  className?: string
  children?: React.ReactNode
}) {
  const [open, setOpen] = React.useState(false)

  return (
    <>
      <Button
        size="lg"
        variant={variant === "gold" ? "default" : variant}
        onClick={() => setOpen(true)}
        className={cn(
          "h-11 rounded-full px-5",
          variant === "gold" && "bg-gold text-gold-foreground hover:bg-gold/85",
          className
        )}
      >
        <CalendarPlus data-icon="inline-start" />
        {children}
      </Button>
      <BookingDialog
        open={open}
        onOpenChange={setOpen}
        defaultVisitType={defaultVisitType}
      />
    </>
  )
}
