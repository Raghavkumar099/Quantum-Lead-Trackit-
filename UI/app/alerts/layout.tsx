import type React from "react"
import { Navigation } from "@/components/navigation"

export default function AlertsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <Navigation>{children}</Navigation>
}
