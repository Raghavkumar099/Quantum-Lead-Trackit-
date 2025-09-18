import type React from "react"
import { Navigation } from "@/components/navigation"

export default function ReportsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <Navigation>{children}</Navigation>
}
