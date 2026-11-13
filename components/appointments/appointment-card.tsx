"use client"

import * as React from "react"
import { CalendarClock, MapPin, Video, X } from "lucide-react"

import { useAppointments } from "@/components/appointments/appointments-provider"
import { BookingDialog } from "@/components/appointments/booking-dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  getProvider,
  getVisitModeLabel,
  getVisitTypeLabel,
} from "@/lib/appointments"
import {
  formatDayOfMonth,
  formatLongDate,
  formatMonthAbbr,
  formatShortDate,
  formatTime,
} from "@/lib/format"
import type { Appointment } from "@/lib/schemas/appointments"
import { cn } from "@/lib/utils"

export function AppointmentCard({ appointment }: { appointment: Appointment }) {
  const { cancel } = useAppointments()
  const [rescheduleOpen, setRescheduleOpen] = React.useState(false)
  const [cancelOpen, setCancelOpen] = React.useState(false)

  const provider = getProvider(appointment.providerId)
  const isUpcoming = appointment.status === "upcoming"
  const ModeIcon = appointment.mode === "telehealth" ? Video : MapPin

  return (
    <div
      className={cn(
        "flex flex-col gap-4 rounded-2xl border bg-card p-4 sm:flex-row sm:items-center",
        !isUpcoming && "opacity-80"
      )}
    >
      <div className="flex flex-1 items-center gap-4">
        <div className="flex size-14 shrink-0 flex-col items-center justify-center rounded-xl bg-secondary text-secondary-foreground">
          <span className="text-[0.65rem] font-semibold tracking-wider">
            {formatMonthAbbr(appointment.date)}
          </span>
          <span className="font-heading text-2xl leading-none font-bold">
            {formatDayOfMonth(appointment.date)}
          </span>
        </div>
        <div className="flex min-w-0 flex-col gap-1">
          <p className="font-semibold">
            {getVisitTypeLabel(appointment.visitType)}
          </p>
          <p className="text-sm text-muted-foreground">
            {formatShortDate(appointment.date)} · {formatTime(appointment.time)}
            {provider && ` · ${provider.name}`}
          </p>
          <div className="flex flex-wrap gap-1.5">
            <Badge variant="secondary">
              <ModeIcon />
              {getVisitModeLabel(appointment.mode)}
            </Badge>
            {appointment.status === "cancelled" && (
              <Badge variant="destructive">Cancelled</Badge>
            )}
            {appointment.status === "completed" && (
              <Badge variant="outline">Completed</Badge>
            )}
          </div>
        </div>
      </div>

      {isUpcoming && (
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="h-10 flex-1 rounded-full sm:flex-none"
            onClick={() => setRescheduleOpen(true)}
          >
            <CalendarClock data-icon="inline-start" />
            Reschedule
          </Button>
          <Button
            variant="destructive"
            className="h-10 flex-1 rounded-full sm:flex-none"
            onClick={() => setCancelOpen(true)}
          >
            <X data-icon="inline-start" />
            Cancel
          </Button>
        </div>
      )}

      <BookingDialog
        open={rescheduleOpen}
        onOpenChange={setRescheduleOpen}
        appointment={appointment}
      />

      <Dialog open={cancelOpen} onOpenChange={setCancelOpen}>
        <DialogContent className="p-6">
          <DialogHeader>
            <DialogTitle className="font-heading text-2xl font-semibold text-heading">
              Cancel this visit?
            </DialogTitle>
            <DialogDescription>
              {getVisitTypeLabel(appointment.visitType)} on{" "}
              {formatLongDate(appointment.date)} at{" "}
              {formatTime(appointment.time)}.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Keep visit</Button>
            </DialogClose>
            <Button
              variant="destructive"
              onClick={() => {
                cancel(appointment.id)
                setCancelOpen(false)
              }}
            >
              Cancel visit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
