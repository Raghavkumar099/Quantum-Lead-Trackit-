"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, CheckCircle, AlertTriangle, Train, Building2, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

export interface Notification {
  id: string
  type: "alert" | "platform" | "arrival" | "departure" | "emergency"
  title: string
  message: string
  timestamp: Date
  acknowledged: boolean
  priority: "low" | "medium" | "high" | "critical"
  trainId?: string
  platformId?: string
}

interface NotificationSystemProps {
  notifications: Notification[]
  onAcknowledge: (id: string) => void
  onDismiss: (id: string) => void
}

export function NotificationSystem({ notifications, onAcknowledge, onDismiss }: NotificationSystemProps) {
  const [visibleNotifications, setVisibleNotifications] = useState<Notification[]>([])

  useEffect(() => {
    setVisibleNotifications(notifications.filter((n) => !n.acknowledged).slice(0, 5))
  }, [notifications])

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "border-red-500 bg-red-50 dark:bg-red-950"
      case "high":
        return "border-orange-500 bg-orange-50 dark:bg-orange-950"
      case "medium":
        return "border-yellow-500 bg-yellow-50 dark:bg-yellow-950"
      default:
        return "border-blue-500 bg-blue-50 dark:bg-blue-950"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "platform":
        return <Building2 className="h-4 w-4" />
      case "arrival":
        return <Train className="h-4 w-4" />
      case "departure":
        return <Train className="h-4 w-4" />
      case "emergency":
        return <AlertTriangle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const handleAcknowledge = (notification: Notification) => {
    onAcknowledge(notification.id)
    // Simulate sending notification to station master
    console.log(`[v0] Alert acknowledged - Notification sent to Station Master: ${notification.title}`)
  }

  if (visibleNotifications.length === 0) return null

  return (
    <div className="fixed top-20 right-6 z-50 space-y-3 max-w-md">
      {visibleNotifications.map((notification, index) => (
        <Card
          key={notification.id}
          className={cn(
            "border-l-4 shadow-lg animate-slide-in-right hover-lift",
            getPriorityColor(notification.priority),
          )}
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <CardContent className="p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3 flex-1">
                <div className="mt-0.5">{getTypeIcon(notification.type)}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-sm">{notification.title}</h4>
                    <Badge variant="outline" className="text-xs">
                      {notification.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>
                  {(notification.trainId || notification.platformId) && (
                    <div className="flex gap-2 text-xs text-muted-foreground">
                      {notification.trainId && <span>Train: {notification.trainId}</span>}
                      {notification.platformId && <span>Platform: {notification.platformId}</span>}
                    </div>
                  )}
                  <div className="flex gap-2 mt-3">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleAcknowledge(notification)}
                      className="text-xs"
                    >
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Acknowledge
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => onDismiss(notification.id)} className="text-xs">
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
