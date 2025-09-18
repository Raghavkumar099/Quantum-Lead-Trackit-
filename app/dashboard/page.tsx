"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { XAxis, YAxis, CartesianGrid, ResponsiveContainer, AreaChart, Area } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Train, MapPin, TrendingUp, Activity, Clock, Timer, Gauge, Signal, Building2, Zap } from "lucide-react"
import {
  LiveSystemEngine,
  type LiveSignal,
  type LivePlatform,
  type LiveTrain,
  type ThroughputMetrics,
  type Notification,
} from "@/lib/live-signal-platform-system"
import { NotificationSystem } from "@/components/notification-system"

export default function ControllerDashboard() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [systemEngine] = useState(new LiveSystemEngine())
  const [signals, setSignals] = useState<LiveSignal[]>([])
  const [platforms, setPlatforms] = useState<LivePlatform[]>([])
  const [trains, setTrains] = useState<LiveTrain[]>([])
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [throughputMetrics, setThroughputMetrics] = useState<ThroughputMetrics>({
    trainsPerHour: 0,
    averageSpeed: 0,
    platformUtilization: 0,
    punctuality: 0,
    totalPassengers: 0,
    efficiency: 0,
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    systemEngine.onNotification((notification) => {
      setNotifications((prev) => [...prev, notification])
    })

    const updateTimer = setInterval(() => {
      setSignals(systemEngine.getSignals())
      setPlatforms(systemEngine.getPlatforms())
      setTrains(systemEngine.getTrains())
      setThroughputMetrics(systemEngine.getThroughputMetrics())
      setNotifications(systemEngine.getNotifications())
    }, 2000) // Faster updates for more responsive feel

    // Initial load
    setSignals(systemEngine.getSignals())
    setPlatforms(systemEngine.getPlatforms())
    setTrains(systemEngine.getTrains())
    setThroughputMetrics(systemEngine.getThroughputMetrics())

    return () => {
      clearInterval(updateTimer)
      systemEngine.cleanup()
    }
  }, [systemEngine])

  const handleAcknowledgeNotification = (id: string) => {
    systemEngine.acknowledgeNotification(id)
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, acknowledged: true } : n)))
  }

  const handleDismissNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "On Time":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "Delayed":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      case "Approaching":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "Running":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "Departed":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  const getSignalColor = (aspect: string) => {
    switch (aspect) {
      case "green":
        return "bg-green-500 shadow-lg shadow-green-500/50"
      case "yellow":
        return "bg-yellow-500 shadow-lg shadow-yellow-500/50"
      case "red":
        return "bg-red-500 shadow-lg shadow-red-500/50"
      case "double-yellow":
        return "bg-gradient-to-r from-yellow-400 to-yellow-600 shadow-lg shadow-yellow-500/50"
      default:
        return "bg-gray-500"
    }
  }

  const getPlatformStatusColor = (status: string) => {
    switch (status) {
      case "occupied":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      case "available":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "maintenance":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  const hourlyData = [
    { hour: "12:00", trains: 45, efficiency: 85, passengers: 2800 },
    { hour: "13:00", trains: 52, efficiency: 88, passengers: 3200 },
    {
      hour: "14:00",
      trains: Math.round(throughputMetrics.trainsPerHour),
      efficiency: Math.round(throughputMetrics.efficiency),
      passengers: Math.round(throughputMetrics.totalPassengers),
    },
    { hour: "15:00", trains: 48, efficiency: 82, passengers: 2950 },
    { hour: "16:00", trains: 55, efficiency: 90, passengers: 3400 },
  ]

  return (
    <div className="p-6 space-y-6 animate-slide-in-right">
      <NotificationSystem
        notifications={notifications}
        onAcknowledge={handleAcknowledgeNotification}
        onDismiss={handleDismissNotification}
      />

      <div className="mb-6 animate-slide-in-top">
        <div className="flex items-center gap-4 mb-2">
          <div className="relative">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-xl animate-pulse-slow">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full animate-ping"></div>
          </div>
          <div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
              RailFlow Pro
            </h1>
            <p className="text-muted-foreground text-xl font-medium">Advanced Railway Control & Analytics Platform</p>
          </div>
        </div>
      </div>

      <Card className="animate-scale-in hover-lift border-0 shadow-xl bg-gradient-to-br from-card to-muted/30">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-primary">
            <TrendingUp className="h-7 w-7 text-blue-500 animate-bounce-slow" />
            Live Throughput Analytics
            <Badge variant="outline" className="ml-auto bg-blue-50 text-blue-600 border-blue-200 animate-pulse">
              <Gauge className="h-3 w-3 mr-1" />
              {Math.round(throughputMetrics.efficiency)}% System Efficiency
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-8">
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 rounded-2xl hover-lift animate-fade-in border border-blue-200 dark:border-blue-800">
              <div className="text-4xl font-bold text-blue-600 mb-2 animate-count-up">
                {Math.round(throughputMetrics.trainsPerHour)}
              </div>
              <div className="text-sm text-blue-600 font-medium">Trains/Hour</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 rounded-2xl hover-lift animate-fade-in border border-green-200 dark:border-green-800">
              <div className="text-4xl font-bold text-green-600 mb-2 animate-count-up">
                {Math.round(throughputMetrics.punctuality)}%
              </div>
              <div className="text-sm text-green-600 font-medium">Punctuality</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-950 dark:to-yellow-900 rounded-2xl hover-lift animate-fade-in border border-yellow-200 dark:border-yellow-800">
              <div className="text-4xl font-bold text-yellow-600 mb-2 animate-count-up">
                {Math.round(throughputMetrics.averageSpeed)}
              </div>
              <div className="text-sm text-yellow-600 font-medium">Avg Speed (km/h)</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950 dark:to-red-900 rounded-2xl hover-lift animate-fade-in border border-red-200 dark:border-red-800">
              <div className="text-4xl font-bold text-red-600 mb-2 animate-count-up">
                {Math.round(throughputMetrics.platformUtilization)}%
              </div>
              <div className="text-sm text-red-600 font-medium">Platform Usage</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 rounded-2xl hover-lift animate-fade-in border border-purple-200 dark:border-purple-800">
              <div className="text-4xl font-bold text-purple-600 mb-2 animate-count-up">
                {Math.round(throughputMetrics.totalPassengers)}
              </div>
              <div className="text-sm text-purple-600 font-medium">Total Passengers</div>
            </div>
          </div>

          <ChartContainer
            config={{
              trains: { label: "Trains/Hour", color: "#3b82f6" },
              efficiency: { label: "Efficiency %", color: "#10b981" },
              passengers: { label: "Passengers", color: "#8b5cf6" },
            }}
            className="h-[300px] animate-fade-in"
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={hourlyData}>
                <defs>
                  <linearGradient id="colorTrains" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorEfficiency" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="hour" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  type="monotone"
                  dataKey="trains"
                  stroke="#3b82f6"
                  fillOpacity={1}
                  fill="url(#colorTrains)"
                  strokeWidth={3}
                />
                <Area
                  type="monotone"
                  dataKey="efficiency"
                  stroke="#10b981"
                  fillOpacity={1}
                  fill="url(#colorEfficiency)"
                  strokeWidth={3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card className="animate-scale-in hover-lift border-0 shadow-lg bg-gradient-to-br from-card to-muted/50">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-primary">
            <Signal className="h-6 w-6 text-accent pulse-slow" />
            Live Signal Status
            <Badge variant="outline" className="ml-auto bg-accent/10 text-accent border-accent/20">
              <Activity className="h-3 w-3 mr-1 text-accent" />
              Real-time • {currentTime.toLocaleTimeString()}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {signals.map((signal, index) => (
              <div
                key={signal.id}
                className="p-4 bg-background border border-border/50 rounded-xl hover-lift animate-fade-in shadow-sm"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-sm font-bold text-primary">{signal.id}</span>
                  <div className={`w-5 h-5 rounded-full ${getSignalColor(signal.aspect)} pulse-slow`} />
                </div>
                <div className="text-xs space-y-2">
                  <div className="text-muted-foreground font-medium">{signal.location}</div>
                  {signal.trainId && (
                    <div className="font-mono text-primary bg-primary/10 px-2 py-1 rounded-md">{signal.trainId}</div>
                  )}
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Safety:</span>
                    <span className={`font-bold text-sm ${signal.safetyScore > 90 ? "text-accent" : "text-secondary"}`}>
                      {signal.safetyScore.toFixed(0)}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="animate-slide-in-left hover-lift border-0 shadow-lg bg-gradient-to-br from-card to-muted/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <Train className="h-6 w-6 text-accent pulse-slow" />
              Live Train Status
              <Badge variant="outline" className="ml-auto bg-accent/10 text-accent border-accent/20">
                {trains.length} Active
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {trains.map((train, index) => (
                <div
                  key={train.id}
                  className={`p-5 rounded-xl border transition-all duration-300 hover-lift animate-fade-in ${
                    train.delay > 0
                      ? "bg-gradient-to-r from-destructive/5 to-destructive/10 border-destructive/20"
                      : "bg-gradient-to-r from-accent/5 to-accent/10 border-accent/20"
                  }`}
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono font-bold text-primary">{train.id}</span>
                    <Badge className={getStatusColor(train.status)}>{train.status}</Badge>
                  </div>
                  <h4 className="font-semibold mb-2">{train.name}</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-muted-foreground" />
                      <span>{train.currentLocation}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Timer className="h-3 w-3 text-muted-foreground" />
                      <span>{train.nextStation}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      <span className="font-mono">{train.scheduledArrival}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Activity className="h-3 w-3 text-muted-foreground" />
                      <span className={`font-mono ${train.delay > 0 ? "text-destructive" : "text-accent"}`}>
                        {train.actualArrival}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-3 pt-2 border-t">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>Speed: {train.speed} km/h</span>
                      {train.platform && <span>Platform: {train.platform}</span>}
                      <span>Passengers: {train.passengers}</span>
                    </div>
                    {train.delay > 0 && (
                      <span className="text-destructive font-semibold text-sm">+{train.delay} min</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="animate-slide-in-right hover-lift border-0 shadow-lg bg-gradient-to-br from-card to-muted/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <Building2 className="h-6 w-6 text-accent pulse-slow" />
              Live Platform Allocation
              <Badge variant="outline" className="ml-auto bg-primary/10 text-primary border-primary/20">
                {platforms.filter((p) => p.status === "occupied").length}/{platforms.length} Occupied
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {platforms.map((platform, index) => (
                <div
                  key={platform.id}
                  className="p-5 bg-background border border-border/50 rounded-xl hover-lift animate-fade-in shadow-sm"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono font-bold text-primary">Platform {platform.id}</span>
                    <Badge className={getPlatformStatusColor(platform.status)}>
                      {platform.status.charAt(0).toUpperCase() + platform.status.slice(1)}
                    </Badge>
                  </div>

                  {platform.trainId && (
                    <div className="mb-2">
                      <span className="font-mono text-sm text-primary">Train: {platform.trainId}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Passengers:</span>
                      <span className="font-semibold">{platform.passengerCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Capacity:</span>
                      <span className="font-semibold">{platform.capacity}</span>
                    </div>
                    {platform.scheduledDeparture && (
                      <>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Departure:</span>
                          <span className="font-mono">{platform.scheduledDeparture}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Utilization:</span>
                          <span
                            className={`font-semibold ${
                              (platform.passengerCount / platform.capacity) > 0.8 ? "text-destructive" : "text-accent"
                            }`}
                          >
                            {Math.round((platform.passengerCount / platform.capacity) * 100)}%
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
