import { format, parse } from "date-fns"

/** "Saturday, November 21" */
export function formatLongDate(date: Date) {
  return format(date, "EEEE, MMMM d")
}

/** "Sat, Nov 21" */
export function formatShortDate(date: Date) {
  return format(date, "EEE, MMM d")
}

/** "NOV" */
export function formatMonthAbbr(date: Date) {
  return format(date, "MMM").toUpperCase()
}

/** "21" */
export function formatDayOfMonth(date: Date) {
  return format(date, "d")
}

/** "14:00" -> "2:00 PM" */
export function formatTime(time: string) {
  return format(parse(time, "HH:mm", new Date()), "h:mm a")
}

/** "Jane Sample" -> "JS" */
export function formatInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0]?.toUpperCase())
    .slice(0, 2)
    .join("")
}
