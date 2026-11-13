import { Video } from "lucide-react"

export function TopBar() {
  return (
    <div className="bg-linear-to-r from-primary to-brand-deep text-sm text-primary-foreground dark:from-brand-deep dark:to-background dark:text-foreground">
      <div className="mx-auto flex h-10 max-w-6xl items-center gap-2 px-4 sm:px-6">
        <Video aria-hidden className="size-4" />
        We offer virtual &amp; telehealth appointments
      </div>
    </div>
  )
}
