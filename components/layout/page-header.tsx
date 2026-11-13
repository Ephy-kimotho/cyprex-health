export function PageHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string
  title: React.ReactNode
  description?: string
  action?: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="flex max-w-2xl flex-col gap-2">
        <p className="text-xs font-semibold tracking-[0.2em] text-gold uppercase">
          {eyebrow}
        </p>
        <h1 className="text-4xl font-semibold sm:text-5xl">{title}</h1>
        {description && <p className="text-muted-foreground">{description}</p>}
      </div>
      {action}
    </div>
  )
}
