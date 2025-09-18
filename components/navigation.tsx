"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  Brain,
  FlaskConical,
  AlertTriangle,
  FileText,
  Settings,
  LogOut,
  Menu,
  X,
  Search,
  Radio,
  Moon,
  Sun,
} from "lucide-react"
import { cn } from "@/lib/utils"

const navigationItems = [
  { name: "Control Center", href: "/dashboard", icon: LayoutDashboard },
  { name: "Operations Hub", href: "/recommendations", icon: Brain },
  { name: "Live Signaling", href: "/signaling", icon: Radio },
  { name: "What If Analysis", href: "/simulation", icon: FlaskConical },
  { name: "Alerts & Notifications", href: "/alerts", icon: AlertTriangle },
  { name: "Reports", href: "/reports", icon: FileText },
  { name: "Settings", href: "/settings", icon: Settings },
]

interface NavigationProps {
  children: React.ReactNode
}

export function Navigation({ children }: NavigationProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const pathname = usePathname()

  // Don't show navigation on login page
  if (pathname === "/") {
    return <>{children}</>
  }

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle("dark")
  }

  return (
    <div
      className={cn("min-h-screen transition-all duration-500 ease-in-out", darkMode ? "dark" : "", "bg-background")}
    >
      <header className="bg-gradient-to-r from-primary to-primary/90 text-white shadow-lg border-b transition-all duration-300">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden text-white hover:bg-white/20 transition-all duration-200 hover:scale-105"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            <div className="flex items-center gap-4 animate-fade-in">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-white to-blue-100 rounded-xl flex items-center justify-center shadow-lg animate-bounce-slow">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                    <div className="w-6 h-1 bg-white rounded-full animate-pulse"></div>
                    <div
                      className="w-1 h-6 bg-white rounded-full ml-1 animate-pulse"
                      style={{ animationDelay: "0.5s" }}
                    ></div>
                  </div>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-ping"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight">RailFlow Pro</h1>
                <p className="text-xs text-white/80 font-medium">Advanced Railway Control System</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 transition-all duration-200 hover:bg-white/20">
              <Search className="h-4 w-4" />
              <input
                type="text"
                placeholder="Search trains..."
                className="bg-transparent border-none outline-none text-sm placeholder-white/70 w-48"
              />
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20 transition-all duration-200 hover:scale-105"
              onClick={toggleDarkMode}
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20 transition-all duration-200 hover:scale-105"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-50 w-72 bg-gradient-to-b from-sidebar to-muted/30 backdrop-blur-sm border-r border-sidebar-border transform transition-all duration-500 ease-in-out lg:translate-x-0 lg:static lg:inset-0 shadow-xl",
            sidebarOpen ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <div className="flex flex-col h-full pt-20 lg:pt-6">
            <nav className="flex-1 px-6 py-8 space-y-3">
              {navigationItems.map((item, index) => {
                const Icon = item.icon
                const isActive = pathname === item.href

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 transform hover:scale-105 hover-lift animate-fade-in",
                      isActive
                        ? "bg-gradient-to-r from-primary/20 to-primary/10 text-primary border border-primary/20 shadow-lg"
                        : "text-sidebar-foreground hover:bg-gradient-to-r hover:from-muted/50 hover:to-muted/30 hover:text-primary",
                    )}
                    style={{ animationDelay: `${index * 100}ms` }}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <Icon className={cn("h-5 w-5", isActive && "text-primary")} />
                    {item.name}
                  </Link>
                )
              })}
            </nav>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden animate-fade-in"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <main className="flex-1 lg:ml-0 transition-all duration-500 ease-in-out">
          <div className="animate-slide-in-right">{children}</div>
        </main>
      </div>
    </div>
  )
}
