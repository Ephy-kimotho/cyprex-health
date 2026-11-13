"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { startOfDay } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { Controller, useForm } from "react-hook-form"

import { useAppointments } from "@/components/appointments/appointments-provider"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { timeSlots } from "@/lib/appointments"
import { formatLongDate, formatTime } from "@/lib/format"
import { providers } from "@/lib/sample-data"
import {
  bookingSchema,
  visitModes,
  visitTypes,
  type Appointment,
  type BookingInput,
  type VisitType,
} from "@/lib/schemas/appointments"
import { cn } from "@/lib/utils"

type BookingDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  /** When set, the dialog reschedules this appointment instead of booking. */
  appointment?: Appointment
  defaultVisitType?: VisitType
}

export function BookingDialog({
  open,
  onOpenChange,
  appointment,
  defaultVisitType,
}: BookingDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[calc(100svh-2rem)] overflow-y-auto p-6 sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-heading text-3xl font-semibold text-heading">
            {appointment ? "Reschedule visit" : "Book a visit"}
          </DialogTitle>
          <DialogDescription>
            {appointment
              ? "Pick a new date and time for this visit."
              : "Choose a visit type, then a time that works for you."}
          </DialogDescription>
        </DialogHeader>
        {open && (
          <BookingForm
            key={appointment?.id ?? "new"}
            appointment={appointment}
            defaultVisitType={defaultVisitType}
            onDone={() => onOpenChange(false)}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}

function BookingForm({
  appointment,
  defaultVisitType,
  onDone,
}: {
  appointment?: Appointment
  defaultVisitType?: VisitType
  onDone: () => void
}) {
  const { book, reschedule } = useAppointments()
  const [calendarOpen, setCalendarOpen] = React.useState(false)
  const today = startOfDay(new Date())

  const form = useForm<BookingInput>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      providerId: appointment?.providerId ?? providers[0]?.id ?? "",
      visitType: appointment?.visitType ?? defaultVisitType,
      mode: appointment?.mode ?? "telehealth",
      date: appointment?.date,
      time: appointment?.time,
    },
  })

  function onSubmit(values: BookingInput) {
    if (appointment) {
      reschedule(appointment.id, values)
    } else {
      book(values)
    }
    onDone()
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
      <FieldGroup className="gap-5">
        <Controller
          control={form.control}
          name="visitType"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="visitType">Visit type</FieldLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger
                  id="visitType"
                  className="h-10! w-full"
                  aria-invalid={fieldState.invalid}
                >
                  <SelectValue placeholder="Select a visit type" />
                </SelectTrigger>
                <SelectContent>
                  {visitTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FieldError errors={[fieldState.error]} />
            </Field>
          )}
        />

        <div className="grid gap-5 sm:grid-cols-2">
          <Controller
            control={form.control}
            name="providerId"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="providerId">Provider</FieldLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger
                    id="providerId"
                    className="h-10! w-full"
                    aria-invalid={fieldState.invalid}
                  >
                    <SelectValue placeholder="Select a provider" />
                  </SelectTrigger>
                  <SelectContent>
                    {providers.map((provider) => (
                      <SelectItem key={provider.id} value={provider.id}>
                        {provider.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />

          <Controller
            control={form.control}
            name="mode"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="mode">Visit format</FieldLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger
                    id="mode"
                    className="h-10! w-full"
                    aria-invalid={fieldState.invalid}
                  >
                    <SelectValue placeholder="Telehealth or in person" />
                  </SelectTrigger>
                  <SelectContent>
                    {visitModes.map((mode) => (
                      <SelectItem key={mode.value} value={mode.value}>
                        {mode.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />
        </div>

        <Controller
          control={form.control}
          name="date"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="date">Date</FieldLabel>
              <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                <PopoverTrigger asChild>
                  <Button
                    id="date"
                    type="button"
                    variant="outline"
                    aria-invalid={fieldState.invalid}
                    className={cn(
                      "h-10 w-full justify-start font-normal",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon data-icon="inline-start" />
                    {field.value ? formatLongDate(field.value) : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={(date) => {
                      field.onChange(date)
                      setCalendarOpen(false)
                    }}
                    disabled={[{ before: today }, { dayOfWeek: [0] }]}
                    autoFocus
                  />
                </PopoverContent>
              </Popover>
              <FieldError errors={[fieldState.error]} />
            </Field>
          )}
        />

        <Controller
          control={form.control}
          name="time"
          render={({ field, fieldState }) => (
            <FieldSet data-invalid={fieldState.invalid}>
              <FieldLegend variant="label">Time</FieldLegend>
              <div
                role="radiogroup"
                aria-label="Time"
                className="grid grid-cols-3 gap-2 sm:grid-cols-4"
              >
                {timeSlots.map((slot) => {
                  const selected = field.value === slot
                  return (
                    <button
                      key={slot}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      onClick={() => field.onChange(slot)}
                      className={cn(
                        "h-10 rounded-full border text-sm font-medium transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
                        selected
                          ? "border-primary bg-primary text-primary-foreground"
                          : "bg-card hover:border-primary hover:bg-secondary"
                      )}
                    >
                      {formatTime(slot)}
                    </button>
                  )
                })}
              </div>
              <FieldError errors={[fieldState.error]} />
            </FieldSet>
          )}
        />
      </FieldGroup>

      <DialogFooter className="mt-6">
        <Button type="button" variant="outline" size="lg" onClick={onDone}>
          Cancel
        </Button>
        <Button type="submit" size="lg">
          {appointment ? "Save new time" : "Book visit"}
        </Button>
      </DialogFooter>
    </form>
  )
}
