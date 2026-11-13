import { AppointmentsProvider } from "@/components/appointments/appointments-provider"
import { PatientHeader } from "@/components/layout/patient-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { TopBar } from "@/components/layout/top-bar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AppointmentsProvider>
      <div className="flex min-h-svh flex-col">
        <TopBar />
        <PatientHeader />
        <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-4 py-8 sm:px-6 sm:py-10">
          {children}
        </main>
        <SiteFooter />
      </div>
    </AppointmentsProvider>
  )
}
