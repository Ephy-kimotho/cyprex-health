import { cn } from "@/lib/utils"

/** Italic phrase on a mint band, as used in headings on cyprexhealth.com. */
export function Highlight({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "inline-block -skew-x-6 bg-secondary px-3 italic dark:bg-accent",
        className
      )}
      {...props}
    />
  )
}
