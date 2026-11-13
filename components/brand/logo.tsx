import Link from "next/link"
import { Sprout } from "lucide-react"

import { cn } from "@/lib/utils"

export function Logo({
  href = "/",
  className,
}: {
  href?: string
  className?: string
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-end gap-0.5 font-logo text-2xl leading-none text-foreground",
        className
      )}
    >
      <span>Cyprex</span>
      <span className="ml-1.5 border-b border-primary text-primary">
        Health
      </span>
      <Sprout aria-hidden className="mb-3 size-6 text-leaf" strokeWidth={1.5} />
    </Link>
  )
}
