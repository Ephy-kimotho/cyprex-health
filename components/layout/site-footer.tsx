import { Phone } from "lucide-react"

import { Logo } from "@/components/brand/logo"

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t bg-secondary/60 dark:bg-card">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-start sm:justify-between sm:px-6">
        <div className="flex flex-col gap-3">
          <Logo />
          <p className="font-heading text-xl text-heading italic">
            Your Health. Your Journey. Our Priority.
          </p>
        </div>
        <div className="flex flex-col gap-2 text-sm text-muted-foreground sm:items-end">
          <a
            href="https://cyprexhealth.com"
            className="hover:text-foreground hover:underline"
          >
            cyprexhealth.com
          </a>
          <p className="flex items-center gap-2">
            <Phone aria-hidden className="size-4" />
            In an emergency, call 911.
          </p>
        </div>
      </div>
    </footer>
  )
}
