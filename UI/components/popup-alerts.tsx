"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, AlertTriangle, Train, Activity, Cloud, Zap, User } from "lucide-react"
import type { SafetyAlert } from "@/lib/signaling-system"

interface PopupAlertsProps {
  alerts: SafetyAlert[]
  onAcknowledge: (alertId: string) => void
}

export function PopupAlerts({ alerts, onAcknowledge }: PopupAlertsProps) {
  const [currentAlert, setCurrentAlert] = useState<SafetyAlert | null>(null)
  const [alertQueue, setAlertQueue] = useState<SafetyAlert[]>([])
  const [lastAlertTime, setLastAlertTime] = useState<number>(0)
  const [isWaiting, setIsWaiting] = useState(false)

  useEffect(() => {
    const newAlerts = alerts.filter(
      (alert) =>
        !alert.acknowledged &&
        !alertQueue.find((q) => q.id === alert.id) &&
        (!currentAlert || currentAlert.id !== alert.id),
    )

    if (newAlerts.length > 0) {
      setAlertQueue((prev) => [...prev, ...newAlerts])
    }
  }, [alerts, alertQueue, currentAlert])

  useEffect(() => {
    if (!currentAlert && alertQueue.length > 0 && !isWaiting) {
      const now = Date.now()
      const timeSinceLastAlert = now - lastAlertTime
      const minDelay = 2 * 60 * 1000 // 2 minutes in milliseconds

      if (timeSinceLastAlert >= minDelay || lastAlertTime === 0) {
        setCurrentAlert(alertQueue[0])
        setAlertQueue((prev) => prev.slice(1))
        setLastAlertTime(now)
      } else {
        setIsWaiting(true)
        const remainingTime = minDelay - timeSinceLastAlert
        setTimeout(() => {
          setIsWaiting(false)
          if (alertQueue.length > 0) {
            setCurrentAlert(alertQueue[0])
            setAlertQueue((prev) => prev.slice(1))
            setLastAlertTime(Date.now())
          }
        }, remainingTime)
      }
    }
  }, [currentAlert, alertQueue, lastAlertTime, isWaiting])

  const handleDismiss = (alertId: string) => {
    setCurrentAlert(null)
    onAcknowledge(alertId)
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-500 border-red-600 text-white"
      case "high":
        return "bg-orange-500 border-orange-600 text-white"
      case "medium":
        return "bg-yellow-500 border-yellow-600 text-black"
      case "low":
        return "bg-blue-500 border-blue-600 text-white"
      default:
        return "bg-gray-500 border-gray-600 text-white"
    }
  }

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "signal":
        return <Activity className="h-4 w-4" />
      case "track":
        return <Train className="h-4 w-4" />
      case "weather":
        return <Cloud className="h-4 w-4" />
      case "collision-risk":
        return <AlertTriangle className="h-4 w-4" />
      case "speed-violation":
        return <Zap className="h-4 w-4" />
      case "pilot-alert":
        return <User className="h-4 w-4" />
      default:
        return <AlertTriangle className="h-4 w-4" />
    }
  }

  if (!currentAlert) {
    if (alertQueue.length > 0 && isWaiting) {
      return (
        <div className="fixed top-4 right-4 z-50 max-w-sm">
          <Card className="border border-blue-200 bg-blue-50">
            <CardContent className="p-3">
              <div className="flex items-center gap-2 text-blue-700">
                <div className="animate-pulse">⏳</div>
                <div className="text-sm">
                  <p className="font-medium">Next alert in queue</p>
                  <p className="text-xs opacity-75">
                    {alertQueue.length} alert{alertQueue.length > 1 ? "s" : ""} waiting
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    }
    return null
  }

  return (
    <div className="fixed top-4 right-4 z-50 max-w-sm">
      {alertQueue.length > 0 && (
        <div className="mb-2 text-right">
          <Badge variant="secondary" className="text-xs">
            {alertQueue.length} more alert{alertQueue.length > 1 ? "s" : ""} pending
            <span className="ml-1 opacity-75">(next in 2-3 min)</span>
          </Badge>
        </div>
      )}

      <Card
        className={`border-2 shadow-lg animate-in slide-in-from-right-full fade-in duration-500 ${getSeverityColor(currentAlert.severity)}`}
      >
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-start gap-2 flex-1">
              <div className="mt-0.5">{getAlertIcon(currentAlert.type)}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="outline" className="text-xs bg-white/20 border-white/30">
                    {currentAlert.type.toUpperCase()}
                  </Badge>
                  <Badge variant="outline" className="text-xs bg-white/20 border-white/30">
                    {currentAlert.severity.toUpperCase()}
                  </Badge>
                </div>
                <p className="text-sm font-medium mb-1">{currentAlert.message}</p>
                <div className="text-xs opacity-90 space-y-1">
                  <p>📍 {currentAlert.location}</p>
                  {currentAlert.trainId && <p>🚂 Train: {currentAlert.trainId}</p>}
                  {currentAlert.type === "pilot-alert" && <p>👨‍✈️ From: Train Pilot</p>}
                  <p>⏰ {currentAlert.timestamp.toLocaleTimeString()}</p>
                </div>
              </div>
            </div>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => handleDismiss(currentAlert.id)}
              className="h-6 w-6 p-0 hover:bg-white/20"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
          <div className="mt-3 flex gap-2">
            <Button
              size="sm"
              onClick={() => handleDismiss(currentAlert.id)}
              className="flex-1 h-7 text-xs bg-white/20 hover:bg-white/30 border-white/30"
              variant="outline"
            >
              Acknowledge
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
