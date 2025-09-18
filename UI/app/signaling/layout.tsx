import type React from "react"
import { Navigation } from "@/components/navigation"

export default function SignalingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <Navigation>{children}</Navigation>
}
